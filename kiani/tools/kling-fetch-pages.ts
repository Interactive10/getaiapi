import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Fetches ALL Kling API doc pages via Playwright (SPA requires headless browser).
 * Saves rendered markdown content to .kling-docs/ as .txt and .html files.
 */

const ALL_PAGES = [
  'quickStart%2FproductIntroduction%2Foverview',
  'quickStart%2FuserManual',
  'apiReference%2FupdateNotice',
  'apiReference%2FcommonInfo',
  'apiReference%2FrateLimits',
  'apiReference%2FcallbackProtocol',
  'apiReference%2Fmodel%2FvideoModels',
  'apiReference%2Fmodel%2FOmniVideo',
  'apiReference%2Fmodel%2FtextToVideo',
  'apiReference%2Fmodel%2FimageToVideo',
  'apiReference%2Fmodel%2FmultiImageToVideo',
  'apiReference%2Fmodel%2FmotionControl',
  'apiReference%2Fmodel%2FmultiElements',
  'apiReference%2Fmodel%2FvideoExtension',
  'apiReference%2Fmodel%2FlipSync',
  'apiReference%2Fmodel%2Favatar',
  'apiReference%2Fmodel%2FtextToAudio',
  'apiReference%2Fmodel%2FvideoToAudio',
  'apiReference%2Fmodel%2FTTS',
  'apiReference%2Fmodel%2FcustomVoices',
  'apiReference%2Fmodel%2FimageRecognize',
  'apiReference%2Fmodel%2Felement',
  'quickStart%2FproductIntroduction%2FeffectsCenter',
  'apiReference%2Fmodel%2FvideoEffects',
  'apiReference%2Fmodel%2FimageModels',
  'apiReference%2Fmodel%2FOmniImage',
  'apiReference%2Fmodel%2FimageGeneration',
  'apiReference%2Fmodel%2FmultiImageToImage',
  'apiReference%2Fmodel%2FimageExpansion',
  'apiReference%2Fmodel%2FaiMultiShot',
  'apiReference%2Fmodel%2FvirtualTryOn',
  'apiReference%2FaccountInfoInquiry',
  'productBilling%2FbillingMethod',
  'productBilling%2FprePaidResourcePackage',
];

const OUT_DIR = path.join(process.cwd(), '.kling-docs');

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  let fetched = 0;

  for (const slug of ALL_PAGES) {
    const url = `https://kling.ai/document-api/${slug}`;
    const name = slug.replace(/%2F/g, '_');
    const txtPath = path.join(OUT_DIR, `${name}.txt`);

    // Skip if already fetched
    if (fs.existsSync(txtPath) && fs.statSync(txtPath).size > 100) {
      console.log(`  SKIP (cached): ${name}`);
      continue;
    }

    console.log(`Fetching: ${name}...`);

    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2500);

      const content = await page.evaluate(() => {
        const el = document.querySelector('.markdown-body');
        if (!el) return { text: '', html: '' };
        return { text: el.textContent?.trim() || '', html: el.innerHTML };
      });

      if (content.text.length < 50) {
        console.log(`  WARNING: Very little content (${content.text.length} chars)`);
      }

      fs.writeFileSync(path.join(OUT_DIR, `${name}.html`), content.html);
      fs.writeFileSync(txtPath, content.text);
      console.log(`  Saved ${content.text.length} chars`);
      fetched++;
    } catch (err) {
      console.error(`  ERROR: ${err}`);
    }
  }

  await browser.close();
  console.log(`\nDone! Fetched ${fetched} new pages. Files in ${OUT_DIR}`);
})();
