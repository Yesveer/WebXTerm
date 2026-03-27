import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing – Free Community & Enterprise Edition",
  description:
    "WebXterm is free forever with the Community edition. Upgrade to Enterprise for mTLS, OIDC/SSO, multi-tenancy, and priority support. No credit card required to start.",
  keywords: [
    // Free tier
    "free web terminal",
    "free SSH terminal",
    "free browser SSH",
    "free remote terminal",
    "free infrastructure tool",
    "free server management",
    "free DevOps tool",
    "open source terminal",
    "free SSH client",
    "no cost terminal",
    // Community edition
    "community terminal",
    "webxterm community",
    "free community SSH",
    "free tier terminal",
    "free plan SSH",
    // Enterprise
    "enterprise SSH solution",
    "enterprise terminal platform",
    "enterprise web terminal",
    "enterprise remote access",
    "enterprise infrastructure tool",
    "mTLS enterprise",
    "SSO SSH enterprise",
    "Keycloak SSH",
    "OIDC SSH",
    "multi tenant SSH",
    "organization SSH",
    // Pricing comparison
    "web terminal pricing",
    "SSH tool pricing",
    "terminal platform cost",
    "SSH platform pricing",
    "Teleport vs WebXterm",
    "cheap SSH solution",
    "affordable remote access",
    // Value props
    "no credit card SSH",
    "instant SSH access",
    "free server terminal",
    "start free terminal",
    "scalable SSH platform",
    "RBAC free",
    "audit logs free",
    "TLS free terminal",
    "free team SSH",
    "free collaboration terminal",
    // Long tail pricing
    "best free web terminal",
    "free web SSH client",
    "free online SSH terminal",
    "free remote server access",
    "free browser terminal tool",
    "free SSH manager",
  ],
  alternates: {
    canonical: "https://webxterm.me/pricing",
  },
  openGraph: {
    title: "WebXterm Pricing – Free Community Edition Available",
    description:
      "Start free with Community edition. Upgrade to Enterprise for advanced security features like mTLS, SSO, and multi-tenancy.",
    url: "https://webxterm.me/pricing",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
