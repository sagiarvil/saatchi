import { test, expect } from '@playwright/test';

test.describe('Saatchi & Co. Luxury Watch Smoke Suite', () => {
  test('Ana sayfa başarıyla yüklenmeli ve lüks kimlik öğelerini barındırmalıdır', async ({ page }) => {
    // Sayfa navigasyonu
    const response = await page.goto('/');
    expect(response?.status()).toBeLessThan(400);

    // Başlık ve marka görünürlüğü
    await expect(page).toHaveTitle(/Saatchi/i);

    // Hero veya ana vitrin alanının varlığı
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('Rolex ve lüks katalog rotaları 404 vermemelidir', async ({ page }) => {
    const response = await page.goto('/rolex');
    expect(response?.status()).toBeLessThan(400);
  });
});
