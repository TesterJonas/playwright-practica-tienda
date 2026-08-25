import { test, expect } from '@playwright/test';

test('debe contar todos los productos de todas las paginas', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/');
  
  let totalProductos = 0;
  const nextButton = page.locator('#next2');
  const productos = page.locator('.card-title');

  while (true) {
    await expect(productos.first()).toBeVisible();
    const countEnPagina = await productos.count();
    totalProductos += countEnPagina;
    
    // Si el botón Next ya no está visible/habilitado, se acabó
    if (!await nextButton.isVisible()) break;

    // Guarda cuantos habia antes para saber que cambió de página
    const primerProductoAntes = await productos.first().textContent();
    
    await nextButton.click();
    // Espera a que cambie el primer producto
    await expect(productos.first()).not.toHaveText(primerProductoAntes as string);
  }

  console.log(`Total real en la tienda: ${totalProductos}`);
  expect(totalProductos).toBeGreaterThan(9);
});