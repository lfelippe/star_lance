import Phaser from 'phaser'
import './style.css'
import { createGameConfig } from './game/config/gameConfig'

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('App root #app was not found.')
}

app.replaceChildren()

const game = new Phaser.Game(createGameConfig())

window.addEventListener('beforeunload', () => {
  game.destroy(true)
})
