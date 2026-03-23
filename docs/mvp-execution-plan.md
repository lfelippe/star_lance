# MVP Execution Plan

## Status

- Milestone 1 is implemented
- Current branch used for implementation: `feature/phaser-milestone-1`
- Implemented foundation:
  - Phaser bootstrap replaced the Vite starter UI
  - `BootScene`, `MenuScene`, `GameScene`, and a `GameOverScene` placeholder were added
  - temporary runtime-generated textures were added for the player ship and scrolling background
  - player movement, HUD, and initial session state are in place

## Why this file exists

This file is the execution plan for the Phaser 2D side-scrolling shooter MVP.

## Scope guardrails

- Keep the game single-player and offline.
- Build only the MVP loop.
- Avoid upgrades, meta-progression, backend, multiplayer, and procedural systems.
- Prefer simple scene orchestration and small modules over generic abstractions.
- Prioritize responsive controls and visual clarity over content volume.
- Every milestone must ship with automated test coverage.
- Prefer unit tests for isolated logic and end-to-end tests for player-visible flows.
- Do not treat test coverage as a polish task deferred to the end of the MVP.

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

### Status

Completed

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
- Add unit tests for weapon timing and an end-to-end firing smoke test in the same milestone

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
- Add unit tests for score and spawn helpers plus an end-to-end combat loop test

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
- Add unit tests for damage/life rules plus an end-to-end game-over-and-restart test

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
- Add unit tests for progression helpers plus an end-to-end wave progression test

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
- Extend end-to-end coverage to the full MVP loop before calling the project complete

## Testing blueprint

### Required testing rule

- Every milestone must add or update unit tests for the logic introduced in that milestone.
- Every milestone must add or update at least one end-to-end test that exercises the player-visible behavior introduced in that milestone.
- A milestone is not complete until its unit tests and end-to-end tests pass in CI or the local verification workflow.

### Unit test expectations

- Session creation/reset functions
- Weapon cooldown timing logic
- Clamp helpers for play area bounds
- Enemy behavior math
- Wave progression helpers
- Score and life update rules

### End-to-end test expectations

- Session reset on restart
- Player weapon respecting fire cadence over time
- Enemy spawning and score gain during combat
- Score changing after enemy destruction events
- Game over transition when lives reach zero
- Full run start-to-restart smoke coverage once the MVP loop exists

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
