import type { GameSession } from '../types/gameTypes'

export interface GameDebugState {
  bulletCount: number
  enemyCount: number
  scene: string
  session?: GameSession
}

declare global {
  interface Window {
    __STAR_LANCE_DEBUG__?: GameDebugState
  }
}

export function updateGameDebug(state: GameDebugState): void {
  if (typeof window === 'undefined') {
    return
  }

  window.__STAR_LANCE_DEBUG__ = state
}
