import type { WaveDefinition, WaveSpawnRequest } from './waveDefinitions'

export interface WaveProgressState {
  completedLoops: number
  pendingSpawnIndex: number
  waveElapsedMs: number
  waveIndex: number
}

export interface WaveProgressUpdate {
  activeWaveIndex: number
  activeWaveKey: string
  nextState: WaveProgressState
  spawns: WaveSpawnRequest[]
}

export function createWaveProgressState(): WaveProgressState {
  return {
    completedLoops: 0,
    pendingSpawnIndex: 0,
    waveElapsedMs: 0,
    waveIndex: 0,
  }
}

export function updateWaveProgress(
  state: WaveProgressState,
  deltaMs: number,
  waves: readonly WaveDefinition[],
): WaveProgressUpdate {
  if (waves.length === 0) {
    throw new Error('Wave definitions must not be empty')
  }

  let nextState: WaveProgressState = { ...state }
  let remainingMs = deltaMs
  const spawns: WaveSpawnRequest[] = []

  while (remainingMs >= 0) {
    const wave = waves[nextState.waveIndex]
    const availableMs = wave.durationMs - nextState.waveElapsedMs
    const consumedMs = Math.min(remainingMs, availableMs)
    nextState.waveElapsedMs += consumedMs

    while (
      nextState.pendingSpawnIndex < wave.spawns.length &&
      wave.spawns[nextState.pendingSpawnIndex].timeMs <= nextState.waveElapsedMs
    ) {
      const spawn = wave.spawns[nextState.pendingSpawnIndex]
      spawns.push({
        enemyType: spawn.enemyType,
        laneIndex: spawn.laneIndex,
      })
      nextState.pendingSpawnIndex += 1
    }

    remainingMs -= consumedMs

    if (nextState.waveElapsedMs < wave.durationMs) {
      break
    }

    if (nextState.waveIndex < waves.length - 1) {
      nextState = {
        ...nextState,
        pendingSpawnIndex: 0,
        waveElapsedMs: 0,
        waveIndex: nextState.waveIndex + 1,
      }
    } else {
      nextState = {
        completedLoops: nextState.completedLoops + 1,
        pendingSpawnIndex: 0,
        waveElapsedMs: 0,
        waveIndex: nextState.waveIndex,
      }
    }

    if (remainingMs === 0) {
      break
    }
  }

  return {
    activeWaveIndex: nextState.waveIndex,
    activeWaveKey: waves[nextState.waveIndex].key,
    nextState,
    spawns,
  }
}
