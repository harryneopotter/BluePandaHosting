import { test, expect } from '@playwright/test';

test('Features page screenshot', async ({ page }) => {
  await page.goto('http://localhost:3000/features');
  await expect(page).toHaveTitle(/Features/);
  await page.screenshot({ path: 'jules-scratch/verification/features.png', fullPage: true });
});
