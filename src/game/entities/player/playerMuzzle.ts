import { PLAYER_MUZZLE_OFFSET_X } from '../../config/balance'

export interface Position {
  x: number
  y: number
}

export function getPlayerMuzzlePosition(
  position: Position,
  offsetX = PLAYER_MUZZLE_OFFSET_X,
): Position {
  return {
    x: position.x + offsetX,
    y: position.y,
  }
}
