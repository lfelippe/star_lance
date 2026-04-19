import test from 'node:test'
import assert from 'node:assert/strict'
import { PlayerWeapon } from '../../../../src/game/entities/player/PlayerWeapon'

test('PlayerWeapon fires immediately on first trigger', () => {
  const weapon = new PlayerWeapon(160)

  assert.equal(weapon.tryFire(0), true)
})

test('PlayerWeapon blocks shots during cooldown', () => {
  const weapon = new PlayerWeapon(160)

  assert.equal(weapon.tryFire(0), true)
  assert.equal(weapon.canFire(159), false)
  assert.equal(weapon.tryFire(159), false)
})

test('PlayerWeapon allows another shot once cooldown elapses', () => {
  const weapon = new PlayerWeapon(160)

  assert.equal(weapon.tryFire(0), true)
  assert.equal(weapon.canFire(160), true)
  assert.equal(weapon.tryFire(160), true)
})

test('PlayerWeapon keeps the original cooldown after a blocked shot', () => {
  const weapon = new PlayerWeapon(160)

  assert.equal(weapon.tryFire(1000), true)
  assert.equal(weapon.tryFire(1100), false)
  assert.equal(weapon.tryFire(1159), false)
  assert.equal(weapon.tryFire(1160), true)
})
