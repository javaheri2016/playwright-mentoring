import * as pw from 'playwright';

(async () => {
  const browser = await pw.chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://javaheri.pl');
  await page.screenshot({ path: 'photo/screenshot.png' });
  await browser.close();
})();

