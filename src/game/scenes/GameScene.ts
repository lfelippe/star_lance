import Phaser from 'phaser'
import { createInputState, type GameInputController } from '../input/createInputState'
import { Player } from '../entities/player/Player'
import { BackgroundScroller } from '../systems/scrolling/BackgroundScroller'
import { GameSessionStore } from '../state/gameSession'
import { Hud } from '../ui/Hud'

export class GameScene extends Phaser.Scene {
  private inputController!: GameInputController
  private player!: Player
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
    this.hud = new Hud(this)
    this.hud.sync(this.session.getSnapshot())
  }

  update(_: number, delta: number): void {
    this.session.tick(delta)
    this.backgroundScroller.update(delta)
    this.player.update(this.inputController.read())
    this.hud.sync(this.session.getSnapshot())
  }
}
