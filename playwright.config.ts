import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  reporter: 'list',
  workers: 1,
  use: {
    baseURL: 'http://127.0.0.1:5175',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1 --port 5175',
    url: 'http://127.0.0.1:5175',
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})
