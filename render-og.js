const { chromium } = require('playwright');
const path = require('path');

(async () => {
    const b = await chromium.launch({ headless: true });
    const c = await b.newContext({ viewport: { width: 1200, height: 630 } });
    const p = await c.newPage();
    const fileUrl = 'file:///' + path.join(__dirname, 'og-image.html').replace(/\\/g, '/');
    console.log('opening:', fileUrl);
    await p.goto(fileUrl);
    await p.waitForLoadState('networkidle');
    await p.waitForTimeout(1500);
    await p.screenshot({ path: 'og-image.png' });
    console.log('wrote og-image.png');
    await b.close();
})().catch(e => { console.error(e); process.exit(2); });
