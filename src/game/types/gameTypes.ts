export type GameStatus = 'menu' | 'playing' | 'game-over'

export interface GameSession {
  status: GameStatus
  score: number
  playerLives: number
  elapsedTimeMs: number
}

export interface InputState {
  moveX: number
  moveY: number
  fire: boolean
}
