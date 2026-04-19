import test from 'node:test'
import assert from 'node:assert/strict'
import { updateSpawnTimer } from '../../../../src/game/systems/spawning/spawnTimer'

test('updateSpawnTimer does not spawn before the interval elapses', () => {
  assert.deepEqual(updateSpawnTimer({ elapsedMs: 0 }, 899, 900), {
    elapsedMs: 899,
    spawnsToCreate: 0,
  })
})

test('updateSpawnTimer spawns once when the interval elapses', () => {
  assert.deepEqual(updateSpawnTimer({ elapsedMs: 0 }, 900, 900), {
    elapsedMs: 0,
    spawnsToCreate: 1,
  })
})

test('updateSpawnTimer preserves leftover elapsed time', () => {
  assert.deepEqual(updateSpawnTimer({ elapsedMs: 800 }, 250, 900), {
    elapsedMs: 150,
    spawnsToCreate: 1,
  })
})

test('updateSpawnTimer emits multiple spawns after a long frame', () => {
  assert.deepEqual(updateSpawnTimer({ elapsedMs: 0 }, 2_750, 900), {
    elapsedMs: 50,
    spawnsToCreate: 3,
  })
})

test('updateSpawnTimer rejects non-positive intervals', () => {
  assert.throws(() => updateSpawnTimer({ elapsedMs: 0 }, 100, 0), /positive/)
})
