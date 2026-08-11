/**
 * Regenerate `public/og.png` from `public/og.svg` + `public/portia-mark.png`.
 *
 *     pnpm og          (run `pnpm mark` first if the logo changed)
 *
 * The SVG is the source and the PNG is committed beside it, because the social
 * platforms do not render SVG cards and a build step nobody runs is worse than
 * a checked-in artifact. Run it whenever the card's copy or the mark changes.
 *
 * **The mark is composited rather than drawn.** The card used to redraw the
 * geometric linework spider as inline paths, which meant the logo existed in a
 * third place and could drift from the other two. It now composites the same
 * `portia-mark.png` the nav uses, so there is exactly one brand image.
 *
 * Known limit: librsvg resolves fonts from the system rather than from
 * `node_modules`, so the headline comes out in a grotesque fallback rather than
 * in Inter. It is close enough at card size and it is the reason the card
 * carries no fine typography.
 */
import sharp from "sharp";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const url = (p) => new URL(p, import.meta.url);

const svg = await readFile(url("../public/og.svg"));
// `fileURLToPath`, not `.pathname` — the repo lives under a path with a space
// in it, and `.pathname` hands sharp a percent-encoded string it cannot open.
const mark = await sharp(fileURLToPath(url("../public/portia-mark.png")))
  .resize(128, 128)
  .toBuffer();

const base = await sharp(svg, { density: 96 }).resize(1200, 630).png().toBuffer();

const info = await sharp(base)
  // Matches the dragline's terminus in og.svg — keep the two in step.
  .composite([{ input: mark, left: 88, top: 96 }])
  .png()
  .toFile(fileURLToPath(url("../public/og.png")));

console.log(`og.png — ${info.width}×${info.height}, ${info.size} bytes`);
