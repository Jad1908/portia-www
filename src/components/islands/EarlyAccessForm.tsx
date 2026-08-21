import { useState } from "react";

/**
 * The early-access form.
 *
 * Validation is **prose in a caption beneath the field**, `{colors.error}` for
 * a rejected submission and nothing else coloured. No red-tinted field fills:
 * a colour on the input would be the screen ranking your typo, and on this page
 * of all pages that is the thing not to do.
 *
 * The second field is optional and is the point of the form. The project's own
 * open question is whether people who do this work would use it or merely agree
 * that it sounds useful, and an address alone cannot tell you which.
 *
 * The third field is a honeypot and is not for a human. It is off-screen,
 * `aria-hidden`, out of the tab order and `autocomplete="off"`, so nothing that
 * reads or drives this form on a person's behalf should reach it; a value in it
 * means something walked the DOM filling inputs by name. It is called
 * `company-website` rather than `website` or `url` on purpose — the common
 * names are the ones password managers autofill, and an autofilled honeypot
 * would silently drop a real signup.
 */

type State =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "error"; message: string }
  | { kind: "sent" };

export default function EarlyAccessForm() {
  const [email, setEmail] = useState("");
  const [context, setContext] = useState("");
  const [trap, setTrap] = useState("");
  const [state, setState] = useState<State>({ kind: "idle" });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state.kind === "sending") return;

    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setState({
        kind: "error",
        message: "That does not look like an address portia could reply to.",
      });
      return;
    }

    setState({ kind: "sending" });
    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: trimmed,
          context: context.trim(),
          "company-website": trap,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setState({
          kind: "error",
          message:
            body?.message ??
            "That did not go through, and nothing was recorded. Worth another try.",
        });
        return;
      }
      setState({ kind: "sent" });
    } catch {
      setState({
        kind: "error",
        message:
          "That did not go through, and the failure was on the way out rather than at the far end. Nothing was recorded.",
      });
    }
  }

  if (state.kind === "sent") {
    return (
      <div className="ea ea--sent">
        <p className="ea__sent-head">On the list.</p>
        <p className="ea__sent-body">
          Nothing will arrive in the meantime.
        </p>
      </div>
    );
  }

  const sending = state.kind === "sending";

  return (
    <form className="ea" onSubmit={submit} noValidate>
      <div className="ea__field">
        <label className="ea__label" htmlFor="ea-email">
          Email
        </label>
        <input
          id="ea-email"
          className="field"
          type="email"
          autoComplete="email"
          placeholder="you@where-you-work"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state.kind === "error") setState({ kind: "idle" });
          }}
          aria-invalid={state.kind === "error"}
          aria-describedby={state.kind === "error" ? "ea-error" : undefined}
        />
      </div>

      <div className="ea__field">
        <label className="ea__label" htmlFor="ea-context">
          What are you merging? <span className="ea__optional">optional</span>
        </label>
        <textarea
          id="ea-context"
          className="field field--area"
          placeholder="The join that most recently cost you a day, and what made it hard."
          value={context}
          onChange={(e) => setContext(e.target.value)}
        />
        <p className="ea__help">A person reads these.</p>
      </div>

      {/* Not for you. See the note at the top of this file. */}
      <div className="ea__trap" aria-hidden="true">
        <label htmlFor="ea-company-website">Company website</label>
        <input
          id="ea-company-website"
          name="company-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={trap}
          onChange={(e) => setTrap(e.target.value)}
        />
      </div>

      {state.kind === "error" && (
        <p className="ea__error" id="ea-error" role="alert">
          {state.message}
        </p>
      )}

      <button className="btn btn--primary ea__submit" disabled={sending}>
        {sending ? "Sending…" : "Request early access"}
      </button>

      <style>{CSS}</style>
    </form>
  );
}

const CSS = `
.ea { display: flex; flex-direction: column; gap: var(--spacing-lg); }
.ea__field { display: flex; flex-direction: column; gap: var(--spacing-sm); }
.ea__label {
  font-size: var(--text-heading-sm);
  font-weight: 500;
  color: var(--portia-ink);
}
.ea__optional {
  font-family: var(--font-mono);
  font-size: var(--text-mono-caption);
  font-weight: 400;
  color: var(--portia-mute);
  margin-left: 6px;
}
.ea__help {
  font-size: var(--text-caption);
  line-height: 1.5;
  color: var(--portia-mute);
}
.ea__error {
  font-size: var(--text-caption);
  line-height: 1.5;
  color: var(--portia-error);
}
.ea__submit { align-self: flex-start; }

/* The honeypot. Absolute, so it leaves the flex flow entirely and cannot open
   a gap; off-screen rather than display:none, because a crawler that skips
   hidden inputs is exactly the one worth catching. */
.ea__trap {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.ea--sent {
  border: 1px solid var(--portia-hairline);
  border-radius: var(--radius-md);
  padding: var(--spacing-xl);
  gap: var(--spacing-sm);
}
.ea__sent-head {
  font-size: var(--text-heading-md);
  font-weight: 500;
  color: var(--portia-ink);
}
.ea__sent-body {
  font-size: var(--text-body-md);
  line-height: 1.6;
  color: var(--portia-body);
}
`;
