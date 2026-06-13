/**
 * /.well-known/api-catalog — RFC 9727 API discovery document.
 *
 * Returns application/linkset+json describing where WebXterm's API and its
 * documentation live, so agents can discover them programmatically. We only
 * reference resources that actually exist (the console API host and the docs
 * site). We intentionally omit `service-desc` (a machine-readable OpenAPI
 * spec) until a stable spec URL is published — pointing agents at a missing
 * spec is worse than omitting it.
 */

const catalog = {
  linkset: [
    {
      anchor: "https://console.webxterm.me",
      "service-doc": [
        {
          href: "https://docs.webxterm.me",
          title: "WebXterm API & product documentation",
          type: "text/html",
        },
      ],
    },
  ],
};

export function GET() {
  return new Response(JSON.stringify(catalog, null, 2), {
    headers: {
      "Content-Type": "application/linkset+json",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
