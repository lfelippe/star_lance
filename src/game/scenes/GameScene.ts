import Phaser from 'phaser'
import { createInputState, type GameInputController } from '../input/createInputState'
import { Enemy } from '../entities/enemies/Enemy'
import { EnemyFactory } from '../entities/enemies/EnemyFactory'
import { PlayerBullet } from '../entities/projectiles/PlayerBullet'
import { Player } from '../entities/player/Player'
import { PlayerWeapon } from '../entities/player/PlayerWeapon'
import { BackgroundScroller } from '../systems/scrolling/BackgroundScroller'
import { SpawnController } from '../systems/spawning/SpawnController'
import { WAVE_DEFINITIONS } from '../systems/spawning/waveDefinitions'
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
  private spawnController!: SpawnController<Enemy>
  private backgroundScroller!: BackgroundScroller
  private session!: GameSessionStore
  private hud!: Hud
  private isEndingRun = false

  constructor() {
    super('GameScene')
  }

  create(): void {
    this.isEndingRun = false
    this.session = new GameSessionStore()
    this.session.startRun()

    this.backgroundScroller = new BackgroundScroller(this)
    this.inputController = createInputState(this)
    this.player = new Player(this)
    this.playerBullets = this.add.group({ runChildUpdate: true })
    this.playerWeapon = new PlayerWeapon()
    this.enemies = this.add.group({ runChildUpdate: true })
    this.enemyFactory = new EnemyFactory(this)
    this.spawnController = new SpawnController(WAVE_DEFINITIONS, (spawn) =>
      this.enemyFactory.createForWaveSpawn(spawn),
    )
    this.physics.add.overlap(
      this.playerBullets,
      this.enemies,
      this.handlePlayerBulletEnemyOverlap,
      undefined,
      this,
    )
    this.physics.add.overlap(
      this.player.getSprite(),
      this.enemies,
      this.handlePlayerEnemyOverlap,
      undefined,
      this,
    )
    this.hud = new Hud(this)
    this.hud.sync(this.session.getSnapshot())
    this.syncDebug()
  }

  update(_: number, delta: number): void {
    if (this.isEndingRun) {
      return
    }

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
      controls: {
        triggerPlayerHit: () => {
          this.applyPlayerHit()
        },
      },
      enemyCount: this.enemies.countActive(true),
      progression: this.spawnController.getSnapshot(),
      scene: 'GameScene',
      session: this.session.getSnapshot(),
    })
  }

  private updateEnemySpawning(deltaMs: number): void {
    for (const enemy of this.spawnController.update(deltaMs)) {
      this.enemies.add(enemy)
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

  private handlePlayerEnemyOverlap: Phaser.Types.Physics.Arcade.ArcadePhysicsCallback = (
    _playerObject,
    enemyObject,
  ) => {
    if (this.isEndingRun) {
      return
    }

    const enemy = enemyObject as Enemy
    enemy.destroy()
    this.applyPlayerHit()
  }

  private applyPlayerHit(): void {
    if (this.isEndingRun) {
      return
    }

    this.session.loseLife()
    const session = this.session.getSnapshot()
    this.hud.sync(session)
    this.syncDebug()

    if (this.session.isGameOver()) {
      this.isEndingRun = true
      this.scene.start('GameOverScene', {
        score: session.score,
      })
    }
  }
}
