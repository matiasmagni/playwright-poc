import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

test.describe('Login Test Suite', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Should login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.expectLoginSuccess();
  });

  test('Should show user locked out error message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('locked_out_user', 'secret_sauce');
    await loginPage.expectUserLockedOutErrorMessage();
  });

  test('Should show error message for invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('standard_user', 'xxxxxx');
    await loginPage.expectInvalidCredentialsErrorMessage();
  });
});
