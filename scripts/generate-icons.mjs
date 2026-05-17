#!/usr/bin/env node
import sharp from "sharp";
import { readFile } from "node:fs/promises";

const ROOT = new URL("../public/", import.meta.url).pathname;

const svg = await readFile(`${ROOT}icon-192.svg`);

const sizes = [
  { name: "apple-touch-icon.png", size: 180 },
  { name: "icon-192.png", size: 192 },
  { name: "icon-512.png", size: 512 },
];

for (const { name, size } of sizes) {
  const buf = await sharp(svg)
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toBuffer();
  await sharp(buf).toFile(`${ROOT}${name}`);
  console.log(`generated ${name} (${size}x${size}, ${buf.length} bytes)`);
}

// favicon.ico — 32x32 png renamed (most modern browsers accept png for .ico)
const ico = await sharp(svg)
  .resize(32, 32)
  .png({ compressionLevel: 9 })
  .toBuffer();
await sharp(ico).toFile(`${ROOT}favicon.ico`);
console.log(`generated favicon.ico (32x32, ${ico.length} bytes)`);
