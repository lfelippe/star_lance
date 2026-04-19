import { PLAYER_WEAPON_COOLDOWN_MS } from '../../config/balance'

export class PlayerWeapon {
  private readonly cooldownMs: number
  private lastShotAtMs = Number.NEGATIVE_INFINITY

  constructor(cooldownMs = PLAYER_WEAPON_COOLDOWN_MS) {
    this.cooldownMs = cooldownMs
  }

  canFire(nowMs: number): boolean {
    return nowMs - this.lastShotAtMs >= this.cooldownMs
  }

  tryFire(nowMs: number): boolean {
    if (!this.canFire(nowMs)) {
      return false
    }

    this.lastShotAtMs = nowMs
    return true
  }
}
