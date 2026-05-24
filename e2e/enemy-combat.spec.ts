import { expect, test } from '@playwright/test'

test('player can destroy an enemy and gain score', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('canvas')).toBeVisible()

  await page.keyboard.press('Enter')

  await expect
    .poll(() => page.evaluate(() => window.__STAR_LANCE_DEBUG__?.scene))
    .toBe('GameScene')

  await page.keyboard.down('Space')

  await expect
    .poll(() => page.evaluate(() => window.__STAR_LANCE_DEBUG__?.session?.score ?? 0), {
      timeout: 10_000,
    })
    .toBeGreaterThan(0)

  await page.keyboard.up('Space')
})
