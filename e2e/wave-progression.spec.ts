import { expect, test } from '@playwright/test'

test('game progresses through waves during an active run', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('canvas')).toBeVisible()

  await page.keyboard.press('Enter')

  await expect
    .poll(() => page.evaluate(() => window.__STAR_LANCE_DEBUG__?.scene))
    .toBe('GameScene')

  await expect
    .poll(() => page.evaluate(() => window.__STAR_LANCE_DEBUG__?.progression?.activeWaveIndex ?? -1), {
      timeout: 10_000,
    })
    .toBeGreaterThanOrEqual(1)

  await expect
    .poll(() => page.evaluate(() => window.__STAR_LANCE_DEBUG__?.progression?.activeWaveIndex ?? -1), {
      timeout: 10_000,
    })
    .toBeGreaterThanOrEqual(2)
})

test('restarting a run resets wave progression back to the opening wave', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('canvas')).toBeVisible()

  await page.keyboard.press('Enter')

  await expect
    .poll(() => page.evaluate(() => window.__STAR_LANCE_DEBUG__?.progression?.activeWaveIndex ?? -1), {
      timeout: 10_000,
    })
    .toBeGreaterThanOrEqual(1)

  await page.evaluate(() => {
    window.__STAR_LANCE_DEBUG__?.controls?.triggerPlayerHit?.()
    window.__STAR_LANCE_DEBUG__?.controls?.triggerPlayerHit?.()
    window.__STAR_LANCE_DEBUG__?.controls?.triggerPlayerHit?.()
  })

  await expect
    .poll(() => page.evaluate(() => window.__STAR_LANCE_DEBUG__?.scene))
    .toBe('GameOverScene')

  await page.keyboard.press('Enter')

  await expect
    .poll(() => page.evaluate(() => window.__STAR_LANCE_DEBUG__?.scene))
    .toBe('GameScene')

  await expect
    .poll(() => page.evaluate(() => window.__STAR_LANCE_DEBUG__?.progression?.activeWaveIndex ?? -1))
    .toBe(0)
})
