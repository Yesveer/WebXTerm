"use client";

import { motion } from "framer-motion";
import {
  Terminal, CheckCircle, Copy, ArrowRight, Zap,
  Globe, Monitor, HardDrive, LogIn, List, Wifi,
  Trash2, Info, Hash,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import TerminalWindow from "@/components/TerminalWindow";
import TypingAnimation from "@/components/TypingAnimation";
import { useState } from "react";

// ─── Helpers ─────────────────────────────────────────────────────────────────
function FloatingOrb({ size, x, y, delay, cyan = false }: {
  size: number; x: string; y: string; delay: number; cyan?: boolean;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size, height: size, left: x, top: y,
        background: cyan
          ? "radial-gradient(circle, hsl(190 95% 55% / 0.07) 0%, transparent 70%)"
          : "radial-gradient(circle, hsl(160 100% 50% / 0.06) 0%, transparent 70%)",
      }}
      animate={{ y: [0, -14, 0], opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 7 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="ml-auto flex-shrink-0 p-1.5 rounded text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
    >
      {copied ? <CheckCircle className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const installLines = [
  { text: "# Linux / macOS — download the CLI", color: "muted", delay: 200 },
  { text: "$ curl -sSL https://get.webxterm.me/cli | sh", color: "green", delay: 400 },
  { text: "Downloading vsay-shell-cli v1.8.0 (linux/amd64)...", color: "muted", delay: 400 },
  { text: "✓ Installed to /usr/local/bin/vsay-shell-cli", color: "green", delay: 500 },
  { text: "", delay: 200 },
  { text: "$ vsay-shell-cli login https://console.webxterm.me", color: "green", delay: 500 },
  { text: "Enter email: admin@company.com", color: "muted", delay: 400 },
  { text: "Enter password: ••••••••", color: "muted", delay: 300 },
  { text: "✓ Authenticated — credentials saved to ~/.vsay-shell-cli/config.json", color: "cyan", delay: 400 },
];

const connectLines = [
  { text: "$ vsay-shell-cli list", color: "green", delay: 400 },
  { text: "NAME               STATUS    OS       ARCH", color: "muted", delay: 200 },
  { text: "prod-server-01     online    linux    amd64", color: "foreground", delay: 80 },
  { text: "prod-server-02     online    linux    arm64", color: "foreground", delay: 80 },
  { text: "dev-laptop         online    macos    arm64", color: "foreground", delay: 80 },
  { text: "staging-k8s        offline   linux    amd64", color: "red", delay: 100 },
  { text: "", delay: 300 },
  { text: "$ vsay-shell-cli connect prod-server-01", color: "green", delay: 500 },
  { text: "Connecting to prod-server-01 via WebSocket...", color: "muted", delay: 300 },
  { text: "✓ Session started — ID: cli-1746823940221", color: "cyan", delay: 300 },
  { text: "admin@prod-server-01:~$ uptime", color: "green", delay: 500 },
  { text: " 10:42:12 up 14 days,  6:31,  1 user,  load average: 0.52, 0.48, 0.44", color: "foreground", delay: 200 },
  { text: "admin@prod-server-01:~$", color: "green", delay: 200 },
];

const commands = [
  {
    icon: LogIn,
    cmd: "vsay-shell-cli login <URL>",
    short: "login",
    desc: "Authenticate with your WebXTerm backend. Prompts for email and password. Stores credentials in ~/.vsay-shell-cli/config.json.",
    example: "vsay-shell-cli login https://console.webxterm.me",
  },
  {
    icon: List,
    cmd: "vsay-shell-cli list",
    short: "ls",
    desc: "List all registered machines with their name, online/offline status, OS, and CPU architecture.",
    example: "vsay-shell-cli ls",
  },
  {
    icon: Wifi,
    cmd: "vsay-shell-cli connect <name>",
    short: "connect",
    desc: "Open an interactive PTY terminal session to the named machine over WebSocket tunneling. Full color and Unicode support.",
    example: "vsay-shell-cli connect prod-server-01",
  },
  {
    icon: Trash2,
    cmd: "vsay-shell-cli delete <name>",
    short: "delete",
    desc: "Remove a machine entry from your account. The agent on the machine is not uninstalled — only the registration is deleted.",
    example: "vsay-shell-cli delete staging-k8s",
  },
  {
    icon: Info,
    cmd: "vsay-shell-cli status",
    short: "status",
    desc: "Show current authentication status — logged-in user, backend URL, and credential validity.",
    example: "vsay-shell-cli status",
  },
  {
    icon: LogIn,
    cmd: "vsay-shell-cli logout",
    short: "logout",
    desc: "Clear all saved credentials from the local config file. You'll need to run login again to reconnect.",
    example: "vsay-shell-cli logout",
  },
  {
    icon: Hash,
    cmd: "vsay-shell-cli version",
    short: "version",
    desc: "Print the installed CLI version. Use this to check if you're running the latest release.",
    example: "vsay-shell-cli version",
  },
];

const platforms = [
  { icon: Terminal, name: "Linux", archs: "amd64 · arm64", color: "text-terminal-green" },
  { icon: Monitor, name: "macOS", archs: "Intel · Apple Silicon", color: "text-terminal-cyan" },
  { icon: HardDrive, name: "Windows", archs: "amd64", color: "text-[hsl(215,90%,60%)]" },
];

const installOptions = [
  { os: "Linux / macOS", cmd: "curl -sSL https://get.webxterm.me/cli | sh" },
  { os: "Windows (PowerShell)", cmd: "iwr https://get.webxterm.me/cli.ps1 | iex" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CLIPage() {
  return (
    <div className="min-h-screen pt-24">

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-15 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <FloatingOrb size={280} x="3%" y="10%" delay={0} />
        <FloatingOrb size={220} x="78%" y="30%" delay={1.2} cyan />
        {[{ x: "15%", y: "70%" }, { x: "85%", y: "20%" }, { x: "55%", y: "85%" }].map((p, i) => (
          <motion.div key={i} className="absolute w-1 h-1 rounded-full bg-primary/40 pointer-events-none"
            style={{ left: p.x, top: p.y }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2.5 + i * 0.5, repeat: Infinity, delay: i * 0.8 }} />
        ))}
        <div className="container mx-auto px-4 relative">
          <SectionHeading
            badge="VSAY Shell CLI"
            title={<>Terminal Access from <span className="text-gradient-green">Your Command Line</span></>}
            description="A single static binary with no dependencies. Install once, connect to any of your registered machines from any terminal."
          />
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 -mt-6"
          >
            {[
              { icon: Zap, text: "Single binary" },
              { icon: Globe, text: "No dependencies" },
              { icon: Terminal, text: "Linux · macOS · Windows" },
              { icon: Wifi, text: "WebSocket tunneling" },
            ].map((c) => (
              <div key={c.text} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/60 border border-border/60 text-xs text-muted-foreground">
                <c.icon className="h-3 w-3 text-primary" />
                {c.text}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Install + Login ──────────────────────────────────────────────── */}
      <section className="py-20 border-t border-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">

            {/* Install steps */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[10px] font-mono text-primary/60 uppercase tracking-[0.2em]">Step 1</span>
              <h2 className="text-2xl font-bold mt-2 mb-6">
                Install & <span className="text-gradient-green">Authenticate</span>
              </h2>

              <div className="space-y-3 mb-8">
                {installOptions.map((opt) => (
                  <div key={opt.os} className="glass-card p-4">
                    <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-2">{opt.os}</p>
                    <div className="flex items-center gap-2 bg-background/60 rounded px-3 py-2">
                      <code className="text-xs font-mono text-primary flex-1 overflow-x-auto">{opt.cmd}</code>
                      <CopyButton text={opt.cmd} />
                    </div>
                  </div>
                ))}
              </div>

              <TerminalWindow title="bash — install & login" className="glow-green">
                <TypingAnimation lines={installLines} speed={22} />
              </TerminalWindow>
            </motion.div>

            {/* Connect */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <span className="text-[10px] font-mono text-primary/60 uppercase tracking-[0.2em]">Step 2</span>
              <h2 className="text-2xl font-bold mt-2 mb-6">
                List & <span className="text-gradient-green">Connect</span>
              </h2>

              <div className="glass-card p-4 mb-8">
                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-2">Quick connect</p>
                <div className="flex items-center gap-2 bg-background/60 rounded px-3 py-2">
                  <code className="text-xs font-mono text-primary flex-1">vsay-shell-cli connect &lt;machine-name&gt;</code>
                  <CopyButton text="vsay-shell-cli connect <machine-name>" />
                </div>
              </div>

              <TerminalWindow title="bash — list & connect" className="glow-cyan">
                <TypingAnimation lines={connectLines} speed={22} />
              </TerminalWindow>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Command Reference ────────────────────────────────────────────── */}
      <section className="py-20 border-t border-border relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[10px] font-mono text-primary/60 uppercase tracking-[0.2em]">Reference</span>
            <h2 className="text-2xl md:text-3xl font-bold mt-2">
              All <span className="text-gradient-green">Commands</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {commands.map((cmd, i) => (
              <motion.div
                key={cmd.short}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="glass-card p-5 group hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                      <cmd.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <code className="text-xs font-mono text-primary truncate block">{cmd.cmd}</code>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{cmd.desc}</p>
                  <div className="flex items-center gap-2 bg-background/50 rounded px-3 py-1.5">
                    <code className="text-[11px] font-mono text-muted-foreground flex-1 truncate">{cmd.example}</code>
                    <CopyButton text={cmd.example} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Platform Support ─────────────────────────────────────────────── */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="text-[10px] font-mono text-primary/60 uppercase tracking-[0.2em]">Platforms</span>
            <h2 className="text-2xl font-bold mt-2">
              Runs <span className="text-gradient-green">Everywhere</span>
            </h2>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-5">
            {platforms.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="glass-card px-8 py-6 flex flex-col items-center gap-3 hover:border-primary/30 transition-all duration-300 group min-w-[160px]"
              >
                <div className="relative">
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.1, 0.4] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.8 }}
                    className="absolute inset-0 rounded-full bg-primary/20 blur-sm pointer-events-none"
                  />
                  <div className="relative p-3.5 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                    <p.icon className={`h-6 w-6 ${p.color}`} />
                  </div>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-sm">{p.name}</p>
                  <p className="text-[10px] font-mono text-muted-foreground mt-1">{p.archs}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card max-w-2xl mx-auto p-10 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
            <motion.div
              animate={{ scale: [1, 1.015, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3.5, repeat: Infinity }}
              className="absolute inset-0 rounded-xl border border-primary/20 pointer-events-none"
            />
            <div className="relative z-10">
              <span className="text-[10px] font-mono text-primary/60 uppercase tracking-[0.2em]">Download</span>
              <h2 className="text-2xl font-bold mt-2 mb-3">
                Start Using the <span className="text-gradient-green">CLI Now</span>
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                One command to install. One command to connect. No configuration files, no SSH keys to manage.
              </p>
              <div className="flex items-center gap-2 bg-background/60 border border-border rounded-lg px-4 py-3 mb-6 max-w-md mx-auto">
                <code className="text-xs font-mono text-primary flex-1">curl -sSL https://get.webxterm.me/cli | sh</code>
                <CopyButton text="curl -sSL https://get.webxterm.me/cli | sh" />
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <motion.a
                  href="https://docs.webxterm.me/docs/products/vsay-shell-cli" target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors glow-green text-sm"
                >
                  Full CLI Docs <ArrowRight className="h-4 w-4" />
                </motion.a>
                <motion.a
                  href="https://console.webxterm.me/" target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors border border-border text-sm"
                >
                  Open Console
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
