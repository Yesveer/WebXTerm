import type { MetadataRoute } from "next";

// AI answer-engine and search crawlers we explicitly welcome, so WebXterm can
// be discovered and cited by tools like ChatGPT, Claude, Perplexity, and
// Google AI Overviews.
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Amazonbot",
  "Meta-ExternalAgent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      ...aiCrawlers.map((userAgent) => ({
        userAgent,
        allow: "/",
      })),
    ],
    sitemap: "https://webxterm.me/sitemap.xml",
    host: "https://webxterm.me",
  };
}
