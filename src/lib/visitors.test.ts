import { describe, it, expect, vi, beforeEach } from "vitest";
import { getVisitorCount } from "./visitors";

const ok = (body: unknown) =>
  vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => body });

describe("getVisitorCount", () => {
  beforeEach(() => vi.restoreAllMocks());

  it("returns the count the API reports", async () => {
    vi.stubGlobal("fetch", ok({ count: 412 }));
    expect(await getVisitorCount(false)).toBe(412);
  });

  // regression: the old counter read a deprecated API that returned HTTP 410
  // with valid JSON. fetch does not reject on 4xx/5xx, so the catch never ran
  // and a dead backend rendered as a hardcoded seed instead of degrading.
  it("returns null on an HTTP error status, without throwing", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 410,
        json: async () => ({ code: "410", deprecated: true }),
      })
    );
    expect(await getVisitorCount(false)).toBeNull();
  });

  it("returns null on network failure", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    expect(await getVisitorCount(false)).toBeNull();
  });

  it("returns null when the payload has no numeric count", async () => {
    vi.stubGlobal("fetch", ok({ error: "nope" }));
    expect(await getVisitorCount(false)).toBeNull();
  });

  it("POSTs to increment for a first-time visitor", async () => {
    const fetchMock = ok({ count: 1 });
    vi.stubGlobal("fetch", fetchMock);
    await getVisitorCount(false);
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/visitors",
      expect.objectContaining({ method: "POST" })
    );
  });

  it("GETs without incrementing for a repeat visitor", async () => {
    const fetchMock = ok({ count: 1 });
    vi.stubGlobal("fetch", fetchMock);
    await getVisitorCount(true);
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/visitors",
      expect.objectContaining({ method: "GET" })
    );
  });
});
