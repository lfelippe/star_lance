import test from 'node:test'
import assert from 'node:assert/strict'
import { applyEnemyDamage } from '../../../../src/game/entities/enemies/enemyHealth'

test('applyEnemyDamage keeps the enemy alive after non-lethal damage', () => {
  assert.deepEqual(applyEnemyDamage(3, 1), {
    destroyed: false,
    hp: 2,
  })
})

test('applyEnemyDamage destroys the enemy at zero hp', () => {
  assert.deepEqual(applyEnemyDamage(1, 1), {
    destroyed: true,
    hp: 0,
  })
})

test('applyEnemyDamage clamps overkill damage to zero hp', () => {
  assert.deepEqual(applyEnemyDamage(1, 5), {
    destroyed: true,
    hp: 0,
  })
})
