import type { MetadataRoute } from "next";
import { comparisons } from "@/lib/comparisons";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://webxterm.me";
  const lastModified = new Date();

  const comparisonRoutes: MetadataRoute.Sitemap = comparisons.map((c) => ({
    url: `${baseUrl}/vs/${c.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/features`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/architecture`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cli`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/vscode`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/vs`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...comparisonRoutes,
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];
}
