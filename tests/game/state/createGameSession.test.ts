import test from 'node:test'
import assert from 'node:assert/strict'
import { INITIAL_LIVES } from '../../../src/game/config/balance'
import { createGameSession } from '../../../src/game/state/createGameSession'

test('createGameSession returns the menu-state defaults', () => {
  assert.deepEqual(createGameSession(), {
    status: 'menu',
    score: 0,
    playerLives: INITIAL_LIVES,
    elapsedTimeMs: 0,
  })
})
