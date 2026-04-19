import test from 'node:test'
import assert from 'node:assert/strict'
import {
  getEnemySpawnLaneY,
  getRightSideEnemySpawnPosition,
} from '../../../../src/game/entities/enemies/enemySpawn'

test('getRightSideEnemySpawnPosition spawns enemies beyond the right edge', () => {
  assert.deepEqual(getRightSideEnemySpawnPosition(960, 26, 270), {
    x: 986,
    y: 270,
  })
})

test('getRightSideEnemySpawnPosition preserves the requested y coordinate', () => {
  assert.deepEqual(getRightSideEnemySpawnPosition(960, 26, 56), {
    x: 986,
    y: 56,
  })
})

test('getEnemySpawnLaneY cycles through configured lanes', () => {
  assert.equal(getEnemySpawnLaneY(0, [270, 160, 380]), 270)
  assert.equal(getEnemySpawnLaneY(1, [270, 160, 380]), 160)
  assert.equal(getEnemySpawnLaneY(2, [270, 160, 380]), 380)
  assert.equal(getEnemySpawnLaneY(3, [270, 160, 380]), 270)
})

test('getEnemySpawnLaneY rejects an empty lane list', () => {
  assert.throws(() => getEnemySpawnLaneY(0, []), /must not be empty/)
})
