import test from 'node:test'
import assert from 'node:assert/strict'
import { getPlayerMuzzlePosition } from '../../../../src/game/entities/player/playerMuzzle'

test('getPlayerMuzzlePosition returns a point in front of the player', () => {
  assert.deepEqual(getPlayerMuzzlePosition({ x: 140, y: 270 }, 34), {
    x: 174,
    y: 270,
  })
})

test('getPlayerMuzzlePosition does not mutate the input position', () => {
  const position = { x: 140, y: 270 }

  getPlayerMuzzlePosition(position, 34)

  assert.deepEqual(position, { x: 140, y: 270 })
})
