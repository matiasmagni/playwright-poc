import { test, expect } from '@playwright/test';
import { InventoryPage } from './pages/InventoryPage';

test.describe('Inventory Test Suite', () => {
  test('Should show products count in shopping cart badge', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
    expect(await inventoryPage.getShoppingCartBadgeCount()).toBe(0);

    for (let i = 0; i < 6; i++) {
      expect(await inventoryPage.getInventoryItem(i)).toBeVisible();
      await (await inventoryPage.getAddToCartButton(i)).click();
      expect(await inventoryPage.getShoppingCartBadgeCount()).toBe(i + 1);
    }
  });
});
