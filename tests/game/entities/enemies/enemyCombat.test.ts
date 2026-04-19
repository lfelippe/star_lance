import test from 'node:test'
import assert from 'node:assert/strict'
import { resolveEnemyHit } from '../../../../src/game/entities/enemies/enemyCombat'

test('resolveEnemyHit does not award score for non-lethal damage', () => {
  assert.deepEqual(resolveEnemyHit(2, 1, 100), {
    destroyed: false,
    nextHp: 1,
    scoreAwarded: 0,
  })
})

test('resolveEnemyHit awards score when damage destroys the enemy', () => {
  assert.deepEqual(resolveEnemyHit(1, 1, 100), {
    destroyed: true,
    nextHp: 0,
    scoreAwarded: 100,
  })
})

test('resolveEnemyHit awards score once for an already lethal hit result', () => {
  assert.deepEqual(resolveEnemyHit(1, 5, 100), {
    destroyed: true,
    nextHp: 0,
    scoreAwarded: 100,
  })
})
