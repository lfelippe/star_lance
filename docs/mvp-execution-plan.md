# MVP Execution Plan

## Why this file exists

This file is the execution plan for the Phaser 2D side-scrolling shooter MVP.

## Scope guardrails

- Keep the game single-player and offline.
- Build only the MVP loop.
- Avoid upgrades, meta-progression, backend, multiplayer, and procedural systems.
- Prefer simple scene orchestration and small modules over generic abstractions.
- Prioritize responsive controls and visual clarity over content volume.

## Target MVP outcome

The MVP is complete when the player can:

- start a run
- move the ship smoothly inside the visible screen bounds
- shoot continuously or semi-continuously
- fight enemies that spawn in simple patterns from the right side
- lose lives on collision/damage
- gain score by destroying enemies
- reach a game over screen
- restart into a clean new run

## Proposed file roadmap

```text
src/
  main.ts
  game/
    config/
    scenes/
    entities/
    systems/
    state/
    ui/
    input/
    types/
    utils/
  assets/
```

## Milestone 1: Project foundation and playable shell

### Goal

Replace the current Vite starter UI with the Phaser bootstrap and a minimal playable shell.

### Deliverables

- Add Phaser to the project
- Initialize Phaser in `src/main.ts`
- Create initial `game/` folder structure
- Add `BootScene`, `MenuScene`, and `GameScene`
- Add base config files:
  - `gameConfig.ts`
  - `balance.ts`
  - `assetKeys.ts`
- Add initial session state model
- Show a scrolling background
- Show the player ship
- Allow movement in 4 directions
- Clamp movement to the visible play area
- Show a simple HUD with score and lives placeholders

### Acceptance criteria

- The Vite starter page is gone
- The game boots directly into Phaser
- Scene flow works from boot to menu to game
- The ship moves smoothly and never leaves the screen
- The background scroll communicates forward motion
- HUD renders stable values without visual glitches

### Notes

- No enemies yet
- No damage yet
- No shooting yet unless it comes almost for free

## Milestone 2: Player shooting loop

### Goal

Make the player interact offensively and establish projectile lifecycle rules.

### Deliverables

- Add `PlayerWeapon`
- Add `PlayerBullet`
- Add fire input handling
- Support continuous or semi-continuous shooting
- Remove or recycle bullets when leaving the screen
- Keep cooldown values centralized in `balance.ts`

### Acceptance criteria

- Shooting is responsive and rate-limited correctly
- Bullets spawn from a consistent point on the ship
- Projectile cleanup is reliable
- No obvious frame drops from repeated firing

### Notes

- Prefer simple pooling if bullet count is moderate enough to justify it
- Keep weapon timing logic testable outside the scene

## Milestone 3: Basic enemies and scoring

### Goal

Introduce enemies as targets and connect destruction to score gain.

### Deliverables

- Add `Enemy`
- Add `EnemyFactory`
- Add a first enemy type with straight movement
- Spawn enemies from the right side at fixed intervals
- Add collision handling for player bullets vs enemies
- Destroy enemies on hit or after simple HP depletion
- Increment score on enemy destruction

### Acceptance criteria

- Enemies reliably enter from the right and cross the screen
- Bullet/enemy collisions are consistent
- Destroying enemies updates score immediately
- Off-screen enemies are cleaned up

### Notes

- Start with one enemy type only
- Score values should be data-driven from config, not hardcoded in scene logic

## Milestone 4: Damage, lives, and fail state

### Goal

Turn the prototype into a real lose-able game loop.

### Deliverables

- Add player life reduction
- Add collision handling for player vs enemy
- Add brief hit response logic
- Trigger game over when lives reach zero
- Add `GameOverScene`
- Restart into a clean run with reset score/lives/progression

### Acceptance criteria

- Player damage is applied exactly once per collision event or hit window
- Lives update correctly in the HUD
- Game over always occurs when expected
- Restart does not retain stale enemies, bullets, timers, or score

### Notes

- Keep restart based on fresh scene/session initialization
- Avoid partial manual cleanup when a full reset is simpler

## Milestone 5: Enemy variety and linear progression

### Goal

Make the game feel like a structured stage instead of a flat target range.

### Deliverables

- Add `enemyBehaviors.ts`
- Add a second and possibly third enemy pattern
- Add `waveDefinitions.ts`
- Add `SpawnController`
- Add `progressionSystem.ts`
- Move spawning from fixed intervals to simple wave data

### Acceptance criteria

- Waves occur in a predictable and editable sequence
- At least two enemy behaviors feel visually distinct
- Difficulty increases slightly over time without becoming chaotic
- Wave logic is defined in data, not spread through `GameScene`

### Notes

- Keep progression time-based for MVP
- Do not add branching stage logic

## Milestone 6: Minimal polish pass

### Goal

Improve readability and arcade feel without expanding game scope.

### Deliverables

- Add temporary hit/explosion feedback
- Add temporary sound effects
- Tune movement, speed, spawn intervals, and fire cadence
- Clean up HUD readability
- Remove dead code and obvious duplication

### Acceptance criteria

- The game is readable during active combat
- Feedback for hit, kill, and failure is clear
- Controls feel responsive
- The code structure still matches the planned module boundaries

### Notes

- This is a tuning pass, not a feature pass
- Do not add upgrades, bosses, or new meta-systems here

## Lightweight testing plan

### Unit tests worth adding

- Session creation/reset functions
- Weapon cooldown timing logic
- Clamp helpers for play area bounds
- Enemy behavior math
- Wave progression helpers
- Score and life update rules

### Lightweight integration tests worth adding

- Session reset on restart
- Spawn controller advancing through wave data
- Player weapon respecting fire cadence over time
- Score changing after enemy destruction events
- Game over transition when lives reach zero

### Manual checklist

- Ship control responsiveness
- Visual clarity while moving and shooting
- Enemy readability against the background
- Collision feel and fairness
- Restart cleanliness
- Basic performance during sustained fire and multiple enemies

## Key decisions to preserve

- Use Phaser Arcade Physics
- Keep real gameplay inside `GameScene`
- Keep state serializable and separate from Phaser objects
- Prefer data-driven waves over procedural spawning
- Delay enemy bullets until the rest of the loop feels stable
- Keep HUD simple and textual at first

## Sequencing recommendation

Implementation order should be:

1. Milestone 1
2. Milestone 2
3. Milestone 3
4. Milestone 4
5. Milestone 5
6. Milestone 6

This order gets the game playable early, then adds pressure, then structures progression, and only then spends time on polish.
