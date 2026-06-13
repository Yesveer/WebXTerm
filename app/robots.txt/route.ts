/**
 * /robots.txt — generated as a route handler (instead of the typed
 * MetadataRoute.Robots) so we can emit Content-Signal directives, which the
 * structured metadata API does not support.
 *
 * - We explicitly welcome AI search/answer crawlers so WebXterm can be
 *   discovered and cited by ChatGPT, Claude, Perplexity, and Google AI.
 * - Content-Signal (contentsignals.org / AIPREF draft) declares how our
 *   content may be used: appear in search and as AI answer input — yes.
 */

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

// search=yes  → allow appearing in (AI) search results
// ai-input=yes → allow use as grounding/input for AI-generated answers
// ai-train=yes → allow use for training (set to "no" to opt out of training
//                while still allowing search + AI answers)
const contentSignal = "search=yes, ai-input=yes, ai-train=yes";

function buildRobots(): string {
  const lines: string[] = [];

  // Default group — applies to all crawlers, including the AI ones above.
  lines.push("User-agent: *");
  lines.push(`Content-Signal: ${contentSignal}`);
  lines.push("Allow: /");
  lines.push("");

  // Explicit allow groups for named AI crawlers (clear intent).
  for (const ua of aiCrawlers) {
    lines.push(`User-agent: ${ua}`);
    lines.push(`Content-Signal: ${contentSignal}`);
    lines.push("Allow: /");
    lines.push("");
  }

  lines.push("Sitemap: https://webxterm.me/sitemap.xml");
  lines.push("Host: https://webxterm.me");
  lines.push("");

  return lines.join("\n");
}

export function GET() {
  return new Response(buildRobots(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
