export const GAME_WIDTH = 960
export const GAME_HEIGHT = 540

export const PLAYER_START_X = 140
export const PLAYER_START_Y = GAME_HEIGHT / 2
export const PLAYER_SPEED = 320
export const PLAYER_MARGIN = 28
export const PLAYER_BULLET_SPEED = 620
export const PLAYER_WEAPON_COOLDOWN_MS = 160
export const PLAYER_MUZZLE_OFFSET_X = 34

export const BACKGROUND_SCROLL_SPEED_FAR = 18
export const BACKGROUND_SCROLL_SPEED_NEAR = 42

export const ENEMY_SCOUT_HP = 1
export const ENEMY_SCOUT_SCORE_VALUE = 100
export const ENEMY_SCOUT_SPEED = 150
export const ENEMY_RAIDER_HP = 2
export const ENEMY_RAIDER_SCORE_VALUE = 180
export const ENEMY_RAIDER_SPEED = 210
export const ENEMY_RAIDER_SWAY_AMPLITUDE = 54
export const ENEMY_RAIDER_SWAY_CYCLE_MS = 1_200
export const ENEMY_SPAWN_MARGIN_Y = 56
export const ENEMY_SPAWN_OFFSET_X = 26
export const ENEMY_SPAWN_LANES_Y = [PLAYER_START_Y, 160, 380] as const

export const INITIAL_LIVES = 3
