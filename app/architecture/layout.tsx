import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Architecture – How WebXterm Works",
  description:
    "Learn how WebXterm's agent-based architecture enables secure browser SSH access without opening inbound ports. Lightweight agent, TLS encryption, and centralized session routing.",
  keywords: [
    // Architecture concepts
    "web terminal architecture",
    "SSH agent architecture",
    "agent based SSH",
    "how web terminal works",
    "webxterm architecture",
    "SSH platform design",
    "terminal infrastructure",
    // No open ports
    "SSH without open ports",
    "no inbound port SSH",
    "firewall friendly SSH",
    "NAT traversal SSH",
    "reverse tunnel SSH",
    "outbound only SSH",
    "SSH behind firewall",
    "SSH behind NAT",
    // Agent architecture
    "lightweight SSH agent",
    "SSH agent install",
    "remote agent SSH",
    "machine agent terminal",
    "agent based remote access",
    "SSH reverse proxy",
    "terminal relay server",
    // Security architecture
    "zero trust terminal",
    "zero trust SSH",
    "TLS SSH architecture",
    "mTLS architecture",
    "secure remote access design",
    "encrypted terminal",
    "end to end encrypted SSH",
    "certificate SSH",
    // Session routing
    "SSH session routing",
    "terminal session relay",
    "central SSH management",
    "SSH gateway",
    "SSH bastion replacement",
    "jump server replacement",
    "bastion host alternative",
    // Platform support
    "Linux agent SSH",
    "macOS agent SSH",
    "Windows agent SSH",
    "ARM agent SSH",
    "Raspberry Pi SSH agent",
    "cloud VM SSH",
    "bare metal SSH agent",
    // How it works
    "how SSH browser works",
    "browser SSH explained",
    "SSH web architecture",
    "remote terminal how it works",
    "secure terminal setup",
    "SSH tunnel architecture",
    "SSH connection flow",
  ],
  alternates: {
    canonical: "https://webxterm.me/architecture",
  },
  openGraph: {
    title: "How WebXterm Works – Secure Agent-Based Terminal Architecture",
    description:
      "WebXterm uses a lightweight agent that creates outbound TLS connections — no inbound ports needed. Manage machines from anywhere, securely.",
    url: "https://webxterm.me/architecture",
  },
};

export default function ArchitectureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
