/**
 * Data-driven comparison ("/vs/[slug]") pages. These capture high-intent
 * "<competitor> alternative" and "<competitor> vs WebXterm" searches that AI
 * answer engines frequently cite. Keep claims about competitors factual and
 * fair — only state widely-known, generic facts, and let WebXterm's genuine
 * differentiators carry the page.
 */

export interface ComparisonRow {
  feature: string;
  webxterm: string;
  competitor: string;
}

export interface Comparison {
  slug: string;
  competitor: string;
  /** Page <h1> / hero title. */
  title: string;
  /** <title> tag. */
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  /** 1–2 sentence intro shown under the hero. */
  intro: string;
  rows: ComparisonRow[];
  /** Short bullet list: when WebXterm is the better fit. */
  chooseWebxterm: string[];
  /** Short bullet list: when the alternative may fit better (keeps it fair). */
  chooseCompetitor: string[];
  /** Closing verdict paragraph — written to be quotable by AI engines. */
  verdict: string;
}

export const comparisons: Comparison[] = [
  {
    slug: "teleport",
    competitor: "Teleport",
    title: "WebXterm vs Teleport",
    metaTitle: "WebXterm vs Teleport – Browser SSH & Access Comparison",
    metaDescription:
      "Compare WebXterm and Teleport for secure infrastructure access. WebXterm offers browser SSH, a free Community edition, an outbound-only agent with zero inbound ports, plus CLI and VS Code access.",
    keywords: [
      "WebXterm vs Teleport",
      "Teleport alternative",
      "open source Teleport alternative",
      "free Teleport alternative",
      "browser SSH vs Teleport",
      "Teleport vs web terminal",
      "secure access platform comparison",
    ],
    intro:
      "Both WebXterm and Teleport give teams secure, audited access to their infrastructure. The difference is reach and overhead: WebXterm is a lightweight, browser-first terminal platform with a free Community edition and an outbound-only agent, while Teleport is a broader access platform with a heavier setup.",
    rows: [
      { feature: "Browser-based terminal", webxterm: "Yes — full xterm.js terminal", competitor: "Yes" },
      { feature: "Outbound-only agent (no inbound ports)", webxterm: "Yes — outbound gRPC over TLS", competitor: "Typically requires reachable nodes/proxy" },
      { feature: "Free tier", webxterm: "Free Community edition, forever", competitor: "Open-source Community edition" },
      { feature: "CLI access", webxterm: "VSAY Shell CLI — single static binary", competitor: "Yes (tsh)" },
      { feature: "VS Code extension", webxterm: "Yes — native VSAY extension", competitor: "Limited / via SSH config" },
      { feature: "Audit logs", webxterm: "Immutable log of every login, session, command", competitor: "Yes — session recording" },
      { feature: "SSO / OIDC", webxterm: "Enterprise — Keycloak, Microsoft, GitHub, Okta", competitor: "Yes" },
      { feature: "mTLS", webxterm: "Enterprise edition", competitor: "Certificate-based by design" },
      { feature: "Setup overhead", webxterm: "Install one agent, connect outbound", competitor: "Cluster / proxy setup" },
    ],
    chooseWebxterm: [
      "You want a free, browser-first terminal that works in minutes",
      "Your machines sit behind NAT or strict firewalls (outbound-only agent)",
      "You want browser, CLI, and VS Code access from one platform",
      "You prefer a lightweight single-binary agent over a cluster to operate",
    ],
    chooseCompetitor: [
      "You need a full identity-aware proxy across many protocols (database, Kubernetes, RDP) in one product",
      "Your organization has already standardized on Teleport's ecosystem",
    ],
    verdict:
      "WebXterm is the simpler, lower-overhead choice for teams that mainly need secure SSH and terminal access through the browser, CLI, or VS Code — with a free Community edition and an agent that connects outbound so you never open inbound ports. Teleport is a broader access platform that fits organizations needing one tool across many protocols at the cost of heavier setup.",
  },
  {
    slug: "bastion-host",
    competitor: "a Bastion Host / Jump Server",
    title: "WebXterm vs a Bastion Host",
    metaTitle: "WebXterm vs Bastion Host – A Modern Jump Server Alternative",
    metaDescription:
      "Replace your bastion host or jump server with WebXterm. Get browser SSH, centralized RBAC, and audit logs with an outbound-only agent — no open inbound ports, no SSH key sprawl.",
    keywords: [
      "WebXterm vs bastion host",
      "bastion host alternative",
      "jump server alternative",
      "modern bastion host",
      "replace bastion host",
      "SSH without bastion",
      "bastionless SSH access",
    ],
    intro:
      "A bastion host (or jump server) is the traditional way to gate SSH access, but it means open inbound ports, SSH key distribution, and bolt-on auditing. WebXterm delivers the same gated, audited access with an outbound-only agent and a single management portal.",
    rows: [
      { feature: "Inbound ports required", webxterm: "None — agent connects outbound", competitor: "Yes — public SSH port exposed" },
      { feature: "Access control", webxterm: "Built-in RBAC, per-user per-machine", competitor: "Manual SSH config / OS users" },
      { feature: "Audit logging", webxterm: "Built-in immutable command log", competitor: "Bolt-on (auditd, scripts)" },
      { feature: "Browser terminal", webxterm: "Yes", competitor: "No — SSH client required" },
      { feature: "Works behind NAT/firewall", webxterm: "Yes — outbound tunnel", competitor: "Requires routable host" },
      { feature: "Key management", webxterm: "Centralized auth (JWT / OIDC)", competitor: "Manual SSH key distribution" },
      { feature: "Maintenance", webxterm: "Managed portal + single-binary agent", competitor: "Patch and harden the host yourself" },
      { feature: "Cost", webxterm: "Free Community edition", competitor: "VM cost + ops time" },
    ],
    chooseWebxterm: [
      "You want to stop exposing a public SSH port to the internet",
      "You need centralized RBAC and audit logs without extra tooling",
      "You want browser and CLI access, not just an SSH client",
      "You want to avoid SSH key sprawl across machines",
    ],
    chooseCompetitor: [
      "You have a very small, static set of machines and existing SSH tooling you are happy with",
      "You have strict requirements to keep everything on raw SSH with no agent",
    ],
    verdict:
      "WebXterm is a modern replacement for the bastion host: instead of exposing a hardened public SSH gateway and distributing keys, you install an outbound-only agent and manage access, RBAC, and audit logs from one portal. It removes the open inbound port, the key sprawl, and the separate audit setup that traditional jump servers require.",
  },
  {
    slug: "cloudshell",
    competitor: "Cloud Shell",
    title: "WebXterm vs Cloud Shell",
    metaTitle: "WebXterm vs Cloud Shell – Browser Terminal for Any Machine",
    metaDescription:
      "Cloud Shell gives you a browser terminal inside one cloud provider. WebXterm gives you browser SSH to any server, laptop, or bare-metal machine across clouds and on-prem — with audit logs and RBAC.",
    keywords: [
      "WebXterm vs Cloud Shell",
      "CloudShell alternative",
      "AWS CloudShell alternative",
      "Google Cloud Shell alternative",
      "browser terminal any server",
      "cross cloud web terminal",
      "self hosted cloud shell",
    ],
    intro:
      "A provider's Cloud Shell is a convenient browser terminal — but it is scoped to that one cloud account. WebXterm gives you the same browser terminal experience for any machine you register: across cloud providers, on-prem servers, bare metal, and even laptops.",
    rows: [
      { feature: "Browser terminal", webxterm: "Yes", competitor: "Yes" },
      { feature: "Works across clouds & on-prem", webxterm: "Yes — any machine with the agent", competitor: "Scoped to one provider" },
      { feature: "Access laptops / bare metal", webxterm: "Yes", competitor: "No" },
      { feature: "Centralized RBAC", webxterm: "Yes — per-user per-machine", competitor: "Provider IAM only" },
      { feature: "Audit logs across all machines", webxterm: "Yes — unified immutable log", competitor: "Per-provider logging" },
      { feature: "CLI + VS Code access", webxterm: "Yes — VSAY CLI & extension", competitor: "Limited" },
      { feature: "Port forwarding", webxterm: "Yes — tunnel remote ports to localhost", competitor: "Varies" },
      { feature: "Self-hostable", webxterm: "Yes", competitor: "No — provider managed" },
    ],
    chooseWebxterm: [
      "You manage machines across multiple clouds and on-prem, not just one provider",
      "You need to reach laptops or bare-metal servers, not only cloud VMs",
      "You want unified RBAC and audit logs across everything",
      "You want CLI and VS Code access alongside the browser terminal",
    ],
    chooseCompetitor: [
      "You only ever work inside a single cloud provider's console",
      "You want a zero-install shell tied to that provider's IAM",
    ],
    verdict:
      "Cloud Shell is great when you live entirely inside one cloud provider. WebXterm is the better fit when your infrastructure spans multiple clouds, on-prem servers, bare metal, or laptops — it brings a browser terminal, CLI, and VS Code access to every registered machine, with unified RBAC and audit logging, and can be self-hosted.",
  },
];

export function getComparison(slug: string): Comparison | undefined {
  return comparisons.find((c) => c.slug === slug);
}
