import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async login(user: string, pass: string) {
    await this.page.goto('/');
    await this.page.getByPlaceholder('Username').fill(user);
    await this.page.getByPlaceholder('Password').fill(pass);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }
}