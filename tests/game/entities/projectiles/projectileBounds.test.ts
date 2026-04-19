import test from 'node:test'
import assert from 'node:assert/strict'
import { isPastRightEdge } from '../../../../src/game/entities/projectiles/projectileBounds'

test('isPastRightEdge returns false while any part of the projectile is visible', () => {
  assert.equal(isPastRightEdge(960, 18, 960), false)
  assert.equal(isPastRightEdge(969, 18, 960), false)
})

test('isPastRightEdge returns true once the projectile is fully beyond the edge', () => {
  assert.equal(isPastRightEdge(970, 18, 960), true)
})

test('isPastRightEdge accounts for projectile width', () => {
  assert.equal(isPastRightEdge(980, 40, 960), false)
  assert.equal(isPastRightEdge(981, 40, 960), true)
})
