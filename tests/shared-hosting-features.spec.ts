import { test, expect } from '@playwright/test';

test('Shared Hosting page should display the technical features section', async ({ page }) => {
  await page.goto('/hosting/shared-hosting');

  const featuresSection = page.locator('h2:has-text("Our Technology Stack")');
  await expect(featuresSection).toBeVisible();

  const liteSpeedFeature = page.locator('h3:has-text("LiteSpeed Web Server")');
  await expect(liteSpeedFeature).toBeVisible();
});
