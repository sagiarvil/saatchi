import { test, expect } from '@playwright/test';

test.describe('Saatchi & Co. Luxury Watch Smoke Suite', () => {
  test('Ana sayfa başarıyla yüklenmeli ve lüks kimlik öğelerini barındırmalıdır', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBeLessThan(400);
    await expect(page).toHaveTitle(/Saatchi/i);
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('Elit saat ve markalar rotaları 404 vermemelidir', async ({ page }) => {
    const responseElit = await page.goto('/elit-saat');
    expect(responseElit?.status()).toBeLessThan(400);

    const responseMarkalar = await page.goto('/markalar');
    expect(responseMarkalar?.status()).toBeLessThan(400);
  });
});
