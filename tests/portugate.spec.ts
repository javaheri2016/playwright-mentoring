import { test, expect } from '@playwright/test';


const validCode = 'PORTU2025';
const lowercaseCode = validCode.toLowerCase();


test('wprowadzenie poprawnego kodu na stronie ', async ({ page }) => {
  await page.goto('https://portugate.pt/audio/')
  const input = page.locator('#audio-code');
  await input.fill(validCode);
  const submitButton = page.locator('#audio-form > p > button')
  await submitButton.click();
  const downloadLink=page.locator('#download-link')
  await expect(downloadLink).toBeVisible ();
  const textContent = await downloadLink.textContent();
  console.log('Zawartość linku:', textContent);
});


test('wprowadzenie kodu z małych liter na stronie ', async ({ page }) => {
  await page.goto('https://portugate.pt/audio/')
  const input = page.locator('#audio-code');
  await input.fill(lowercaseCode);
  const submitButton = page.locator('#audio-form > p > button')
  await submitButton.click();
  const downloadLink=page.locator('#download-link')
  await expect(downloadLink).toContainText("❌ Invalid code.")
  const textContent = await downloadLink.textContent();
  console.log('Zawartość linku:', textContent);
});


test('wprowadzenie blednego kodu na stronie ', async ({ page }) => {
  await page.goto('https://portugate.pt/audio/')
  const input = page.locator('#audio-code');
  await input.fill('11111111aaaaaa');
  const submitButton = page.locator('#audio-form > p > button')
  await submitButton.click();
  const downloadLink=page.locator('#download-link')
  await expect(downloadLink).toContainText("❌ Invalid code.")
  const textContent = await downloadLink.textContent();
  console.log('Zawartość linku:', textContent);
});
