import type { ImageMetadata } from "astro";

import measureWorkspace from "~/assets/app/measure-workspace.png";
import measureIndex from "~/assets/app/measure-index.png";
import measureInterpret from "~/assets/app/measure-interpret.png";
import buildCanvas from "~/assets/app/build-canvas.png";
import buildQuestion from "~/assets/app/build-question.png";
import memoryGraph from "~/assets/app/memory-graph.png";
import memorySidebar from "~/assets/app/memory-sidebar.png";

/**
 * The captures behind the showcase section, resolved at build time.
 *
 * This file exists for the same reason `logos.ts` does: an asset is not copy,
 * so it does not belong in a content collection, and a component should not be
 * reaching into `src/assets` by string. The prose that goes with each capture —
 * the tab label, the lede, every alt string — lives in `showcase.yaml` and is
 * joined to these by `id`.
 *
 * **These are unretouched captures of the running app.** Nothing is composited,
 * nothing is recoloured, and no pane is redrawn to look better than it does.
 * That is the whole basis on which LANDING.md's "no screenshots" rule was lifted
 * for this one section — a screenshot the page has edited is a mockup, and a
 * mockup of a product whose pitch is that two surfaces must never disagree
 * about a number is an argument against the product. See LANDING.md → "The
 * fourth build".
 *
 * ## The placements
 *
 * `place` positions a foreground crop over the full capture, in **percentages
 * of the frame** so the whole composition scales with the column rather than
 * being pinned at one width. They are design values, which is why they are here
 * and not in the content file: an editor changing a sentence should not be able
 * to move a card off the picture.
 *
 * Two rules held them:
 *
 *  - **A crop never covers something the capture is being shown for.** The
 *    workspace's two crops sit low and left, over the preview table rather than
 *    over the column measurements. The graph's crop sits left, directly over
 *    the sidebar it is a magnification of — it was on the right first, where it
 *    covered the group context the graph is there to demonstrate.
 *  - **They may hang below the frame.** The full capture is masked away at its
 *    bottom edge and the crops are not, so a card that overhangs reads as being
 *    in front of the picture rather than pasted into it — which is the one
 *    thing the layering has to say.
 */

/** A percentage placement over the frame. `left`/`right` are exclusive. */
interface Place {
  left?: number;
  right?: number;
  /** Distance from the frame's bottom edge. Negative overhangs, on purpose. */
  bottom: number;
  /** Width as a share of the frame, which is what makes the crop scale. */
  width: number;
}

interface Card {
  src: ImageMetadata;
  place: Place;
}

export interface AppShot {
  full: ImageMetadata;
  cards: Card[];
}

export const APP_SHOTS: Record<string, AppShot> = {
  measures: {
    full: measureWorkspace,
    cards: [
      { src: measureIndex, place: { left: 2, bottom: -8, width: 21 } },
      { src: measureInterpret, place: { left: 25, bottom: 2, width: 21 } },
    ],
  },
  builds: {
    full: buildCanvas,
    cards: [{ src: buildQuestion, place: { right: 3, bottom: -13, width: 17 } }],
  },
  remembers: {
    full: memoryGraph,
    cards: [{ src: memorySidebar, place: { left: 3, bottom: -9, width: 16 } }],
  },
};
