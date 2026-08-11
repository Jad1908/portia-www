---
order: 2
question: "How good is the copilot? Where are the benchmarks?"
---

There aren't any, and there is not going to be a number here until there is one
worth quoting.

Runs have been recorded, and they were pipeline shakedown rather than scores:
they checked that a turn completes, that a spec gets written, that the gate
fires when it should. Every one of them held the prompts at their first draft
and varied nothing, so what they found was **real defects in portia's own code**
— a missing sentence in a tool description that made the copilot tell a user to
go and use dbt instead; a grain claim that could be widened until it passed —
and nothing at all about the copilot's judgment.

What would count as evidence is a run against prompts someone has actually
worked on, scored against an answer key, with the model and the effort recorded.
That run has not happened. Putting a benchmark on this page before it does would
be the exact failure the product is built to prevent.
