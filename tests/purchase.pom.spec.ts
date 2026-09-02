import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test('compra completa con POM', async ({ page }) => {
  const login = new LoginPage(page);
  const products = new ProductsPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await login.goto();
  await login.login(process.env.STANDARD_USER!, process.env.PASSWORD!);
  
  await products.addFirstProductToCart();
  await products.goToCart();
  
  await cart.proceedToCheckout();
  await checkout.fillInfoAndFinish();

  await expect(await checkout.getCompleteMessage()).toContain('Thank you');
});