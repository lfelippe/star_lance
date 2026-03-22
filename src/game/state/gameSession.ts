import type { GameSession } from '../types/gameTypes'
import { createGameSession } from './createGameSession'

export class GameSessionStore {
  private session: GameSession = createGameSession()

  getSnapshot(): GameSession {
    return { ...this.session }
  }

  startRun(): void {
    this.session = {
      ...createGameSession(),
      status: 'playing',
    }
  }

  tick(deltaMs: number): void {
    this.session.elapsedTimeMs += deltaMs
  }
}
