import { expect, Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  private url = '/cart.html';

  // Selectors
  private cartContentsContainerLocator = '[data-test="cart-contents-container"]';
  private cartListLocator = '[data-test="cart-list"]';
  private cartQuantityLabelLocator = '[data-test="cart-quantity-label"]';
  private cartDescLabelLocator = '[data-test="cart-desc-label"]';
  private cartItemLocator = '[data-test="inventory-item"]';
  private itemQuantityLocator = '[data-test="item-quantity"]';
  private itemNameLocator = '[data-test="inventory-item-name"]';
  private itemDescriptionLocator = '[data-test="inventory-item-desc"]';
  private itemPriceLocator = '[data-test="inventory-item-price"]';
  private removeButtonLocator = '.cart_button';
  private continueShoppingButtonLocator = '[data-test="continue-shopping"]';
  private checkoutButtonLocator = '[data-test="checkout"]';

  constructor(page: Page) {
    this.page = page;
  }

  getUrl(): string {
    return this.url;
  }

  // Locators
  get cartContentsContainer(): Locator {
    return this.page.locator(this.cartContentsContainerLocator);
  }

  get cartList(): Locator {
    return this.page.locator(this.cartListLocator);
  }

  get cartQuantityLabel(): Locator {
    return this.page.locator(this.cartQuantityLabelLocator);
  }

  get cartDescLabel(): Locator {
    return this.page.locator(this.cartDescLabelLocator);
  }

  get cartItems(): Locator {
    return this.page.locator(this.cartItemLocator);
  }

  get continueShoppingButton(): Locator {
    return this.page.locator(this.continueShoppingButtonLocator);
  }

  get checkoutButton(): Locator {
    return this.page.locator(this.checkoutButtonLocator);
  }

  // Actions
  async goto() {
    await this.page.goto(this.url);
  }

  async expectCartPageLoaded() {
    await expect(this.page).toHaveURL(this.getUrl());
    await expect(this.cartContentsContainer).toBeVisible();
  }

  async getCartItemQuantity(index: number): Promise<Locator> {
    return this.cartItems.nth(index).locator(this.itemQuantityLocator);
  }

  async getCartItemName(index: number): Promise<Locator> {
    return this.cartItems.nth(index).locator(this.itemNameLocator);
  }

  async getCartItemDescription(index: number): Promise<Locator> {
    return this.cartItems.nth(index).locator(this.itemDescriptionLocator);
  }

  async getCartItemPrice(index: number): Promise<Locator> {
    return this.cartItems.nth(index).locator(this.itemPriceLocator);
  }

  async getRemoveButton(index: number): Promise<Locator> {
    return this.cartItems.nth(index).locator(this.removeButtonLocator);
  }

  async removeItemFromCart(index: number) {
    await (await this.getRemoveButton(index)).click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async getCartItemsCount(): Promise<number> {
    return await this.cartItems.count();
  }

  // Actions
  async clickCheckoutButton() {
    await this.checkoutButton.click();
  }
}