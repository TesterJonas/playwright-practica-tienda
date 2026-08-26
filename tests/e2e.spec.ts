import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

test('usuario puede agregar producto al carrito', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await productsPage.isLoaded();

  await productsPage.addProductToCart('Sauce Labs Backpack');
  const count = await productsPage.getCartCount();
  console.log(`Productos en carrito: ${count}`);
});