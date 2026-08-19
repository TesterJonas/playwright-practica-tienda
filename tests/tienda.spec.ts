import { test, expect } from '@playwright/test';

test('la tienda debe cargar y mostrar productos', async ({ page }) => {
  // 1. Entra a la tienda
  await page.goto('https://www.demoblaze.com/');

  // 2. Verifica que el título sea correcto
  await expect(page).toHaveTitle(/STORE/);

  // 3. Verifica que haya productos cargados
  const productos = page.locator('.card-title');
  await expect(productos.first()).toBeVisible();
  
  // 4. Cuenta cuantos productos hay
  console.log(`Hay ${await productos.count()} productos en la tienda`);
});