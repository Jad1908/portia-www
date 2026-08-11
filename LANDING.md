---
version: alpha
name: portia-landing-design
description: |
  The design system for portia's public landing page — a separate surface from the app, adapted
  from OpenCode's terminal-native marketing system and re-pointed onto portia's own tokens. It
  inherits the app's entire palette, its Inter/mono split and its hairline discipline from
  `DESIGN.md`, and adds only what a marketing page genuinely needs and an app does not: a fluid
  44→88px display ramp, a fluid 64→144px section rhythm, and one full-bleed dark surface carrying
  the manifesto. It keeps OpenCode's austerity — flat on canvas, no gradients, no glows, no
  atmospheric backgrounds, hairlines as the only divider — with two named exceptions: the portia
  spider hanging from a dragline that tracks the scroll, and two counter-drifting logo marquees.
  There are no screenshots of the app anywhere on the page, and the brand image is the
  application's own logo rather than a redraw of it. Light and dark are equal first-class modes,
  as in the app. The product rule carries over unchanged and binds hardest here, where marketing
  instinct pushes against it: **color and prominence communicate kind, never rank.**

  READ "The second build" BEFORE TRUSTING ANY OTHER SECTION. The page was built once to this spec
  and then substantially rebuilt; that section records the four places the original spec was wrong
  and what replaced them.

inherits: ../portia/DESIGN.md
inherits-sha: fa34c888e76eea9264b08fab457ce18e9f55ce93
adapted-from: OpenCode marketing system (Anomaly) — colors, rhythm and austerity; not its typography

colors:
  accent-primary:        { light: "#0C6B61", dark: "#0D9488" }
  accent-primary-pressed:{ light: "#0A564E", dark: "#0B7D72" }
  on-accent:             { light: "#FFFFFF", dark: "#FFFFFF" }
  accent-text:           { light: "#0C6B61", dark: "#2DD4BF" }
  accent-soft:           { light: "rgba(12,107,97,0.10)",  dark: "rgba(13,148,136,0.18)" }
  canvas:                { light: "#F4F6F9", dark: "#08090C" }
  surface:               { light: "#FCFDFE", dark: "#0D0F14" }
  surface-elevated:      { light: "#FFFFFF", dark: "#12141B" }
  surface-card:          { light: "#FFFFFF", dark: "#171922" }
  canvas-deep:           { light: "#08090C", dark: "#08090C" }
  hairline:              { light: "#E3E6EC", dark: "#25282F" }
  hairline-strong:       { light: "rgba(0,0,0,0.14)", dark: "rgba(255,255,255,0.16)" }
  hairline-soft:         { light: "rgba(0,0,0,0.06)", dark: "rgba(255,255,255,0.08)" }
  ink:                   { light: "#0E1116", dark: "#F3F4F7" }
  body:                  { light: "#3A3F47", dark: "#C9CCD3" }
  mute:                  { light: "#6B7079", dark: "#969AA4" }
  ash:                   { light: "#9AA0A8", dark: "#696D77" }
  stone:                 { light: "#C2C7CE", dark: "#43464E" }
  error:                 { light: "#D93A45", dark: "#FF6B6B" }
  error-soft:            { light: "rgba(217,58,69,0.10)", dark: "rgba(255,107,107,0.16)" }
  warning:               { light: "#B7791F", dark: "#FFC94D" }
  warning-soft:          { light: "rgba(183,121,31,0.10)", dark: "rgba(255,201,77,0.16)" }
  success:               { light: "#1F9A63", dark: "#5FD49B" }
  success-soft:          { light: "rgba(31,154,99,0.10)", dark: "rgba(95,212,155,0.16)" }

typography:
  # The display ramp is FLUID. The floor of each clamp is the flat value this file
  # originally specified, so a narrow viewport gets the original scale unchanged;
  # the ceiling is the revision. See "The second build", item 1.
  display-2xl:  { fontFamily: Inter, fontSize: "clamp(44px, 7.2vw, 88px)", fontWeight: 600, lineHeight: 1.02, letterSpacing: "-0.03em" }
  statement:    { fontFamily: Inter, fontSize: "clamp(30px, 5.2vw, 60px)", fontWeight: 600, lineHeight: 1.1,  letterSpacing: "-0.02em" }
  display-xl:   { fontFamily: Inter, fontSize: "clamp(32px, 4.2vw, 52px)", fontWeight: 600, lineHeight: 1.08, letterSpacing: "-0.02em" }
  display-lg:   { fontFamily: Inter, fontSize: 32px, fontWeight: 600, lineHeight: 1.2,  letterSpacing: 0 }
  lede:         { fontFamily: Inter, fontSize: "clamp(17px, 1.1vw + 12.8px, 22px)", fontWeight: 400, lineHeight: 1.5, letterSpacing: 0 }
  heading-md:   { fontFamily: Inter, fontSize: 20px, fontWeight: 500, lineHeight: 1.3,  letterSpacing: "0.2px" }
  heading-sm:   { fontFamily: Inter, fontSize: 16px, fontWeight: 500, lineHeight: 1.4,  letterSpacing: "0.2px" }
  body-lg:      { fontFamily: Inter, fontSize: 17px, fontWeight: 400, lineHeight: 1.6,  letterSpacing: 0 }
  body-md:      { fontFamily: Inter, fontSize: 16px, fontWeight: 400, lineHeight: 1.6,  letterSpacing: 0 }
  body-strong:  { fontFamily: Inter, fontSize: 16px, fontWeight: 500, lineHeight: 1.6,  letterSpacing: "0.1px" }
  caption:      { fontFamily: Inter, fontSize: 13px, fontWeight: 400, lineHeight: 1.5,  letterSpacing: "0.2px" }
  button:       { fontFamily: Inter, fontSize: 15px, fontWeight: 500, lineHeight: 1.4,  letterSpacing: "0.2px" }
  mono:         { fontFamily: JetBrains Mono, fontSize: 14px, fontWeight: 400, lineHeight: 1.6,  letterSpacing: 0 }
  mono-sm:      { fontFamily: JetBrains Mono, fontSize: 13px, fontWeight: 400, lineHeight: 1.55, letterSpacing: 0 }
  mono-caption: { fontFamily: JetBrains Mono, fontSize: 12px, fontWeight: 400, lineHeight: 1.5,  letterSpacing: 0 }

rounded:
  none: 0px
  xs:   4px
  sm:   6px
  md:   8px
  lg:   10px
  full: 9999px

spacing:
  xxs: 2px
  xs:  4px
  sm:  8px
  md:  12px
  lg:  16px
  xl:  24px
  xxl: 32px
  xxxl: 48px
  # Fluid, so the gap tracks the type it separates: 96px flat under an 88px
  # headline reads as cramped, and under a 44px one on mobile it reads as loose.
  section: "clamp(64px, 9vw, 144px)"

motion:
  reveal:       { duration: 420ms, easing: "cubic-bezier(0.16, 1, 0.3, 1)", distance: 12px }
  stagger:      { delay: 60ms }
  spider-drop:  { stiffness: 90, damping: 18, mass: 1.1 }
  spider-swing: { maxRotate: 14deg, velocityScale: 0.02, restDelay: 400ms }
  dragline-bow: { maxOffset: 18px }

components:
  button-primary:
    backgroundColor: "{colors.accent-primary}"
    textColor: "{colors.on-accent}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 0px 20px
    height: 40px
  button-primary-pressed:
    backgroundColor: "{colors.accent-primary-pressed}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.md}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    border: "1px solid {colors.hairline-strong}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 0px 20px
    height: 40px
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.mute}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 0px 12px
  text-input:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.ink}"
    border: "1px solid {colors.hairline}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 0px 12px
    height: 40px
  text-input-focused:
    backgroundColor: "{colors.accent-soft}"
    border: "1px solid {colors.accent-primary}"
    rounded: "{rounded.md}"
  code-block:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.body}"
    border: "1px solid {colors.hairline}"
    typography: "{typography.mono-sm}"
    rounded: "{rounded.md}"
    padding: 16px
  # The page's one full-bleed inversion. It replaced `hero-app-mockup`, which is
  # deleted along with the screenshot it framed — see "The second build", item 2.
  band:
    backgroundColor: "{colors.canvas-deep}"
    textColor: "{colors.body}"
    border: "1px solid {colors.hairline}"
    typography: "{typography.statement}"
    rounded: "{rounded.none}"
    padding: "clamp(72px, 10vw, 160px) 0px"
  pillar:
    backgroundColor: "transparent"
    textColor: "{colors.body}"
    typography: "{typography.body-md}"
    border-top: "1px solid {colors.hairline}"
    rounded: "{rounded.none}"
  claim:
    backgroundColor: "transparent"
    textColor: "{colors.body}"
    typography: "{typography.heading-md}"
    border-top: "1px solid {colors.hairline}"
    rounded: "{rounded.none}"
    padding: 12px 0px
  marquee-item:
    backgroundColor: "transparent"
    textColor: "{colors.mute}"
    typography: "{typography.heading-sm}"
    rounded: "{rounded.none}"
    glyphSize: 22px
  # Retired 2026-08-11 along with every number on the page. Kept in the spec,
  # unreferenced, because it is the only sanctioned way a figure comes back.
  # See "The third build", item 3.
  evidence-row:
    backgroundColor: "transparent"
    textColor: "{colors.body}"
    typography: "{typography.mono}"
    rounded: "{rounded.none}"
    padding: 8px 0px
  list-row:
    backgroundColor: "transparent"
    textColor: "{colors.body}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: 8px 0px
  faq-row:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: 12px 0px
  section-label:
    backgroundColor: "transparent"
    textColor: "{colors.mute}"
    typography: "{typography.mono-caption}"
    rounded: "{rounded.none}"
  badge:
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.accent-text}"
    typography: "{typography.mono-caption}"
    rounded: "{rounded.xs}"
    padding: 2px 8px
  primary-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-strong}"
    rounded: "{rounded.none}"
    height: 56px
  footer-section:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.mute}"
    typography: "{typography.caption}"
    rounded: "{rounded.none}"
    padding: 48px 0px
  link-inline:
    textColor: "{colors.accent-text}"
    typography: "{typography.body-md}"
  # The application's own logo, generated by `pnpm mark`. The only brand image on
  # the page — see "The second build", item 3.
  brandmark:
    source: public/portia-mark.png
    navSize: 44px   # in a 56px bar. See "The third build", item 6.
    footerSize: 24px
  # The linework drawing above each of the three columns. One colour, one
  # weight, one size for all three — see "The third build", item 7.
  pillar-icon:
    strokeColor: "{colors.mute}"
    strokeWidth: "1.5px at 40px"
    size: 40px
    rounded: "{rounded.none}"
  # The linework creature. No longer the brand mark; the scroll spider only.
  spider:
    strokeColor: "{colors.ink}"
    accentColor: "{colors.accent-text}"
    strokeWidth: "2.5px at 32px"
    draglineColor: "{colors.hairline-strong}"
---

## Overview

This file owns the **landing page** and nothing else. `DESIGN.md` owns the app; where the two
overlap on a token, `DESIGN.md` wins and this file is wrong. Where they disagree on a *rule*, the
disagreement is listed below under "What this file overrides", with the reason — nothing here
diverges silently.

The system is adapted from OpenCode's marketing site, which is worth being explicit about because
the borrowing is partial. What was taken: the **96px section rhythm**, the **flat-on-canvas
austerity** (no shadows, no gradients, hairlines as the only divider), the **left-flush** content
column with no decorative indentation, the discipline of **exactly one dark surface per page** used
as a narrative device rather than a chrome treatment, and — importantly — its **restraint at the
top**: OpenCode's hero runs at 38px, which is far closer to portia's temperament than the 56–72px a
marketing page usually reaches for. What was **not** taken: its 100%-monospace identity, its warm
cream palette, its Apple semantic ramp, and its ink-as-brand-color. Each of those collided with
something portia's own system already decides, and in each case portia's decision won.

The page is **light and dark**, resolved from `prefers-color-scheme` with a manual override, exactly
as the app is. A landing page that only exists in light while every screenshot on it is dark is a
product that looks like two products.

**Key characteristics:**
- The app's entire palette, inherited unchanged. Cool, never warm.
- **Inter for prose, mono for anything measured** — the split is semantic, not decorative (below).
- One teal primary action per section. `{colors.accent-primary}` is the only chroma in the chrome.
- 1px `{colors.hairline}` is the only divider. No shadows, no gradients, no glows, no washes.
- **A wide, fluid display ramp** — 44→88px at the hero against a 12px mono label. Contrast is bought
  with size only: weights still cap at 600, there is no third face, and a headline is never coloured.
- `{spacing.section}`, fluid 64→144px, between every block.
- Exactly one full-bleed `{colors.canvas-deep}` surface per page: `{components.band}`, carrying the
  manifesto. **No screenshots of the app anywhere**, and no artifact excerpts.
- Radius vocabulary of two working values — `{rounded.md}` (8px) on interactive, `{rounded.none}` on
  full-bleed bands — matching the app, not OpenCode's 4px.
- **Two pieces of ornament exist on the whole page and both are named**: the spider, and the two
  counter-drifting logo marquees.

### The rule that is specific to this product

`DESIGN.md` states it for the app and it carries here unchanged: **color and prominence communicate
*kind*, never *rank*.** portia's premise is that deterministic code owns facts and the agent owns
judgment; the checks layer is forbidden from ranking, scoring or prioritizing evidence.

It binds *harder* on a landing page than in the app, because every instinct of the genre pushes
against it. A marketing page wants a green tick beside each feature, a stat block with three big
numbers, a severity-colored comparison table, a badge that grows with its figure. Each of those is
the ranking the engine refused to do, performed on the engine's behalf, on the page that exists to
explain why the engine refuses.

So:
- `{colors.error}` on this page means **a blocking zero** — a fact with no threshold behind it.
- `{colors.warning}` means **drift** — a prediction that didn't hold.
- `{colors.accent-text}` means **an acknowledged override** — a human decision on the record.
- `{colors.success}` is the rarest color on the page and may only sit beside a measurement portia
  actually made. It may never summarize a section, a feature or a table.
- Nothing is sorted by severity. No badge scales with its number. No heat scale, anywhere.

---

## What this file overrides, and why

`DESIGN.md` is written for a working application and says so: *"This is an app, not a marketing
page. No hero, no footer, no pricing grid."* That sentence is correct and stays correct — it should
**not** be edited to accommodate this page, because the discipline it enforces is what keeps the app
quiet. A landing page is a different surface with a different job, and it gets its own file.

Five overrides, and only five:

| # | `DESIGN.md` says | This page does | Why |
|---|---|---|---|
| 1 | `display` caps at **32px** | `{typography.display-2xl}`, fluid **44 → 88px** | A hero read from two feet away, not a pane title read from twenty inches. **Revised** — see "The second build" below. |
| 2 | Body is **13px** | `{typography.body-md}` at **16px** | 13px is tuned for scanning a dense pane. This is prose across a 720px column. |
| 3 | *"Never pad a surface 32px+ on all sides"* | `{spacing.section}`, fluid **64 → 144px** | The app rule exists so data runs tight. There is no data in a section gap. |
| 4 | *"At most one accent per view"* | One primary per **section** | A page is not a view. Secondaries stay `{components.button-secondary}` — hairline, no fill. |
| 5 | *"No hero stripe, no brand moment"* | The logo, and the spider | The single named carve-out. **Revised** — see below. |

Everything else in `DESIGN.md` — the palette, the type split, the hairline discipline, the radius
ladder, the no-shadow rule, and the product rule above — applies here **unchanged**.

---

## The second build — what this file got wrong the first time

The page was built once to the spec above and then substantially rebuilt. Four things changed, and
they are recorded here rather than quietly patched, because each one contradicts a sentence
elsewhere in this document and the contradiction should be visible to whoever reads it next.

**1. The 44px ceiling was wrong, and the reason it was wrong is instructive.** The argument for it
— *portia is a quiet surface, and OpenCode survives at 38px* — held for the hero in isolation and
failed for the page. With display at 44, section headlines at 32 and body at 16, **every block on
the page landed within 12px of every other**, and the result read as cheap rather than as
restrained. Austerity and flatness are not the same property: OpenCode is austere *and* has enormous
typographic contrast, and this file borrowed only the first half. The ramp is now fluid — the hero
at `clamp(2.75rem, 7.2vw, 5.5rem)`, section headlines at `clamp(2rem, 4.2vw, 3.25rem)` — and the
**floor is the old ceiling**, so a narrow viewport still gets exactly the scale originally specified.
Weights still top out at 600 and there is still no third face; the contrast is bought with size,
never with weight or colour.

**2. There are no screenshots, and no artifact excerpts.** The three-pane `hero-app-mockup` and the
spec-beside-its-compiled-SQL pairing are both gone, along with `mockup.yaml` and the `CodeBlock`
component. They were the two most detailed things on the page and they were what made it read as
documentation rather than as an argument. Consequences worth naming:

- **The single `{colors.canvas-deep}` surface is now spent on the manifesto**, not on a picture of
  the product. It is a better use of the page's one inversion: it lands exactly where the page stops
  describing and starts asserting. The `.band` component replaces `hero-app-mockup`; it still works
  by scoping `.mode-dark` over its subtree, so it is still the app's dark mode rather than a
  hand-picked grey.
- **"Don't put a terminal in the hero" is now moot**, and so is the fake-colorize rule for the
  mockup. The rule those two protected — status colour is state, never decoration — is unchanged and
  still binds everywhere else.
- **The three panes are not mentioned anywhere.** How the window is divided is not a reason to try
  the product; it was an implementation detail wearing a section heading.

**3. The brand mark is the application's own logo, not a redraw of it.** This file specified a
geometric linework mark for the nav, footer, favicon and OG card, and explicitly ruled the existing
raster out. That is reversed. `public/portia-mark.png` is generated by `pnpm mark` from
`../portia/portia/ui/assets/cute-portia.png` — trimmed to the ink and re-padded square — and is the
only brand image on the page. The reasoning is this file's own reasoning applied one level up: the
whole `tokens.css` mechanism exists so the page and the app cannot disagree about a colour, and a
page that draws its own version of the animal is that same disagreement in a different medium.

The linework mark survives in **exactly one place**, the scroll spider, because a raster cannot take
`currentColor` and cannot animate its legs. Its geometry stays in `src/lib/mark.ts`;
`components/Mark.astro` and `public/favicon.svg` are deleted. The drawing rules below still govern
the creature. **`assets/the-portia-spider.jpg` is still never shipped.**

**4. Present-tense copy about warehouses and model providers, decided deliberately.** `CLAUDE.md`'s
honesty rule says vision rows are written as where portia is going, never in the present tense. The
warehouse band and the model band both break that: they say *"It runs where your data already
lives"* and *"Any model, including the one on your laptop"*, and today portia is DuckDB-local and
runs on the Claude Agent SDK.

This was raised and then chosen — the page's brief is the final vision, and the two bands are the
clearest statement of it. It is recorded here so it is a decision on the record rather than a drift.
**What did not move**: every *number* on the page is still one portia actually measured, still
rendered in mono with its source named beside it, and there is still no benchmark and no claim about
the copilot's quality anywhere. The line that cannot be crossed is the invented measurement, and it
is not crossed.

**6. The mark runs at 44px in a 56px bar, and the asset lost its padding.** At 30px the app's logo
read as a favicon that had wandered onto the page — the creature is the brand and it was the
smallest thing in the chrome. `pnpm mark` now trims to the ink with **no re-padding at all**, so
every pixel of the 44px box is spider rather than transparent margin, and exports at 176px for a
3× display. The bar did not get taller; the drawing inside it got bigger.

**7. Each of the three columns carries a linework icon that draws itself in.** Tables, a pipeline
merging two sources into one, and a knowledge graph — `PrincipleIcon.astro`. Two things make this
consistent with a system that has been austere about ornament:

- **It costs no script.** Every shape carries `pathLength="1"`, which normalises its geometry to a
  unit length, so one `stroke-dashoffset: 1 → 0` rule animates a rect, a circle and a bezier
  identically off the `.is-in` class the page's observer already sets. No path measured in JS, no
  fourth island.
- **It cannot rank.** One colour (`{colors.mute}`), one stroke weight, one size, for all three.
  These sit above columns the system forbids from ranking, and an icon that grew or coloured with
  its column would perform exactly the ranking the engine refuses. Under `prefers-reduced-motion`
  the offset resolves to 0 with no transition — the icon is simply *there*, which is the designed
  state and not a frame of the drawing.

**8. There is no light/dark toggle.** The mode follows `prefers-color-scheme` and nothing else. A
switch in the chrome asks a visitor to state a preference they have already given their OS, and it
costs a blocking pre-paint script to stop the stored answer flashing. **Both modes are still
first-class** — this removed the control, not dark mode, and the band still renders by scoping the
app's dark tokens exactly as before.


**A note on the logo bands.** Two marquees, drifting in opposite directions, are the second piece of
motion-as-content after the spider. They earn it the same way: a grid of logos says "here is a
list", a band with no beginning says "and more where these came from", which is the actual claim.
They are held to the ranking rule like everything else — one ink colour, one glyph size, even
spacing, no logo first or larger than another — and under `prefers-reduced-motion` they resolve to a
static centred row, which is the designed state and not a frozen frame.

---

## The third build — the copy pass that moved what the page is about

**2026-08-11.** The structure above survived; every word inside it was replaced. This section is
here because four sentences elsewhere in this file are now wrong, and the contradiction should be
visible rather than patched out.

**1. The thesis moved from the artifact to the context.** The page argued that portia's value was a
durable, git-diffable spec you keep. That framing is **legacy** — it is what the product docs still
lead with, and it is no longer what the product is for. The claim now is that portia builds real
context on data that cannot fit in a model's window, by **measuring rather than sampling**, and then
**keeps** what it learned. The band carries it (*no model can read a billion rows; so portia never
asks one to*), the three columns argue it, and the artifact section — still on the page, still
fourth — is now a **consequence** of it rather than the point.

The overrides table's line about the reading order is unchanged: the page still argues before it
demonstrates. What changed is which argument.

**2. The audience is named, once.** The page is for **data scientists** and says so in the hero
lede and in the footer, and nowhere else — twice is a tagline, three times is a pitch deck.
Everything after that is carried by vocabulary: this page talks about sources, joins, grain and
modelling, and **never** about orchestration, scheduling, SLAs or DAG runners. A visitor should be
able to tell in one screen that this is not a data-engineering tool, without the page saying so.

**3. There are no numbers on the page, and the rule that forbade fake ones is unchanged.** Three
engine timings used to sit under the warehouse claim, each correctly cited to what measured it.
They were true and they were still wrong: a data scientist deciding whether this tool is for them
does not care how many seconds an index took, and **three mono figures under a marketing sentence
read as a benchmark whatever the caption says.** `evidence.yaml` and `EvidenceRow.astro` are
deleted; `{components.evidence-row}` stays in the spec above, unreferenced, because it remains the
only sanctioned way a figure ever comes back — cited, in a row, never as a stat block.

**4. No file format, subsystem or library is named in rendered copy.** YAML, SQL, dbt, DuckDB and
Neo4j are all gone from the page. They were precise about things the reader has not yet decided
they care about, and precision spent there is what made the page read as a technical report. The
app's two pictures — **the pipeline canvas and the knowledge graph** — are alluded to as *pictures*
in a `{components.claim}`, which is the level of detail a landing page earns.

This does **not** relax the mono/prose split. The split is still the identity; there is simply very
little left on the page that qualifies as mono, because measurements now live in the product rather
than in the marketing. Where mono survives, it survives for the same reason it always did.

**5. Nothing on the page justifies itself.** The old copy explained why each decision was
defensible — why there are no benchmarks, why early access is not a mailing list, why a small model
is enough. Read together, that is insecurity, and it was the single biggest thing making the page
feel like a defence rather than an offer. A claim is now stated and then left alone. The FAQ is
capped at **three questions, two sentences each**, and the two that were cut (benchmarks, lock-in)
were cut because they invited a doubt the page had not raised.


---

## Colors

Every token is inherited from `DESIGN.md` verbatim. This section documents only what changes about
*how they are spent* on a marketing surface, plus the one new token.

### The one addition

**`{colors.canvas-deep}` — `#08090C` in both modes.** The single full-bleed dark surface, and the
only token in this file that does not resolve per mode. It is not a new color: it is the app's
dark-mode `canvas`, pinned.

**The mechanism matters more than the token.** The band is rendered by scoping the app's
**dark-mode token values** over that subtree — a `.mode-dark` class that re-declares the custom
properties — rather than by defining a parallel family of `deep-surface`, `deep-elevated`,
`deep-hairline` tokens. Two consequences, both wanted:

1. The band **cannot drift from the app**. It is not a picture of the dark mode; it is the dark
   mode, running in a box.
2. In light mode, a visitor sees the product's dark theme in the hero and the page's light chrome
   around it — which is honest, because that is a real thing the app looks like.

### The warm → cool re-point

The OpenCode system this is adapted from is warm throughout: cream canvas `#fdfcfc`, ink `#201d1d`
with a red undertone, and a hairline of `rgba(15,0,0,0.12)` whose tint is deliberately matched to
that cast. portia is cool — `#F4F6F9` / `#08090C`, faintly blue-tinted dark surfaces, neutral
hairlines. Nothing warm survives the port; if a value on the page has a red channel above its blue
channel, it is a leftover.

| OpenCode | → portia | Note |
|---|---|---|
| `primary` `#201d1d` (ink as brand) | `{colors.accent-primary}` | OpenCode has no brand color, so ink becomes one and the CTA is near-black. portia **has** one, and `DESIGN.md` already reserves it for the primary action. Spending the CTA on ink would keep the only chroma the brand owns off the page entirely. |
| `ink-deep` `#0f0000` | `{colors.accent-primary-pressed}` | |
| `canvas` `#fdfcfc` | `{colors.canvas}` | |
| `surface-soft` / `surface-card` | `{colors.surface}` / `{colors.surface-card}` | |
| `surface-dark` `#201d1d` | `{colors.canvas-deep}` | |
| `hairline` `rgba(15,0,0,0.12)` | `{colors.hairline}` | The warm→cool swap, in one line. |
| `accent` `#007aff` (Apple Blue) | **deleted** | `DESIGN.md`: *"Info is not a separate hue."* Informational accents use `{colors.accent-text}`. |
| `danger` `#ff3b30` | `{colors.error}` | Color swaps **and meaning re-points** — see below. |
| `warning` `#ff9f0a` | `{colors.warning}` | |
| `success` `#30d158` | `{colors.success}` | |

### Two traps in the port

**The neutral ramp is inverted between the systems.** Both use the names `mute`, `stone` and `ash`,
and the last two are in opposite order:

- OpenCode: `mute` `#646262` → `stone` `#6e6e73` → `ash` `#9a9898` (lightest)
- portia: `{colors.mute}` → `{colors.ash}` → `{colors.stone}` (lightest)

Copy an OpenCode component spec verbatim and disabled text lands two rungs off its intended
emphasis. Check every `stone`/`ash` reference against `DESIGN.md`'s table, not against the source
system.

**The semantic ramp must not be spent decoratively.** OpenCode ships the full Apple HIG ramp and
uses it, on marketing surfaces, as *syntax-highlight stand-ins inside its hero mockup* — color as
chrome. portia forbids that: status color is state, never decoration. The consequence is concrete
and it constrains the most tempting element on the page:

> **The hero mockup may not fake-colorize.** If red appears in it, it is a real blocking flag on
> real evidence from a real run. If nothing in the mocked-up state is blocked, the mockup is
> monochrome and that is the correct outcome.

The same rule kills OpenCode's `chart-tile` pattern wholesale — *"abstract dotted/sparse-line plots,
never specific data points"*, captioned `Fig 1. 150K GitHub Stars`. A decorative chart of numbers
nobody measured is, on **this** product's landing page specifically, an argument against the
product. Its replacement is `{components.evidence-row}`: a measured fact, rendered in mono, with
what produced it named beside it. If we cannot cite it, it does not go on the page.

---

## Typography

### The split is the identity

This is the largest divergence from the source system and the reason for it is not aesthetic.
OpenCode renders **every word** in Berkeley Mono; the single-font decision is its whole identity.
portia does not do that, because `DESIGN.md` already assigns the mono/proportional boundary a
**meaning**:

> *If a human typed it as data or an identifier, it is mono; if a human wrote it as English, it is
> not.*

That boundary is facts-vs-judgment expressed in type. Collapsing it into one face to borrow a look
would delete the most product-meaningful typographic decision portia has — and in exchange, join a
category convention that is now well populated. Kept, the split does something a mono-everything
page cannot: **the landing page demonstrates the thesis while explaining it.** Every null rate,
column name, key, flag, SQL fragment and row count on the page is mono. Every claim, argument and
piece of framing is Inter. A reader who never reads the sentence about facts and judgment still sees
the two kinds of thing held apart, on every screen of the page.

### Families

- **Inter**, variable, self-hosted, with `font-feature-settings: "calt", "kern", "liga", "ss03"` on
  the root. The `ss03` single-story `g` is part of the identity — `DESIGN.md` says do not omit it,
  and that applies here. Fallback: `Inter` → `system-ui`.
- **JetBrains Mono**, self-hosted, for `{typography.mono}` and below. The app's stack leads with
  SF Mono, which is not available to a browser on a non-Apple machine; the landing page names
  JetBrains Mono first so every visitor sees the same measurements. It is also OpenCode's own
  documented substitute for Berkeley Mono, so the ported metrics hold.
- **No third face.** No display face, no serif, no italic style anywhere in the chrome.

### Hierarchy

| Token | Size | Weight | Line height | Use |
|---|---|---|---|---|
| `{typography.display-2xl}` | 44 → 88px | 600 | 1.02 | The hero headline. Once per page. |
| `{typography.statement}` | 30 → 60px | 600 | 1.1 | The manifesto band. Once per page. |
| `{typography.display-xl}` | 32 → 52px | 600 | 1.08 | Section headline. |
| `{typography.display-lg}` | 32px | 600 | 1.2 | Subsection headline. |
| `{typography.heading-md}` | 20px | 500 | 1.3 | Pillar title, `{components.claim}` line. |
| `{typography.heading-sm}` | 16px | 500 | 1.4 | Card title, marquee wordmark, form legend. |
| `{typography.lede}` | 17 → 22px | 400 | 1.5 | Hero subhead and section ledes only. |
| `{typography.body-lg}` | 17px | 400 | 1.6 | Long-form prose, where any remains. |
| `{typography.body-md}` | 16px | 400 | 1.6 | Default body. |
| `{typography.body-strong}` | 16px | 500 | 1.6 | Inline emphasis. |
| `{typography.caption}` | 13px | 400 | 1.5 | Footer, fine print, form help text. |
| `{typography.button}` | 15px | 500 | 1.4 | Every button label. |
| `{typography.mono}` | 14px | 400 | 1.6 | Every measured number, identifier, column name, key. |
| `{typography.mono-sm}` | 13px | 400 | 1.55 | Reserved. No code block survives on the page. |
| `{typography.mono-caption}` | 12px | 400 | 1.5 | Section labels, row counts, provenance annotations. |

Four notes where these numbers came from a decision rather than a scale:

- **Weights top out at 600**, and this is what makes the wide ramp safe. OpenCode runs its hero at
  700. `DESIGN.md`'s heaviest weight is 600, and the whole contrast budget on this page is spent on
  *size*: nothing gets heavier, nothing gets coloured, and the only tonal move available is
  `{colors.mute}` against `{colors.ink}` on the second line of a headline.
- **The two-line headline is the page's main device.** First line `{colors.ink}`, second line
  `{colors.mute}`, split as a real field in the content (`titleSecond`) rather than a `<br>`, because
  each line rises out of its own clipped box. It is **tone, never colour** — an accent on half a
  sentence would spend the teal on emphasis, and the teal belongs to the primary action.
- **Display line-height gets tighter as the size grows**, which is why it is 1.02 at the hero and
  1.2 at `display-lg`. A fixed 1.15 that reads correctly at 44px opens into a gap at 88px.
- **Mono is 14px against 16px Inter**, not matched. JetBrains Mono runs optically larger at equal
  px; 14 against 16 is where the two settle onto the same baseline weight. The app's 12px mono is
  tuned for a dense pane and is too small here.

---

## Layout

### Rhythm

`{spacing.section}` (96px) between every major block, stepping to `{spacing.section-tablet}` (64px)
and `{spacing.section-mobile}` (48px). No decorative dividers between sections — a 1px
`{colors.hairline}` rule is the only separation signal, and most sections need none because the
96px carries it.

Everything below 32px is `DESIGN.md`'s scale unchanged. `{spacing.xxxl}` (48px) is added for the gap
*within* a section, between its heading block and its content.

### Container

- Content column **720px** for prose (the FAQ); **960px** for everything else, including the hero
  and the band. The logo marquees are **full-bleed** and bounded only by their feathered mask.
- Content is **left-flush** to the column edge. **Nothing on the page is centred, including the
  hero** — this reverses the original spec. At 88px a centred headline sitting over a left-flush
  page reads as a different page's header, and left-flush is also what gives the two headline lines
  a shared edge, which is what makes the ink/mute split legible as one sentence.
- The two-column split (the early-access form) goes 50/50 at desktop and stacks at tablet.

### Reading order

The page argues before it demonstrates. This is a layout constraint, not a copy suggestion. The
sequence below survived the rebuild; what changed is the **length of each step**, not their order.

1. **Hero** — two lines and one sentence. The spider drops on its dragline as the page settles.
2. **The band** — *data has no value without context; portia builds yours.* On
   `{components.band}`, the page's one dark surface, with **no body copy and no section label**:
   its one sentence is the section, and a heading above it was a heading for nothing. It is the
   only block on the page that drops its label.
3. **How it works** — three columns: measure · build on what was measured · get sharper. Each
   carries a `{components.pillar-icon}` that draws itself in. This is the argument the band just
   asserted, and the two are read as one movement.
4. **What you keep** — not a chat log, a pipeline you can hand over. Three `{components.claim}`
   lines, and the only place the app's two pictures are alluded to: the pipeline canvas and the
   knowledge graph. **No file format is named anywhere in it.**
5. **Your data** — **two** counter-drifting rails, split by kind: the warehouse somebody
   administers, and what is already on your own machine. Two claims. **No numbers.**
6. **Your model** — the provider marquee, then a counter-drifting second band for the local
   runtimes, because the claim about those is different.
7. **Early access.**
8. **FAQ** — a closing appendix rather than a step in the argument. Five questions, and an answer
   that runs past four sentences is a signal the page failed to make its case earlier.

**Two sections were cut and are not coming back.** *The app* (the three panes) described an
implementation detail wearing a section heading. *The graph* was true, well-written, and the third
consecutive block of dense prose — it is the kind of thing that belongs in docs, and the page is not
docs.

---

## Elevation & depth

| Level | Treatment | Use |
|---|---|---|
| 0 — flat | no border, no shadow | Body sections, list rows, hero text, footer |
| 1 — hairline | 1px `{colors.hairline}` | Code blocks, inputs, cards, section rules |
| 2 — strong | 1px `{colors.hairline-strong}` | Secondary button edge, table row rules |
| 3 — inverted | `{colors.canvas-deep}` fill | `{components.band}`. The only "elevated" surface, and it uses color, not shadow |

**No drop shadows.** Nothing lifts and nothing floats, in either mode. The single exception matches
the app's: a transient overlay (a dropdown, a toast, a dialog) may carry one soft shadow. There are
almost none of those on a landing page.

**No gradients, no glows, no atmospheric backgrounds.** This was a decision, and it was close: the
obvious move is one faint `{colors.accent-soft}` radial wash behind the hero. It is not in the
system, because the austerity rule only constrains anything while it is absolute, and the page
already has one exception it actually needs. **Motion carries the modernity here, not decoration.**

---

## The one carve-out: the spider

OpenCode's system forbids decorative imagery outright — no photography, no illustration, ASCII
only. portia takes that austerity everywhere **except here**, and the exception is named so that it
stays one.

**What it is.** A geometric linework spider, descended from the existing logo
(`portia/ui/assets/cute-portia.png`), hanging from a dragline that tracks the scroll.

**Why it earns the exception.** It is the brand, not decoration — portia is named for *Portia*, the
jumping spider that plans a detour route to its prey, out of sight of the target, executing a path
it worked out in advance. That is the product in one sentence, and it is the page's spine. The
dragline is also not a liberty: jumping spiders trail one continuously as a safety line.

**Drawing rules.**
- Derived from the app's logo by **keeping** the large forward-facing eyes (the anterior median pair
  is the jumping-spider tell and the whole reason it reads as charming rather than unsettling), the
  compact silhouette, and the teal; and **dropping** the fur, the gradients, the bubbles, the drop
  shadow and the grey backdrop.
- Constant stroke, round caps and joins, **2.2px** at a 32px mark — 2.5 was drawn and rejected,
  because at eight legs plus two body shapes the ink merges and the abdomen and cephalothorax read
  as one blob. Legs are symmetric paired curves, the left side generated from the right.
- Stroke takes `{colors.ink}` via `currentColor`, so it inverts with the page mode for free. The
  abdomen saddle is the only fill: `{colors.accent-text}`. Eyes are filled circles with one offset
  catchlight each.
- **The abdomen sits above the cephalothorax**, because a hanging spider trails its dragline from
  the spinnerets at the rear of the abdomen. The silk attaches at the top and the creature hangs the
  right way up without being positioned by eye.
- **It is not the brand mark and does not need to be.** The nav, footer, favicon and OG card all
  carry the app's real logo (item 3 above). This creature exists only here, which is why the
  geometry lives in `src/lib/mark.ts` with a single consumer.

**Motion rules.** Position alone reads as dead. Velocity is what makes it alive:
- Scroll position → `{motion.spider-drop}` spring. The spider **lags** and settles with slight
  overshoot.
- Scroll velocity → rotation on the thread-and-spider group, capped at
  `{motion.spider-swing}.maxRotate`. It **swings** when you scroll fast and hangs plumb at rest.
- The dragline is a quadratic curve whose control point trails the same spring, so the silk **bows**
  rather than staying a rigid stick.
- The logo's existing motion arcs are reused as a jump trail: they fade in above a velocity
  threshold and vanish at rest.
- Low-amplitude idle leg keyframes, independent of scroll.

**Constraints.**
- `pointer-events: none`, above content and below the nav.
- Fully suppressed under `prefers-reduced-motion`: the spider renders **static**, parked at the top
  of its dragline. It does not simply animate more slowly.
- A dismiss control that persists across sessions. Some visitors will not want a spider tracking
  their scroll, and the mark is not worth a bounce.
- **Never rendered photo-realistically.** `assets/the-portia-spider.jpg` is a photograph of unclear
  provenance and does not go on a public page under any circumstances.

---

## Components

### Buttons

**`button-primary`** — the one teal action per section. `{colors.accent-primary}` fill,
`{colors.on-accent}` label, `{typography.button}`, `{rounded.md}` (8px — the app's radius, **not**
OpenCode's 4px, so a button on the page and a button in a screenshot are the same object), 40px
tall, 20px horizontal padding. Pressed drops to `{colors.accent-primary-pressed}`.

**`button-secondary`** — transparent fill, `{colors.ink}` label, 1px `{colors.hairline-strong}`
border. Never a second fill. Where two actions pair ("Request early access" / "Book a demo"), the
secondary is this.

**`button-ghost`** — `{colors.mute}` label, no border. Nav links and footer actions.

### Inputs

**`text-input`** / **`text-input-focused`** — `{colors.surface-elevated}` fill, 1px
`{colors.hairline}`, 40px tall, `{rounded.md}`. Focus is the app's focus: the border takes
`{colors.accent-primary}` and the fill takes `{colors.accent-soft}`. That soft wash is one of the
three places `DESIGN.md` permits the accent tint, and it carries over rather than being reinvented.

Validation is prose in `{typography.caption}` beneath the field — `{colors.error}` for a rejected
submission, and nothing else colored. No red-tinted field fills.

### Content surfaces

**`code-block`** — `{colors.surface-card}` fill, 1px `{colors.hairline}`, `{rounded.md}`, 16px
padding, `{typography.mono-sm}`. Holds spec YAML, compiled SQL, and the install command. Flat —
`DESIGN.md`: *"Code and data surfaces are flat."* No gradient, no traffic-light chrome.

**`evidence-row`** — portia's replacement for OpenCode's decorative `chart-tile`. A measured fact in
`{typography.mono}`, with what produced it named beside it in `{typography.mono-caption}`
`{colors.mute}`. Every number on the page is one of these or it is not on the page.

**`list-row`** — 8px vertical padding, no fill, no rule. **Marker rule**, decided here: a list of
*facts or artifacts* leads with a mono `[+]` bracket marker in `{colors.mute}`, borrowed from
OpenCode; a list of *prose claims* gets no marker at all. The brackets are a mono device and stay on
the mono side of the split — using them to bullet an English sentence would be exactly the collapse
this file spent a section refusing. This is the one OpenCode texture kept, and it is deliberately
demoted: it is not the identity, because the split is.

**`faq-row`** — 12px vertical, 1px `{colors.hairline}` bottom rule, `+` / `−` marker. No chevrons,
no accordion chrome.

**`badge`** — `{colors.accent-soft}` fill, `{colors.accent-text}` label,
`{typography.mono-caption}`, `{rounded.xs}`. For status-of-the-product tags ("in development",
"early access"). **Never** for a metric, and it never scales with a number.

**`pillar`** — one of three equal columns under the manifesto. A mono index in `{colors.ash}`, a
`{typography.heading-md}` title, two sentences of `{typography.body-md}`. **The index is a position,
never a rank**: it does not grow, it is not coloured, and the three are not sorted by weight.

**`claim`** — one short line of consequence, set at `{typography.heading-md}` so it is read rather
than skimmed, with a mono `[+]` marker and a hairline top rule. `lead` in `{colors.ink}`, the rest
in `{colors.body}`, so the claim lands before its qualification does. **Two or three per section is
the budget.** More than that and it is prose with brackets on it.

**`marquee-item`** — a brand glyph at 22px beside its wordmark in `{typography.heading-sm}`, the
pair in `{colors.mute}`. See "The logo bands" below.

### The band

**`band`** — full-bleed `{colors.canvas-deep}`, square corners, a 1px `{colors.hairline}` rule top
and bottom, holding one `{typography.statement}` headline and nothing else.

It replaced `hero-app-mockup`, which is deleted; the rules that carry over are the ones that were
never about the screenshot:

- **One per page**, and the only use of `{colors.canvas-deep}` anywhere.
- **It is rendered by scoping `.mode-dark` over the subtree**, which re-declares the app's whole
  dark palette. So it is the app's dark mode running in a box rather than a hand-picked grey, and it
  cannot drift from the product.
- **The hairline carries the boundary in dark page mode**, where `canvas-deep` equals the page's own
  `canvas`. This resolves the open edge that used to be listed under Known gaps, and it resolves it
  in favour of the rule rather than in favour of a one-notch lift that would desync the two.
- **No body copy inside it.** The band asserts; the section beneath it argues.

### The logo bands

Two `{components.marquee}` rows — warehouses in one section, model providers in another, with a
second counter-drifting row for local runtimes. They are the page's second named ornament and they
earn it the way the spider does: **the motion carries the claim.** A grid of eleven logos says "here
is a list"; a band with no beginning and no end says "and more where these came from".

Held to the ranking rule like everything else:
- One ink colour (`{colors.mute}`, lifting to `{colors.ink}` on hover), one glyph size, one wordmark
  size, even spacing. **No logo is larger, brighter or first** — and the drift means there is no
  fixed first position to hold.
- Order in `src/lib/logos.ts` is presentation order and nothing else. Not alphabetical, not a tier
  list; a marquee has to start somewhere.
- **The static state is the designed state.** Under `prefers-reduced-motion` the animation is
  dropped and the track wraps into a plain centred row — not a frozen frame with a logo sliced in
  half at the mask edge.
- Pure CSS, duplicated track translated -50%, the copy `aria-hidden`. No island and no JS.

### Chrome

**`primary-nav`** — `{colors.canvas}`, 56px, 1px `{colors.hairline}` bottom rule, `{rounded.none}`.
Spider mark + "portia" wordmark at left in `{typography.body-strong}`; links center-right as
`{components.button-ghost}`; one `{components.button-primary}` at the far right. The wordmark is
lowercase, matching every document in the repo.

**`footer-section`** — `{colors.canvas}`, 48px padding, 1px `{colors.hairline}` top rule,
`{typography.caption}` `{colors.mute}`.

**`link-inline`** — `{colors.accent-text}` with underline. This diverges from OpenCode, which
colors body links ink; portia has an accent and `DESIGN.md` names links as one of its foreground
uses.

---

## Do's and Don'ts

### Do
- Keep the split: mono for anything measured or typed as an identifier, Inter for English.
- **Let the mark be big.** 44px in a 56px bar, on an asset with no padding baked into it.
- Spend `{colors.accent-primary}` on exactly one action per section, and nowhere else.
- Cite every number on the page to something portia measured.
- Use 1px `{colors.hairline}` as the only divider.
- **Buy contrast with size.** The ramp is wide on purpose; that is what keeps the palette quiet.
- **Split a headline with tone** — `{colors.ink}` then `{colors.mute}` — and never with colour.
- Render the band by scoping the app's dark tokens, so it cannot drift from the app.
- **Use the app's real logo** for anything that reads as the brand.
- Keep the spider suppressible: reduced-motion static, plus a persistent dismiss.
- Give every marquee a designed static state, not a frozen frame.
- Check every `stone` / `ash` reference against `DESIGN.md`, not against the OpenCode source.

### Don't
- **Don't put a green tick beside a feature, a section or a table.** `{colors.success}` may only
  sit beside a measurement. `DESIGN.md`: *"Do not build a screen that can say a table is good."*
- **Don't invent a number, a chart, or a stat block.** No `Fig 1.` sparse-line decoration, no
  "10× faster", no metric portia did not produce. **This is the one rule no rebuild has relaxed**
  — the provider bands moved to present tense, the measurements never moved at all. As of the
  third build there are **no numbers on the page whatsoever**, which is the strongest available
  form of the same rule.
- **Don't name a file format, a subsystem or a library in rendered copy.** No YAML, no SQL, no dbt,
  no DuckDB, no Neo4j. The reader has not yet decided they care.
- **Don't justify a claim.** State it and stop. If a sentence begins "because" or defends a choice
  nobody has challenged, cut it — that tone is what made the second build read as a defence.
- **Don't write like a data-engineering tool.** No orchestration, no scheduling, no SLAs, no DAG
  runners. This page is for data scientists and its vocabulary is the main thing that says so.
- **Don't render the measured numbers as three big figures across a band.** They are
  `{components.evidence-row}`s: a list, in mono, at body size, each with its source beside it.
  `CLAUDE.md` names the stat block as one of the genre conventions that performs the ranking the
  engine refuses to do.
- **Don't sort or color by severity**, and don't let a badge grow with its figure.
- **Don't put a screenshot of the app on the page**, and don't put a spec or a SQL excerpt on it.
- **Don't redraw the logo.** One brand image, generated by `pnpm mark` from the app's asset.
- **Don't add a mode toggle back.** The system preference is the whole mechanism.
- **Don't let an icon rank its column.** One colour, one weight, one size, or it does not ship.
- Don't add a gradient, a glow, an atmospheric background, or a shadow on persistent chrome.
- Don't introduce a third font, a 700 weight, or an italic style.
- Don't use OpenCode's 4px interactive radius — it desynchronizes the page from the app.
- Don't let anything warm back into the palette.
- Don't reach for `.rise` on a feature list. It is for the hero and the band; applied broadly it
  turns the page into a slideshow, which is the failure mode of scroll animation.
- Don't ship `assets/the-portia-spider.jpg`.

---

## Responsive behavior

Most of the responsive behaviour is now carried by `clamp()` rather than by breakpoints — the
display ramp, the ledes and the section rhythm all scale continuously, so the table below only lists
the changes that genuinely need a media query.

| Name | Width | Key changes |
|---|---|---|
| desktop-large | 1280px+ | Default. 720/960px columns, full-bleed marquees, rhythm at its 144px ceiling |
| desktop | 1024px | Nav stays horizontal; type and rhythm shed size continuously |
| tablet | 850px | Pillars go from three columns to one; the early-access split stacks |
| tablet-narrow | 768px | Nav collapses to a drawer; the primary CTA stays visible |
| mobile | 640px | The clamps have reached their floors: hero at 44px, rhythm at 64px |

`DESIGN.md`'s width bands (1400 / 1024) govern **the app's pane visibility** and do not apply to
this page. They are a different mechanism for a different problem.

**Touch targets.** Buttons and inputs are 40px with 20px horizontal padding. Footer links use
`{typography.caption}` but get 12px vertical padding for a ~44px row.

**The spider on mobile.** It sits at reduced scale in the right margin and its swing amplitude
halves. If the viewport is under 400px it does not render at all — a creature that overlaps the
reading column is not charming.

---

## Implementation notes

- **Tokens live in one generated file**, `src/styles/tokens.css`, carrying a header comment naming
  the `DESIGN.md` commit sha it was derived from (`inherits-sha` in this file's front matter). It is
  consumed by Tailwind v4's `@theme`, so every utility class on the page derives from the app's
  palette and the two cannot silently diverge.
- **Astro 5** with React islands for the three interactive pieces only: the spider, the early-access
  form, and the FAQ. Everything else ships zero JS.
- **Motion** (`motion`) for the spider; **Lenis** for smooth scroll, disabled under reduced-motion.
  Everything else is CSS — the reveals, the two `.rise` gestures and both marquees. Escalate to GSAP
  ScrollTrigger only if a pinned scroll scene is added.
- **Three motion primitives, and they are a ladder.** `.reveal` (420ms, 12px) is the default and
  goes on almost everything. `.rise` (780ms, 28px) is for a block that should *arrive* — the hero
  lines and the manifesto, and nothing else. `.rise-lines` clips each line into its own box so the
  type appears to be set rather than to fade in; it is what the two-line headlines use. All three
  resolve to their arrived state under `prefers-reduced-motion`.
- **Brand images are generated, not drawn**: `pnpm mark` derives `portia-mark.png` and `favicon.png`
  from the app's asset, and `pnpm og` composites the former into the social card. There is one
  brand image and three files that reference it.
- **Third-party logos are resolved at build time** in `src/lib/logos.ts`, from `simple-icons` and
  `@lobehub/icons-static-svg`. Both are dev dependencies; the paths are inlined into the HTML, so a
  marquee of eleven logos costs zero requests and zero JS.
- **Build order matters**: brand images first, then the static page with no motion, then the motion
  pass. A scroll-linked spider tuned before the page has its real scroll height gets tuned twice —
  and this rebuild changed the scroll height substantially.

---

## Known gaps

- **The brand image is a 128px raster.** It is the app's real logo, which is the point, but it does
  not scale to a 400px hero and it carries a contact shadow drawn for a light UI (the `Brandmark`
  component lifts brightness in dark mode rather than shipping a second asset that could drift). If
  the app ever gets a vector logo, `pnpm mark` is the one place that changes.
- **Hover states are undocumented**, following the source system's policy. Default and pressed only,
  with two exceptions that are real interactions rather than decoration: the marquee pauses on hover
  and its items lift to `{colors.ink}`.
- **The provider lists are a claim the code does not yet make.** `src/lib/logos.ts` names ten
  warehouses and eighteen model providers in the present tense; today portia is DuckDB-local on the
  Claude Agent SDK. This is a recorded decision, not an oversight — "The second build", item 4 — but
  it is the thing on this page most likely to need revisiting, and the lists should be pruned to
  what is real the moment a first customer can check.
- **No pricing surface** is specified. The product is pre-launch and the page has no pricing grid;
  when one arrives it needs its own section here, and it is the single most likely place the
  "prominence communicates kind, never rank" rule gets broken.
- **The FAQ has no home for a long answer.** Answers are capped at four sentences, which was the
  right cut, but two of the old ones contained genuinely useful material (the coding-agent bake-off
  and its caveats; the model-discipline argument). That material now exists nowhere public.
