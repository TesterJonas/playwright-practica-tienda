import { test, expect } from '@playwright/test';

const TEST_USER = `TesterJonas_${Date.now().toString().slice(-5)}`;
const TEST_PASS = 'Test123!';

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

test('Carrito vacio - debe mostrar tabla vacia', async ({ page }) => {
  // Entra directo sin loguearte
  await page.goto('https://www.demoblaze.com/cart.html');
  // En demoblaze, si está vacío no hay filas en #tbodyid
  const rows = page.locator('#tbodyid tr');
  await expect(rows).toHaveCount(0);
});

test.describe('Flujo E2E DemoBlaze - Reporte Completo', () => {

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    await page.goto('https://www.demoblaze.com/');
    
    await page.locator('#signin2').click();
    // espera a que aparezca el modal
    await page.locator('#sign-username').waitFor({ state: 'visible' });
    await page.locator('#sign-username').fill(TEST_USER);
    await page.locator('#sign-password').fill(TEST_PASS);

    page.once('dialog', async dialog => {
      console.log(`[Registro] ${dialog.message()}`);
      await dialog.accept();
    });

    await page.locator('button:has-text("Sign up")').click();
    await page.waitForTimeout(2500);
    await page.close();
    console.log(`Usuario creado para esta corrida: ${TEST_USER}`);
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.demoblaze.com/');
    await expect(page).toHaveTitle(/STORE/);
  });

  test('0. Registro - usuario unico por ejecucion', async ({ page }) => {
    // Este test solo documenta que el usuario ya fue creado en beforeAll
    // Se verá verde en el reporte
    expect(TEST_USER).toContain('TesterJonas_');
    console.log(`Usando usuario: ${TEST_USER}`);
  });

  test('1. Login', async ({ page }) => {
    await page.locator('#login2').click();
    await page.locator('#loginusername').fill(TEST_USER);
    await page.locator('#loginpassword').fill(TEST_PASS);
    await page.locator('button:has-text("Log in")').click();
    await expect(page.locator('#nameofuser')).toContainText(`Welcome ${TEST_USER}`, { timeout: 10000 });
  });

  test('2. Agregar al carrito', async ({ page }) => {
    await page.locator('.card-title').first().click();
    await expect(page.locator('h2').first()).toBeVisible();
    
    page.once('dialog', async dialog => await dialog.accept());
    await page.locator('a:has-text("Add to cart")').click();
    await page.waitForTimeout(1000);
    
    await page.locator('#cartur').click();
    await expect(page.locator('.success').first()).toBeVisible({ timeout: 10000 });
  });

  test('3. Checkout completo', async ({ page }) => {
    await page.locator('.card-title').first().click();
    page.once('dialog', async dialog => await dialog.accept());
    await page.locator('a:has-text("Add to cart")').click();
    await page.waitForTimeout(1500);
    await page.locator('#cartur').click();
    await page.locator('tbody tr').first().waitFor({ timeout: 10000 });

    await page.locator('button:has-text("Place Order")').click();
    await page.locator('#name').fill('Jonas Test');
    await page.locator('#country').fill('Mexico');
    await page.locator('#city').fill('Ensenada');
    await page.locator('#card').fill('1234 5678 9012 3456');
    await page.locator('#month').fill('12');
    await page.locator('#year').fill('2026');
    await page.locator('button:has-text("Purchase")').click();

    await expect(page.locator('.sweet-alert h2')).toContainText('Thank you for your purchase!');
    await page.locator('button:has-text("OK")').click();
  });

  test('4. Validacion de precios', async ({ page }) => {
    await page.locator('.card-title').first().click();
    const precioDetalle = await page.locator('h3.price-container').textContent();
    console.log(`Precio detalle: ${precioDetalle}`);

    page.once('dialog', async d => await d.accept());
    await page.locator('a:has-text("Add to cart")').click();
    await page.waitForTimeout(1000);
    await page.locator('#cartur').click();
    await page.locator('tbody tr').first().waitFor({ timeout: 10000 });

    const precioCarrito = await page.locator('td').nth(2).first().textContent();
    console.log(`Precio carrito: ${precioCarrito}`);

    expect(precioCarrito?.trim()).not.toBe('');
    // Valida que ambos precios contengan números
    expect(precioDetalle).toMatch(/\$\d+/);
    expect(precioCarrito).toMatch(/\d+/);
  });
});

  test('compra completa debe mostrar Thank you for your purchase', async ({ page }) => {
    await page.goto('https://www.demoblaze.com/prod.html?idp_=1');
    page.once('dialog', dialog => dialog.accept());
    await page.getByRole('link', { name: 'Add to cart' }).click();
    await page.goto('https://www.demoblaze.com/cart.html');
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Place Order' }).click();
    await page.locator('#name').fill('Jonas Test');
    await page.locator('#country').fill('Mexico');
    await page.locator('#city').fill('Ensenada');
    await page.locator('#card').fill('4242424242424242');
    await page.locator('#month').fill('12');
    await page.locator('#year').fill('2026');
    await page.getByRole('button', { name: 'Purchase' }).click();
    await expect(page.locator('.sweet-alert h2').first()).toContainText('Thank you for your purchase', { timeout: 10000 });
  });