import { ASSET_KEYS } from '../../config/assetKeys'
import {
  ENEMY_RAIDER_HP,
  ENEMY_RAIDER_SCORE_VALUE,
  ENEMY_RAIDER_SPEED,
  ENEMY_RAIDER_SWAY_AMPLITUDE,
  ENEMY_RAIDER_SWAY_CYCLE_MS,
  ENEMY_SCOUT_HP,
  ENEMY_SCOUT_SCORE_VALUE,
  ENEMY_SCOUT_SPEED,
} from '../../config/balance'
import type { EnemyBehavior } from './enemyBehaviors'

export type EnemyType = 'scout' | 'raider'

export interface EnemyBlueprint {
  assetKey: string
  behavior: EnemyBehavior
  hp: number
  scoreValue: number
  speedX: number
}

export const ENEMY_BLUEPRINTS: Record<EnemyType, EnemyBlueprint> = {
  scout: {
    assetKey: ASSET_KEYS.enemyScout,
    behavior: { kind: 'straight' },
    hp: ENEMY_SCOUT_HP,
    scoreValue: ENEMY_SCOUT_SCORE_VALUE,
    speedX: ENEMY_SCOUT_SPEED,
  },
  raider: {
    assetKey: ASSET_KEYS.enemyRaider,
    behavior: {
      kind: 'sine',
      amplitude: ENEMY_RAIDER_SWAY_AMPLITUDE,
      cycleMs: ENEMY_RAIDER_SWAY_CYCLE_MS,
    },
    hp: ENEMY_RAIDER_HP,
    scoreValue: ENEMY_RAIDER_SCORE_VALUE,
    speedX: ENEMY_RAIDER_SPEED,
  },
}
