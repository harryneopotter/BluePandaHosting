import { test, expect } from '@playwright/test';

test('Dedicated Servers page screenshot', async ({ page }) => {
  await page.goto('http://localhost:3000/hosting/dedicated-servers');
  await expect(page).toHaveTitle(/Dedicated Servers/);
  await page.screenshot({ path: 'jules-scratch/verification/dedicated-servers.png', fullPage: true });
});
