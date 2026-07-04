import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './src/__tests__/e2e',
  timeout: 60_000,
  retries: 2,
  ...(process.env.CI ? { workers: 1 } : {}),
  reporter: 'list',

  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // In CI, serve the actual production build (matches what gets deployed, and
  // avoids the dev-only toolbar/HMR overhead). Locally, use the dev server
  // for live-reload while iterating on content/components.
  webServer: {
    command: process.env.CI ? 'npm run preview -- --port 4321' : 'npm run dev -- --port 4321',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
