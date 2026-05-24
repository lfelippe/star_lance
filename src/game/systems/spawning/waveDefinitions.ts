import type { EnemyType } from '../../entities/enemies/enemyCatalog'

export interface WaveSpawnRequest {
  enemyType: EnemyType
  laneIndex: number
}

export interface WaveSpawnEvent extends WaveSpawnRequest {
  timeMs: number
}

export interface WaveDefinition {
  durationMs: number
  key: string
  spawns: readonly WaveSpawnEvent[]
}

export const WAVE_DEFINITIONS: readonly WaveDefinition[] = [
  {
    durationMs: 3_600,
    key: 'opening-scouts',
    spawns: [
      { timeMs: 350, enemyType: 'scout', laneIndex: 0 },
      { timeMs: 1_150, enemyType: 'scout', laneIndex: 1 },
      { timeMs: 1_950, enemyType: 'scout', laneIndex: 2 },
      { timeMs: 2_700, enemyType: 'scout', laneIndex: 1 },
    ],
  },
  {
    durationMs: 4_400,
    key: 'crossfire-mix',
    spawns: [
      { timeMs: 250, enemyType: 'scout', laneIndex: 0 },
      { timeMs: 650, enemyType: 'scout', laneIndex: 2 },
      { timeMs: 1_250, enemyType: 'raider', laneIndex: 1 },
      { timeMs: 2_050, enemyType: 'scout', laneIndex: 1 },
      { timeMs: 2_500, enemyType: 'raider', laneIndex: 0 },
      { timeMs: 3_100, enemyType: 'scout', laneIndex: 2 },
    ],
  },
  {
    durationMs: 4_800,
    key: 'raider-squeeze',
    spawns: [
      { timeMs: 200, enemyType: 'raider', laneIndex: 0 },
      { timeMs: 700, enemyType: 'scout', laneIndex: 1 },
      { timeMs: 1_100, enemyType: 'raider', laneIndex: 2 },
      { timeMs: 1_900, enemyType: 'scout', laneIndex: 0 },
      { timeMs: 2_200, enemyType: 'raider', laneIndex: 1 },
      { timeMs: 2_800, enemyType: 'scout', laneIndex: 2 },
      { timeMs: 3_300, enemyType: 'raider', laneIndex: 0 },
      { timeMs: 3_900, enemyType: 'raider', laneIndex: 2 },
    ],
  },
]
