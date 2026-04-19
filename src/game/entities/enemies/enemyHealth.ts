export interface EnemyHealthResult {
  destroyed: boolean
  hp: number
}

export function applyEnemyDamage(currentHp: number, damage: number): EnemyHealthResult {
  const nextHp = Math.max(0, currentHp - damage)

  return {
    destroyed: nextHp === 0,
    hp: nextHp,
  }
}
