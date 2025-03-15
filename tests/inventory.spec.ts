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
    expect(await inventoryPage.getShoppingCartBadgeCount()).toBe(6);

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
    const displayedNames = productItems.slice(0, 6);
    const sortedNames = [...displayedNames].sort((a, b) => b.localeCompare(a));
    expect(displayedNames).toEqual(sortedNames);
  });
});