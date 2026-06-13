import type { FAQItem } from "@/components/FAQ";

/**
 * Canonical FAQ content. Used to render the visible homepage FAQ AND the
 * FAQPage structured data, so AI answer engines (ChatGPT, Perplexity, Google
 * AI Overviews, Claude) can quote accurate, on-page answers about WebXterm.
 * Keep answers factual and self-contained — each one should make sense if an
 * AI engine quotes it in isolation.
 */
export const homepageFaqs: FAQItem[] = [
  {
    question: "What is WebXterm?",
    answer:
      "WebXterm is a secure web terminal platform that lets you access servers, laptops, and bare-metal machines through your browser, a CLI, or a VS Code extension. It provides browser-based SSH terminals with TLS 1.3 encryption, audit logs, and role-based access control (RBAC), so teams can manage their entire infrastructure from one place.",
  },
  {
    question: "Is WebXterm free?",
    answer:
      "Yes. The Community edition is free forever for individuals and small teams, with no credit card required. It includes secure SSH access, the web terminal, RBAC team collaboration, real-time monitoring, audit logs, TLS encryption, the VSAY Shell CLI, the VS Code extension, and API access. The paid Enterprise edition adds mutual TLS (mTLS), OIDC/SSO via Keycloak, multi-tenancy, and priority support.",
  },
  {
    question: "Do I need to open inbound ports or change my firewall?",
    answer:
      "No. WebXterm uses an agent-based, zero-trust architecture. The lightweight vsay-agent installed on each machine makes an outbound gRPC connection over TLS to the WebXterm portal, so there are no open inbound ports, no VPN, and no firewall changes. This also lets it reach machines behind NAT or strict firewalls.",
  },
  {
    question: "How is my SSH traffic secured?",
    answer:
      "All data in transit is encrypted with TLS 1.3 by default. Authentication uses bcrypt-hashed credentials with short-lived JWT tokens. The Enterprise edition adds mutual TLS (mTLS) for certificate-based authentication between the portal and agents, plus OIDC/SSO integration with Keycloak, Microsoft, GitHub, and Okta. Every login, session, and command is recorded in an immutable audit log.",
  },
  {
    question: "How is WebXterm different from a bastion host or jump server?",
    answer:
      "A traditional bastion host or jump server requires open inbound ports, manual SSH key distribution, and separate audit tooling. WebXterm replaces that with an agent that connects outbound only — no inbound ports — and gives you a browser terminal, centralized RBAC, and built-in audit logging out of the box. You manage access from a single portal instead of maintaining SSH config across machines.",
  },
  {
    question: "Which operating systems and architectures does WebXterm support?",
    answer:
      "The vsay-agent is a single static binary with no dependencies that runs on Linux, macOS, and Windows, on both x86 (amd64) and ARM (arm64) — including cloud VMs, bare-metal servers, and devices like the Raspberry Pi. It runs as a systemd, launchd, or Windows service.",
  },
  {
    question: "Can I use WebXterm from the command line or inside VS Code?",
    answer:
      "Yes. The VSAY Shell CLI is a single static binary that lets you list machines and connect to any registered machine with one command, forward ports, and script SSH automation. The VSAY VS Code extension brings machine browsing, terminal sessions, and port forwarding directly into the editor, so you never leave your IDE.",
  },
  {
    question: "Can I self-host WebXterm?",
    answer:
      "Yes. WebXterm is built to run on your own infrastructure. You can point the agent and CLI at your own WebXterm portal (for example, your self-hosted console URL), keeping all session routing and audit data within your environment.",
  },
];
