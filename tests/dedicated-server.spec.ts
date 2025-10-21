import { test, expect } from '@playwright/test';

test('Dedicated Server page scrolling functionality', async ({ page }) => {
  await page.goto('/hosting/dedicated-servers');

  // Click the button for experienced sysadmins and check for scroll
  await page.click('button:has-text("For experienced sysadmins")');
  await page.waitForTimeout(2000); // Wait for smooth scroll to finish
  const unmanagedPlans = page.locator('#unmanaged-plans');
  await expect(unmanagedPlans).toBeInViewport();

  // Click the button for businesses without IT staff and check for scroll
  await page.click('button:has-text("For businesses without IT staff")');
  await page.waitForTimeout(2000); // Wait for smooth scroll to finish
  const managedPlans = page.locator('#managed-plans');
  await expect(managedPlans).toBeInViewport();
});
