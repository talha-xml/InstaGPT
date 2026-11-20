const { chromium } = require('playwright');
async function openBrowser() {
  const browser = await chromium.launch({
    headless: false
  });
  const page = await browser.newPage();
  await page.goto('https://www.instagram.com/');
  console.log('Instagram opened successfully!');
  await page.waitForTimeout(10000);
  await browser.close();
}

openBrowser();
