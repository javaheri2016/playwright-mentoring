import { test, expect, Page, Locator, TestInfo } from '@playwright/test';

const validCode = 'PORTU2025';
const invalidCode ='aaaaaabbbb';
let passgen = require('passgen');
let ranPassword = passgen.create(12);
let dateFns =require ('date-fns');
let currentDate = new Date( );
let formattedDate = dateFns.format(currentDate, 'yyyy-MM-dd_HH-mm-ss')

test.beforeEach(async ({ page }) => {
  await page.goto('https://portugate.pt/audio/');
  await page.click(`button.cky-btn-accept`);
});

async function submitCode(page: Page, code: string) {
  const input = page.locator('#audio-code');
  await input.fill(code);
  await page.screenshot({path: `photo/screenshot_${formattedDate}.png`});
  const submitButton = page.locator('#audio-form > p > button');
  await submitButton.click();
  return page.locator('#download-link');
}

async function goToForm(page: Page) {
  const input = page.locator('#audio-code');
  const submitButton = page.locator('#audio-form > p > button');
  return { input, submitButton };
} 

async function assertContainsAndLog (locator: Locator, expectedText: string, testInfo: TestInfo) {
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
  const downloadLink = await submitCode(page, ranPassword);
  await assertContainsAndLog(downloadLink,'Invalid code',testInfo);
  console.log(ranPassword);
});

test('Empty input field', async ({ page }) => {
  const { input, submitButton } = await goToForm(page);
  await input.fill('');
  await submitButton.click();
  await expect(input).toHaveAttribute('required', '')
  const downloadLink = page.locator('#download-link');
  await expect(downloadLink).not.toBeVisible();
});

// After each test
test.afterEach(async ({}, testInfo) => {
  const text = (testInfo as any).downloadText;

  if (text) {
    console.log(`Link content: ${text}`);
  } else {
    console.log('No text to display');
  }
});
