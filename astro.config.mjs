// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// `site` feeds canonical + OG URLs. SITE_URL overrides it for a build that
// should name another address; nothing sets it in production.
const site = process.env.SITE_URL ?? "https://portiadata.dev";

// The page is overwhelmingly static and ships zero JS for prose. Three React
// islands exist and no more — the spider, the early-access form, the FAQ —
// so `react` is here for those and nothing else (CLAUDE.md → Stack).
export default defineConfig({
  site,
  integrations: [mdx(), react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
