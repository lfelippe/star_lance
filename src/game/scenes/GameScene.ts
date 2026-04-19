import Phaser from 'phaser'
import { createInputState, type GameInputController } from '../input/createInputState'
import { ENEMY_SPAWN_INTERVAL_MS } from '../config/balance'
import { Enemy } from '../entities/enemies/Enemy'
import { EnemyFactory } from '../entities/enemies/EnemyFactory'
import { PlayerBullet } from '../entities/projectiles/PlayerBullet'
import { Player } from '../entities/player/Player'
import { PlayerWeapon } from '../entities/player/PlayerWeapon'
import { BackgroundScroller } from '../systems/scrolling/BackgroundScroller'
import { updateSpawnTimer } from '../systems/spawning/spawnTimer'
import { updateGameDebug } from '../debug/gameDebug'
import { GameSessionStore } from '../state/gameSession'
import { Hud } from '../ui/Hud'

export class GameScene extends Phaser.Scene {
  private inputController!: GameInputController
  private player!: Player
  private playerBullets!: Phaser.GameObjects.Group
  private playerWeapon!: PlayerWeapon
  private enemies!: Phaser.GameObjects.Group
  private enemyFactory!: EnemyFactory
  private enemySpawnElapsedMs = 0
  private enemySpawnCount = 0
  private backgroundScroller!: BackgroundScroller
  private session!: GameSessionStore
  private hud!: Hud

  constructor() {
    super('GameScene')
  }

  create(): void {
    this.session = new GameSessionStore()
    this.session.startRun()

    this.backgroundScroller = new BackgroundScroller(this)
    this.inputController = createInputState(this)
    this.player = new Player(this)
    this.playerBullets = this.add.group({ runChildUpdate: true })
    this.playerWeapon = new PlayerWeapon()
    this.enemies = this.add.group({ runChildUpdate: true })
    this.enemyFactory = new EnemyFactory(this)
    this.physics.add.overlap(
      this.playerBullets,
      this.enemies,
      this.handlePlayerBulletEnemyOverlap,
      undefined,
      this,
    )
    this.hud = new Hud(this)
    this.hud.sync(this.session.getSnapshot())
    this.syncDebug()
  }

  update(_: number, delta: number): void {
    this.session.tick(delta)
    this.backgroundScroller.update(delta)
    this.updateEnemySpawning(delta)

    const input = this.inputController.read()
    this.player.update(input)

    const session = this.session.getSnapshot()
    if (input.fire && this.playerWeapon.tryFire(session.elapsedTimeMs)) {
      const muzzle = this.player.getMuzzlePosition()
      this.playerBullets.add(new PlayerBullet(this, muzzle.x, muzzle.y))
    }

    this.hud.sync(session)
    this.syncDebug()
  }

  private syncDebug(): void {
    updateGameDebug({
      bulletCount: this.playerBullets.countActive(true),
      enemyCount: this.enemies.countActive(true),
      scene: 'GameScene',
      session: this.session.getSnapshot(),
    })
  }

  private updateEnemySpawning(deltaMs: number): void {
    const spawnTimer = updateSpawnTimer(
      {
        elapsedMs: this.enemySpawnElapsedMs,
      },
      deltaMs,
      ENEMY_SPAWN_INTERVAL_MS,
    )

    this.enemySpawnElapsedMs = spawnTimer.elapsedMs

    for (let index = 0; index < spawnTimer.spawnsToCreate; index += 1) {
      this.enemies.add(this.enemyFactory.createScout(this.enemySpawnCount))
      this.enemySpawnCount += 1
    }
  }

  private handlePlayerBulletEnemyOverlap: Phaser.Types.Physics.Arcade.ArcadePhysicsCallback = (
    bulletObject,
    enemyObject,
  ) => {
    const bullet = bulletObject as PlayerBullet
    const enemy = enemyObject as Enemy

    bullet.destroy()

    if (enemy.takeDamage(1)) {
      this.session.addScore(enemy.scoreValue)
      this.hud.sync(this.session.getSnapshot())
    }
  }
}
