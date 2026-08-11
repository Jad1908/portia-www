/**
 * `POST /api/early-access` — a Cloudflare Pages Function.
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
 * Set them in the Cloudflare Pages project (Settings → Environment variables),
 * or in `.dev.vars` locally. See `.env.example`.
 */

interface Env {
  EARLY_ACCESS_WEBHOOK_URL?: string;
  RESEND_API_KEY?: string;
  EARLY_ACCESS_TO?: string;
  EARLY_ACCESS_FROM?: string;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_CONTEXT = 4000;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let payload: { email?: unknown; context?: unknown };
  try {
    payload = await request.json();
  } catch {
    return json({ message: "Expected JSON." }, 400);
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
    if (!res.ok) {
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
};

/** Anything but POST. Stated rather than left to a 404, so a mistyped method
 *  reads as a mistake rather than as a missing endpoint. */
export const onRequest: PagesFunction<Env> = async ({ request, next }) => {
  if (request.method === "POST") return next();
  return json({ message: "POST only." }, 405);
};
