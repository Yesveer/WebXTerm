import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VS Code Extension – SSH Terminal Inside Your IDE",
  description:
    "WebXterm VS Code extension lets you open remote terminals, manage servers, and forward ports directly inside Visual Studio Code. No context switching — dev and ops in one place.",
  keywords: [
    // VS Code SSH
    "VS Code SSH extension",
    "Visual Studio Code SSH",
    "VS Code remote terminal",
    "VS Code SSH plugin",
    "VS Code terminal extension",
    "VS Code remote access",
    "VS Code server management",
    "VS Code infrastructure",
    "VS Code DevOps",
    "VS Code remote development",
    // IDE terminal
    "IDE SSH terminal",
    "IDE remote terminal",
    "IDE server management",
    "code editor SSH",
    "developer IDE SSH",
    "editor terminal extension",
    "integrated terminal SSH",
    "VS Code integrated SSH",
    // Port forwarding
    "VS Code port forwarding",
    "port forward VS Code",
    "VS Code tunnel",
    "VS Code localhost forward",
    "VS Code database access",
    "VS Code API access",
    // Session management
    "VS Code session management",
    "VS Code multiple servers",
    "VS Code server sidebar",
    "VS Code machine list",
    // Remote development
    "remote development VS Code",
    "VS Code remote server",
    "VS Code connect server",
    "VS Code SSH server",
    "VS Code remote Linux",
    "VS Code remote macOS",
    // Comparison
    "VS Code Remote SSH alternative",
    "VS Code Remote Explorer",
    "better VS Code SSH",
    "VS Code remote containers alternative",
    // Productivity
    "developer productivity SSH",
    "no context switch SSH",
    "code and terminal together",
    "all in one dev tool",
    "SSH inside VS Code",
    "terminal inside editor",
    // Installation
    "install VS Code SSH extension",
    "VS Code marketplace SSH",
    "VS Code extension install",
    // Long tail
    "best VS Code SSH extension",
    "free VS Code SSH",
    "VS Code terminal server",
    "VS Code open remote terminal",
    "VS Code connect to machine",
  ],
  alternates: {
    canonical: "https://webxterm.me/vscode",
  },
  openGraph: {
    title: "WebXterm VS Code Extension – Remote Terminal Inside Your IDE",
    description:
      "Connect to any server, open terminal sessions, and forward ports — all without leaving VS Code.",
    url: "https://webxterm.me/vscode",
  },
};

export default function VSCodeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
