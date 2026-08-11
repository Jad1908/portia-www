/**
 * `POST /api/early-access`, the one dynamic route on an otherwise static site.
 * `worker/index.ts` routes to it; everything else is served from `dist`.
 *
 * It validates, then forwards. It deliberately does **not** own a datastore:
 * this repo is a landing page, and a signup list living in the same place as
 * the marketing copy is a thing nobody remembers to look at.
 *
 * Two destinations, whichever is configured, checked in this order:
 *
 *   EARLY_ACCESS_WEBHOOK_URL   any endpoint that accepts a JSON POST
 *   RESEND_API_KEY + EARLY_ACCESS_TO + EARLY_ACCESS_FROM   an email instead
 *
 * **With neither set the endpoint refuses with 503 and says so.** That is the
 * one behaviour worth arguing for: the alternative — accepting the submission
 * and dropping it — is a form that lies, and this page is the wrong place for
 * a control that reports success it did not achieve.
 *
 * Set them on the Worker (Settings → Variables and Secrets), or in `.dev.vars`
 * locally. See `.env.example`.
 *
 * Spam is handled by a honeypot field and nothing else. That is enough for a
 * page nobody has linked to yet; if the volume ever justifies more, the next
 * step is Turnstile, which is a widget in the island and one verify call here.
 * `scripts/early-access-sheet.gs` is the webhook receiver this was built for.
 */

export interface EarlyAccessEnv {
  EARLY_ACCESS_WEBHOOK_URL?: string;
  RESEND_API_KEY?: string;
  EARLY_ACCESS_TO?: string;
  EARLY_ACCESS_FROM?: string;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_CONTEXT = 4000;

/**
 * Whether a webhook answered with a web page rather than a result.
 *
 * A 2xx is not on its own evidence that anything was recorded. The case this
 * exists for is Google Apps Script: a web app deployed with the wrong "Who has
 * access" answers a POST with a sign-in page, and it does so with a status in
 * the 200s. Trusting `res.ok` there makes the form say "On the list." to
 * someone who is on no list — the exact failure the 503 branch below refuses to
 * commit, arrived at by a different route.
 *
 * HTML rather than "not JSON", because a webhook is allowed to answer with an
 * empty body or bare text, and a receiver that means to say "recorded" never
 * says it in a document with a `<head>`.
 */
const isHtml = (res: Response) =>
  (res.headers.get("content-type") ?? "").toLowerCase().includes("text/html");

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });

export async function earlyAccess(
  request: Request,
  env: EarlyAccessEnv,
): Promise<Response> {
  // Stated rather than left to a 404, so a mistyped method reads as a mistake
  // rather than as a missing endpoint.
  if (request.method !== "POST") return json({ message: "POST only." }, 405);

  let payload: {
    email?: unknown;
    context?: unknown;
    "company-website"?: unknown;
  };
  try {
    payload = await request.json();
  } catch {
    return json({ message: "Expected JSON." }, 400);
  }

  // The honeypot. The field is off-screen, aria-hidden and out of the tab
  // order, so a value in it did not come from a person reading the page.
  //
  // This is the one place the endpoint answers 200 without recording anything,
  // which is the behaviour the rest of this file exists to refuse. The argument
  // for it: the lie is told to a crawler, and telling it the truth — a 400 that
  // names the trap — is how the trap stops working. The cost is the false
  // positive, some agent filling inputs by name on a person's behalf, and the
  // mitigation is that it is logged. A submission that vanishes silently is bad;
  // one that vanishes into `wrangler pages deployment tail` is recoverable.
  if (
    typeof payload["company-website"] === "string" &&
    payload["company-website"].trim() !== ""
  ) {
    console.warn("early-access: honeypot filled, dropped", {
      email: typeof payload.email === "string" ? payload.email : null,
      country: request.headers.get("cf-ipcountry") ?? null,
    });
    return json({ ok: true });
  }

  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const context =
    typeof payload.context === "string"
      ? payload.context.trim().slice(0, MAX_CONTEXT)
      : "";

  if (!EMAIL.test(email)) {
    return json(
      { message: "That does not look like an address portia could reply to." },
      400,
    );
  }

  const record = {
    email,
    context,
    at: new Date().toISOString(),
    // Cloudflare gives this for free and it is the only thing here that was
    // not typed by the person: worth keeping, worth naming.
    country: request.headers.get("cf-ipcountry") ?? null,
  };

  if (env.EARLY_ACCESS_WEBHOOK_URL) {
    const res = await fetch(env.EARLY_ACCESS_WEBHOOK_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(record),
    });
    if (!res.ok || isHtml(res)) {
      return json(
        { message: "That did not go through, and nothing was recorded." },
        502,
      );
    }
    return json({ ok: true });
  }

  if (env.RESEND_API_KEY && env.EARLY_ACCESS_TO && env.EARLY_ACCESS_FROM) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${env.RESEND_API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: env.EARLY_ACCESS_FROM,
        to: [env.EARLY_ACCESS_TO],
        reply_to: email,
        subject: `portia early access — ${email}`,
        text: [
          `email:   ${record.email}`,
          `country: ${record.country ?? "—"}`,
          `at:      ${record.at}`,
          "",
          record.context || "(no context given)",
        ].join("\n"),
      }),
    });
    if (!res.ok) {
      return json(
        { message: "That did not go through, and nothing was recorded." },
        502,
      );
    }
    return json({ ok: true });
  }

  return json(
    {
      message:
        "The form is not connected to anything yet, so nothing was recorded.",
    },
    503,
  );
}
