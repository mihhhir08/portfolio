import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://mihirsinhchavda.com/",
      lastModified: new Date(),
    },
  ];
}
