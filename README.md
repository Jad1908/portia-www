# portia-www

The public landing page for [portia](../portia) — an agent-assisted data harmonization copilot.

Separate from the product repo on purpose: different toolchain, different deploy cadence, and this
one is public. The coupling that matters is the design tokens, and it runs one way — `DESIGN.md` in
the product repo is the source of truth, `src/styles/tokens.css` here is generated from it.

## Getting started

```sh
pnpm install
pnpm dev
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

## Stack

Astro 5 · Tailwind v4 · Motion · Lenis · Inter + JetBrains Mono, self-hosted · pnpm ·
deployed to Cloudflare Pages.

Three React islands and no more: the spider, the early-access form, the FAQ. Everything else ships
zero JavaScript.
