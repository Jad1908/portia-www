import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";

/**
 * Content collections exist here for one reason from CLAUDE.md: **no
 * hard-coded copy in components**, so prose is reviewable as prose in a diff.
 * That mirrors the product's own rule about prompt text, and for the same
 * reason — the copy is the least stable, most consequential part of the page.
 *
 * Four collections:
 *   sections — one MDX file per section of the page, in reading order
 *   faq      — one MD file per question
 *   evidence — measured facts, each with what produced it
 *   mockup   — what the three panes of the hero mockup show
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
    /** `section-label` — mono, uppercase, above the headline. */
    label: z.string(),
    title: z.string(),
    /** `body-lg`, and only ever here or in the hero subhead. */
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
 * `evidence-row` — portia's replacement for a decorative chart tile.
 *
 * **Every number on this page is one of these or it is not on the page.**
 * `source` is not optional and is not a citation style choice: a figure with
 * nothing named beside it is the invented statistic this product exists to
 * prevent. `verified` records where it was checked, so the next person can
 * re-check it instead of trusting this file.
 */
const evidence = defineCollection({
  loader: file("./src/content/evidence.yaml"),
  schema: z.object({
    group: z.string(),
    /** The claim, in prose. Inter. */
    fact: z.string(),
    /** The measurement. Mono, always. */
    value: z.string(),
    /** What produced it. Mono caption. */
    source: z.string(),
    /** Where this was checked against, for whoever re-checks it. */
    verified: z.string(),
  }),
});

/** The hero mockup's contents. It may not fake-colorize and it may not invent
 *  a number, so this file is data rather than decoration and every value in it
 *  came off a real run. See its own header comment. */
const mockup = defineCollection({
  loader: file("./src/content/mockup.yaml"),
  schema: z.object({
    tree: z.array(
      z.object({
        depth: z.number(),
        name: z.string(),
        kind: z.enum(["folder", "source", "spec", "model", "output", "pinned"]),
        meta: z.string().optional(),
        open: z.boolean().optional(),
        selected: z.boolean().optional(),
      }),
    ),
    graph: z.object({
      sources: z.array(z.string()),
      steps: z.array(
        z.object({
          id: z.string(),
          op: z.enum(["normalize", "sql", "join"]),
          flags: z.array(z.string()).default([]),
        }),
      ),
    }),
    report: z.object({
      step: z.string(),
      op: z.string(),
      provenance: z.array(z.tuple([z.string(), z.string()])),
      outcome: z.array(z.tuple([z.string(), z.string()])),
      grain: z.string(),
      flags: z.array(z.string()),
    }),
    transcript: z.object({
      run: z.object({
        prompt: z.string(),
        model: z.string(),
        effort: z.string(),
        sha: z.string(),
        at: z.string(),
        source: z.string(),
      }),
      rows: z.array(
        z.discriminatedUnion("kind", [
          z.object({ kind: z.literal("text"), text: z.string() }),
          z.object({
            kind: z.literal("tool"),
            name: z.string(),
            args: z.string(),
            result: z.string(),
          }),
          z.object({
            kind: z.literal("question"),
            header: z.string(),
            question: z.string(),
            options: z.array(
              z.object({ label: z.string(), description: z.string() }),
            ),
            answered: z.string(),
          }),
        ]),
      ),
    }),
  }),
});

export const collections = { sections, faq, evidence, mockup };
