import { Page, expect } from '@playwright/test';

const LOCKED_OUT_ERROR_MSG = 'Epic sadface: Sorry, this user has been locked out.';
const INVALID_CREDENTIALS_ERROR_MSG = 'Epic sadface: Username and password do not match any user in this service';
const PASSWORD_REQUIRED_ERROR_MSG = 'Epic sadface: Password is required';
const USERNAME_REQUIRED_ERROR_MSG = 'Epic sadface: Username is required';

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

  async expectInvalidCredentialsErrorMessage() {
    await expect(this.page.locator(this.errorMessage)).toBeVisible();
    await expect(this.page.locator(this.errorMessage)).toHaveText(INVALID_CREDENTIALS_ERROR_MSG);
  }

  async expectPasswordRequiredErrorMessage() {
    await expect(this.page.locator(this.errorMessage)).toBeVisible();
    await expect(this.page.locator(this.errorMessage)).toHaveText(PASSWORD_REQUIRED_ERROR_MSG);
  }

  async expectUsernameRequiredErrorMessage() {
    await expect(this.page.locator(this.errorMessage)).toBeVisible();
    await expect(this.page.locator(this.errorMessage)).toHaveText(USERNAME_REQUIRED_ERROR_MSG);
  }

  async expectLoginSuccess() {
    await expect(this.page).toHaveURL('/inventory.html');
  }

  async expectValidationErrors() {
    await expect(this.page.locator(this.usernameInput)).toHaveAttribute('aria-invalid', 'true');
    await expect(this.page.locator(this.passwordInput)).toHaveAttribute('aria-invalid', 'true');
  }
}
