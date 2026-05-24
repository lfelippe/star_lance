import test from 'node:test'
import assert from 'node:assert/strict'
import { SpawnController } from '../../../../src/game/systems/spawning/SpawnController'
import type { WaveDefinition } from '../../../../src/game/systems/spawning/waveDefinitions'

const TEST_WAVES: readonly WaveDefinition[] = [
  {
    durationMs: 1_000,
    key: 'opening',
    spawns: [{ timeMs: 100, enemyType: 'scout', laneIndex: 0 }],
  },
  {
    durationMs: 1_000,
    key: 'mixup',
    spawns: [{ timeMs: 200, enemyType: 'raider', laneIndex: 2 }],
  },
]

test('SpawnController maps progression spawns through the supplied factory', () => {
  const controller = new SpawnController(TEST_WAVES, (spawn) => `${spawn.enemyType}:${spawn.laneIndex}`)

  assert.deepEqual(controller.update(100), ['scout:0'])
  assert.deepEqual(controller.getSnapshot(), {
    activeWaveIndex: 0,
    activeWaveKey: 'opening',
    completedLoops: 0,
    totalSpawned: 1,
  })
})

test('SpawnController advances waves and tracks total spawns', () => {
  const controller = new SpawnController(TEST_WAVES, (spawn) => `${spawn.enemyType}:${spawn.laneIndex}`)

  controller.update(100)
  assert.deepEqual(controller.update(1_100), ['raider:2'])
  assert.deepEqual(controller.getSnapshot(), {
    activeWaveIndex: 1,
    activeWaveKey: 'mixup',
    completedLoops: 0,
    totalSpawned: 2,
  })
})
