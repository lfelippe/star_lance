import { ENEMY_SCOUT_SCORE_VALUE } from '../../config/balance'

export interface EnemyHitResult {
  destroyed: boolean
  nextHp: number
  scoreAwarded: number
}

export function resolveEnemyHit(
  currentHp: number,
  damage: number,
  scoreValue = ENEMY_SCOUT_SCORE_VALUE,
): EnemyHitResult {
  const nextHp = Math.max(0, currentHp - damage)
  const destroyed = nextHp === 0

  return {
    destroyed,
    nextHp,
    scoreAwarded: destroyed ? scoreValue : 0,
  }
}
