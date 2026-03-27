import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features – Web Terminal, SSH, Audit Logs & More",
  description:
    "Explore WebXterm features: browser-based SSH terminal, session management, audit logs, VS Code extension, CLI tool, port forwarding, TLS encryption, and RBAC team collaboration.",
  keywords: [
    // Core features
    "web terminal features",
    "browser SSH features",
    "SSH terminal features",
    "online terminal features",
    // Session management
    "SSH session management",
    "terminal session management",
    "multiple terminal sessions",
    "concurrent SSH sessions",
    "terminal dashboard",
    // Security features
    "SSH audit logs",
    "terminal audit trail",
    "SSH command logging",
    "RBAC SSH",
    "role based access terminal",
    "TLS encrypted terminal",
    "mTLS SSH",
    "SSH access control",
    "zero trust SSH",
    "SSH session recording",
    // Collaboration
    "team SSH access",
    "shared terminal access",
    "team server management",
    "collaborative terminal",
    "multi user SSH",
    // VS Code integration
    "VS Code SSH extension",
    "VS Code terminal extension",
    "VS Code remote server",
    "IDE SSH integration",
    "Visual Studio Code SSH",
    // CLI features
    "SSH CLI tool",
    "command line SSH",
    "terminal CLI automation",
    "SSH scripting",
    "automate SSH",
    // Port forwarding
    "SSH port forwarding",
    "secure port forwarding",
    "tunnel port forwarding",
    "SSH tunnel",
    "remote port access",
    // Agent features
    "SSH agent",
    "lightweight SSH agent",
    "agent based SSH",
    "no inbound port SSH",
    "reverse tunnel SSH",
    // Platform
    "Linux SSH terminal",
    "macOS SSH terminal",
    "Windows SSH terminal",
    "cross platform terminal",
    "ARM SSH",
    "x86 SSH",
    // Monitoring
    "real time monitoring",
    "server monitoring terminal",
    "infrastructure monitoring",
    "log monitoring terminal",
    "connection monitoring",
  ],
  alternates: {
    canonical: "https://webxterm.me/features",
  },
  openGraph: {
    title: "WebXterm Features – Browser SSH, Audit Logs & Team Collaboration",
    description:
      "Full-featured browser-based terminal with SSH access, audit trails, RBAC, port forwarding, and VS Code integration.",
    url: "https://webxterm.me/features",
  },
};

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
