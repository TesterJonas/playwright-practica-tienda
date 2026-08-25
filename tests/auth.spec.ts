import { test, expect } from '@playwright/test';

test.describe('Demoblaze Auth & UI', () => {

  test('login negativo debe mostrar alerta User does not exist', async ({ page }) => {
    await page.goto('https://www.demoblaze.com/index.html');
    await page.locator('#login2').click();
    await page.locator('#loginusername').fill('usuario_que_no_existe_123');
    await page.locator('#loginpassword').fill('wrongpass');
    page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('User does not exist');
      await dialog.accept();
    });
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.waitForTimeout(1000);
  });

test('modales About us y Contact deben abrir y cerrar', async ({ page }) => {
    await page.goto('https://www.demoblaze.com/index.html');
    
    await page.getByRole('link', { name: 'About us' }).click();
    await expect(page.locator('#videoModal')).toBeVisible();
    await page.locator('#videoModal .close').first().click();
    await page.waitForTimeout(500);

    await page.getByRole('link', { name: 'Contact' }).click();
    await expect(page.locator('#exampleModal')).toBeVisible();
    await page.locator('#exampleModal .close').first().click();
  });

});