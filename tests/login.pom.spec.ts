import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('login con POM', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page.getByText('Products')).toBeVisible();
});