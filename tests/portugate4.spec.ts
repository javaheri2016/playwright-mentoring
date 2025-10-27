import { test, expect, Page, Locator, TestInfo } from '@playwright/test';

// Valid code used to get access to the audio file
const validCode = 'PORTU2025';

// An intentionally invalid code used for negative test scenarios.
const invalidCode ='aaaaaabbbb';

// Library used to generate strong random passwords/strings.
let passgen = require('passgen');

// Randomly generated string used to simulate unpredictable invalid input.
let ranPassword = passgen.create(12);

// Used to format the date for screenshots/logs.
let dateFns =require ('date-fns');

// Captures the current date and time at runtime.
let currentDate = new Date( );

// Formats the timestamp to create unique screenshot filenames.
let formattedDate = dateFns.format(currentDate, 'yyyy-MM-dd_HH-mm-ss')

// Navigates to the site and accepts the cookie banner before each test run.
test.beforeEach(async ({ page }) => {
  await page.goto('https://portugate.pt/audio/');
  await page.click(`button.cky-btn-accept`); /* Cookie handlig*/
});

/**
 * Submits the given code via the audio download form.
 * - Fills in the code input field
 * - Takes a screenshot for logging/debugging
 * - Clicks the submit button
 * - Rerurns - thhe locator pointing to the download link 
 **/
async function submitCode(page: Page, code: string) {
  const input = page.locator('#audio-code');
  await input.fill(code);
  await page.screenshot({path: `photo/screenshot_${formattedDate}.png`});
  const submitButton = page.locator('#audio-form > p > button');
  await submitButton.click();
  return page.locator('#download-link');
}

/**
 * Returns references to key form UI elements:
 * - The code input field
 * - The submit button
 * Useful for interaction without performing a submission.
 **/
async function goToForm(page: Page) {
  const input = page.locator('#audio-code');
  const submitButton = page.locator('#audio-form > p > button');
  return { input, submitButton };
} 

/**
 * Asserts that the given locator contains the expected text.
 * Also stores the text for reporting/logging after the test ends.
 **/
async function assertContainsAndLog (locator: Locator, expectedText: string, testInfo: TestInfo) {
  await expect(locator).toContainText(expectedText)
  const textContent = await locator.textContent();
  (testInfo as any).downloadText = textContent;
}

  /**
  * Positive scenario: the user enters a valid code.
  * Expected result: the download link should appear and be accessible.
  * */
test('Submitting a valid code', async ({page}, testInfo) => {
  const downloadLink = await submitCode(page, validCode);
  await expect(downloadLink).toBeVisible();
  const textContent = await downloadLink.textContent();
  (testInfo as any).downloadText = textContent;
});

/** 
* Case sensitivity test: the same code but in lowercase.
* Expected result: the system should reject it and show an "Invalid code" message.
**/
test('Submitting a code in lowercase', async ({ page }, testInfo) => {
  const downloadLink = await submitCode(page, invalidCode.toLowerCase());
  await assertContainsAndLog(downloadLink,'Invalid code', testInfo);
});

/**
* Negative scenario: user enters a random, non-existing code.
* Expected result: the system displays "Invalid code" and does not provide a download link.
 **/
test('Submitting an invalid code', async ({ page }, testInfo) => {
  const downloadLink = await submitCode(page, ranPassword);
  await assertContainsAndLog(downloadLink,'Invalid code',testInfo);
  console.log(ranPassword);
});

/**
 * Validation scenario: submitting the form without entering any code.
 * Expected result: the input should be marked as required and no download link should be displayed.
 **/
test('Empty input field', async ({ page }) => {
  const { input, submitButton } = await goToForm(page);
  await input.fill('');
  await submitButton.click();
  await expect(input).toHaveAttribute('required', '')
  const downloadLink = page.locator('#download-link');
  await expect(downloadLink).not.toBeVisible();
});

// After each test, print the text from the download link if it exists
test.afterEach(async ({}, testInfo) => {
  const text = (testInfo as any).downloadText;

  if (text) {
    console.log(`Link content: ${text}`);
  } else {
    console.log('No text to display');
  }
});
