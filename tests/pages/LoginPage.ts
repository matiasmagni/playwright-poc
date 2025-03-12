import { Page, expect } from '@playwright/test';

const LOCKED_OUT_ERROR_MSG = 'Epic sadface: Sorry, this user has been locked out.';

export class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Selectors
  private usernameInput = '[data-test="username"]';
  private passwordInput = '[data-test="password"]';
  private submitButton = '[data-test="login-button"]';
  private errorMessage = '[data-test="error"]';

  // Actions
  async goto() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.submitButton);
  }

  async expectErrorMessage() {
    await expect(this.page.locator(this.errorMessage)).toBeVisible();
  }

  async expectUserLockedOutErrorMessage() {
    await expect(this.page.locator(this.errorMessage)).toBeVisible();
    await expect(this.page.locator(this.errorMessage)).toHaveText(LOCKED_OUT_ERROR_MSG);
  }

  async expectLoginSuccess() {
    await expect(this.page).toHaveURL('/inventory.html');
  }

  async expectValidationErrors() {
    await expect(this.page.locator(this.usernameInput)).toHaveAttribute('aria-invalid', 'true');
    await expect(this.page.locator(this.passwordInput)).toHaveAttribute('aria-invalid', 'true');
  }
}
