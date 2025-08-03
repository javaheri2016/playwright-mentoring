import { test, expect, Page } from '@playwright/test';
import { generateRandomPassword } from '../utils/passwordGenerator.ts';

const validCode = 'PORTU2025';
const randomPassword = generateRandomPassword(6);
const invalidCode ='aaaaaabbbb';

async function submitCode(page: Page, code: string) {
  await page.goto('https://portugate.pt/audio/');
  const input = page.locator('#audio-code');
  await input.fill(code);
  await page.screenshot({path: 'photo/screenshot.png'});
  const submitButton = page.locator('#audio-form > p > button');
  await submitButton.click();
  return page.locator('#download-link');
}

async function goToForm(page: Page) {
  await page.goto('https://portugate.pt/audio/');
  const input = page.locator('#audio-code');
  const submitButton = page.locator('#audio-form > p > button');
  return { input, submitButton };
} 

async function assertContainsAndLog (locator, expectedText, testInfo) {
  await expect(locator).toContainText(expectedText)
  const textContent = await locator.textContent();
  (testInfo as any).downloadText = textContent;
}

test('Submitting a valid code', async ({page}, testInfo) => {
  const downloadLink = await submitCode(page, validCode);
  await expect(downloadLink).toBeVisible();
  const textContent = await downloadLink.textContent();
  (testInfo as any).downloadText = textContent;
});

test('Submitting a code in lowercase', async ({ page }, testInfo) => {
  const downloadLink = await submitCode(page, invalidCode.toLowerCase());
  await assertContainsAndLog(downloadLink,'Invalid code', testInfo);
  
});

test('Submitting an invalid code', async ({ page }, testInfo) => {
  const downloadLink = await submitCode(page, randomPassword);
  await assertContainsAndLog(downloadLink,'Invalid code',testInfo);
});

test('Empty input field', async ({ page }) => {
  const { input, submitButton } = await goToForm(page);
  await input.fill('');
  await submitButton.click();
  await expect(input).toHaveAttribute('required', '')
  const downloadLink = page.locator('#download-link');
  await expect(downloadLink).not.toBeVisible();
});

test.afterEach(async ({}, testInfo) => {
  const text = (testInfo as any).downloadText;

  if (text) {
    console.log(`Link content: ${text}`);
  } else {
    console.log('No text to display');
  }
});
