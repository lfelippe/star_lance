import Phaser from 'phaser'
import {
  GAME_HEIGHT,
  GAME_WIDTH,
  PLAYER_MARGIN,
  PLAYER_SPEED,
  PLAYER_START_X,
  PLAYER_START_Y,
} from '../../config/balance'
import { ASSET_KEYS } from '../../config/assetKeys'
import { clamp } from '../../utils/clamp'
import type { InputState } from '../../types/gameTypes'

export class Player {
  private readonly sprite: Phaser.Physics.Arcade.Image

  constructor(scene: Phaser.Scene) {
    this.sprite = scene.physics.add
      .image(PLAYER_START_X, PLAYER_START_Y, ASSET_KEYS.playerShip)
      .setDepth(10)

    this.sprite.setCollideWorldBounds(false)
  }

  update(input: InputState): void {
    const vector = new Phaser.Math.Vector2(input.moveX, input.moveY)

    if (vector.lengthSq() > 0) {
      vector.normalize().scale(PLAYER_SPEED)
    }

    this.sprite.setVelocity(vector.x, vector.y)

    const halfWidth = this.sprite.displayWidth / 2
    const halfHeight = this.sprite.displayHeight / 2

    this.sprite.x = clamp(
      this.sprite.x,
      PLAYER_MARGIN + halfWidth,
      GAME_WIDTH - PLAYER_MARGIN - halfWidth,
    )
    this.sprite.y = clamp(
      this.sprite.y,
      PLAYER_MARGIN + halfHeight,
      GAME_HEIGHT - PLAYER_MARGIN - halfHeight,
    )
  }
}
