import Phaser from 'phaser'
import { GAME_HEIGHT, GAME_WIDTH } from '../config/balance'

export class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene')
  }

  create(): void {
    this.add
      .rectangle(0, 0, GAME_WIDTH, GAME_HEIGHT, 0x030712, 0.78)
      .setOrigin(0, 0)

    this.add
      .text(GAME_WIDTH / 2, 190, 'STAR LANCE', {
        fontFamily: 'Trebuchet MS',
        fontSize: '56px',
        color: '#e6f4ff',
        stroke: '#09101d',
        strokeThickness: 8,
      })
      .setOrigin(0.5)

    this.add
      .text(
        GAME_WIDTH / 2,
        280,
        'ARROWS / WASD TO MOVE\nSPACE TO FIRE\n\nPRESS SPACE OR ENTER',
        {
          fontFamily: 'Trebuchet MS',
          fontSize: '24px',
          color: '#9cc8ff',
          align: 'center',
          lineSpacing: 10,
        },
      )
      .setOrigin(0.5)

    this.input.keyboard?.once('keydown-SPACE', () => {
      this.scene.start('GameScene')
    })
    this.input.keyboard?.once('keydown-ENTER', () => {
      this.scene.start('GameScene')
    })
  }
}
