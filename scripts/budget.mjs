import { readFileSync, existsSync, statSync } from "node:fs";
import { gzipSync } from "node:zlib";
import path from "node:path";

const root = process.cwd();
const BUDGET = { js: 130, css: 25, transfer: 450 };
const kb = (n) => n / 1024;
const html = path.join(root, ".next/server/app/index.html");
if (!existsSync(html)) {
  console.error("Run `npm run build` first.");
  process.exit(1);
}
const page = readFileSync(html, "utf8");
const assets = (re) => [...new Set([...page.matchAll(re)].map((m) => m[1]))];
const file = (url) => path.join(root, ".next", url.replace(/^\/_next\//, ""));
const gz = (url) => (existsSync(file(url)) ? gzipSync(readFileSync(file(url))).length : 0);

const js = assets(/<script(?![^>]*noModule)[^>]+src="(\/_next\/static\/[^"]+\.js)"/g).reduce((s, u) => s + gz(u), 0);
const css = assets(/<link[^>]+href="(\/_next\/static\/[^"]+\.css)"/g).reduce((s, u) => s + gz(u), 0);
const fonts = assets(/<link[^>]+href="(\/_next\/static\/media\/[^"]+\.woff2)"/g).reduce((s, u) => s + (existsSync(file(u)) ? statSync(file(u)).size : 0), 0);
const plate = path.join(root, "public/images/hero/desk.webp");
const image = existsSync(plate) ? statSync(plate).size : 0;
const doc = gzipSync(page).length;
const transfer = js + css + fonts + image + doc;

const rows = [
  ["Initial JS (gzip)", kb(js), BUDGET.js],
  ["CSS (gzip)", kb(css), BUDGET.css],
  ["First load transfer", kb(transfer), BUDGET.transfer],
];
let fail = false;
for (const [label, value, max] of rows) {
  const ok = value <= max;
  fail ||= !ok;
  console.log(`${ok ? "PASS" : "FAIL"}  ${label.padEnd(22)} ${value.toFixed(1).padStart(7)} KB  / ${max} KB`);
}
console.log(`      HTML ${kb(doc).toFixed(1)} KB, fonts ${kb(fonts).toFixed(1)} KB, hero plate ${kb(image).toFixed(1)} KB (source file, served smaller as AVIF)`);
process.exit(fail ? 1 : 0);
