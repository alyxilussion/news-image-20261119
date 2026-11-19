// news-image-20261119 entry (Node 22, standard library only).
//
// The image is drawn in advance and shipped beside this file as entry.png:
// a one-page broadsheet, "The World Today", summing up Thursday
// 19 November 2026 in 45 stories across six continents. This program's
// only job is to place an exact copy of it at /output/entry.png.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const source = new URL('./entry.png', import.meta.url);
const dest = join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'entry.png');

// The gate caps the file at 1 MiB: refuse to ship an oversized image.
const bytes = statSync(source).size;
if (bytes > 1048576) {
  throw new Error(`entry.png is ${bytes} bytes, over the 1 MiB cap`);
}

copyFileSync(source, dest);

// Verify the copy before exiting: same size, and the PNG signature intact,
// so a truncated write fails loudly here instead of at the gate.
const copied = statSync(dest).size;
const head = readFileSync(dest).subarray(0, 8);
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (copied !== bytes || !head.equals(PNG_MAGIC)) {
  throw new Error(`copy of entry.png failed verification (${copied} bytes)`);
}
