import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";

/**
 * Content collections exist here for one reason from CLAUDE.md: **no
 * hard-coded copy in components**, so prose is reviewable as prose in a diff.
 * That mirrors the product's own rule about prompt text, and for the same
 * reason — the copy is the least stable, most consequential part of the page.
 *
 * Seven collections:
 *   sections   — one MDX file per section of the page, in reading order
 *   film       — the launch film, at the top of the app section
 *   showcase   — the four views of the app, under the film
 *   principles — the three columns naming what the showcase just showed
 *   claims     — short lines of consequence, grouped by section
 *   faq        — one MD file per question
 *   install    — the two ways in, behind the install section's tabs
 *
 * The `mockup` collection is gone and is **not** what `showcase` is. That one
 * fed a drawn three-pane mockup in the hero, and it went because a picture the
 * page had composed of a product it had not shipped is the thing this repo
 * exists to refuse. `showcase` names unretouched captures of the running app,
 * and the images themselves live in `lib/appShots.ts` because an asset is not
 * copy. LANDING.md → "The showcase" is the spec.
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
 * The three columns under the showcase.
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
    /** Which shape the swarm settles into for this row. See `lib/formations`. */
    formation: z.enum(["tables", "pipeline", "graph"]),
    title: z.string(),
    body: z.string(),
  }),
});

/**
 * The launch film, above the four captures in the app section.
 *
 * Prose and provenance. The poster is an asset and lives in `src/assets/film`;
 * the two encodes live nowhere in this repo at all (see `LaunchFilm.astro` and
 * `.env.example` → `PUBLIC_FILM_BASE`), so `sources` names them and `render`
 * records the cut they came from. The one figure here, `duration`, is the
 * file's running time — the film's own, rendered in mono, not a number the
 * page chose.
 */
const film = defineCollection({
  loader: file("./src/content/film.yaml"),
  schema: z.object({
    /** The video's accessible name. What it is, not what it sells. */
    title: z.string(),
    /** The play control's label. */
    action: z.string(),
    /** `m:ss`. Rendered in mono beside the control. */
    duration: z.string().regex(/^\d+:\d\d$/),
    /** File names under `PUBLIC_FILM_BASE`. `hd` is what desktops play; `sd`
     *  is what a phone or a metered connection gets instead. */
    sources: z.object({ hd: z.string(), sd: z.string() }),
    /** Where the encodes came from, so the film on the page is traceable. */
    render: z.object({
      project: z.string(),
      file: z.string(),
      revision: z.string(),
      date: z.string(),
    }),
  }),
});

/**
 * The four views of the app in the showcase section.
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

/**
 * The two ways to install, behind the tabs in the install section.
 *
 * `lines` is what the copy button puts on the clipboard, joined by newlines, so
 * it holds nothing a visitor should not paste. It is copy rather than an asset
 * because the commands change with the README, and a diff to them should read
 * as a diff to the page's words.
 */
const install = defineCollection({
  loader: file("./src/content/install.yaml"),
  schema: z.object({
    /** Position in the tab row. Never a rank. */
    order: z.number(),
    tab: z.string(),
    /** `shell` draws a `$` before each line; `prompt` wraps as a sentence. */
    kind: z.enum(["shell", "prompt"]),
    lines: z.array(z.string()).min(1),
    caption: z.string(),
    link: z.object({ label: z.string(), href: z.string().url() }),
  }),
});

export const collections = {
  sections,
  film,
  principles,
  showcase,
  claims,
  faq,
  install,
};
