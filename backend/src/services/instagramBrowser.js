const { chromium } = require('playwright');
const path = require('path');

let context = null;
let page = null;

const userDataDir = path.resolve(__dirname, '../../.auth/instagram');

async function startBrowser() {
  if (context) {
    return { status: 'already_running' };
  }

  context = await chromium.launchPersistentContext(userDataDir, {
    headless: false
  });

  const pages = context.pages();
  page = pages.length > 0 ? pages[0] : await context.newPage();
  await page.goto('https://www.instagram.com/');

  return {
    status: 'browser_started',
    url: page.url()
  };
}

async function closeBrowser() {
  if (context) {
    await context.close();

    context = null;
    page = null;
  }

  return { status: 'browser_closed' };
}

module.exports = {
  startBrowser,
  closeBrowser
};
