import { test, expect } from '@playwright/test';

test('Cloud Hosting page screenshot', async ({ page }) => {
  await page.goto('http://localhost:3000/hosting/cloud-hosting');
  await expect(page).toHaveTitle(/Cloud Hosting/);
  await page.screenshot({ path: 'jules-scratch/verification/cloud-hosting.png', fullPage: true });
});
