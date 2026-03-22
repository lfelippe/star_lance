import Phaser from 'phaser'
import { ASSET_KEYS } from '../config/assetKeys'
import { GAME_HEIGHT, GAME_WIDTH } from '../config/balance'

export class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene')
  }

  create(): void {
    this.createBackgroundTexture(ASSET_KEYS.backgroundFar, 96, 0x9dc4ff, 0.35)
    this.createBackgroundTexture(ASSET_KEYS.backgroundNear, 160, 0xffffff, 0.7)
    this.createPlayerTexture()
    this.scene.start('MenuScene')
  }

  private createBackgroundTexture(
    key: string,
    starCount: number,
    color: number,
    alpha: number,
  ): void {
    const graphics = this.make.graphics({ x: 0, y: 0 }, false)

    graphics.fillStyle(0x030712, 1)
    graphics.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
    graphics.fillStyle(color, alpha)

    for (let index = 0; index < starCount; index += 1) {
      const x = Phaser.Math.Between(0, GAME_WIDTH)
      const y = Phaser.Math.Between(0, GAME_HEIGHT)
      const size = Phaser.Math.Between(1, 3)

      graphics.fillRect(x, y, size, size)
    }

    graphics.generateTexture(key, GAME_WIDTH, GAME_HEIGHT)
    graphics.destroy()
  }

  private createPlayerTexture(): void {
    const graphics = this.make.graphics({ x: 0, y: 0 }, false)

    graphics.fillStyle(0x74d3ff, 1)
    graphics.fillTriangle(0, 20, 54, 0, 54, 40)
    graphics.fillStyle(0xbef6ff, 1)
    graphics.fillTriangle(18, 20, 54, 7, 54, 33)
    graphics.lineStyle(3, 0xe8f7ff, 0.9)
    graphics.strokeTriangle(0, 20, 54, 0, 54, 40)
    graphics.generateTexture(ASSET_KEYS.playerShip, 54, 40)
    graphics.destroy()
  }
}
