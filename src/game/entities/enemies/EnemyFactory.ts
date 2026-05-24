import Phaser from 'phaser'
import { ENEMY_SPAWN_LANES_Y, ENEMY_SPAWN_OFFSET_X, GAME_WIDTH } from '../../config/balance'
import { Enemy } from './Enemy'
import { ENEMY_BLUEPRINTS } from './enemyCatalog'
import { getEnemySpawnLaneY, getRightSideEnemySpawnPosition } from './enemySpawn'
import type { WaveSpawnRequest } from '../../systems/spawning/waveDefinitions'

export class EnemyFactory {
  private readonly scene: Phaser.Scene

  constructor(scene: Phaser.Scene) {
    this.scene = scene
  }

  createForWaveSpawn(spawn: WaveSpawnRequest): Enemy {
    const y = getEnemySpawnLaneY(spawn.laneIndex, ENEMY_SPAWN_LANES_Y)
    const spawnPosition = getRightSideEnemySpawnPosition(GAME_WIDTH, ENEMY_SPAWN_OFFSET_X, y)

    return new Enemy(
      this.scene,
      spawnPosition.x,
      spawnPosition.y,
      ENEMY_BLUEPRINTS[spawn.enemyType],
    )
  }
}
