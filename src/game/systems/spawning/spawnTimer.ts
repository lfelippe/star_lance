export interface SpawnTimerState {
  elapsedMs: number
}

export interface SpawnTimerUpdate {
  elapsedMs: number
  spawnsToCreate: number
}

export function updateSpawnTimer(
  state: SpawnTimerState,
  deltaMs: number,
  intervalMs: number,
): SpawnTimerUpdate {
  if (intervalMs <= 0) {
    throw new Error('Spawn interval must be positive')
  }

  const elapsedMs = state.elapsedMs + deltaMs
  const spawnCount = Math.floor(elapsedMs / intervalMs)

  return {
    elapsedMs: elapsedMs % intervalMs,
    spawnsToCreate: spawnCount,
  }
}
