"use client";

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import TerminalWindow from "@/components/TerminalWindow";
import TypingAnimation from "@/components/TypingAnimation";

const installLines = [
  { text: "$ curl -sSL https://get.webxterm.me/cli | sh", color: "green", delay: 300 },
  { text: "Downloading vsay-cli v1.8.0...", color: "muted", delay: 400 },
  { text: "✓ Installed to /usr/local/bin/vsay", color: "green", delay: 300 },
  { text: "", delay: 200 },
  { text: "$ vsay auth login", color: "green", delay: 500 },
  { text: "Opening browser for authentication...", color: "muted", delay: 300 },
  { text: "✓ Authenticated as admin@company.com", color: "cyan", delay: 400 },
];

const connectLines = [
  { text: "$ vsay list", color: "green", delay: 300 },
  { text: "NAME             STATUS    OS       ARCH", color: "muted", delay: 200 },
  { text: "prod-server-01   online    linux    amd64", color: "foreground", delay: 100 },
  { text: "prod-server-02   online    linux    arm64", color: "foreground", delay: 100 },
  { text: "dev-laptop       online    macos    arm64", color: "foreground", delay: 100 },
  { text: "staging-k8s      offline   linux    amd64", color: "red", delay: 200 },
  { text: "", delay: 300 },
  { text: "$ vsay connect prod-server-01", color: "green", delay: 500 },
  { text: "Establishing connection...", color: "muted", delay: 300 },
  { text: "✓ Connected to prod-server-01", color: "cyan", delay: 300 },
  { text: "admin@prod-server-01:~$", color: "green", delay: 200 },
];

const cliFeatures = [
  "Connect to any registered machine with a single command",
  "List all machines with their status and metadata",
  "Script and automate with shell-friendly output",
  "Forward ports through secure tunnels",
  "Manage sessions and view audit history",
  "Cross-platform: Linux, macOS, Windows",
];

export default function CLIPage() {
  return (
    <div className="min-h-screen pt-24">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge="VSAY Shell CLI"
            title={<>Terminal Access from <span className="text-gradient-green">Your Command Line</span></>}
            description="A powerful CLI tool for connecting to machines, scripting, and automation."
          />

          <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
            <div>
              <TerminalWindow title="bash — install vsay" className="glow-green mb-8">
                <TypingAnimation lines={installLines} speed={25} />
              </TerminalWindow>
            </div>
            <div>
              <TerminalWindow title="bash — connect to server" className="glow-cyan">
                <TypingAnimation lines={connectLines} speed={25} />
              </TerminalWindow>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto glass-card p-8"
          >
            <h3 className="text-xl font-semibold mb-6">CLI Features</h3>
            <ul className="space-y-3">
              {cliFeatures.map((f) => (
                <li key={f} className="flex items-start gap-3 text-muted-foreground">
                  <Terminal className="h-4 w-4 text-primary mt-1 shrink-0" />
                  <span className="text-sm">{f}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
