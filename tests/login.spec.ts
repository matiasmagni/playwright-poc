import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { InventoryPage } from './pages/InventoryPage';

test.describe('Login Test Suite', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Should login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce');
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.expectNavigatedAndRenderPageCorrectly();
  });

  test('Should show user locked out error message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('locked_out_user', 'secret_sauce');
    await loginPage.expectUserLockedOuterrorMessageLocator();
  });

  test('Should show error message for invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('standard_user', 'xxxxxx');
    await loginPage.expectInvalidCredentialserrorMessageLocator();
  });

  test('Should show password required error message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('standard_user', '');
    await loginPage.expectPasswordRequirederrorMessageLocator();
  });

  test('Should show username required error message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('', 'xxxx');
    await loginPage.expectUsernameRequirederrorMessageLocator();
  });
});
