import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VSAY Shell CLI – Terminal Access from Command Line",
  description:
    "VSAY CLI lets you connect to any registered machine with a single command. List machines, open terminal sessions, forward ports, and automate infrastructure tasks from your local terminal.",
  keywords: [
    // CLI tool
    "SSH CLI tool",
    "terminal CLI",
    "remote server CLI",
    "vsay cli",
    "vsay shell",
    "command line SSH",
    "SSH command line tool",
    "CLI remote access",
    "CLI terminal tool",
    "shell CLI SSH",
    // Automation
    "automate SSH",
    "SSH scripting",
    "SSH automation",
    "infrastructure automation CLI",
    "DevOps CLI tool",
    "bash SSH automation",
    "script SSH connection",
    "CI CD SSH",
    "pipeline SSH",
    "shell scripting SSH",
    // Connection
    "connect server command line",
    "SSH single command",
    "quick SSH connect",
    "SSH list machines",
    "list servers CLI",
    "manage servers CLI",
    "server list command",
    // Port forwarding CLI
    "CLI port forwarding",
    "SSH tunnel CLI",
    "forward port command line",
    "port forward shell",
    // Platform
    "Linux SSH CLI",
    "macOS SSH CLI",
    "Windows SSH CLI",
    "cross platform CLI",
    "terminal CLI Linux",
    "terminal CLI macOS",
    // Install
    "install SSH CLI",
    "curl install SSH",
    "SSH tool install Linux",
    "one line install SSH",
    // Features
    "SSH session CLI",
    "audit log CLI",
    "machine status CLI",
    "online offline server CLI",
    "SSH history CLI",
    "terminal history command line",
    // Long tail
    "best SSH CLI tool",
    "simple SSH CLI",
    "fast SSH CLI",
    "lightweight SSH CLI",
    "developer SSH tool",
    "SRE CLI tool",
    "sysadmin CLI tool",
  ],
  alternates: {
    canonical: "https://webxterm.me/cli",
  },
  openGraph: {
    title: "VSAY Shell CLI – Connect to Any Server from Your Terminal",
    description:
      "One command to SSH into any registered machine. Automate, script, and manage your infrastructure from the command line.",
    url: "https://webxterm.me/cli",
  },
};

export default function CLILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
