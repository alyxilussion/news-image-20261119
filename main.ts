// news-image-20261119 v2 entrypoint.
// Copies the finished broadsheet image to the output directory.
// No network, no randomness: every run writes the same bytes.
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const here = dirname(fileURLToPath(import.meta.url));
const dest = join(outDir, "entry.png");

mkdirSync(outDir, { recursive: true });
copyFileSync(join(here, "entry.png"), dest);

// Verify what we wrote, so a corrupt or oversized file fails loudly
// instead of reaching the judge: PNG signature, <= 1 MiB, <= 1024x1024.
const buf = readFileSync(dest);
const pngSig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!buf.subarray(0, 8).equals(pngSig)) {
  throw new Error("entry.png is not a PNG");
}
if (buf.length > 1048576) {
  throw new Error(`entry.png over 1 MiB: ${buf.length} bytes`);
}
const width = buf.readUInt32BE(16);
const height = buf.readUInt32BE(20);
if (width > 1024 || height > 1024) {
  throw new Error(`entry.png over 1024x1024: ${width}x${height}`);
}
console.log(`entry.png OK: ${width}x${height}, ${buf.length} bytes`);
