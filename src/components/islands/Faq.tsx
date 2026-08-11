import { useId, useState } from "react";

/**
 * `faq-row` — 12px vertical, one hairline bottom rule, a `+` / `−` marker.
 *
 * No chevrons and no accordion chrome. The marker is mono, because it is a
 * control rather than a word, and it is the same two characters at every row:
 * nothing here grows, colours or reorders to suggest one question matters more
 * than another.
 *
 * Answers are rendered to HTML at build time by Astro and handed over as
 * strings, so the markdown never reaches the browser and the island is only
 * ever responsible for which rows are open.
 */

export interface FaqItem {
  question: string;
  html: string;
}

export default function Faq({ items }: { items: FaqItem[] }) {
  // More than one may be open at a time. An accordion that closes what you were
  // reading because you opened something else is a control fighting the reader.
  const [open, setOpen] = useState<Set<number>>(new Set());
  const base = useId();

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  return (
    <div className="faq">
      {items.map((item, i) => {
        const isOpen = open.has(i);
        const panelId = `${base}-panel-${i}`;
        return (
          <div className="faq__row" key={item.question}>
            <h3 className="faq__heading">
              <button
                type="button"
                className="faq__q"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
              >
                <span className="faq__marker" aria-hidden="true">
                  {isOpen ? "−" : "+"}
                </span>
                <span>{item.question}</span>
              </button>
            </h3>
            {isOpen && (
              <div
                className="faq__a prose"
                id={panelId}
                dangerouslySetInnerHTML={{ __html: item.html }}
              />
            )}
          </div>
        );
      })}
      <style>{CSS}</style>
    </div>
  );
}

const CSS = `
.faq__row { border-bottom: 1px solid var(--portia-hairline); }
.faq__heading { margin: 0; font-weight: 400; }
.faq__q {
  display: grid;
  grid-template-columns: 20px minmax(0, 1fr);
  gap: var(--spacing-md);
  width: 100%;
  padding: 12px 0;
  border: 0;
  background: transparent;
  text-align: left;
  cursor: pointer;
  font-family: var(--font-sans);
  font-size: var(--text-body-md);
  line-height: 1.6;
  color: var(--portia-ink);
}
.faq__marker {
  font-family: var(--font-mono);
  font-size: var(--text-mono);
  color: var(--portia-mute);
}
.faq__a {
  padding: 0 0 var(--spacing-lg) calc(20px + var(--spacing-md));
  max-width: 68ch;
}
.faq__a code {
  font-family: var(--font-mono);
  font-size: 0.9em;
  color: var(--portia-ink);
}
`;
