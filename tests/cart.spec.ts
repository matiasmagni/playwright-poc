import { test, expect } from '@playwright/test';
import { InventoryPage } from './pages/InventoryPage';
import { CartPage } from './pages/CartPage';
import { CheckoutStepOnePage } from './pages/CheckoutStepOnePage';

test.describe('Cart Test Suite', () => {
  const EXPECTED_ITEMS_COUNT = 3;

  test('Should buy added items to the shopping cart list', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();

    for (let i = 0; i < EXPECTED_ITEMS_COUNT; i++) {
      await (await inventoryPage.getAddToCartButton(i)).click();
    }

    await inventoryPage.clickShoppingCartButton();
    const cartPage = new CartPage(page);
    await cartPage.expectCartPageLoaded();
    expect(await cartPage.getCartItemsCount()).toBe(EXPECTED_ITEMS_COUNT);
    await cartPage.clickCheckoutButton();
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    await checkoutStepOnePage.expectPageLoaded();
    // TODO: finish checkout workflow
  });
});