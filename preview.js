// preview.js — open index.html in Playwright, take screenshots at desktop + mobile widths
const { chromium } = require('playwright');
const path = require('path');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const fileUrl = 'file:///' + path.join(__dirname, 'index.html').replace(/\\/g, '/');

    for (const [label, w, h] of [['desktop', 1280, 900], ['mobile', 390, 844]]) {
        const ctx = await browser.newContext({ viewport: { width: w, height: h } });
        const page = await ctx.newPage();
        await page.goto(fileUrl);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(800);  // fonts
        const out = path.join(__dirname, `preview-${label}.png`);
        await page.screenshot({ path: out, fullPage: true });
        console.log(`wrote ${out}`);
        await ctx.close();
    }
    await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
