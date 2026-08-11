# portia-www

The public landing page for [portia](../portia) — an agent-assisted data harmonization copilot.

Separate from the product repo on purpose: different toolchain, different deploy cadence, and this
one is public. The coupling that matters is the design tokens, and it runs one way — `DESIGN.md` in
the product repo is the source of truth, `src/styles/tokens.css` here is generated from it.

## Getting started

```sh
pnpm install
pnpm dev          # astro dev, port 4321 — the page, no Pages Functions
pnpm build
pnpm preview      # wrangler pages dev dist — the page *and* /api/early-access
pnpm check        # astro check
pnpm og           # regenerate public/og.png from public/og.svg
```

Clone `portia` as a sibling directory. Several things here — the token file, the hero mockup, every
factual claim on the page — are checked against it:

```
Python projects/
├── portia/
└── portia-www/
```

## Where things are

| Path | What |
|---|---|
| `CLAUDE.md` | How to work in this repo, and what must stay true about the product. Read first. |
| `LANDING.md` | The design system for this page — tokens, type, components, do's and don'ts. |
| `src/styles/tokens.css` | Generated from `../portia/DESIGN.md`. The only place a color is declared. |
| `src/content/sections/` | One MDX file per section, in reading order. All the prose lives here. |
| `src/content/faq/` | One file per question. |
| `src/content/evidence.yaml` | **Every number on the page**, each with what produced it and where it was checked. |
| `src/content/mockup.yaml` | What the three panes of the hero mockup show. All of it off real runs. |
| `src/lib/mark.ts` | The spider's geometry, shared by the nav lockup and the scroll creature. |
| `functions/api/early-access.ts` | The form's Cloudflare Pages Function. See `.env.example`. |

## The two rules that shape the code

**Every number on the page is an `evidence-row` or it is not on the page.** `src/content/evidence.yaml`
is the whole list, and each entry carries a `source` (what measured it) and a `verified` (where to
re-check it). There is no benchmark on this page and there is not going to be one until
`../portia/docs/EVALUATION.md` has something worth quoting.

**No hard-coded copy in components.** Prose lives in content collections so it is reviewable as
prose in a diff — the same rule the product applies to its prompt text, for the same reason.

## Reproducing the fixture

The mockup, the artifact section and the `artifact` evidence rows all come from one project. To
rebuild it:

```sh
cd ../portia/sandbox/www-demo
python -m portia.cli.run specs/hotel_daily_demand.yaml --write out
python -m portia.cli.build
```

It should come out at **14 rows, revenue 136,240, rooms_sold 147** — which is the hotel fixture's
answer key in `../portia/tests/fixtures/hotels.answers.yaml`.

## Stack

Astro 5 · Tailwind v4 · Motion · Lenis · Inter + JetBrains Mono, self-hosted · pnpm ·
deployed to Cloudflare Pages.

Three React islands and no more: the spider, the early-access form, the FAQ. Everything else ships
zero JavaScript.
