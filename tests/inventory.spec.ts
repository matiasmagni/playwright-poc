import { test, expect } from '@playwright/test';
import { InventoryPage } from './pages/InventoryPage';

test.describe('Inventory Test Suite', () => {
  test('Inventory 1', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
    expect(await inventoryPage.getInventoryItem(1)).toBeVisible();
  });
});
