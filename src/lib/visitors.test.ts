import { describe, it, expect, vi, beforeEach } from "vitest";
import { fallbackCount, getVisitorCount } from "./visitors";

const LAUNCH = Date.UTC(2026, 6, 5);
const DAY = 864e5;

describe("fallbackCount", () => {
  it("returns the seed +1 on launch day", () => {
    expect(fallbackCount(LAUNCH)).toBe(313);
  });

  it("never decreases over time", () => {
    let prev = 0;
    for (let d = 0; d <= 60; d++) {
      const v = fallbackCount(LAUNCH + d * DAY);
      expect(v).toBeGreaterThanOrEqual(prev - 6); // (days%4)*2 wobble is ±6 max
      expect(fallbackCount(LAUNCH + d * DAY)).toBe(v); // deterministic
      prev = v;
    }
  });

  it("clamps pre-launch dates to the seed", () => {
    expect(fallbackCount(LAUNCH - 10 * DAY)).toBe(313);
  });
});

describe("getVisitorCount", () => {
  beforeEach(() => vi.restoreAllMocks());

  it("returns seed + api count on success", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ json: async () => ({ count: 100 }) })
    );
    expect(await getVisitorCount(false)).toBe(412);
  });

  it("falls back to the formula on network failure", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("down")));
    const v = await getVisitorCount(false, () => LAUNCH + DAY);
    expect(v).toBe(fallbackCount(LAUNCH + DAY));
  });
});
