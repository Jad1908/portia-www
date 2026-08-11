/**
 * The Worker in front of the built site.
 *
 * Almost nothing goes through here. `dist` is served by Cloudflare's asset
 * layer without waking this script — `run_worker_first` in `wrangler.jsonc`
 * names `/api/*` and nothing else, so the page keeps costing zero invocations
 * and this file exists for the one route that has to run somewhere.
 *
 * It replaces a Pages Function that lived in `functions/api/early-access.ts`.
 * That directory is a Pages convention and this site deploys as a Worker, so
 * the file was never compiled and the endpoint 404'd in production while
 * working perfectly under `wrangler pages dev` locally. Routing is explicit
 * here for that reason: a route that exists because a file is in the right
 * folder is a route that can silently not exist.
 */

import { earlyAccess, type EarlyAccessEnv } from "./early-access";

interface Env extends EarlyAccessEnv {
  /** The built site. Bound in `wrangler.jsonc`. */
  ASSETS: Fetcher;
}

export default {
  async fetch(request, env): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname === "/api/early-access") {
      try {
        return await earlyAccess(request, env);
      } catch (err) {
        // An uncaught throw here becomes Cloudflare's own error page: HTML,
        // no JSON message, and the form falls back to a generic apology that
        // says nothing about what happened. A malformed EARLY_ACCESS_WEBHOOK_URL
        // reaches this line, because `fetch` rejects before any of the checks
        // in early-access.ts can run. Answer in the form's own language and
        // put the cause somewhere retrievable.
        console.error("early-access: unhandled", err);
        return new Response(
          JSON.stringify({
            message: "That did not go through, and nothing was recorded.",
          }),
          {
            status: 502,
            headers: { "content-type": "application/json; charset=utf-8" },
          },
        );
      }
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
