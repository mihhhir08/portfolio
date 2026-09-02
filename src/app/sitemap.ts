import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/lib/case-studies";
import { SITE } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE}/`, lastModified: now },
    ...CASE_STUDIES.map((c) => ({
      url: `${SITE}/work/${c.slug}`,
      lastModified: now,
    })),
  ];
}
