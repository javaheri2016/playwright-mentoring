import { test, expect } from '@playwright/test';

test('sprawdza tytuł strony javaheri.pl', async ({ page }) => {
  await page.goto('https://javaheri.pl/');
  await expect(page).toHaveTitle('Katarzyna Javaheri-Szpak / QA Engineer – QA / TestOps / Python / Test Management');
});

test('sprawdza istnienie logo (klasa)', async ({ page }) => {
  await page.goto('https://javaheri.pl/');
  const logo = page.locator('img[alt="Katarzyna Javaheri-Szpak / QA Engineer"]');
  await expect(logo).toHaveClass(/custom-logo/);
});


test('sprawdza istnienie logo (widocznosc)', async ({ page }) => {
  await page.goto('https://javaheri.pl/');
  const logo = page.locator('img[alt="Katarzyna Javaheri-Szpak / QA Engineer"]');
  await expect(logo).toBeVisible();
});

const pages =
  [
    { url: 'https://javaheri.pl/', title: 'Katarzyna Javaheri-Szpak / QA Engineer – QA / TestOps / Python / Test Management' },
    { url: 'https://javaheri.pl/about/', title: 'About – Katarzyna Javaheri-Szpak / QA Engineer' },
    { url: 'https://javaheri.pl/contact/', title: 'Contact – Katarzyna Javaheri-Szpak / QA Engineer' },
    { url: 'https://javaheri.pl/blog/', title: 'Blog – Katarzyna Javaheri-Szpak / QA Engineer' },
    { url: 'https://javaheri.pl/pl/who-am-i-polski/', title: 'Katarzyna Javaheri-Szpak / QA Engineer – QA / TestOps / Python / Test Management' },
    { url: 'https://javaheri.pl/pt/who-am-i-portugues/', title: 'Katarzyna Javaheri-Szpak / QA Engineer – QA / TestOps / Python / Test Management' },
];

for (const {url, title} of pages){
  test (`sprawdza tytul na kazdej stronie ${url} `, async ({ page }) => {
    await page.goto(url);
    await expect(page).toHaveTitle(title);
  })};