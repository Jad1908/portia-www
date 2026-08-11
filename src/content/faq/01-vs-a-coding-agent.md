---
order: 1
question: "Isn't this just a coding agent pointed at DuckDB?"
---

That is the real competitor, and it is a good one. The honest framing is that a
coding agent has the reasoning and no durable artifact; a visual ETL tool has
the durable artifact and no reasoning. portia's bet is the residue — the
accumulated, auditable set of decisions that got you to one table, rather than
the transcript in which they were made.

Worth knowing how that bet was stress-tested. The same three-file fixture, with
ten deliberate traps in it, was run through a frontier coding agent and DuckDB:
it caught eight of the ten unprompted, in about two minutes. **That result does
not count as evidence, and the reasons are the interesting part** — the fixture
was 29 rows, so the model read the whole dataset instead of sampling it; the
columns had low cardinality, so the duplicates were visible rather than hidden
in a tail; the traps were discrete and labelled; and the fixture was written by
the same model that then solved it. What it establishes is only that portia has
to beat that, not the absence of it.
