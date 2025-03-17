import { Page, expect } from '@playwright/test';

export class CheckoutStepTwoPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Selectors
  private checkoutSummaryContainerLocator = '[data-test="checkout-summary-container"]';
  private finishButtonLocator = '[data-test="finish"]';
  private cancelButtonLocator = '[data-test="cancel"]';
  private totalPriceLocator = '[data-test="total-label"]';
  private taxLocator = '[data-test="tax-label"]';
  private subtotalLocator = '[data-test="subtotal-label"]';
  private itemPriceLocator = '[data-test="inventory-item-price"]';

  // Getters
  private getUrl() {
    return '/checkout-step-two.html';
  }

  // Actions
  async goto() {
    await this.page.goto(this.getUrl());
  }

  async clickFinish() {
    await this.page.click(this.finishButtonLocator);
  }

  async clickCancel() {
    await this.page.click(this.cancelButtonLocator);
  }

  async expectPageLoaded() {
    await expect(this.page).toHaveURL(this.getUrl());
    await expect(this.page.locator(this.checkoutSummaryContainerLocator)).toBeVisible();
  }

  async expectTotalToBe(expectedTotal: string) {
    await expect(this.page.locator(this.totalPriceLocator)).toHaveText(new RegExp(`\\$?${expectedTotal}\\b`));
  }

  async expectSubtotalToBe(expectedSubtotal: string) {
    await expect(this.page.locator(this.subtotalLocator)).toHaveText(new RegExp(`\\$?${expectedSubtotal}\\b`));
  }

  async expectTaxToBe(expectedTax: string) {
    await expect(this.page.locator(this.taxLocator)).toHaveText(new RegExp(`\\$?${expectedTax}\\b`));
  }

  async calculateActualSubtotal(): Promise<number> {
    const prices = await this.page.locator(this.itemPriceLocator).allTextContents();
    const numericPrices = prices.map(price => parseFloat(price.replace('$', '')));
    return numericPrices.reduce((sum, price) => sum + price, 0);
  }

  async calculateTaxes(): Promise<number> {
    const subtotal = await this.calculateActualSubtotal();
    return Math.round(subtotal * 0.08 * 100) / 100;
  }

  async calculateTotal(): Promise<number> {
    const subtotal = await this.calculateActualSubtotal();
    const taxes = await this.calculateTaxes();
    return Math.round((subtotal + taxes) * 100) / 100;
  }
}
