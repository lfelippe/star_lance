import test from 'node:test'
import assert from 'node:assert/strict'
import { GameSessionStore } from '../../../src/game/state/gameSession'

test('GameSessionStore addScore increments the current score', () => {
  const store = new GameSessionStore()

  store.startRun()
  store.addScore(100)
  store.addScore(50)

  assert.equal(store.getSnapshot().score, 150)
})

test('GameSessionStore startRun resets score to zero', () => {
  const store = new GameSessionStore()

  store.startRun()
  store.addScore(100)
  store.startRun()

  assert.equal(store.getSnapshot().score, 0)
})

test('GameSessionStore addScore rejects negative points', () => {
  const store = new GameSessionStore()

  store.startRun()

  assert.throws(() => store.addScore(-1), /must not be negative/)
  assert.equal(store.getSnapshot().score, 0)
})
