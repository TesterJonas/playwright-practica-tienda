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
    if (!(await nextButton.isVisible())) break;

    // Guarda cuantos habia antes para saber que cambió de página
    const primerProductoAntes = await productos.first().textContent();

    await nextButton.click();
    // Espera a que cambie el primer producto
    await expect(productos.first()).not.toHaveText(primerProductoAntes as string);
  }

  //console.log(`Total real en la tienda: ${totalProductos}`);
  expect(totalProductos).toBeGreaterThan(9);
});

test('filtrado por categoria Laptops debe mostrar productos', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Laptops' }).click();
  await expect(page.locator('#tbodyid').first()).toBeVisible({ timeout: 10000 });
  const titles = page.locator('#tbodyid h4 a');
  await expect(titles.first()).toBeVisible();
  expect(await titles.count()).toBeGreaterThan(0);
});

test.describe('Categories & Carousel', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.demoblaze.com/');
  });

  test('should filter by Phones category', async ({ page }) => {
    await page.getByRole('link', { name: 'Phones' }).click();
    await page.waitForTimeout(1000); // la tienda tarda en filtrar
    const cards = page.locator('#tbodyid .card-title');
    await expect(cards.first()).toBeVisible();
    // todos deben ser phones, validamos que al menos 3 cargaron
    await expect(cards).toHaveCount(7); // demoblaze tiene 7 phones
  });

  test('should filter by Laptops category', async ({ page }) => {
    await page.getByRole('link', { name: 'Laptops' }).click();
    await page.waitForTimeout(1000);
    await expect(page.locator('#tbodyid .card-title').first()).toBeVisible();
    await expect(page.locator('#tbodyid')).toContainText('Sony vaio');
  });

  test('carousel next/prev should work', async ({ page }) => {
    const firstSlide = page.locator('.carousel-item').first();
    await expect(firstSlide).toBeVisible();

    await page.locator('.carousel-control-next').click();
    await page.waitForTimeout(600); // animación
    await page.locator('.carousel-control-prev').click();
    await page.waitForTimeout(600);

    await expect(firstSlide).toBeVisible();
  });
});
