import { test, expect, Page } from '@playwright/test';

const validCode = 'PORTU2025';
const invalidCode = '11111111aaaaaa'

async function submitCode(page: Page, code: string) {
  await page.goto('https://portugate.pt/audio/');
  const input = page.locator('#audio-code');
  await input.fill(code);
  const submitButton = page.locator('#audio-form > p > button');
  await submitButton.click();
  return page.locator('#download-link');
}

test('wprowadzenie poprawnego kodu na stronie', async ({ page }) => {
  const downloadLink = await submitCode(page, validCode);
  await expect(downloadLink).toBeVisible();
  const textContent = await downloadLink.textContent();
  console.log('Zawartość linku:', textContent);
});

test('wprowadzenie kodu z małych liter na stronie', async ({ page }) => {
  const downloadLink = await submitCode(page, validCode.toLowerCase());
  await expect(downloadLink).toContainText("Invalid code.");
  const textContent = await downloadLink.textContent();
  console.log('Zawartość linku:', textContent);
});

test('wprowadzenie błędnego kodu na stronie', async ({ page }) => {
  const downloadLink = await submitCode(page, invalidCode);
  await expect(downloadLink).toContainText("Invalid code.");
  const textContent = await downloadLink.textContent();
  console.log('Zawartość linku:', textContent);
});
