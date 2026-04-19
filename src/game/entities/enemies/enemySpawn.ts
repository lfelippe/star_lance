export interface EnemySpawnPosition {
  x: number
  y: number
}

export function getRightSideEnemySpawnPosition(
  rightEdge: number,
  offsetX: number,
  y: number,
): EnemySpawnPosition {
  return {
    x: rightEdge + offsetX,
    y,
  }
}

export function getEnemySpawnLaneY(spawnIndex: number, lanes: readonly number[]): number {
  if (lanes.length === 0) {
    throw new Error('Enemy spawn lanes must not be empty')
  }

  return lanes[spawnIndex % lanes.length]
}
