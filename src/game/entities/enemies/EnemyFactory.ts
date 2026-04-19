import Phaser from 'phaser'
import { ENEMY_SPAWN_LANES_Y, ENEMY_SPAWN_OFFSET_X, GAME_WIDTH } from '../../config/balance'
import { Enemy } from './Enemy'
import { getEnemySpawnLaneY, getRightSideEnemySpawnPosition } from './enemySpawn'

export class EnemyFactory {
  private readonly scene: Phaser.Scene

  constructor(scene: Phaser.Scene) {
    this.scene = scene
  }

  createScout(spawnIndex: number): Enemy {
    const y = getEnemySpawnLaneY(spawnIndex, ENEMY_SPAWN_LANES_Y)
    const spawn = getRightSideEnemySpawnPosition(GAME_WIDTH, ENEMY_SPAWN_OFFSET_X, y)

    return new Enemy(this.scene, spawn.x, spawn.y)
  }
}
