import { INITIAL_LIVES } from '../config/balance'
import type { GameSession } from '../types/gameTypes'

export function createGameSession(): GameSession {
  return {
    status: 'menu',
    score: 0,
    playerLives: INITIAL_LIVES,
    elapsedTimeMs: 0,
  }
}
