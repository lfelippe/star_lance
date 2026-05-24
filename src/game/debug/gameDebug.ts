import type { GameSession } from '../types/gameTypes'

export interface GameDebugControls {
  triggerPlayerHit?: () => void
}

export interface GameDebugProgression {
  activeWaveIndex: number
  activeWaveKey: string
  completedLoops: number
  totalSpawned: number
}

export interface GameDebugState {
  bulletCount: number
  controls?: GameDebugControls
  enemyCount: number
  progression?: GameDebugProgression
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
