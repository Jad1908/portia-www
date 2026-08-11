# portia-www

The public landing page for [portia](../portia) — an agent-assisted data harmonization copilot.

Separate from the product repo on purpose: different toolchain, different deploy cadence, and this
one is public. The coupling that matters is the design tokens, and it runs one way — `DESIGN.md` in
the product repo is the source of truth, `src/styles/tokens.css` here is generated from it.

## Getting started

```sh
pnpm install
pnpm dev          # astro dev, port 4321 — the page, no /api
pnpm build
pnpm preview      # wrangler dev — the page *and* /api/early-access, as deployed
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
| `wrangler.jsonc` | The deploy config: Worker name, the `dist` asset binding, what runs first. |
| `worker/index.ts` | Routes `/api/*` to the Worker and everything else to the built site. |
| `worker/early-access.ts` | The form's endpoint. See `.env.example`. |
| `scripts/early-access-sheet.gs` | The webhook receiver — Apps Script, appends to a Sheet, emails you. |

## Wiring up the early-access form

The form posts to `/api/early-access`, a Worker route that validates and then **forwards**. It
owns no datastore. Two destinations, and they are alternatives rather than a chain — the webhook is
checked first and returns, so setting both means the Resend branch never runs.

With neither configured the endpoint answers `503` and the form says the form is not connected.
That is deliberate and it is not a broken state to rush past: a form that accepts a submission and
drops it is a control that lies, and this is the wrong page for one.

### The Sheet

1. New Google Sheet → **Extensions → Apps Script**. Paste `scripts/early-access-sheet.gs` over
   `Code.gs`. Set `NOTIFY` to your address if you want a mail per signup; leave it `""` and you
   still get the rows.
2. **Deploy → New deployment**, type **Web app**.
3. **Execute as: Me**, **Who has access: Anyone**. Both matter. "Me" is what lets the script write
   to your Sheet; "Anyone" is what lets Cloudflare POST without a Google session. Anything else and
   the Function sees a sign-in page, not your script — which Google serves with a 2xx, so the
   Function checks the content type and answers 502 rather than believing it.
4. Authorize when prompted. The unverified-app warning is expected — it is your own script.
5. Copy the deployment URL. It must end in **`/exec`**, not `/dev`.

Re-deploying after an edit: **Deploy → Manage deployments → edit → Version: New version.** Same
URL, new code. A brand-new deployment gives you a different URL and the old one keeps running the
old code, which is the confusing failure.

### The Cloudflare side

In the Worker → **Settings → Variables and Secrets**, set `EARLY_ACCESS_WEBHOOK_URL` to the `/exec`
URL. Variables apply to the *next* deploy, not to the running one, so redeploy after adding it or
the endpoint keeps answering 503. `SITE_URL` is different: it is read at build time by
`astro.config.mjs`, so it belongs in the build settings, not here. The compatibility date is pinned
in `wrangler.jsonc` rather than in the dashboard.

### Testing it before you merge

Put the URL in `.dev.vars` (gitignored — wrangler reads that file, not `.env`), then:

```sh
pnpm build && pnpm preview       # 8787, the page *and* the endpoint

# a real signup — expect {"ok":true} and a row in the Sheet
curl -i -X POST localhost:8787/api/early-access \
  -H 'content-type: application/json' \
  -d '{"email":"you@example.com","context":"testing the wiring"}'

# the honeypot — expect {"ok":true} and NO row
curl -i -X POST localhost:8787/api/early-access \
  -H 'content-type: application/json' \
  -d '{"email":"bot@example.com","company-website":"http://spam"}'
```

`pnpm dev` is Astro alone and serves no `/api`, so the form 404s there. That is expected — `pnpm
preview` is the one that runs what deploys. In production the log for a dropped submission is
`wrangler tail`; on the Sheet side, failures are in the Apps Script **Executions** view.

### Spam

A honeypot field and nothing else — off-screen, `aria-hidden`, out of the tab order, named
`company-website` because the obvious names are the ones password managers autofill. Filling it gets
a `200` and no row: the endpoint lies here, and only here, because a `400` that names the trap is
how the trap stops working. It logs, so a false positive is recoverable rather than invisible.

If the volume ever justifies more, the next step is Turnstile — a widget in the island and one
verify call in the Function. It is not needed for a page nobody has linked to yet.

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
deployed to Cloudflare Workers.

Three React islands and no more: the spider, the early-access form, the FAQ. Everything else ships
zero JavaScript.
