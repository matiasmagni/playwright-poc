import { Page, expect } from '@playwright/test';

export class CheckoutStepOnePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Selectors
  private firstNameInputLocator = '[data-test="firstName"]';
  private lastNameInputLocator = '[data-test="lastName"]';
  private postalCodeInputLocator = '[data-test="postalCode"]';
  private cancelButtonLocator = '[data-test="cancel"]';
  private continueButtonLocator = '[data-test="continue"]';
  private errorMessageContainerLocator = '.error-message-container';
  private checkoutInfoContainerLocator = '[data-test="checkout-info-container"]';

  // Getters
  private getUrl() {
    return '/checkout-step-one.html';
  }

  // Actions
  async goto() {
    await this.page.goto('/checkout-step-one');
  }

  async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string) {
    await this.page.fill(this.firstNameInputLocator, firstName);
    await this.page.fill(this.lastNameInputLocator, lastName);
    await this.page.fill(this.postalCodeInputLocator, postalCode);
  }

  async clickCancel() {
    await this.page.click(this.cancelButtonLocator);
  }

  async clickContinue() {
    await this.page.click(this.continueButtonLocator);
  }

  async expectErrorMessageToBeVisible() {
    await expect(this.page.locator(this.errorMessageContainerLocator)).toBeVisible();
  }

  async expectErrorMessageToContainText(expectedText: string) {
    await expect(this.page.locator(this.errorMessageContainerLocator)).toContainText(expectedText);
  }

  async expectValidationErrors() {
    await expect(this.page.locator(this.firstNameInputLocator)).toHaveClass(/input_error/);
    await expect(this.page.locator(this.lastNameInputLocator)).toHaveClass(/input_error/);
    await expect(this.page.locator(this.postalCodeInputLocator)).toHaveClass(/input_error/);
  }

  async expectPageLoaded() {
    await expect(this.page).toHaveURL(this.getUrl());
    await expect(this.page.locator(this.checkoutInfoContainerLocator)).toBeVisible();
  }
}
