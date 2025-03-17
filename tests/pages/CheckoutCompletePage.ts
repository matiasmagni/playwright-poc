import { Page, expect } from '@playwright/test';

export class CheckoutCompletePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Selectors
  private summaryContainerLocator = '[data-test="checkout-complete-container"]';
  private backHomeButtonLocator = '[data-test="back-to-products"]';
  private confirmationHeaderMessageLocator = '[data-test="complete-header"]';
  private confirmationMessageLocator = '[data-test="complete-text"]';

  // Getters
  private getUrl() {
    return '/checkout-complete.html';
  }

  // Actions
  async goto() {
    await this.page.goto('/checkout-step-two');
  }

  async clickBackHomeButton() {
    await this.page.click(this.backHomeButtonLocator);
  }

  async expectPageLoaded() {
    await expect(this.page).toHaveURL(this.getUrl());
    await expect(this.page.locator(this.summaryContainerLocator)).toBeVisible();
  }

  async expectConfirmationMessageToBeVisible() {
    await expect(this.page.locator(this.confirmationMessageLocator)).toBeVisible();
  }

  async expectConfirmationHeaderMessageToContainText(expectedText: string) {
    await expect(this.page.locator(this.confirmationHeaderMessageLocator)).toContainText(expectedText);
  }

  async expectConfirmationMessageToContainText(expectedText: string) {
    await expect(this.page.locator(this.confirmationMessageLocator)).toContainText(expectedText);
  }
}
