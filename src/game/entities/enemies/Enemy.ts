import Phaser from 'phaser'
import { ASSET_KEYS } from '../../config/assetKeys'
import { ENEMY_SCOUT_HP, ENEMY_SCOUT_SCORE_VALUE, ENEMY_SCOUT_SPEED } from '../../config/balance'
import { isPastLeftEdge } from './enemyBounds'
import { resolveEnemyHit } from './enemyCombat'

export class Enemy extends Phaser.Physics.Arcade.Image {
  private hp = ENEMY_SCOUT_HP

  readonly scoreValue = ENEMY_SCOUT_SCORE_VALUE

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, ASSET_KEYS.enemyScout)

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setDepth(8)
    this.setVelocityX(-ENEMY_SCOUT_SPEED)
    this.setImmovable(true)

    if (this.body instanceof Phaser.Physics.Arcade.Body) {
      this.body.setAllowGravity(false)
    }
  }

  takeDamage(amount: number): boolean {
    const hit = resolveEnemyHit(this.hp, amount, this.scoreValue)
    this.hp = hit.nextHp

    if (hit.destroyed) {
      this.destroy()
    }

    return hit.destroyed
  }

  update(): void {
    if (isPastLeftEdge(this.x, this.displayWidth)) {
      this.destroy()
    }
  }
}
