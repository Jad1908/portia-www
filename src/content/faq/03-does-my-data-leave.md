---
order: 3
question: "Does my data leave my machine?"
---

portia runs locally against a repo that already holds its data. Sources are read
**in place** — there is no hidden second copy, and the one that used to exist
was deleted rather than optimised. Only files inside the working directory can
be indexed; an outside path is refused, not warned about, and bringing data in
is a separate step that tells you what it is about to copy and where before it
copies anything.

The copilot never gets your data in bulk. It has no filesystem tools and no
shell, so what reaches a model is what a check returned: compact profiles,
schemas, and the handful of example values a check chose to surface so a
mismatch is legible. That is a deliberate boundary rather than a side effect —
it is also what makes the loop work at a scale where reading the data was never
an option.

The warehouse tier, when it exists, keeps the same constraint and states it more
strongly: the data is never pulled down at all.
