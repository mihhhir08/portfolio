// Long-form companion to PROJECTS. A project only appears here once there
// is a real decision to write about; `slug` matches Project.name via
// caseStudyFor(), so a card links inward only when a study exists.

export type CaseStudy = {
  slug: string;
  project: string; // must match a Project.name in content.ts
  claim: string; // the one line the whole page argues for
  meta: { role: string; timeline: string; stack: string };
  problem: string[];
  how: { body: string; pipeline: PipelineStep[] };
  // Mirrors the Chose / Rejected / Consequence format the repos already
  // use in DECISIONS.md, so the page reads like the docs it came from.
  decision: {
    question: string;
    chose: string;
    rejected: string;
    consequence: string;
  };
  standing: string;
};

export type PipelineStep = { label: string; sub: string };

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "rewind",
    project: "rewind",
    claim: "Reproducing an agent bug should not cost money.",
    meta: {
      role: "Solo. Design, implementation, docs.",
      timeline: "2026",
      stack: "TypeScript, SQLite, Anthropic SDK",
    },
    problem: [
      "Your agent crashes on step 47 of 50. To see it again you re-run 46 steps, pay for every token, and hope the model takes the same path. It won't. Temperature moves, models get updated underneath you, tools resolve in a different order.",
      "So the bug you reproduce is never quite the bug you were chasing. Observability tools show you what happened. None of them let you run it again.",
    ],
    how: {
      body: "rewind injects one custom fetch into the Anthropic SDK client. That is the entire integration. Every request and response is journaled into a single SQLite file, with bodies content-addressed by SHA-256, so the system prompt repeated across all 50 steps is stored once instead of fifty times. Replay matches a request by canonical fingerprint: JSON with recursively sorted keys, volatile headers stripped before hashing. Same request in, recorded response out. No network, no key, no cost.",
      pipeline: [
        { label: "record", sub: "one fetch, injected" },
        { label: "journal", sub: "SQLite, SHA-256 blobs" },
        { label: "replay", sub: "offline, byte-exact" },
        { label: "fork", sub: "edit a step, recompute" },
      ],
    },
    decision: {
      question: "Which headers count as part of a request's identity?",
      chose:
        "Strip a known-volatile blocklist before fingerprinting: auth, request ids, dates, idempotency keys, SDK telemetry. Treat every header that survives as semantic.",
      rejected:
        "Allowlisting the headers I already knew mattered. An unknown header that genuinely changes API behavior would then be ignored, and two different requests would collide on one fingerprint.",
      consequence:
        "A blocklist miss causes a replay miss, which is loud and debuggable. An allowlist miss causes a wrong hit, which is silent corruption. Fingerprints fail loud rather than lie.",
    },
    standing:
      "Live and open source. Record, replay, step, fork, and diff all ship in the CLI. The demo agent carries a real bug that only surfaces on the last step, so you can watch a fix get verified offline for nothing.",
  },
];

export const caseStudyFor = (projectName: string) =>
  CASE_STUDIES.find((c) => c.project === projectName);
