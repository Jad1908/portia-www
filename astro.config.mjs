// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// `site` feeds canonical + OG URLs. There is no domain yet, so it comes from the
// environment rather than being guessed here — set SITE_URL in the Cloudflare
// Pages project when there is one.
const site = process.env.SITE_URL ?? "http://localhost:4321";

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
