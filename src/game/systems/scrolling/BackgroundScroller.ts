import Phaser from 'phaser'
import { ASSET_KEYS } from '../../config/assetKeys'
import {
  BACKGROUND_SCROLL_SPEED_FAR,
  BACKGROUND_SCROLL_SPEED_NEAR,
  GAME_HEIGHT,
  GAME_WIDTH,
} from '../../config/balance'

export class BackgroundScroller {
  private readonly farLayer: Phaser.GameObjects.TileSprite
  private readonly nearLayer: Phaser.GameObjects.TileSprite

  constructor(scene: Phaser.Scene) {
    this.farLayer = scene.add
      .tileSprite(0, 0, GAME_WIDTH, GAME_HEIGHT, ASSET_KEYS.backgroundFar)
      .setOrigin(0, 0)
    this.nearLayer = scene.add
      .tileSprite(0, 0, GAME_WIDTH, GAME_HEIGHT, ASSET_KEYS.backgroundNear)
      .setOrigin(0, 0)
  }

  update(deltaMs: number): void {
    const deltaSeconds = deltaMs / 1000

    this.farLayer.tilePositionX += BACKGROUND_SCROLL_SPEED_FAR * deltaSeconds
    this.nearLayer.tilePositionX += BACKGROUND_SCROLL_SPEED_NEAR * deltaSeconds
  }
}
