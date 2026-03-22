import Phaser from 'phaser'
import type { InputState } from '../types/gameTypes'

export interface GameInputController {
  read(): InputState
}

export function createInputState(scene: Phaser.Scene): GameInputController {
  const cursors = scene.input.keyboard?.createCursorKeys()
  const wasd = scene.input.keyboard?.addKeys('W,A,S,D') as
    | Record<'W' | 'A' | 'S' | 'D', Phaser.Input.Keyboard.Key>
    | undefined
  const fireKey = scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

  return {
    read(): InputState {
      const left = Boolean(cursors?.left.isDown || wasd?.A.isDown)
      const right = Boolean(cursors?.right.isDown || wasd?.D.isDown)
      const up = Boolean(cursors?.up.isDown || wasd?.W.isDown)
      const down = Boolean(cursors?.down.isDown || wasd?.S.isDown)

      return {
        moveX: Number(right) - Number(left),
        moveY: Number(down) - Number(up),
        fire: Boolean(fireKey?.isDown),
      }
    },
  }
}
