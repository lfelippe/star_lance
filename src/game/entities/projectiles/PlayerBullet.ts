import Phaser from 'phaser'
import { ASSET_KEYS } from '../../config/assetKeys'
import { GAME_WIDTH, PLAYER_BULLET_SPEED } from '../../config/balance'
import { isPastRightEdge } from './projectileBounds'

export class PlayerBullet extends Phaser.Physics.Arcade.Image {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, ASSET_KEYS.playerBullet)

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setDepth(9)
    this.setVelocityX(PLAYER_BULLET_SPEED)
    this.setImmovable(true)

    if (this.body instanceof Phaser.Physics.Arcade.Body) {
      this.body.setAllowGravity(false)
    }
  }

  update(): void {
    if (isPastRightEdge(this.x, this.displayWidth, GAME_WIDTH)) {
      this.destroy()
    }
  }
}
