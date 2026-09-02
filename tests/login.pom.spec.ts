import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('login con POM', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto(); // <--- ESTA LÍNEA TE FALTABA
  //await loginPage.login('standard_user', 'secret_sauce'); <--- antes del .env
  await loginPage.login(process.env.STANDARD_USER!, process.env.PASSWORD!);

  await expect(page.getByText('Products')).toBeVisible();
});
