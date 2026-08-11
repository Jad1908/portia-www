/**
 * Third-party brand marks, resolved at build time.
 *
 * Two sources, because neither one covers the page on its own:
 *
 *   - **`@lobehub/icons-static-svg`** — every model provider, and the two cloud
 *     platforms (`aws`, `azure`) that `simple-icons` has dropped. Files are
 *     already monochrome `fill="currentColor"` on a 24×24 box, so they inherit
 *     the page's ink and invert with the mode for free.
 *   - **`simple-icons`** — the warehouses and engines lobehub does not carry
 *     (BigQuery, Databricks, DuckDB, ClickHouse, Postgres, Trino). Ships a bare
 *     path string rather than a document, which is why the two are normalised
 *     here into one shape instead of being rendered by two components.
 *
 * Everything is resolved with `readFileSync` during the build. Nothing in this
 * file reaches the browser: Astro inlines the resulting markup into the HTML,
 * so a marquee of eleven logos costs zero requests and zero JS.
 *
 * **These are trademarks of their owners, used to name an integration.** They
 * are rendered in a single ink colour at one size, and the band they sit in
 * neither orders them nor sizes one above another — which is the page's own
 * rule about prominence, applied to other people's brands.
 */

import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);

export interface Logo {
  /** The brand's own name, as its owner writes it. */
  name: string;
  /** Inner SVG markup, on a 24×24 viewBox, drawn in `currentColor`. */
  inner: string;
}

/* -------------------------------------------------------------------------
 * lobehub — a whole `<svg>` document per brand
 * ---------------------------------------------------------------------- */

const LOBE_DIR = join(
  dirname(require.resolve("@lobehub/icons-static-svg/package.json")),
  "icons",
);

/** Strip the wrapper and the `<title>`; keep the geometry. The title is dropped
 *  because the accessible name belongs on the element that has the wordmark
 *  beside it, not on the glyph — otherwise a screen reader says it twice. */
function unwrap(svg: string): string {
  return svg
    .replace(/^[\s\S]*?<svg[^>]*>/, "")
    .replace(/<\/svg>\s*$/, "")
    .replace(/<title>[\s\S]*?<\/title>/g, "")
    .trim();
}

function lobe(file: string, name: string): Logo {
  return { name, inner: unwrap(readFileSync(join(LOBE_DIR, `${file}.svg`), "utf8")) };
}

/* -------------------------------------------------------------------------
 * simple-icons — a path string per brand
 * ---------------------------------------------------------------------- */

function si(exportName: string, name: string): Logo {
  const icons = require("simple-icons") as Record<string, { path: string }>;
  const icon = icons[exportName];
  if (!icon) throw new Error(`simple-icons has no export ${exportName}`);
  return { name, inner: `<path d="${icon.path}" />` };
}

/* -------------------------------------------------------------------------
 * The lists
 *
 * Order is presentation order and nothing else. It is not a ranking, it is not
 * alphabetical, and it is not a tier list — a marquee has to start somewhere.
 * ---------------------------------------------------------------------- */

/** Where the team's data lives. */
export const WAREHOUSES: Logo[] = [
  lobe("snowflake", "Snowflake"),
  si("siGooglebigquery", "BigQuery"),
  si("siDatabricks", "Databricks"),
  lobe("aws", "AWS"),
  lobe("azure", "Azure"),
  si("siApachespark", "Spark"),
  si("siTrino", "Trino"),
];

/** What is already on the data scientist's own machine. Split off `WAREHOUSES`
 *  onto a second, counter-drifting rail — the split is by **kind and not by
 *  rank**: a warehouse somebody administers, versus a file somebody was sent.
 *  Both are first-class sources and the two rails are identical in every
 *  treatment except direction. */
export const LOCAL_SOURCES: Logo[] = [
  si("siPostgresql", "Postgres"),
  si("siDuckdb", "DuckDB"),
  si("siClickhouse", "ClickHouse"),
  si("siMysql", "MySQL"),
  si("siSqlite", "SQLite"),
  si("siGooglesheets", "Sheets"),
];

/** Hosted models, and the gateways that front them. */
export const MODELS: Logo[] = [
  lobe("anthropic", "Anthropic"),
  lobe("openai", "OpenAI"),
  lobe("gemini", "Gemini"),
  lobe("mistral", "Mistral"),
  lobe("meta", "Llama"),
  lobe("deepseek", "DeepSeek"),
  lobe("qwen", "Qwen"),
  lobe("xai", "xAI"),
  lobe("cohere", "Cohere"),
  lobe("groq", "Groq"),
  lobe("bedrock", "Bedrock"),
  lobe("vertexai", "Vertex AI"),
  lobe("openrouter", "OpenRouter"),
  lobe("together", "Together"),
];

/** Models that never leave the machine. Kept separate from `MODELS` because the
 *  section makes a different claim about them, not because they rank lower. */
export const LOCAL_MODELS: Logo[] = [
  lobe("ollama", "Ollama"),
  lobe("lmstudio", "LM Studio"),
  lobe("vllm", "vLLM"),
  lobe("huggingface", "Hugging Face"),
];
