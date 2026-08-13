import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";

/**
 * Content collections exist here for one reason from CLAUDE.md: **no
 * hard-coded copy in components**, so prose is reviewable as prose in a diff.
 * That mirrors the product's own rule about prompt text, and for the same
 * reason — the copy is the least stable, most consequential part of the page.
 *
 * Five collections:
 *   sections   — one MDX file per section of the page, in reading order
 *   principles — the three columns under the manifesto band
 *   showcase   — the three views of the app, under those columns
 *   claims     — short lines of consequence, grouped by section
 *   faq        — one MD file per question
 *
 * The `mockup` collection is gone and is **not** what `showcase` is. That one
 * fed a drawn three-pane mockup in the hero, and it went because a picture the
 * page had composed of a product it had not shipped is the thing this repo
 * exists to refuse. `showcase` names unretouched captures of the running app,
 * it sits after the argument rather than above it, and the images themselves
 * live in `lib/appShots.ts` because an asset is not copy. LANDING.md → "The
 * showcase" is the spec.
 *
 * **The `evidence` collection is gone too, and its rule is not.** It held three
 * engine timings under the warehouse section, each properly cited. They were
 * true and they were still wrong to publish: a visitor deciding whether this
 * tool is for them does not care how many seconds an index took, and three
 * mono figures under a marketing claim read as a benchmark whatever the caption
 * says. The rule they existed to serve — **no number appears on this page that
 * portia did not measure** — is unchanged, and is now satisfied by there being
 * no numbers at all. If one is ever needed again, it comes back as a cited row
 * and never as a stat block.
 */

/** One section of the page. `order` is LANDING.md's reading order, which is a
 *  layout constraint rather than a copy suggestion: the page argues before it
 *  demonstrates. */
const sections = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/sections" }),
  schema: z.object({
    order: z.number(),
    /** The `id` an in-page anchor targets. */
    anchor: z.string(),
    /** `section-label` — mono, uppercase, above the headline. **An empty
     *  string means the section renders no label at all**, which the manifesto
     *  band uses: its one sentence *is* the section, so a heading for it was a
     *  heading for nothing. */
    label: z.string(),
    title: z.string(),
    /**
     * The second line of a two-line headline, set in `mute` against the first
     * line's `ink`.
     *
     * It is a field rather than a `<br>` in `title` for two reasons: each line
     * rises out of its own clipped box, so the split has to be structural; and
     * the tonal contrast between the lines is the page's main typographic
     * device, so it should be visible to whoever edits the copy.
     */
    titleSecond: z.string().optional(),
    /** The lede. Fluid 17→22px, and only ever here or in the hero subhead. */
    lede: z.string().optional(),
    /** Shown in the nav only if set. Not every section earns a link. */
    nav: z.string().optional(),
  }),
});

const faq = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/faq" }),
  schema: z.object({
    order: z.number(),
    question: z.string(),
  }),
});

/**
 * The three columns under the manifesto band.
 *
 * `index` is a position and not a rank — see the file's own header. It is data
 * rather than MDX because the three are laid out as a grid, and a component
 * should not have to parse headings back out of rendered markdown to find them.
 */
const principles = defineCollection({
  loader: file("./src/content/principles.yaml"),
  schema: z.object({
    group: z.string(),
    index: z.string(),
    /** Which linework drawing sits above the column. See `PrincipleIcon`. */
    icon: z.enum(["tables", "pipeline", "graph"]),
    title: z.string(),
    body: z.string(),
  }),
});

/**
 * The three views of the app in the showcase section.
 *
 * Prose only. The captures themselves are in `lib/appShots.ts`, joined to these
 * by `id`, because an image is an asset and not copy — and because the
 * placement of a crop over a frame is a design value an editor rewriting a
 * sentence should not be able to move.
 *
 * `alt` is required on every image and is not optional prose: it is the whole
 * section for a visitor who cannot see it. It describes what is on the screen
 * and stops — no selling, and no number the capture does not itself show.
 */
const showcase = defineCollection({
  loader: file("./src/content/showcase.yaml"),
  schema: z.object({
    /** Reading order across the tab row. A position, never a rank. */
    order: z.number(),
    /** The pill label. Two or three words; the row has to stay one line. */
    tab: z.string(),
    /** One or two short sentences, swapped in with the view it describes. */
    lede: z.string(),
    altFull: z.string(),
    /** In the order they are drawn, which is back to front. */
    cards: z.array(z.object({ alt: z.string() })),
  }),
});

/**
 * `claim` — one short line of consequence, set at heading size.
 *
 * Split into `lead` (ink) and `rest` (body) so the claim lands before its
 * qualification does. Grouped rather than ordered: nothing in a group ranks
 * above anything else in it.
 */
const claims = defineCollection({
  loader: file("./src/content/claims.yaml"),
  schema: z.object({
    group: z.string(),
    lead: z.string(),
    rest: z.string(),
  }),
});

export const collections = { sections, principles, showcase, claims, faq };
