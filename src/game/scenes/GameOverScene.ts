import Phaser from 'phaser'
import { GAME_HEIGHT, GAME_WIDTH } from '../config/balance'

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOverScene')
  }

  create(): void {
    this.add
      .rectangle(0, 0, GAME_WIDTH, GAME_HEIGHT, 0x04070d, 1)
      .setOrigin(0, 0)

    this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'GAME OVER', {
        fontFamily: 'Trebuchet MS',
        fontSize: '48px',
        color: '#f4f7fb',
      })
      .setOrigin(0.5)
  }
}
