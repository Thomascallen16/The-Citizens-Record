import { describe, expect, it } from "vitest";
import { civicResourceInput, normalizeCivicResource } from "./contentValidation";

describe("civic resource validation", () => {
  it("accepts a well-formed official-source resource and normalizes publication metadata", () => {
    const input = civicResourceInput.parse({
      slug: "reading-a-court-opinion",
      kind: "guide",
      status: "published",
      title: "Reading a Court Opinion",
      summary: "A source-first guide for locating and reading an official court opinion.",
      sourceUrl: "https://www.supremecourt.gov/opinions/slipopinion/",
      sourceLabel: "Supreme Court opinions",
      isFeatured: true,
    });

    const values = normalizeCivicResource(input, 7);

    expect(values.authorId).toBe(7);
    expect(values.isFeatured).toBe(1);
    expect(values.publishedAt).toBeInstanceOf(Date);
  });

  it("rejects unsafe slugs and malformed source URLs", () => {
    expect(() => civicResourceInput.parse({
      slug: "Not a valid slug",
      kind: "tool",
      title: "A public resource",
      summary: "A resource summary long enough to pass the basic editorial requirement.",
      sourceUrl: "not-a-url",
    })).toThrow();
  });
});
