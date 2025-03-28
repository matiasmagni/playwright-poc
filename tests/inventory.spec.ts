import { test, expect } from '@playwright/test';
import { InventoryPage, ProductSortOption } from './pages/InventoryPage';

test.describe('Inventory Test Suite', () => {

  const MAX_ITEMS = 6;

  test('Should modify products count in shopping cart badge', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
    expect(await inventoryPage.getShoppingCartBadgeCount()).toBe(0);

    // Add products to the cart
    for (let i = 0; i < MAX_ITEMS; i++) {
      await (await inventoryPage.getAddToCartButton(i)).click();
    }
    expect(await inventoryPage.getShoppingCartBadgeCount()).toBe(MAX_ITEMS);

    // Remove products from the cart
    for (let i = MAX_ITEMS - 1; i >= 0; i--) {
      await (await inventoryPage.getAddToCartButton(i)).click();
      expect(await inventoryPage.getShoppingCartBadgeCount()).toBe(i);
    }
  });

  test('Should sort products by name (A to Z) by default', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
    expect(await inventoryPage.getProductSortDropdownValue()).toBe('az');
    const productItems = await inventoryPage.getAllInventoryItemNamesDisplayed();
    expect(productItems.length).toBe(MAX_ITEMS);
    // Verify sorting order (A to Z)
    const sortedProducts = [...productItems].sort();
    expect(productItems).toEqual(sortedProducts);
  });

  test('Should sort products by name (Z to A)', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
    await inventoryPage.setProductSortDropdownValue(ProductSortOption.NameZA);
    const productItems = await inventoryPage.getAllInventoryItemNamesDisplayed();
    const displayedNames = productItems.slice(0, MAX_ITEMS);
    const sortedNames = [...displayedNames].sort((a, b) => b.localeCompare(a));
    expect(displayedNames).toEqual(sortedNames);
  });

  test('Should sort products by price (low to high)', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
    await inventoryPage.setProductSortDropdownValue(ProductSortOption.PriceLowHigh);
    const productItems = await (await inventoryPage.getAllInventoryItemsDisplayed()).allTextContents();

    const prices = productItems.map((price: string) => {
      // Find numbers with decimals
      const match = price.match(/\d+\.\d+/);
      return match ? parseFloat(match[0]) : 0;
    });

    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);
  });

  test('Should sort products by price (high to low)', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
    await inventoryPage.setProductSortDropdownValue(ProductSortOption.PriceHighLow);
    const productItems = await (await inventoryPage.getAllInventoryItemsDisplayed()).allTextContents();
    
    const prices = productItems.map((price: string) => {
      // Find numbers with decimals
      const match = price.match(/\d+\.\d+/);
      return match ? parseFloat(match[0]) : 0;
    });

    const sortedPrices = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sortedPrices);
  });
});