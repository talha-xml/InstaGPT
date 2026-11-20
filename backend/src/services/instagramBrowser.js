const { chromium } = require('playwright');

let browser = null;
let context = null;
let page = null;

async function startBrowser() {
  if (browser) {
    return { status: 'already_running' };
  }

  browser = await chromium.launch({
    headless: false
  });

  context = await browser.newContext();

  page = await context.newPage();

  await page.goto('https://www.instagram.com/');

  return {
    status: 'browser_started',
    url: page.url()
  };
}

async function closeBrowser() {
  if (browser) {
    await browser.close();

    browser = null;
    context = null;
    page = null;
  }

  return { status: 'browser_closed' };
}

module.exports = {
  startBrowser,
  closeBrowser
};
