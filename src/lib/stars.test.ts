import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchStars } from "./stars";

function memStorage(): Storage {
  const m = new Map<string, string>();
  return {
    getItem: (k) => m.get(k) ?? null,
    setItem: (k, v) => void m.set(k, v),
    removeItem: (k) => void m.delete(k),
    clear: () => m.clear(),
    key: () => null,
    get length() {
      return m.size;
    },
  } as Storage;
}

const okResponse = (stars: number) =>
  ({ ok: true, json: async () => ({ stargazers_count: stars }) }) as Response;

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("fetchStars", () => {
  it("returns the star count", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(okResponse(42)));
    expect(await fetchStars("a/b", () => 0, memStorage())).toBe(42);
  });

  it("serves from cache within an hour (no second fetch)", async () => {
    const f = vi.fn().mockResolvedValue(okResponse(42));
    vi.stubGlobal("fetch", f);
    const s = memStorage();
    await fetchStars("a/b", () => 1000, s);
    expect(await fetchStars("a/b", () => 1000 + 3599_000, s)).toBe(42);
    expect(f).toHaveBeenCalledTimes(1);
  });

  it("refetches after the cache expires", async () => {
    const f = vi
      .fn()
      .mockResolvedValueOnce(okResponse(42))
      .mockResolvedValueOnce(okResponse(50));
    vi.stubGlobal("fetch", f);
    const s = memStorage();
    await fetchStars("a/b", () => 1000, s);
    expect(await fetchStars("a/b", () => 1000 + 3600_001, s)).toBe(50);
    expect(f).toHaveBeenCalledTimes(2);
  });

  it("returns null on API error (rate limit)", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false } as Response));
    expect(await fetchStars("a/b", () => 0, memStorage())).toBeNull();
  });

  it("returns null on network failure", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    expect(await fetchStars("a/b", () => 0, memStorage())).toBeNull();
  });
});
