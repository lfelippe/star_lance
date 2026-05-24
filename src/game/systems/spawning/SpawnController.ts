import type { WaveSpawnRequest, WaveDefinition } from './waveDefinitions'
import { createWaveProgressState, updateWaveProgress, type WaveProgressState } from './progressionSystem'

export interface SpawnControllerSnapshot {
  activeWaveIndex: number
  activeWaveKey: string
  completedLoops: number
  totalSpawned: number
}

export class SpawnController<TSpawn> {
  private progressState: WaveProgressState = createWaveProgressState()
  private totalSpawned = 0
  private readonly waves: readonly WaveDefinition[]
  private readonly createSpawn: (spawn: WaveSpawnRequest) => TSpawn

  constructor(
    waves: readonly WaveDefinition[],
    createSpawn: (spawn: WaveSpawnRequest) => TSpawn,
  ) {
    this.waves = waves
    this.createSpawn = createSpawn
  }

  update(deltaMs: number): TSpawn[] {
    const progress = updateWaveProgress(this.progressState, deltaMs, this.waves)
    this.progressState = progress.nextState

    return progress.spawns.map((spawn) => {
      this.totalSpawned += 1
      return this.createSpawn(spawn)
    })
  }

  getSnapshot(): SpawnControllerSnapshot {
    return {
      activeWaveIndex: this.progressState.waveIndex,
      activeWaveKey: this.waves[this.progressState.waveIndex].key,
      completedLoops: this.progressState.completedLoops,
      totalSpawned: this.totalSpawned,
    }
  }
}
