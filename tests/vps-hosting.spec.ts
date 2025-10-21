import { test, expect } from '@playwright/test';

test('VPS Hosting page scrolling functionality', async ({ page }) => {
  await page.goto('/hosting/vps-hosting');
  await page.waitForLoadState('networkidle');

  const sysadminButton = page.locator('button:has-text("For experienced sysadmins")');
  await sysadminButton.waitFor({ state: 'visible', timeout: 15000 });
  await sysadminButton.click();

  await page.waitForTimeout(2000); // Wait for smooth scroll to finish
  const unmanagedPlans = page.locator('#unmanaged-plans');
  await expect(unmanagedPlans).toBeInViewport();

  const businessButton = page.locator('button:has-text("For businesses without IT staff")');
  await businessButton.waitFor({ state: 'visible', timeout: 15000 });
  await businessButton.click();

  await page.waitForTimeout(2000); // Wait for smooth scroll to finish
  const managedPlans = page.locator('#managed-plans');
  await expect(managedPlans).toBeInViewport();

  await page.screenshot({ path: 'tests/screenshots/vps-hosting-scrolled.png', fullPage: true });
});
