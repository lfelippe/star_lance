import test from 'node:test'
import assert from 'node:assert/strict'
import {
  ENEMY_RAIDER_HP,
  ENEMY_RAIDER_SCORE_VALUE,
  ENEMY_RAIDER_SPEED,
  ENEMY_RAIDER_SWAY_AMPLITUDE,
  ENEMY_RAIDER_SWAY_CYCLE_MS,
  ENEMY_SCOUT_HP,
  ENEMY_SCOUT_SCORE_VALUE,
  ENEMY_SCOUT_SPEED,
  ENEMY_SPAWN_LANES_Y,
  ENEMY_SPAWN_MARGIN_Y,
  GAME_HEIGHT,
  PLAYER_BULLET_SPEED,
  PLAYER_WEAPON_COOLDOWN_MS,
} from '../../../src/game/config/balance'

test('combat balance values stay positive', () => {
  assert.equal(ENEMY_RAIDER_HP > 0, true)
  assert.equal(ENEMY_RAIDER_SCORE_VALUE > 0, true)
  assert.equal(ENEMY_RAIDER_SPEED > 0, true)
  assert.equal(ENEMY_RAIDER_SWAY_AMPLITUDE > 0, true)
  assert.equal(ENEMY_RAIDER_SWAY_CYCLE_MS > 0, true)
  assert.equal(ENEMY_SCOUT_HP > 0, true)
  assert.equal(ENEMY_SCOUT_SCORE_VALUE > 0, true)
  assert.equal(ENEMY_SCOUT_SPEED > 0, true)
  assert.equal(PLAYER_BULLET_SPEED > 0, true)
  assert.equal(PLAYER_WEAPON_COOLDOWN_MS > 0, true)
})

test('enemy spawn lanes stay within the visible play area', () => {
  assert.equal(ENEMY_SPAWN_LANES_Y.length > 0, true)

  for (const laneY of ENEMY_SPAWN_LANES_Y) {
    assert.equal(laneY >= ENEMY_SPAWN_MARGIN_Y, true)
    assert.equal(laneY <= GAME_HEIGHT - ENEMY_SPAWN_MARGIN_Y, true)
  }
})
