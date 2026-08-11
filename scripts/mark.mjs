/**
 * Derive the site's brand images from the app's own logo.
 *
 *     pnpm mark
 *
 * The source is `../portia/portia/ui/assets/cute-portia.png` — **the real logo
 * the application ships**, not a redraw of it. That is the point: the page and
 * the app should not be two different animals. `LANDING.md` originally called
 * for a geometric linework mark in the chrome; the raster logo replaces it in
 * the nav, the footer and the favicon, and the linework mark now exists only as
 * the scroll spider, where `currentColor` and animated legs are load-bearing.
 *
 * The source PNG is 256×256 with the creature sitting high and left inside it —
 * 173×161 of ink at offset (46, 20), so ~75px of empty space along the bottom.
 * Dropped into a 56px nav that becomes a mark that looks mis-set rather than
 * small. So: trim to the ink, re-pad to a square, and export at 4× the largest
 * display size, because this is a raster in a page that is otherwise vector.
 */
import sharp from "sharp";
import { fileURLToPath } from "node:url";

const SRC = fileURLToPath(
  new URL("../../portia/portia/ui/assets/cute-portia.png", import.meta.url),
);
const out = (name) => fileURLToPath(new URL(`../public/${name}`, import.meta.url));

/** Trim the transparent margin, then re-pad to a centred square so the mark can
 *  be dropped into any square box without a per-use nudge. */
async function square() {
  const { data, info } = await sharp(SRC)
    .trim({ threshold: 1 })
    .toBuffer({ resolveWithObject: true });

  const side = Math.max(info.width, info.height);
  // No padding. The nav runs the mark at 44px inside a 56px bar, and every
  // percent of transparent margin baked into the asset is a percent of that
  // 44px the creature does not get. The legs reaching the edge of their box is
  // the correct look at this size; the CSS gap beside the wordmark supplies
  // whatever breathing room the lockup needs.
  const pad = 0;
  const box = side + pad * 2;

  return sharp({
    create: {
      width: box,
      height: box,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      {
        input: data,
        left: Math.round((box - info.width) / 2),
        top: Math.round((box - info.height) / 2),
      },
    ])
    .png()
    .toBuffer();
}

const base = await square();

for (const [name, size] of [
  // 4× the 44px nav lockup, so it stays crisp on a 3× display.
  ["portia-mark.png", 176],
  ["favicon.png", 180],
]) {
  const info = await sharp(base).resize(size, size).png({ compressionLevel: 9 }).toFile(out(name));
  console.log(`${name} — ${info.width}×${info.height}, ${info.size} bytes`);
}
