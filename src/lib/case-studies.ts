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
  {
    slug: "continuity",
    project: "Continuity",
    claim: "Change should be testable before it becomes an incident.",
    meta: {
      role: "Solo. Architecture, engine, docs.",
      timeline: "2026",
      stack: "Rust, TypeScript, MCP, PostgreSQL",
    },
    problem: [
      "A provider changes an API, a schema, an auth flow, a runtime default. The changelog describes the change. It cannot tell you which of your call sites will fail, or whether the migration you just applied actually works.",
      "So you find out in staging if you are lucky and in production if you are not. The missing piece is not documentation. It is that nobody can run tomorrow's change against today's code.",
    ],
    how: {
      body: "One Rust engine does the analysis, and the CLI, the local MCP server, and CI are thin adapters over it rather than three implementations that drift apart. It maps the repository, simulates a proposed change against real call sites, applies deterministic transforms before any model-generated repair, then runs verification and signs the result. Source stays inside your environment by default. The hosted side coordinates tasks and evidence, and never needs to read the code.",
      pipeline: [
        { label: "scan", sub: "map the call sites" },
        { label: "simulate", sub: "predict what breaks" },
        { label: "repair", sub: "transforms first, model second" },
        { label: "verify", sub: "your builds, your tests" },
        { label: "attest", sub: "signed evidence" },
      ],
    },
    decision: {
      question: "What gets to declare a repair safe?",
      chose:
        "The checks the repository already had. Verification runs the customer's own builds and tests, and a repair counts as safe only when those pass.",
      rejected:
        "Letting the model that wrote the patch grade the patch. It is the cheapest signal to build and the easiest to demo, and it is the one signal with an interest in the answer.",
      consequence:
        "Continuity cannot claim a repair works in a repository with no tests, and it reports that instead of guessing. A verdict is never stronger than the checks you already trusted enough to run.",
    },
    standing:
      "In active development, and open source. The Rust engine backs the CLI, the MCP server, and CI from one implementation. Architecture, security model, and roadmap are written down and public, including the parts that are not built yet.",
  },
  {
    slug: "earnings-delta",
    project: "Earnings Delta",
    claim: "A large movement with thin evidence is still a large movement.",
    meta: {
      role: "Solo. Product, finance modeling, build.",
      timeline: "2026",
      stack: "Next.js, TypeScript, Three.js, Zod",
    },
    problem: [
      "Two reporting periods, hundreds of line items, and a fixed amount of attention. The work is not finding the differences. It is deciding which differences matter, then defending that ranking to somebody else.",
      "Most tooling collapses those two questions into one number. Rank by what is easy to explain and you quietly bury the movement nobody has written commentary about yet, which is often the one worth reading.",
    ],
    how: {
      body: "Financial statements and segment values drive every calculation across five reporting periods per company, compared quarter over quarter and year over year. Material changes are ranked by magnitude and company relevance. Every finding stays attached to the calculation that produced it and to representative commentary, so a conclusion can be opened and checked rather than trusted. Thesis stress tests deliberately go looking for contradicting evidence before returning a bounded verdict.",
      pipeline: [
        { label: "compare", sub: "quarter and year over year" },
        { label: "rank", sub: "magnitude and relevance" },
        { label: "evidence", sub: "calculation stays attached" },
        { label: "stress test", sub: "seek the contradiction" },
      ],
    },
    decision: {
      question: "Should materiality and confidence be one score or two?",
      chose:
        "Two. Materiality scores the size of a movement and its relevance to the company. Confidence is a separate label for how well supported it is: Verified, Supported, or Interpretation.",
      rejected:
        "Folding evidence availability into the ranking. It yields a tidier list and one number to sort on.",
      consequence:
        "A large movement with no commentary attached still ranks where its size puts it, carrying an Interpretation label rather than being quietly demoted. The ranking answers what moved. The label answers how much of that is established.",
    },
    standing:
      "Live. Workspaces cover NVDA, AAPL, and MSFT across five periods each, on a typed representative dataset rather than a live feed, which the interface states plainly rather than implies. Questions outside the supported set return a scope limit instead of an answer.",
  },
];

export const caseStudyFor = (projectName: string) =>
  CASE_STUDIES.find((c) => c.project === projectName);
