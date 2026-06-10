/**
 * One-off helper: captures preview screenshots for project entries.
 * Usage: node scripts/capture-screenshots.mjs
 */
import { chromium } from "playwright";

const targets = [
  { url: "https://target-system.vercel.app/", out: "public/images/projects/target-system.png" },
  { url: "https://cyberpunk-portfolio-smoky-phi.vercel.app", out: "public/images/projects/cyberpunk-portfolio.png" },
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 });

for (const { url, out } of targets) {
  console.log(`\n=== ${url}`);
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 }).catch(() => page.goto(url, { waitUntil: "load", timeout: 60000 }));
  await page.waitForTimeout(4000); // let intro animations settle
  console.log("title:", await page.title());
  const text = await page.evaluate(() => document.body.innerText.slice(0, 1500));
  console.log("text:", text.replace(/\n{2,}/g, "\n"));
  await page.screenshot({ path: out });
  console.log("saved:", out);
}

await browser.close();
