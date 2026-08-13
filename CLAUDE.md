# portia-www — read this first

This repo is **the public landing page for portia**. It is not the product. The product lives in a
sibling checkout:

```
/Users/jadaouad/Python projects/
├── portia/        ← the product: engine, copilot, app
└── portia-www/    ← you are here: the landing page
```

**Add `../portia` as a working directory at the start of any session here.** Almost every question
this repo raises — what a number means, what the app actually looks like, whether a claim is true —
is answered in that checkout and nowhere else. Without it you will write plausible marketing copy
about a product you cannot see.

## Read before writing anything

**In this repo:**

- `LANDING.md` — **the design system for this page**, and the thing to read first. Tokens,
  typography, components, do's and don'ts. It is adapted from OpenCode's marketing system and
  re-pointed onto portia's palette; the "What this file overrides, and why" table is the part to
  read twice, because it names the five places this page deliberately departs from the app's design
  system and asserts that everything else inherits unchanged.

**In `../portia`, in this order:**

- `DESIGN.md` — **the app's design system, and the upstream of every token here.** `LANDING.md`
  inherits its palette wholesale. When the two disagree about a color, `DESIGN.md` is right and this
  repo has a bug.
- `CLAUDE.md` — how the product is built and what its seams are. Read the "facts vs judgment"
  section; it is the source of the one rule this page cannot break.
- `docs/VISION.md` — the three-pane app and its flows. Needed to draw the hero mockup honestly, and
  its **"Flow — a cloud-hosted project"** section is the source for the cloud half of the page's
  story. Note what that section says about itself.
- `docs/PLAN.md` — direction, and **"Where we are"** plus **"Shipped"**, which is the authority on
  what is true today. Copy claims get checked against this, not against memory.
- `docs/PIPELINE.md` §6 — how the canvas renders, if the mockup shows the middle pane.

Skip `DUCKDB_MIGRATION.md`, `KNOWLEDGE_GRAPH.md`, `SQL_LINEAGE.md`, `GRAPH_SCHEMA.md` and
`CONVERSATION.md` unless writing copy about that specific subsystem. They are engine docs.

## The rule this page cannot break

portia's premise is that **deterministic code owns facts and consequences; the agent owns
judgment.** The checks layer is forbidden from ranking, scoring or prioritizing evidence. In the
app that becomes: *color and prominence communicate kind, never rank.* It carries here unchanged,
and it binds **harder** on a landing page, because every convention of the genre pushes against it —
green ticks beside features, three big numbers in a stat block, a severity-colored comparison table,
a badge that scales with its figure. Each of those is the ranking the engine refused to do,
performed on the engine's behalf, on the page that exists to explain why it refuses.

If a design choice would look normal on any other SaaS landing page, that is not evidence it is
fine here. Check it against `LANDING.md` → "Do's and Don'ts".

## Honesty rules for copy

The page describes a **product still being built**. Three hard constraints:

**1. Do not cite an eval run as evidence about anything.** `../portia/docs/EVALUATION.md` is
explicit: the runs recorded there are **pipeline shakedown, not scores** — they held every prompt at
its first draft, so they found defects in portia's code and nothing about the copilot's judgment.
The file also records a result that was retracted. No benchmark claims, no "N% accuracy", no
comparison table. There is no measurement of the copilot's quality to cite, and inventing one would
be the exact failure the product is built to prevent.

**2. Separate what is shipped from what is vision, and never blur them.** As of the last read of
`PLAN.md`:

| | Status |
|---|---|
| Engine (`checks`, `ops`, `spec`, `catalog`), DuckDB throughout | **Shipped** |
| Copilot loop — layered context, tool ladder, questions routed to a human, spec writing | **Shipped** |
| V0 of the three-pane app, full run with no terminal | **Shipped** |
| SQL as the artifact — one committed `.sql` per spec, dbt-shaped | **Shipped** |
| Knowledge graph (Neo4j), column-level lineage | **Shipped** |
| Multi-turn conversation, chats and indexing histories | **Shipped** |
| **Warehouse / cloud-hosted projects** | **Vision.** `VISION.md` calls it *"later, and a UI vision before it is a mechanism… Nothing here is scheduled."* |
| **Collaboration / multi-user** | **Vision.** portia today is project-local with no central store and nothing that aggregates across projects. |

The brief for this page is to reflect **the final vision — a collaborative, cloud-connected DS
copilot.** That is legitimate and it is what the page should communicate. What is not legitimate is
present-tense phrasing for the two rows marked Vision. Write them as where portia is going, with the
constraint that makes them credible (*the data never moves* — measurements run where the data is,
only small results come back), not as features you can use today.

**3. Every number on the page must be one portia actually produced**, rendered in mono, with what
produced it named beside it (`LANDING.md` → `evidence-row`). No invented figures, no decorative
charts, no `Fig 1.` sparse-line ornament. Real measured facts available to cite live in `PLAN.md` →
Shipped and in the migration doc — verify each against its source before it goes on the page, and
cite it to the thing that measured it.

## The token coupling — the one thing that must not fork

`src/styles/tokens.css` is **generated from `../portia/DESIGN.md`** and carries a header comment
naming the commit sha it was derived from. It is the only place colors are declared; Tailwind v4's
`@theme` consumes it, so every utility class on the page derives from the app's palette.

- Never hand-edit a hex in a component. Change `DESIGN.md` upstream, regenerate, bump the sha.
- Landing-only tokens (`canvas-deep`, the 44px display, the 96px section rhythm) are declared in a
  clearly separated block **below** the inherited ones, so what is portia's and what is this page's
  never has to be guessed.
- When `DESIGN.md` moves, regenerate and update `inherits-sha` in `LANDING.md`'s front matter.

The failure this prevents is small and certain: the page and the app disagreeing about teal, in a
product whose entire pitch is that two surfaces must never disagree about a number.

## Stack

- **Astro 5** — the page is overwhelmingly static and ships zero JS for prose.
- **React islands, three of them only**: the spider, the early-access form, the FAQ. Anything else
  wanting an island is a signal to check whether it needs to be interactive at all.
- **Tailwind v4**, theming through `@theme` off `tokens.css`.
- **Motion** (`motion`) for reveals and the spider. **Lenis** for smooth scroll, disabled under
  `prefers-reduced-motion`. Escalate to GSAP ScrollTrigger only if a pinned scroll scene is added.
- **Inter** (variable, `ss03` on) + **JetBrains Mono**, both self-hosted. No third face, no 700
  weight, no italics.
- **pnpm.** Deployed to **Cloudflare Workers** with static assets (not Vercel — its Hobby tier
  prohibits commercial use). `wrangler.jsonc` is the config, `worker/` holds the one dynamic route.
  Note this is Workers, *not* Pages: the `functions/` directory convention does not exist here, and
  a route placed there compiles locally under `wrangler pages dev` and 404s in production.

## Conventions

- **The mono/prose split is semantic, not decorative.** Inter for English; mono for anything a human
  typed as data or an identifier — column names, null rates, keys, SQL, YAML, row counts, file
  paths. This is `DESIGN.md`'s rule and it is the reason this page is not rendered entirely in mono
  like the system it was adapted from. Getting it wrong is the most likely way to break the page's
  identity without noticing.
- **No hard-coded copy in components.** Section content lives in content collections or MDX, so
  prose is reviewable as prose in a diff. This mirrors the product's own rule about prompt text.
- **The spider is the only decorative ornament on the page.** No gradients, no glows, no
  atmospheric backgrounds, no shadows on persistent chrome. Motion carries the modernity. The
  showcase's floating crops are the one exception and they are not decoration — they are captures
  of the product, and they carry the page's single sanctioned shadow. `LANDING.md` → "The fourth
  build" is the whole of that permission.
- **Reduced-motion is not an afterthought.** Every animation has a static resting state that is the
  designed state, not a degraded one.
- **Build order**: the SVG mark first (the nav lockup, favicon, OG image and scroll spider all
  derive from it), then the static page with no motion, then the motion pass. A scroll-linked spider
  tuned before the page has its real scroll height gets tuned twice.

## Branching

Same rule as the product repo: **never work on `main` directly.** Check the current branch at the
start of a task; if a relevant one is checked out, use it, otherwise cut a descriptively-named
branch off `main`. Only merge or push to `main` when asked.
