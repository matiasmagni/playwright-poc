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
  private loginContainerLocator = '[data-test="login-container"]';
  private usernameInputLocator = '[data-test="username"]';
  private passwordInputLocator = '[data-test="password"]';
  private submitButtonLocator = '[data-test="login-button"]';
  private errorMessageLocator = '[data-test="error"]';

  // Getters
  async getUrl() {
    return '/';
  }

  // Actions
  async goto() {
    await this.page.goto(await this.getUrl());
  }

  async login(username: string, password: string) {
    await this.page.fill(this.usernameInputLocator, username);
    await this.page.fill(this.passwordInputLocator, password);
    await this.page.click(this.submitButtonLocator);
  }

  async expectPageLoaded() {
    await expect(this.page).toHaveURL(await this.getUrl());
    await expect(this.page.locator(this.loginContainerLocator)).toBeVisible();
  }

  async expecterrorMessageLocator() {
    await expect(this.page.locator(this.errorMessageLocator)).toBeVisible();
  }

  async expectUserLockedOuterrorMessageLocator() {
    await expect(this.page.locator(this.errorMessageLocator)).toBeVisible();
    await expect(this.page.locator(this.errorMessageLocator)).toHaveText(LOCKED_OUT_ERROR_MSG);
  }

  async expectInvalidCredentialserrorMessageLocator() {
    await expect(this.page.locator(this.errorMessageLocator)).toBeVisible();
    await expect(this.page.locator(this.errorMessageLocator)).toHaveText(INVALID_CREDENTIALS_ERROR_MSG);
  }

  async expectPasswordRequirederrorMessageLocator() {
    await expect(this.page.locator(this.errorMessageLocator)).toBeVisible();
    await expect(this.page.locator(this.errorMessageLocator)).toHaveText(PASSWORD_REQUIRED_ERROR_MSG);
  }

  async expectUsernameRequirederrorMessageLocator() {
    await expect(this.page.locator(this.errorMessageLocator)).toBeVisible();
    await expect(this.page.locator(this.errorMessageLocator)).toHaveText(USERNAME_REQUIRED_ERROR_MSG);
  }

  async expectValidationErrors() {
    await expect(this.page.locator(this.usernameInputLocator)).toHaveAttribute('aria-invalid', 'true');
    await expect(this.page.locator(this.passwordInputLocator)).toHaveAttribute('aria-invalid', 'true');
  }
}
