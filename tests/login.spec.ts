import { test, expect } from '@playwright/test';
import { beforeEach, describe } from 'node:test';

test.describe('Login Test Suite', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/'); // Ensure each test starts on the login page
  });

  test('Should login with valid credentials', async ({ page }) => {
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    await expect(page).toHaveURL('/inventory.html'); // Ensure it redirects after login
  });
});
