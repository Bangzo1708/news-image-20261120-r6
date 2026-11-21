// news-image-20261120, round 6 — "The world on Friday 20 November 2026".
//
// The entry image is entry.png, shipped in this repository: a globe-centred
// front page of the day's news (Kyiv bridges hit, Cyclone Akvan's landfall
// in Odisha, the AI stock sell-off, the UK-EU deal, the Shenzhen summit and
// the capture of the FBI most-wanted cartel boss in Sinaloa), headed
// "FRIDAY 20 NOVEMBER 2026".
//
// This program only copies that image to the grader's output directory.
// It uses no network, no clock and no randomness, so two runs write
// byte-identical files.
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The repository root is the directory this file lives in.
const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");

// Fail loudly rather than ship a corrupt file: the image must be a whole
// PNG, told apart by its eight magic bytes.
const pngMagic = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const bytes = readFileSync(source);
if (!bytes.subarray(0, 8).equals(pngMagic)) {
  throw new Error("entry.png is not a PNG file");
}

// The harness names the output directory through MAKEFUN_OUTPUT_DIR;
// /output is the directory the rules promise.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

copyFileSync(source, join(outDir, "entry.png"));
