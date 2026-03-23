import test from 'node:test'
import assert from 'node:assert/strict'
import { clamp } from '../../../src/game/utils/clamp'

test('clamp returns the value when it is already in range', () => {
  assert.equal(clamp(5, 0, 10), 5)
})

test('clamp returns the minimum when the value is below range', () => {
  assert.equal(clamp(-4, 0, 10), 0)
})

test('clamp returns the maximum when the value is above range', () => {
  assert.equal(clamp(17, 0, 10), 10)
})
