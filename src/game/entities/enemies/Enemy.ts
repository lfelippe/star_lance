import Phaser from 'phaser'
import { isPastLeftEdge } from './enemyBounds'
import { resolveEnemyHit } from './enemyCombat'
import type { EnemyBlueprint } from './enemyCatalog'
import { getEnemyBehaviorOffsetY } from './enemyBehaviors'

export class Enemy extends Phaser.Physics.Arcade.Image {
  private hp: number
  private readonly spawnY: number
  private readonly blueprint: EnemyBlueprint
  private elapsedMs = 0

  readonly scoreValue: number

  constructor(scene: Phaser.Scene, x: number, y: number, blueprint: EnemyBlueprint) {
    super(scene, x, y, blueprint.assetKey)

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.blueprint = blueprint
    this.hp = blueprint.hp
    this.scoreValue = blueprint.scoreValue
    this.spawnY = y

    this.setDepth(8)
    this.setVelocityX(-blueprint.speedX)
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

  update(_: number, delta: number): void {
    this.elapsedMs += delta

    if (this.blueprint.behavior.kind !== 'straight') {
      this.y = this.spawnY + getEnemyBehaviorOffsetY(this.blueprint.behavior, this.elapsedMs)
    }

    if (isPastLeftEdge(this.x, this.displayWidth)) {
      this.destroy()
    }
  }
}
