import test from 'node:test'
import assert from 'node:assert/strict'
import { isPastLeftEdge } from '../../../../src/game/entities/enemies/enemyBounds'

test('isPastLeftEdge returns false while any part of the enemy is visible', () => {
  assert.equal(isPastLeftEdge(0, 48), false)
  assert.equal(isPastLeftEdge(-24, 48), false)
})

test('isPastLeftEdge returns true once the enemy is fully beyond the left edge', () => {
  assert.equal(isPastLeftEdge(-25, 48), true)
})
