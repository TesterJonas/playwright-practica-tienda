import { Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  async fillInfoAndFinish() {
    await this.page.locator('[data-test="firstName"]').fill('Test');
    await this.page.locator('[data-test="lastName"]').fill('User');
    await this.page.locator('[data-test="postalCode"]').fill('12345');
    await this.page.locator('[data-test="continue"]').click();
    await this.page.locator('[data-test="finish"]').click();
  }

  async getCompleteMessage() {
    return await this.page.locator('.complete-header').textContent();
  }
}
