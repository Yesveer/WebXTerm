import type { NextConfig } from "next";

// RFC 8288 Link headers for agent / AI discovery. Advertised on every HTML
// page so agents can find our resources without parsing the body:
//  - describedby   → /llms.txt (plain-text product summary for LLMs)
//  - service-doc   → product & API documentation (RFC 8631)
//  - api-catalog   → /.well-known/api-catalog (RFC 9727)
const discoveryLinkHeader = [
  '</llms.txt>; rel="describedby"; type="text/plain"',
  '<https://docs.webxterm.me>; rel="service-doc"; type="text/html"',
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
].join(", ");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "Link", value: discoveryLinkHeader }],
      },
    ];
  },
};

export default nextConfig;
