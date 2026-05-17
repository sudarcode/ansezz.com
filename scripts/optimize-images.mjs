#!/usr/bin/env node
import { readdir, stat, rename, unlink } from "node:fs/promises";
import { join, extname } from "node:path";
import sharp from "sharp";

const ROOT = new URL("../public/", import.meta.url).pathname;
const TARGETS = ["blog", "og.webp"];
const MAX_WIDTH = 1600;
const QUALITY = 78;

async function walk(dir) {
  const out = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await walk(full)));
    } else if (entry.isFile()) {
      const ext = extname(entry.name).toLowerCase();
      if (ext === ".webp" || ext === ".jpg" || ext === ".jpeg" || ext === ".png") {
        out.push(full);
      }
    }
  }
  return out;
}

async function optimize(file) {
  const before = (await stat(file)).size;
  const tmp = `${file}.tmp.webp`;
  const meta = await sharp(file).metadata();
  const width = Math.min(meta.width ?? MAX_WIDTH, MAX_WIDTH);

  await sharp(file)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 6 })
    .toFile(tmp);

  const after = (await stat(tmp)).size;
  if (after >= before) {
    await unlink(tmp);
    return { file, before, after: before, skipped: true };
  }

  const finalPath = extname(file).toLowerCase() === ".webp"
    ? file
    : file.replace(/\.(jpe?g|png)$/i, ".webp");
  if (finalPath !== file) await unlink(file);
  await rename(tmp, finalPath);

  return { file: finalPath, before, after, skipped: false };
}

async function main() {
  const files = [];
  for (const target of TARGETS) {
    const full = join(ROOT, target);
    try {
      const s = await stat(full);
      if (s.isDirectory()) files.push(...(await walk(full)));
      else files.push(full);
    } catch {
      // skip missing
    }
  }

  let totalBefore = 0;
  let totalAfter = 0;
  let optimized = 0;

  for (const file of files) {
    try {
      const result = await optimize(file);
      totalBefore += result.before;
      totalAfter += result.after;
      if (!result.skipped) optimized++;
      const saved = ((1 - result.after / result.before) * 100).toFixed(0);
      const status = result.skipped ? "skip" : `−${saved}%`;
      console.log(
        `${status.padEnd(7)} ${formatBytes(result.before).padStart(8)} → ${formatBytes(result.after).padStart(8)}  ${file.replace(ROOT, "")}`,
      );
    } catch (err) {
      console.error(`fail   ${file}: ${err.message}`);
    }
  }

  const savings = ((1 - totalAfter / totalBefore) * 100).toFixed(1);
  console.log(
    `\noptimized ${optimized}/${files.length}  ${formatBytes(totalBefore)} → ${formatBytes(totalAfter)}  (−${savings}%)`,
  );
}

function formatBytes(b) {
  if (b < 1024) return `${b}B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)}KB`;
  return `${(b / 1024 / 1024).toFixed(2)}MB`;
}

await main();
