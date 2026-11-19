// Renders the social-share image, the favicons and the apple-touch icon into /public from the firm's
// logo (public/images/mga-logo.jpg), using Playwright's Chromium.
// Run with: npm run og-image   (re-run after changing the logo, firm name or colours)
import { chromium } from '@playwright/test';
import { readFileSync, writeFileSync } from 'node:fs';

const navy = '#0F1F3C';
const gold = '#C8AD7C';
const goldLight = '#D9C49C';
const logo = `data:image/jpeg;base64,${readFileSync('public/images/mga-logo.jpg').toString('base64')}`;
const fonts =
  '<style>@font-face{font-family:"Source Serif 4";font-weight:600;src:url(data:font/woff2;base64,' +
  readFileSync('public/fonts/source-serif-4-600.woff2').toString('base64') +
  ') format("woff2")}@font-face{font-family:Inter;font-weight:400;src:url(data:font/woff2;base64,' +
  readFileSync('public/fonts/inter-400.woff2').toString('base64') +
  ') format("woff2")}</style>';

// Share image: navy card, logo on a white rounded badge, firm name and service line.
const og = `<html><head>${fonts}</head><body style="margin:0">
<div style="width:1200px;height:630px;background:${navy};display:flex;flex-direction:column;justify-content:space-between;padding:72px 80px;box-sizing:border-box;font-family:Inter,sans-serif;color:white">
  <div style="display:flex;align-items:center;gap:24px">
    <div style="background:#fff;border-radius:14px;padding:10px 14px;display:flex"><img src="${logo}" style="height:96px;width:auto"></div>
    <div style="font-family:monospace;letter-spacing:.18em;text-transform:uppercase;color:${goldLight};font-size:18px">Chartered Accountants · Nalgonda</div>
  </div>
  <div>
    <div style="font-family:'Source Serif 4',serif;font-weight:600;font-size:72px;line-height:1.05">Mahesh Gunalapuri &amp; Associates</div>
    <div style="margin-top:22px;font-size:28px;color:#E5EAF2cc">Professional Services in Taxation, Accounting and Regulatory Compliance</div>
  </div>
  <div style="height:2px;background:${gold}80"></div>
</div></body></html>`;

// Square icon: the logo centred on white with a little breathing room.
const icon = (size, pad) => `<html><body style="margin:0">
<div style="width:${size}px;height:${size}px;background:#fff;display:flex;align-items:center;justify-content:center;box-sizing:border-box;padding:${pad}px">
<img src="${logo}" style="max-width:100%;max-height:100%"></div></body></html>`;

const browser = await chromium.launch();
async function shot(html, w, h) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const buf = await page.screenshot({ type: 'png' });
  await page.close();
  return buf;
}
writeFileSync('public/og-image.png', await shot(og, 1200, 630));
writeFileSync('public/apple-touch-icon.png', await shot(icon(180, 14), 180, 180));
writeFileSync('public/favicon-192.png', await shot(icon(192, 12), 192, 192));
const png32 = await shot(icon(32, 1), 32, 32);
// favicon.ico: an ICO container holding one 32x32 PNG.
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4);
header.writeUInt8(32, 6); header.writeUInt8(32, 7); header.writeUInt8(0, 8); header.writeUInt8(0, 9);
header.writeUInt16LE(1, 10); header.writeUInt16LE(32, 12); header.writeUInt32LE(png32.length, 14); header.writeUInt32LE(22, 18);
writeFileSync('public/favicon.ico', Buffer.concat([header, png32]));
await browser.close();
console.log('Wrote public/og-image.png, public/apple-touch-icon.png, public/favicon-192.png, public/favicon.ico');
