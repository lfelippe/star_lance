import test from 'node:test'
import assert from 'node:assert/strict'
import { getEnemyBehaviorOffsetY } from '../../../../src/game/entities/enemies/enemyBehaviors'

test('straight enemy behavior keeps a zero vertical offset', () => {
  assert.equal(getEnemyBehaviorOffsetY({ kind: 'straight' }, 0), 0)
  assert.equal(getEnemyBehaviorOffsetY({ kind: 'straight' }, 5_000), 0)
})

test('sine enemy behavior reaches its peak offset at a quarter cycle', () => {
  assert.equal(
    Math.round(
      getEnemyBehaviorOffsetY({ kind: 'sine', amplitude: 54, cycleMs: 1_200 }, 300),
    ),
    54,
  )
})

test('sine enemy behavior returns to center after a half cycle', () => {
  assert.equal(
    Math.round(
      getEnemyBehaviorOffsetY({ kind: 'sine', amplitude: 54, cycleMs: 1_200 }, 600),
    ),
    0,
  )
})
