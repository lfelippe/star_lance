import Phaser from 'phaser'
import { createInputState, type GameInputController } from '../input/createInputState'
import { PlayerBullet } from '../entities/projectiles/PlayerBullet'
import { Player } from '../entities/player/Player'
import { PlayerWeapon } from '../entities/player/PlayerWeapon'
import { BackgroundScroller } from '../systems/scrolling/BackgroundScroller'
import { updateGameDebug } from '../debug/gameDebug'
import { GameSessionStore } from '../state/gameSession'
import { Hud } from '../ui/Hud'

export class GameScene extends Phaser.Scene {
  private inputController!: GameInputController
  private player!: Player
  private playerBullets!: Phaser.GameObjects.Group
  private playerWeapon!: PlayerWeapon
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
    this.hud = new Hud(this)
    this.hud.sync(this.session.getSnapshot())
    this.syncDebug()
  }

  update(_: number, delta: number): void {
    this.session.tick(delta)
    this.backgroundScroller.update(delta)

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
      scene: 'GameScene',
      session: this.session.getSnapshot(),
    })
  }
}
