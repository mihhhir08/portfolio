import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/lib/case-studies";

const SITE = "https://mihirsinhchavda.com";

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
