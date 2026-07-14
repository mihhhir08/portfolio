import { describe, it, expect } from "vitest";
import { gmailCompose, EMAIL } from "./content";

describe("gmailCompose", () => {
  it("targets gmail web compose with the right address", () => {
    const url = gmailCompose("Hello");
    expect(url).toContain("https://mail.google.com/mail/?view=cm&fs=1");
    expect(url).toContain(`to=${EMAIL}`);
  });

  it("encodes the subject", () => {
    expect(gmailCompose("Hey Mihir — saw your portfolio")).toContain(
      "su=Hey%20Mihir%20%E2%80%94%20saw%20your%20portfolio"
    );
  });
});
