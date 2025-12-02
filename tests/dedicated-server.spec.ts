import { test, expect } from '@playwright/test';

test('Dedicated Server page scrolling functionality', async ({ page }) => {
  await page.goto('/hosting/dedicated-servers');
  await page.waitForLoadState('networkidle');

  // Click the button for experienced sysadmins and check for scroll
  const sysadminButton = page.locator('button:has-text("For experienced sysadmins")');
  await sysadminButton.waitFor({ state: 'visible', timeout: 15000 });
  await sysadminButton.click();

  const unmanagedPlans = page.locator('#unmanaged-plans');
  await expect(unmanagedPlans).toBeInViewport({ timeout: 5000 });

  // Click the button for businesses without IT staff and check for scroll
  const businessButton = page.locator('button:has-text("For businesses without IT staff")');
  await businessButton.waitFor({ state: 'visible', timeout: 15000 });
  await businessButton.click();

  const managedPlans = page.locator('#managed-plans');
  await expect(managedPlans).toBeInViewport({ timeout: 5000 });
});
