import { test, expect } from '@playwright/test';
import { InventoryPage } from './pages/InventoryPage';
import { CartPage } from './pages/CartPage';
import { CheckoutStepOnePage } from './pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from './pages/CheckoutStepTwoPage';
import { CheckoutCompletePage } from './pages/CheckoutCompletePage';

test.describe('Cart Test Suite', () => {
  test('Should buy added items to the shopping cart list', async ({ page }) => {
    const INFO_NAME = 'Matías';
    const INFO_LASTNAME = 'Magni';
    const INFO_ZIP_CODE = '5500';
    const EXPECTED_ITEMS_COUNT = 3;
    const EXPECTED_COMPLETE_CHECKOUT_HEADER_MSG = 'Thank you for your order!';
    const EXPECTED_COMPLETE_CHECKOUT_MSG = 'Your order has been dispatched, and will arrive just as fast as the pony can get there!';

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
    await checkoutStepOnePage.fillCheckoutInfo(INFO_NAME, INFO_LASTNAME, INFO_ZIP_CODE);
    await checkoutStepOnePage.clickContinue();
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    const actualSubtotal: string = (await checkoutStepTwoPage.calculateActualSubtotal()).toString();
    const actualTaxes: string = (await checkoutStepTwoPage.calculateTaxes()).toString();
    const actualTotal: string = (await checkoutStepTwoPage.calculateTotal()).toString();
    await checkoutStepTwoPage.expectSubtotalToBe(actualSubtotal);
    await checkoutStepTwoPage.expectTaxToBe(actualTaxes);
    await checkoutStepTwoPage.expectTotalToBe(actualTotal);
    await checkoutStepTwoPage.clickFinish();
    const checkoutComplete = new CheckoutCompletePage(page);
    await checkoutComplete.expectPageLoaded();
    await checkoutComplete.expectConfirmationMessageToBeVisible();
    await checkoutComplete.expectConfirmationHeaderMessageToContainText(EXPECTED_COMPLETE_CHECKOUT_HEADER_MSG);
    await checkoutComplete.expectConfirmationMessageToContainText(EXPECTED_COMPLETE_CHECKOUT_MSG);
    await checkoutComplete.clickBackHomeButton();
    await inventoryPage.expectPageLoaded();
  });
});