export interface StraightEnemyBehavior {
  kind: 'straight'
}

export interface SineEnemyBehavior {
  kind: 'sine'
  amplitude: number
  cycleMs: number
}

export type EnemyBehavior = StraightEnemyBehavior | SineEnemyBehavior

export function getEnemyBehaviorOffsetY(
  behavior: EnemyBehavior,
  elapsedMs: number,
): number {
  if (behavior.kind === 'straight') {
    return 0
  }

  return Math.sin((elapsedMs / behavior.cycleMs) * Math.PI * 2) * behavior.amplitude
}
