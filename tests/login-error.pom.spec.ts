import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('login con usuario bloqueado debe mostrar error', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(process.env.LOCKED_USER!, process.env.PASSWORD!);

  const error = await loginPage.getErrorMessage();
  expect(error).toContain('locked out');
});
