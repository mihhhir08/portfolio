import { describe, it, expect } from "vitest";
import { resolveTheme } from "./theme";

describe("resolveTheme", () => {
  it("uses stored theme when present", () => {
    expect(resolveTheme("light", false)).toBe("light");
    expect(resolveTheme("dark", true)).toBe("dark");
  });

  it("falls back to system preference when nothing stored", () => {
    expect(resolveTheme(null, true)).toBe("light");
    expect(resolveTheme(null, false)).toBe("dark");
  });

  it("ignores garbage stored values", () => {
    expect(resolveTheme("banana", true)).toBe("light");
    expect(resolveTheme("", false)).toBe("dark");
  });
});
