/**
 * Regenerate `public/og.png` from `public/og.svg`.
 *
 * The SVG is the source and the PNG is committed beside it, because the social
 * platforms do not render SVG cards and a build step nobody runs is worse than
 * a checked-in artifact. Run it whenever the card's copy or the mark changes:
 *
 *     pnpm og
 *
 * Known limit: this renders through librsvg, which resolves fonts from the
 * system rather than from `node_modules`. The headline therefore comes out in
 * a grotesque fallback rather than in Inter. It is close enough for a card at
 * this size and it is the reason the card carries no fine typography.
 */
import sharp from "sharp";
import { readFile } from "node:fs/promises";

const svg = await readFile(new URL("../public/og.svg", import.meta.url));
const info = await sharp(svg, { density: 96 })
  .resize(1200, 630)
  .png()
  .toFile(new URL("../public/og.png", import.meta.url).pathname);

console.log(`og.png — ${info.width}×${info.height}, ${info.size} bytes`);
