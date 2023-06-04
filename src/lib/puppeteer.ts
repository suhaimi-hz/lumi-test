import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

import { PuppeteerLaunchOptions } from 'puppeteer';

puppeteer.use(StealthPlugin());

export default function browser() {
  const config: PuppeteerLaunchOptions = {
    headless: 'new',
  };

  if (process.env.NODE_ENV !== 'dev') {
    config.executablePath = '/usr/bin/chromium-browser';
    config.args = ['--no-sandbox', '--disable-dev-shm-usage'];
  }

  return puppeteer.launch(config);
}
