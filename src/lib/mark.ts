/**
 * The portia mark, as geometry.
 *
 * The mark is drawn in two places — `components/Mark.astro` (nav lockup, OG
 * image) and `components/islands/Spider.tsx` (the scroll creature) — and one of
 * them is React, so the shape cannot live in an `.astro` file. It lives here so
 * the two cannot drift.
 *
 * `public/favicon.svg` is the third copy and is necessarily standalone: a
 * favicon has no page to take `currentColor` from and no bundler to import
 * from. Keep it in step by hand; it is nine paths.
 *
 * The decisions behind the numbers are documented in `Mark.astro`.
 */

export type Leg = [number, number, number, number, number, number];

export const VIEW_BOX = "0 0 32 32";
export const STROKE_WIDTH = 2.2;

/** Right-side legs. The left side is these reflected through x = 16, generated
 *  rather than typed, so the two halves cannot come apart. */
export const LEGS: Leg[] = [
  [20.4, 14.8, 25.5, 11.2, 29.6, 12.4],
  [22.0, 17.2, 27.2, 16.4, 30.2, 19.4],
  [21.6, 21.0, 26.4, 22.4, 28.6, 26.0],
  [19.4, 23.6, 22.4, 26.4, 23.2, 30.0],
];

export function legPath([x1, y1, kx, ky, x2, y2]: Leg, flip = false): string {
  const m = (x: number) => (flip ? 32 - x : x);
  return `M${m(x1)} ${y1} Q${m(kx)} ${ky} ${m(x2)} ${y2}`;
}

/** The abdomen saddle — the only fill in the mark. */
export const ABDOMEN = { cx: 16, cy: 8.5, rx: 5, ry: 4.3 };

/** `fill="none"`, which the leg geometry is what makes possible. */
export const CEPHALOTHORAX = { cx: 16, cy: 18.6, r: 6.2 };

/** The anterior median pair — the jumping-spider tell. */
export const EYES = [
  { cx: 13.6, cy: 18.2, r: 2.15 },
  { cx: 18.4, cy: 18.2, r: 2.15 },
];

export const CATCHLIGHTS = [
  { cx: 13.0, cy: 17.55, r: 0.78 },
  { cx: 17.8, cy: 17.55, r: 0.78 },
];

/**
 * Where the silk meets the animal, in viewBox units: the top of the abdomen,
 * because that is where the spinnerets are and it is why the abdomen is drawn
 * above the cephalothorax rather than behind it. The spider therefore hangs the
 * right way up without the dragline having to be positioned by eye.
 */
export const DRAGLINE_ANCHOR = { x: 16, y: ABDOMEN.cy - ABDOMEN.ry };

/** Idle leg keyframes: low amplitude, and independent of scroll. Position alone
 *  reads as dead — this is what keeps the creature alive at rest. */
export const IDLE_LEG_ROTATION = 0.9;
