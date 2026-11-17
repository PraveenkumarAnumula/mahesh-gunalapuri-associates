// Renders the social-share image, apple-touch icon and favicon.ico into /public using Playwright's Chromium.
// Run with: npm run og-image   (re-run after changing the firm name or colours)
import { chromium } from '@playwright/test';
import { writeFileSync } from 'node:fs';

const navy = '#0F1F3C', gold = '#C8AD7C', goldLight = '#D9C49C';
const fonts = '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Source+Serif+4:opsz,wght@8..60,600&display=swap" rel="stylesheet">';
const lines = `background-image:repeating-linear-gradient(to bottom,transparent 0,transparent 31px,rgba(200,173,124,.09) 31px,rgba(200,173,124,.09) 32px)`;

const og = `<html><head>${fonts}</head><body style="margin:0">
<div style="width:1200px;height:630px;background:${navy};${lines};display:flex;flex-direction:column;justify-content:space-between;padding:72px 80px;box-sizing:border-box;font-family:Inter,sans-serif;color:white">
  <div style="display:flex;align-items:center;gap:20px">
    <div style="width:72px;height:72px;border:1.5px solid ${gold}99;display:grid;place-items:center;font-family:'Source Serif 4',serif;font-weight:600;font-size:26px;color:${goldLight}">AMS</div>
    <div style="font-family:monospace;letter-spacing:.18em;text-transform:uppercase;color:${goldLight};font-size:18px">Chartered Accountants</div>
  </div>
  <div>
    <div style="font-family:'Source Serif 4',serif;font-weight:600;font-size:84px;line-height:1.05">AMS Tax Associates</div>
    <div style="margin-top:22px;font-size:30px;color:#E5EAF2cc">Income Tax · GST · Audit · Accounting · Advisory</div>
  </div>
  <div style="height:2px;background:${gold}80"></div>
</div></body></html>`;

const icon = (size, font) => `<html><head>${fonts}</head><body style="margin:0">
<div style="width:${size}px;height:${size}px;background:${navy};display:grid;place-items:center;font-family:'Source Serif 4',Georgia,serif;font-weight:600;font-size:${font}px;color:${goldLight};letter-spacing:.04em">AMS</div></body></html>`;

const browser = await chromium.launch();
async function shot(html, w, h) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const buf = await page.screenshot({ type: 'png' });
  await page.close();
  return buf;
}
writeFileSync('public/og-image.png', await shot(og, 1200, 630));
writeFileSync('public/apple-touch-icon.png', await shot(icon(180, 58), 180, 180));
const png32 = await shot(icon(32, 11), 32, 32);
// ICO container holding one 32x32 PNG image.
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4);
header.writeUInt8(32, 6); header.writeUInt8(32, 7); header.writeUInt8(0, 8); header.writeUInt8(0, 9);
header.writeUInt16LE(1, 10); header.writeUInt16LE(32, 12); header.writeUInt32LE(png32.length, 14); header.writeUInt32LE(22, 18);
writeFileSync('public/favicon.ico', Buffer.concat([header, png32]));
await browser.close();
console.log('Wrote public/og-image.png, public/apple-touch-icon.png, public/favicon.ico');
