import { expect, test } from '@playwright/test'

test('player can start a run and fire rate-limited bullets', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('canvas')).toBeVisible()

  await page.keyboard.press('Enter')

  await expect
    .poll(() => page.evaluate(() => window.__STAR_LANCE_DEBUG__?.scene))
    .toBe('GameScene')

  await expect
    .poll(() => page.evaluate(() => window.__STAR_LANCE_DEBUG__?.bulletCount ?? 0))
    .toBe(0)

  await page.keyboard.down('Space')
  await expect
    .poll(() => page.evaluate(() => window.__STAR_LANCE_DEBUG__?.bulletCount ?? 0), {
      timeout: 2_000,
    })
    .toBeGreaterThanOrEqual(2)
  await page.keyboard.up('Space')

  const firedBulletCount = await page.evaluate(() => window.__STAR_LANCE_DEBUG__?.bulletCount ?? 0)
  expect(firedBulletCount).toBeLessThanOrEqual(8)
})
