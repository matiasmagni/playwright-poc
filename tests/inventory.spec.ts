import { test, expect } from '@playwright/test';
import { InventoryPage } from './pages/InventoryPage';

test.describe('Inventory Test Suite', () => {
  test('Should modify products count in shopping cart badge', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
    expect(await inventoryPage.getShoppingCartBadgeCount()).toBe(0);

    // Add products to the cart
    for (let i = 0; i < 6; i++) {
      await (await inventoryPage.getAddToCartButton(i)).click();
    }
    expect(await inventoryPage.getShoppingCartBadgeCount()).toBe(6);

    // Remove products from the cart
    for (let i = 5; i >= 0; i--) {
      await (await inventoryPage.getAddToCartButton(i)).click();
      expect(await inventoryPage.getShoppingCartBadgeCount()).toBe(i);
    }
  });
});
