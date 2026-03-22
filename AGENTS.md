# Git workflow rules

## Branching

- Always work on a feature branch, never directly on main
- If no branch exists, create one using:
  - feature/<short-description>
- Keep branch names simple and descriptive

Examples:
- feature/player-movement
- feature/enemy-spawning

## Commits

- Create small and atomic commits
- Commit only related changes
- Do not commit everything blindly

## Commit messages

Use Conventional Commits:

- feat: new feature
- fix: bug fix
- refactor: code change without behavior change
- test: tests
- chore: maintenance

Examples:
- feat: add player movement
- fix: prevent enemy spawning outside screen

## Before committing

- Show which files were changed
- Explain briefly what was done
- Do not commit without confirmation

## Push

- Push changes to the current feature branch only
- Never push directly to main
- Ask for confirmation before pushing

## Merge

- Never merge into main
- Never delete branches
- Leave merge decisions to the user