import { test, expect, Page} from '@playwright/test';

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

test.describe('Testowanie kodów audio', () => {
    const cases = [
      { label: 'poprawny kod', code: validCode, expectedValid: true },
      { label: 'poprawny kod z małych liter', code: validCode.toLowerCase(), expectedValid: false },
      { label: 'błędny kod', code: invalidCode, expectedValid: false },
    ];
  
    for (const { label, code, expectedValid } of cases) {
      test(`wprowadzenie: ${label}`, async ({ page }) => {
        const downloadLink = await submitCode(page, code);
        if (expectedValid) {
          await expect(downloadLink).toBeVisible();
        } else {
          await expect(downloadLink).toContainText("❌ Invalid code.");
        }
        const textContent = await downloadLink.textContent();
        console.log('Zawartość linku:', textContent);
      });
    }
  });
  