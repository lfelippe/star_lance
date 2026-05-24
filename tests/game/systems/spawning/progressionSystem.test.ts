import test from 'node:test'
import assert from 'node:assert/strict'
import {
  createWaveProgressState,
  updateWaveProgress,
} from '../../../../src/game/systems/spawning/progressionSystem'
import type { WaveDefinition } from '../../../../src/game/systems/spawning/waveDefinitions'

const TEST_WAVES: readonly WaveDefinition[] = [
  {
    durationMs: 1_000,
    key: 'wave-a',
    spawns: [
      { timeMs: 100, enemyType: 'scout', laneIndex: 0 },
      { timeMs: 800, enemyType: 'raider', laneIndex: 1 },
    ],
  },
  {
    durationMs: 1_200,
    key: 'wave-b',
    spawns: [{ timeMs: 200, enemyType: 'scout', laneIndex: 2 }],
  },
]

test('updateWaveProgress emits due spawns without advancing early', () => {
  assert.deepEqual(updateWaveProgress(createWaveProgressState(), 700, TEST_WAVES), {
    activeWaveIndex: 0,
    activeWaveKey: 'wave-a',
    nextState: {
      completedLoops: 0,
      pendingSpawnIndex: 1,
      waveElapsedMs: 700,
      waveIndex: 0,
    },
    spawns: [{ enemyType: 'scout', laneIndex: 0 }],
  })
})

test('updateWaveProgress advances into the next wave and carries leftover time', () => {
  const progress = updateWaveProgress(
    {
      completedLoops: 0,
      pendingSpawnIndex: 1,
      waveElapsedMs: 700,
      waveIndex: 0,
    },
    600,
    TEST_WAVES,
  )

  assert.deepEqual(progress, {
    activeWaveIndex: 1,
    activeWaveKey: 'wave-b',
    nextState: {
      completedLoops: 0,
      pendingSpawnIndex: 1,
      waveElapsedMs: 300,
      waveIndex: 1,
    },
    spawns: [
      { enemyType: 'raider', laneIndex: 1 },
      { enemyType: 'scout', laneIndex: 2 },
    ],
  })
})

test('updateWaveProgress repeats the final wave after completion', () => {
  const progress = updateWaveProgress(
    {
      completedLoops: 0,
      pendingSpawnIndex: 1,
      waveElapsedMs: 1_100,
      waveIndex: 1,
    },
    200,
    TEST_WAVES,
  )

  assert.deepEqual(progress, {
    activeWaveIndex: 1,
    activeWaveKey: 'wave-b',
    nextState: {
      completedLoops: 1,
      pendingSpawnIndex: 0,
      waveElapsedMs: 100,
      waveIndex: 1,
    },
    spawns: [],
  })
})

test('updateWaveProgress rejects an empty wave list', () => {
  assert.throws(() => updateWaveProgress(createWaveProgressState(), 16, []), /must not be empty/)
})
