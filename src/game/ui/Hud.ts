import Phaser from 'phaser'
import type { GameSession } from '../types/gameTypes'

export class Hud {
  private readonly scoreText: Phaser.GameObjects.Text
  private readonly livesText: Phaser.GameObjects.Text

  constructor(scene: Phaser.Scene) {
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Trebuchet MS',
      fontSize: '24px',
      color: '#f2f6ff',
      stroke: '#09101d',
      strokeThickness: 4,
    }

    this.scoreText = scene.add.text(24, 18, '', textStyle).setScrollFactor(0)
    this.livesText = scene.add.text(24, 48, '', textStyle).setScrollFactor(0)
  }

  sync(session: GameSession): void {
    this.scoreText.setText(`SCORE ${session.score.toString().padStart(5, '0')}`)
    this.livesText.setText(`LIVES ${session.playerLives}`)
  }
}
