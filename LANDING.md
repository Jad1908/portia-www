---
version: alpha
name: portia-landing-design
description: |
  The design system for portia's public landing page — a separate surface from the app, adapted
  from OpenCode's terminal-native marketing system and re-pointed onto portia's own tokens. It
  inherits the app's entire palette, its Inter/mono split and its hairline discipline from
  `DESIGN.md`, and adds only what a marketing page genuinely needs and an app does not: a 44px
  hero, a 96px section rhythm, and one full-bleed dark surface that mocks up the three-pane app.
  It keeps OpenCode's austerity — flat on canvas, no gradients, no glows, no atmospheric
  backgrounds, hairlines as the only divider — with exactly one named exception: the portia
  spider, drawn as geometric linework, hanging from a dragline that tracks the scroll. Light and
  dark are equal first-class modes, as in the app. The product rule carries over unchanged and
  binds hardest here, where marketing instinct pushes against it: **color and prominence
  communicate kind, never rank.**

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
  display-xl:   { fontFamily: Inter, fontSize: 44px, fontWeight: 600, lineHeight: 1.15, letterSpacing: "-0.2px" }
  display-lg:   { fontFamily: Inter, fontSize: 32px, fontWeight: 600, lineHeight: 1.2,  letterSpacing: 0 }
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
  section: 96px
  section-tablet: 64px
  section-mobile: 48px

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
  hero-app-mockup:
    backgroundColor: "{colors.canvas-deep}"
    textColor: "{colors.ink.dark}"
    border: "1px solid {colors.hairline.dark}"
    rounded: "{rounded.lg}"
    padding: 0px
  mockup-pane:
    backgroundColor: "{colors.surface.dark}"
    textColor: "{colors.body.dark}"
    typography: "{typography.mono-sm}"
    rounded: "{rounded.none}"
    padding: 16px
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
- `{spacing.section}` (96px) between every block; 64px tablet, 48px mobile.
- Exactly one full-bleed `{colors.canvas-deep}` surface per page: the three-pane app mockup.
- Radius vocabulary of two working values — `{rounded.md}` (8px) on interactive, `{rounded.none}` on
  full-bleed bands — matching the app, not OpenCode's 4px.
- **One piece of ornament exists on the whole page and it is named**: the spider.

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
| 1 | `display` caps at **32px** | `{typography.display-xl}` at **44px** | A hero read from two feet away, not a pane title read from twenty inches. Held to 44 rather than the genre's 64–72 because portia is a quiet surface; OpenCode's 38px is the evidence that this is survivable. |
| 2 | Body is **13px** | `{typography.body-md}` at **16px** | 13px is tuned for scanning a dense pane. This is prose across a 720px column. |
| 3 | *"Never pad a surface 32px+ on all sides"* | `{spacing.section}` = **96px** | The app rule exists so data runs tight. There is no data in a section gap. |
| 4 | *"At most one accent per view"* | One primary per **section** | A page is not a view. Secondaries stay `{components.button-secondary}` — hairline, no fill. |
| 5 | *"No hero stripe, no brand moment"* | The spider | The single named carve-out. See below. |

Everything else in `DESIGN.md` — the palette, the type split, the hairline discipline, the radius
ladder, the no-shadow rule, and the product rule above — applies here **unchanged**.

---

## Colors

Every token is inherited from `DESIGN.md` verbatim. This section documents only what changes about
*how they are spent* on a marketing surface, plus the one new token.

### The one addition

**`{colors.canvas-deep}` — `#08090C` in both modes.** The single full-bleed dark surface, and the
only token in this file that does not resolve per mode. It is not a new color: it is the app's
dark-mode `canvas`, pinned.

**The mechanism matters more than the token.** The hero mockup is rendered by scoping the app's
**dark-mode token values** over that subtree — a `.mode-dark` class that re-declares the custom
properties — rather than by defining a parallel family of `deep-surface`, `deep-elevated`,
`deep-hairline` tokens. Two consequences, both wanted:

1. The mockup **cannot drift from the app**. It is not a picture of the dark mode; it is the dark
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
uses it, on marketing surfaces, as *syntax-highlight stand-ins inside the hero mockup* — color as
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
| `{typography.display-xl}` | 44px | 600 | 1.15 | The hero headline. Once per page. |
| `{typography.display-lg}` | 32px | 600 | 1.2 | Section headline. |
| `{typography.heading-md}` | 20px | 500 | 1.3 | Subsection, mockup caption heading. |
| `{typography.heading-sm}` | 16px | 500 | 1.4 | Card title, list-row label, form legend. |
| `{typography.body-lg}` | 17px | 400 | 1.6 | Hero subhead and section ledes only. |
| `{typography.body-md}` | 16px | 400 | 1.6 | Default body. |
| `{typography.body-strong}` | 16px | 500 | 1.6 | Inline emphasis. |
| `{typography.caption}` | 13px | 400 | 1.5 | Footer, fine print, form help text. |
| `{typography.button}` | 15px | 500 | 1.4 | Every button label. |
| `{typography.mono}` | 14px | 400 | 1.6 | Every measured number, identifier, column name, key. |
| `{typography.mono-sm}` | 13px | 400 | 1.55 | Inside `{components.code-block}` and the mockup. |
| `{typography.mono-caption}` | 12px | 400 | 1.5 | Section labels, row counts, provenance annotations. |

Three notes where these numbers came from a decision rather than a scale:

- **Weights top out at 600.** OpenCode runs its hero and its section labels at 700. `DESIGN.md`'s
  heaviest weight is 600, and a 700 headline sitting above an app screenshot rendered at 500 reads
  as two products.
- **Display line-height stays tight.** OpenCode runs `1.5` on its 38px hero, which is a paragraph
  line-height on a headline. portia holds display at 1.15–1.2, per `DESIGN.md`.
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

- Content column **720px** for prose; **960px** for sections holding a code block, a table or a
  two-column split; **1160px** outer frame for the hero mockup.
- Content is **left-flush** to the column edge. No indentation, no centered body paragraphs. The
  hero headline and subhead are the only centered text on the page.
- Two-column splits (the early-access form; the spec-and-compiled-SQL pairing) go 50/50 at desktop
  and stack at tablet, form or output below.

### Reading order

The page argues before it demonstrates. This is a layout constraint, not a copy suggestion:

1. **Hero** — one sentence. The spider drops on its dragline as the page settles.
2. **The line** — *the agent may author a transform; it may never author a number.* Deterministic
   code owns facts and consequences; the copilot owns judgment. This sits above the feature tour
   because it is the reason to keep reading, and because everything below it is evidence for it.
3. **The app** — the three-pane mockup on `{colors.canvas-deep}`. The one dark surface.
4. **The artifact** — a spec YAML beside its compiled `.sql`, as a diff. This is the section that
   convinces a data scientist: it is not a chat log, it is a pipeline you hand to a data team.
5. **The graph** — what your tables are to each other, measured.
6. **Collaborative & cloud** — the shared catalog as team memory, and the constraint that sells
   itself: **the data never moves.** Measurements are queries that run where the data is; only small
   results come back (`VISION.md` → "a cloud-hosted project").
7. **Early access + demo.**

---

## Elevation & depth

| Level | Treatment | Use |
|---|---|---|
| 0 — flat | no border, no shadow | Body sections, list rows, hero text, footer |
| 1 — hairline | 1px `{colors.hairline}` | Code blocks, inputs, cards, section rules |
| 2 — strong | 1px `{colors.hairline-strong}` | Secondary button edge, table row rules, mockup pane dividers |
| 3 — inverted | `{colors.canvas-deep}` fill | The hero mockup. The only "elevated" surface, and it uses color, not shadow |

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
- Derived from the current logo by **keeping** the large forward-facing eyes (the anterior median
  pair is the jumping-spider tell and the whole reason the mark reads as charming rather than
  unsettling), the compact silhouette, and the teal-on-light palette; and **dropping** the fur, the
  gradients, the bubbles, the drop shadow and the grey backdrop.
- Constant stroke, round caps and joins, ~2.5px at a 32px mark. Legs are symmetric paired curves.
- Stroke takes `{colors.ink}` via `currentColor`, so it inverts with the page mode for free. The
  abdomen saddle is the only fill: `{colors.accent-text}`. Eyes are filled circles with one offset
  catchlight each.
- **It must scale from a 20px favicon to a 400px hero.** The current PNG does not; this is why the
  mark is net-new work and why it is the first asset built — the nav lockup, the favicon, the OG
  image and the scroll creature all derive from it.

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

### The hero mockup

**`hero-app-mockup`** — full-bleed `{colors.canvas-deep}` within the 1160px frame, `{rounded.lg}`,
1px hairline at the app's dark value. Contains three `{components.mockup-pane}` columns divided by
1px hairlines: the file tree, the workflow canvas, the transcript.

Rules:
- **Not a terminal.** `VISION.md`'s V0 audit is explicit that portia's job is to keep the user out
  of one; a terminal mockup in the hero would misrepresent the product to sell a texture. This is
  the sharpest place the OpenCode system does not transfer — its entire hero is a TUI.
- **One per page**, and the only use of `{colors.canvas-deep}` anywhere.
- **Real content.** Real column names, real null rates, a real copilot question. See the
  fake-colorize rule under Colors.
- Text inside is `{typography.mono-sm}` for data and `{typography.body-md}` at the dark tokens for
  the copilot's prose — the split holds inside the mockup too, because it holds inside the app.

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
- Spend `{colors.accent-primary}` on exactly one action per section, and nowhere else.
- Cite every number on the page to something portia measured.
- Use 1px `{colors.hairline}` as the only divider, and 96px as the only section gap.
- Render the hero mockup by scoping the app's dark tokens, so it cannot drift from the app.
- Keep the spider suppressible: reduced-motion static, plus a persistent dismiss.
- Check every `stone` / `ash` reference against `DESIGN.md`, not against the OpenCode source.

### Don't
- **Don't put a green tick beside a feature, a section or a table.** `{colors.success}` may only
  sit beside a measurement. `DESIGN.md`: *"Do not build a screen that can say a table is good."*
- **Don't invent a number, a chart, or a stat block.** No `Fig 1.` sparse-line decoration, no
  "10× faster", no metric portia did not produce.
- **Don't sort or color by severity**, and don't let a badge grow with its figure.
- Don't add a gradient, a glow, an atmospheric background, or a shadow on persistent chrome.
- Don't put a terminal in the hero.
- Don't fake-colorize the mockup for visual interest.
- Don't introduce a third font, a 700 weight, or an italic style.
- Don't use OpenCode's 4px interactive radius — it desynchronizes the page from app screenshots.
- Don't let anything warm back into the palette.
- Don't ship `assets/the-portia-spider.jpg`.

---

## Responsive behavior

| Name | Width | Key changes |
|---|---|---|
| desktop-large | 1280px+ | Default. 720/960px columns, 1160px mockup frame, 96px rhythm |
| desktop | 1024px | Mockup frame shrinks to the content width; nav stays horizontal |
| tablet | 850px | 64px rhythm; two-column splits stack; mockup drops to two panes (tree hidden) |
| tablet-narrow | 768px | Nav collapses to a drawer; the primary CTA stays visible |
| mobile | 640px | 48px rhythm; hero 44px → 30px; mockup becomes a single pane, horizontally scrollable |

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
- **Motion** (`motion`) for the spider and reveals; **Lenis** for smooth scroll, disabled under
  reduced-motion. Escalate to GSAP ScrollTrigger only if a pinned scroll scene is added.
- **Build order matters**: the mark first (everything derives from it), then static page with no
  motion, then the motion pass. A scroll-linked spider tuned before the page has its real scroll
  height gets tuned twice.

---

## Known gaps

- **The mark does not exist yet.** There is no SVG anywhere in the repo and no wordmark lockup —
  only a raster cartoon used at 80px in the README and in `ui/theme.py`.
- **Hover states are undocumented**, following the source system's policy. Default and pressed only.
- **The dark-mode hero mockup in dark page mode** has an unresolved edge: `{colors.canvas-deep}`
  equals the page's own `{colors.canvas}` in dark mode, so the mockup loses its figure/ground
  separation. It will need its 1px hairline to carry the whole boundary, or a one-notch lift to
  `{colors.surface}`. Decide when it is drawn, not before.
- **No pricing surface** is specified. The product is pre-launch and the page has no pricing grid;
  when one arrives it needs its own section here, and it is the single most likely place the
  "prominence communicates kind, never rank" rule gets broken.
- **OG image and social card** are unspecified beyond deriving from the mark.
