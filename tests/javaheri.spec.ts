import { test, expect } from '@playwright/test';


const pages =
  [
    { button: 'Home', title: 'Katarzyna Javaheri-Szpak / QA Engineer – QA / TestOps / Python / Test Management' },
    { button: 'About', title: 'About – Katarzyna Javaheri-Szpak / QA Engineer' },
    { button: 'Contact', title: 'Contact – Katarzyna Javaheri-Szpak / QA Engineer' },
    { button: 'Blog', title: 'Blog – Katarzyna Javaheri-Szpak / QA Engineer' },
    { button: ' PL', title: 'Katarzyna Javaheri-Szpak / QA Engineer – QA / TestOps / Python / Test Management' },
    { button: ' PT', title: 'Katarzyna Javaheri-Szpak / QA Engineer – QA / TestOps / Python / Test Management' },

  ];


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


for (const {button, title } of pages){
  test (`weryfikacja tytul  po klinięciu w: ${button}`, async ({ page }) => {
    await page.goto('https://javaheri.pl/');
    await page.click(`span.wp-block-navigation-item__label:has-text("${button}")`);
    await expect(page).toHaveTitle(title);
  })
};
