import { Page } from '@playwright/test';
export class CartPage {
  constructor(private page: Page) {}
  async proceedToCheckout() {
    await this.page.locator('[data-test="checkout"]').click();
  }
}
