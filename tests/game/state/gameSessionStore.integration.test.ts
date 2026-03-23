import test from 'node:test'
import assert from 'node:assert/strict'
import { GameSessionStore } from '../../../src/game/state/gameSession'

test('GameSessionStore starts a fresh playing run from defaults', () => {
  const store = new GameSessionStore()

  store.startRun()

  assert.deepEqual(store.getSnapshot(), {
    status: 'playing',
    score: 0,
    playerLives: 3,
    elapsedTimeMs: 0,
  })
})

test('GameSessionStore tick accumulates elapsed time for the active run', () => {
  const store = new GameSessionStore()

  store.startRun()
  store.tick(16)
  store.tick(34)

  assert.equal(store.getSnapshot().elapsedTimeMs, 50)
})

test('GameSessionStore exposes defensive snapshots', () => {
  const store = new GameSessionStore()

  store.startRun()

  const snapshot = store.getSnapshot()
  snapshot.score = 999
  snapshot.playerLives = 0

  assert.deepEqual(store.getSnapshot(), {
    status: 'playing',
    score: 0,
    playerLives: 3,
    elapsedTimeMs: 0,
  })
})
