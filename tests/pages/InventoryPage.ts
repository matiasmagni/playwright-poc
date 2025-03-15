import { expect, Locator, Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  private url = '/inventory.html';

  // Selectors
  private menuButtonLocator = '#react-burger-menu-btn';
  private inventoryContainerLocator = '[data-test="inventory-container"]';
  private inventorySidebarLinkLocator = '#inventory_sidebar_link';
  private aboutSidebarLinkLocator = '#about_sidebar_link';
  private logoutSidebarLinkLocator = '#logout_sidebar_link';
  private resetSidebarLinkLocator = '#reset_sidebar_link';
  private closeMenuButtonLocator = '#react-burger-cross-btn';
  private shoppingCartLinkLocator = '[data-test="shopping_cart_link"]';
  private shoppingCartBadgeLocator = '[data-test="shopping-cart-badge"]';
  private productSortContainerLocator = '[data-test="product-sort-container"]';
  private activeOptionLocator = '.active_option';
  private inventoryItemLocator = '.inventory_item';
  private footerLocator = '.footer';
  private twitterLinkLocator = '[data-test="social-twitter"]';
  private facebookLinkLocator = '[data-test="social-facebook"]';
  private linkedinLinkLocator = '[data-test="social-linkedin"]';
  private footerCopyLocator = '[data-test="footer-copy"]';
  private inventoryItemNameLocator = '.inventory_item_name';
  private inventoryItemPriceLocator = '.inventory_item_price';
  private addToCartButtonLocator = '.btn_inventory';
  private inventoryItemImageLinkLocator = '.inventory_item_img a';
  private inventoryItemTitleLinkLocator = '.inventory_item_label a';
  private inventoryItemDescriptionLocator = '.inventory_item_desc';
  private inventoryItemImageLocator = '.inventory_item_img img';

  constructor(page: Page) {
    this.page = page;
  }

  getUrl(): string {
    return this.url;
  }

  // Locators
  get menuButton(): Locator {
    return this.page.locator(this.menuButtonLocator);
  }

  get inventoryContainer(): Locator {
    return this.page.locator(this.inventoryContainerLocator);
  }

  get inventorySidebarLink(): Locator {
    return this.page.locator(this.inventorySidebarLinkLocator);
  }

  get aboutSidebarLink(): Locator {
    return this.page.locator(this.aboutSidebarLinkLocator);
  }

  get logoutSidebarLink(): Locator {
    return this.page.locator(this.logoutSidebarLinkLocator);
  }

  get resetSidebarLink(): Locator {
    return this.page.locator(this.resetSidebarLinkLocator);
  }

  get closeMenuButton(): Locator {
    return this.page.locator(this.closeMenuButtonLocator);
  }

  get shoppingCartLink(): Locator {
    return this.page.locator(this.shoppingCartLinkLocator);
  }

  get productSortContainer(): Locator {
    return this.page.locator(this.productSortContainerLocator);
  }

  get activeOption(): Locator {
    return this.page.locator(this.activeOptionLocator);
  }

  get inventoryItems(): Locator {
    return this.page.locator(this.inventoryItemLocator);
  }

  get footer(): Locator {
    return this.page.locator(this.footerLocator);
  }

  get twitterLink(): Locator {
    return this.page.locator(this.twitterLinkLocator);
  }

  get facebookLink(): Locator {
    return this.page.locator(this.facebookLinkLocator);
  }

  get linkedinLink(): Locator {
    return this.page.locator(this.linkedinLinkLocator);
  }

  get footerCopy(): Locator {
    return this.page.locator(this.footerCopyLocator);
  }

  async getShoppingCartLink(): Promise<Locator> {
    return this.page.locator(this.shoppingCartLinkLocator);
  }

  async getShoppingCartBadgeCount(): Promise<number> {
    const badge = this.page.locator(this.shoppingCartBadgeLocator);
  
    if (!(await badge.isVisible())) {
      return 0;
    }

    return parseInt(await badge.innerText());
  }

  async getAllInventoryItemNamesDisplayed(): Promise<Array<string>> {
    return this.page.locator(this.inventoryItemNameLocator).allTextContents();
  }

  async getProductSortDropdownValue(): Promise<string> {
    return this.page.locator(this.productSortContainerLocator).inputValue();
  }

  async getInventoryItemName(index: number): Promise<Locator> {
    return this.inventoryItems.nth(index).locator(this.inventoryItemNameLocator);
  }

  async getInventoryItemPrice(index: number): Promise<Locator> {
    return this.inventoryItems.nth(index).locator(this.inventoryItemPriceLocator);
  }

  async getAddToCartButton(index: number): Promise<Locator> {
    return this.inventoryItems.nth(index).locator(this.addToCartButtonLocator);
  }

  async getInventoryItemImageLink(index: number): Promise<Locator> {
    return this.inventoryItems.nth(index).locator(this.inventoryItemImageLinkLocator);
  }

  async getInventoryItemTitleLink(index: number): Promise<Locator> {
    return this.inventoryItems.nth(index).locator(this.inventoryItemTitleLinkLocator);
  }

  async getInventoryItemDescription(index: number): Promise<Locator> {
    return this.inventoryItems.nth(index).locator(this.inventoryItemDescriptionLocator);
  }

  async getInventoryItemImage(index: number): Promise<Locator> {
    return this.inventoryItems.nth(index).locator(this.inventoryItemImageLocator);
  }

  // Actions
  async goto() {
    await this.page.goto(this.url);
  }

  async openMenu() {
    await this.menuButton.click();
  }

  async closeMenu() {
    await this.closeMenuButton.click();
  }

  async selectSortOption(option: string) {
    await this.productSortContainer.selectOption(option);
  }

  async getInventoryItem(index: number): Promise<Locator> {
    return this.inventoryItems.nth(index);
  }

  async expectNavigatedAndRenderPageCorrectly() {
    await expect(this.page).toHaveURL(this.getUrl());
    await expect(this.inventoryContainer).toBeVisible();
  }
}
