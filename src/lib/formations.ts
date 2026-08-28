/**
 * The three formations — **the geometry that the "How it works" swarm settles
 * into, and the geometry the proof-sheet icons are drawn from.**
 *
 * This file exists because those two are the same drawing and must not be able
 * to fork. It used to live inline in `PrincipleIcon.astro`; the swarm needs the
 * same coordinates as *sampleable paths* rather than as SVG elements, so the
 * shapes moved here and both consumers now read from one array.
 *
 * The box is 64 units. `PrincipleIcon.astro` draws it at 112px on
 * `/icons`; `PrincipleSwarm.tsx` maps it into a canvas of whatever size the
 * stage resolves to. Nothing in here knows about either.
 *
 * ---
 *
 * Three rules the geometry obeys, each of which an early draft broke:
 *
 *  - **Nothing overlaps.** Two strokes crossing in a small box merge into a
 *    smudge — the first tables drawing put one card on top of another and the
 *    shared corner read as a printing error. The plates in a pile are 8 units
 *    apart. The two deliberate exceptions are joins rather than collisions: an
 *    arrowhead sitting on the last unit of its own connector, and a plate's V
 *    meeting the flank of its own pile at the endpoint they share.
 *  - **Every line ends somewhere.** The graph had a satellite-to-satellite edge
 *    that crossed the whole box and looked like a scratch. Every stroke here
 *    starts on one object's edge and stops on another's, and the network is
 *    laid out planar — no two of its fourteen edges cross, which is checked by
 *    hand and is the only reason fourteen nodes read as a network instead of as
 *    a scribble.
 *  - **Connectors are orthogonal, with one arrowhead each.** The first pipeline
 *    used rounded corner curves and a floating chevron; right angles and a
 *    single head at the point of entry read as a diagram instead of as debris.
 *    Where two connectors enter the same node they enter at different points on
 *    its edge, because two arrowheads landing on one point is the smudge again.
 *
 * Held to the page's ranking rule: **one ink colour, one stroke weight, one
 * drawn size, for all three.** These illustrate three columns LANDING.md
 * forbids from ranking, and a drawing that ranked would rank them. It is why
 * the three piles hold the same number of plates at the same height — piles of
 * unequal height in a row are a bar chart, and a bar chart is a ranking. The
 * graph's two node sizes are the one place a size varies, and they are
 * `DESIGN.md`'s own distinction: prominence communicates **kind** — entity or
 * measurement — and every node of a kind is drawn identically, so nothing here
 * grows with its degree.
 *
 * **The declaration order is load-bearing.** For the icon it is the draw order
 * — containers first, then what joins them, because a pipeline whose arrows
 * arrive before its boxes reads as noise. For the swarm it is the order the
 * sampler walks, so a point at 40% of one formation's ink lands at 40% of the
 * next one's, and the cloud reorganises in a readable sweep rather than
 * scattering at random.
 */

export type FormationName = "tables" | "pipeline" | "graph";

/**
 * Shapes stay in their natural form — a rect is a rect — because that is what
 * is hand-editable. `shapePath` is the one place they become path data, and
 * both consumers go through it.
 */
export type Shape =
  | { k: "path"; d: string }
  | { k: "rect"; x: number; y: number; w: number; h: number; r: number }
  | { k: "circle"; cx: number; cy: number; r: number };

/** The side of the square the coordinates below are expressed in. */
export const VIEW = 64;

/* -- 01 · tables ---------------------------------------------------------- *
 * Three piles of five, drawn in profile rather than flat on: a rhombus is what
 * a rectangle looks like from the side and slightly above, and only the topmost
 * plate of a pile shows its whole face — the four under it show the front half
 * of theirs, which is the V, and the two verticals down the flanks are the side
 * of the pile. Flat-on, five rectangles in a column are a list, and a list is
 * not a stack. A data scientist's problem is never one table and rarely one
 * source, hence three. The top face carries a band parallel to its upper-right
 * edge: the header rule, in the same perspective as the plate holding it, which
 * is what makes the pile read as tables rather than as layers. */
const TABLES: readonly Shape[] = [
  { k: "path", d: "M1.5 16 10.5 12.4 19.5 16 10.5 19.6Z" },
  { k: "path", d: "M7.35 13.66 16.35 17.26" },
  { k: "path", d: "M1.5 24 10.5 27.6 19.5 24" },
  { k: "path", d: "M1.5 32 10.5 35.6 19.5 32" },
  { k: "path", d: "M1.5 40 10.5 43.6 19.5 40" },
  { k: "path", d: "M1.5 48 10.5 51.6 19.5 48" },
  { k: "path", d: "M1.5 16V48" },
  { k: "path", d: "M19.5 16V48" },
  { k: "path", d: "M23 16 32 12.4 41 16 32 19.6Z" },
  { k: "path", d: "M28.85 13.66 37.85 17.26" },
  { k: "path", d: "M23 24 32 27.6 41 24" },
  { k: "path", d: "M23 32 32 35.6 41 32" },
  { k: "path", d: "M23 40 32 43.6 41 40" },
  { k: "path", d: "M23 48 32 51.6 41 48" },
  { k: "path", d: "M23 16V48" },
  { k: "path", d: "M41 16V48" },
  { k: "path", d: "M44.5 16 53.5 12.4 62.5 16 53.5 19.6Z" },
  { k: "path", d: "M50.35 13.66 59.35 17.26" },
  { k: "path", d: "M44.5 24 53.5 27.6 62.5 24" },
  { k: "path", d: "M44.5 32 53.5 35.6 62.5 32" },
  { k: "path", d: "M44.5 40 53.5 43.6 62.5 40" },
  { k: "path", d: "M44.5 48 53.5 51.6 62.5 48" },
  { k: "path", d: "M44.5 16V48" },
  { k: "path", d: "M62.5 16V48" },
];

/* -- 02 · the pipeline ---------------------------------------------------- *
 * Three sources into two steps into one result. Depth is the point: the middle
 * column is a stage standing on what the column before it measured. Every
 * connector is orthogonal and arrives at an arrowhead on the edge of the node
 * it enters. */
const PIPELINE: readonly Shape[] = [
  { k: "rect", x: 2, y: 4, w: 13, h: 10, r: 2 },
  { k: "rect", x: 2, y: 27, w: 13, h: 10, r: 2 },
  { k: "rect", x: 2, y: 50, w: 13, h: 10, r: 2 },
  { k: "rect", x: 26, y: 12, w: 13, h: 12, r: 2 },
  { k: "rect", x: 26, y: 40, w: 13, h: 12, r: 2 },
  { k: "rect", x: 49, y: 26, w: 13, h: 12, r: 2 },
  { k: "path", d: "M15 9h5.5V15H26" },
  { k: "path", d: "M15 32h5.5V21H26" },
  { k: "path", d: "M15 55h5.5V46H26" },
  { k: "path", d: "M39 18h5.5V29H49" },
  { k: "path", d: "M39 46h5.5V35H49" },
  { k: "path", d: "m23.5 12.5 2.5 2.5-2.5 2.5" },
  { k: "path", d: "m23.5 18.5 2.5 2.5-2.5 2.5" },
  { k: "path", d: "m23.5 43.5 2.5 2.5-2.5 2.5" },
  { k: "path", d: "m46.5 26.5 2.5 2.5-2.5 2.5" },
  { k: "path", d: "m46.5 32.5 2.5 2.5-2.5 2.5" },
];

/* -- 03 · the knowledge graph --------------------------------------------- *
 * Fourteen nodes in two kinds, placed by hand and deliberately not symmetrical.
 *
 * Four large nodes are the entities — a table, a source, a spec. Ten small ones
 * are what portia measured about them, and the structure is the whole point of
 * the drawing: **no edge runs between two large nodes.** Every small node hangs
 * off exactly one large one, and where two entities are related it is because a
 * small node of the first is joined to a small node of the second. So a path
 * from one entity to another always goes through the facts that connect them,
 * which is the claim the column is making — what it knows about your data is a
 * graph of measurements, not a graph of names. Two of the small nodes are
 * joined to nothing else: not everything measured turns out to connect, and a
 * network where it all did would be a diagram of a wish.
 *
 * **The scatter is the drawing, and it took two tries.** The first layout put
 * the four entities near the four corners of the box at near-equal distance
 * from its centre; four points spread evenly on a ring is a rhombus, and the
 * eye reads the shape before it reads the graph. Moving them to an irregular
 * scatter fixed the rhombus and produced the second failure, which was worse:
 * with every cluster joined to its two neighbours, the fourteen nodes closed
 * into a single loop around an empty middle and the drawing read as a necklace.
 * Both are the same mistake — a network that resolves into an outline looks
 * authored rather than grown.
 *
 * So the entities sit at unequal distances and unequal angles, one of them
 * (`31 40`) pulled into the middle so the interior carries structure rather
 * than a hole; the satellites hang at radii from 10.2 to 14.6, which keeps the
 * silhouette ragged; and the clusters are joined in a chain with one
 * cross-link, not a cycle. The lower-left stays empty on purpose: filling every
 * quadrant evenly is how the necklace came back.
 *
 * Three constraints survive the irregularity: nothing sits within 4 units of
 * anything it is not joined to, two edges arriving at one node land at
 * different points on its circumference (the closest pair is 75° apart, at
 * `43 33`), and no edge crosses another.
 *
 * The two radii are kinds, not ranks. Every entity is the same size as every
 * other entity and every measurement the same size as every other measurement;
 * nothing here grows with its degree or its importance, which is the thing this
 * page may not draw. */
const GRAPH: readonly Shape[] = [
  { k: "circle", cx: 11, cy: 22, r: 5 },
  { k: "circle", cx: 41, cy: 12, r: 5 },
  { k: "circle", cx: 31, cy: 40, r: 5 },
  { k: "circle", cx: 53, cy: 47, r: 5 },
  { k: "circle", cx: 5, cy: 10, r: 2.6 },
  { k: "circle", cx: 7, cy: 34, r: 2.6 },
  { k: "circle", cx: 23, cy: 25, r: 2.6 },
  { k: "circle", cx: 55, cy: 8, r: 2.6 },
  { k: "circle", cx: 33, cy: 23, r: 2.6 },
  { k: "circle", cx: 17, cy: 42, r: 2.6 },
  { k: "circle", cx: 43, cy: 33, r: 2.6 },
  { k: "circle", cx: 34, cy: 53, r: 2.6 },
  { k: "circle", cx: 58, cy: 34, r: 2.6 },
  { k: "circle", cx: 46, cy: 58, r: 2.6 },
  { k: "path", d: "M6.16 12.33 8.76 17.53" },
  { k: "path", d: "M7.82 31.53 9.42 26.74" },
  { k: "path", d: "M20.48 24.37 15.85 23.21" },
  { k: "path", d: "M52.5 8.71 45.81 10.63" },
  { k: "path", d: "M34.53 20.9 38.06 16.04" },
  { k: "path", d: "M19.57 41.63 26.05 40.71" },
  { k: "path", d: "M40.75 34.31 35.32 37.48" },
  { k: "path", d: "M33.42 50.47 32.12 44.87" },
  { k: "path", d: "M57.07 36.43 54.8 42.33" },
  { k: "path", d: "M47.4 55.81 50.32 51.22" },
  { k: "path", d: "M25.55 24.49 30.45 23.51" },
  { k: "path", d: "M9.03 35.62 14.97 40.38" },
  { k: "path", d: "M34.84 24.84 41.16 31.16" },
  { k: "path", d: "M36.4 54 43.6 57" },
];

export const FORMATIONS: Record<FormationName, readonly Shape[]> = {
  tables: TABLES,
  pipeline: PIPELINE,
  graph: GRAPH,
};

/**
 * The one place a shape becomes path data.
 *
 * Rects and circles are written out as arcs rather than kept as their own
 * elements so that everything downstream — the icon's `pathLength="1"` draw-in
 * and the swarm's arc-length sampler — has exactly one kind of thing to handle.
 * A sampler that had to special-case `<circle>` would be a second copy of this
 * geometry waiting to drift.
 */
export function shapePath(s: Shape): string {
  if (s.k === "path") return s.d;
  if (s.k === "circle") {
    const { cx, cy, r } = s;
    return `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 ${-r * 2} 0Z`;
  }
  const { x, y, w, h, r } = s;
  return (
    `M${x + r} ${y}H${x + w - r}` +
    `A${r} ${r} 0 0 1 ${x + w} ${y + r}V${y + h - r}` +
    `A${r} ${r} 0 0 1 ${x + w - r} ${y + h}H${x + r}` +
    `A${r} ${r} 0 0 1 ${x} ${y + h - r}V${y + r}` +
    `A${r} ${r} 0 0 1 ${x + r} ${y}Z`
  );
}
