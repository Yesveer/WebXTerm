"use client";

import { motion } from "framer-motion";
import {
  Code, Terminal, Network, CheckCircle, ArrowRight,
  Zap, Download, RefreshCw, LogIn, LogOut, Wifi, Server,
  Key, GitBranch,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
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

// ─── Animated VS Code Mockup ──────────────────────────────────────────────────
const machines = [
  { name: "prod-server-01", status: "online", os: "linux", active: true },
  { name: "prod-server-02", status: "online", os: "linux", active: false },
  { name: "dev-laptop",     status: "online", os: "macos", active: false },
  { name: "staging-k8s",   status: "offline", os: "linux", active: false },
];

const terminalOutput = [
  { text: "● Connected to prod-server-01", color: "text-primary" },
  { text: "", color: "" },
  { text: "admin@prod-server-01:~$ ls -la", color: "text-terminal-green" },
  { text: "total 48", color: "text-muted-foreground" },
  { text: "drwxr-xr-x  6 admin admin 4096 Mar  9 10:30 .", color: "text-muted-foreground" },
  { text: "drwxr-xr-x  4 admin admin 4096 Mar  8 09:15 app", color: "text-terminal-cyan" },
  { text: "drwxr-xr-x  2 admin admin 4096 Mar  5 14:20 deploy", color: "text-terminal-cyan" },
  { text: "-rw-r--r--  1 admin admin  220 Mar  1 00:00 .bash_logout", color: "text-muted-foreground" },
  { text: "", color: "" },
  { text: "admin@prod-server-01:~$ docker ps", color: "text-terminal-green" },
  { text: "CONTAINER ID   IMAGE          STATUS         PORTS", color: "text-muted-foreground" },
  { text: "a1b2c3d4       nginx:latest   Up 3 days      0.0.0.0:80->80/tcp", color: "text-foreground" },
  { text: "e5f6g7h8       redis:7        Up 3 days      6379/tcp", color: "text-foreground" },
];

function VSCodeMockup() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="glass-card overflow-hidden glow-cyan max-w-4xl mx-auto"
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-card/90">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-terminal-red" />
          <div className="w-3 h-3 rounded-full bg-terminal-yellow" />
          <div className="w-3 h-3 rounded-full bg-terminal-green" />
        </div>
        <span className="ml-2 text-xs text-muted-foreground font-mono">Visual Studio Code — WebXTerm</span>
        <motion.div
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="ml-auto flex items-center gap-1.5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-terminal-green" />
          <span className="text-[10px] font-mono text-terminal-green">CONNECTED</span>
        </motion.div>
      </div>

      <div className="flex min-h-[420px]">
        {/* Activity bar icons */}
        <div className="w-12 border-r border-border bg-card/60 flex flex-col items-center pt-3 gap-4">
          {[Code, Server, Key, GitBranch].map((Icon, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`p-2 rounded transition-colors ${activeTab === i ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </div>

        {/* Sidebar */}
        <div className="w-52 border-r border-border bg-card/40 p-3 hidden md:flex flex-col">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              WebXTerm Machines
            </span>
            <motion.button
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <RefreshCw className="h-3 w-3" />
            </motion.button>
          </div>

          <div className="space-y-0.5 flex-1">
            {machines.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className={`flex items-center gap-2 px-2 py-1.5 rounded text-xs font-mono cursor-pointer hover:bg-secondary/50 transition-colors ${m.active ? "bg-primary/10" : ""}`}
              >
                <motion.div
                  animate={m.status === "online" ? { scale: [1, 1.4, 1], opacity: [1, 0.4, 1] } : {}}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5 }}
                  className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${m.status === "online" ? "bg-terminal-green" : "bg-muted-foreground/40"}`}
                />
                <span className={`truncate ${m.active ? "text-primary" : "text-foreground"}`}>{m.name}</span>
                {m.active && (
                  <Wifi className="h-2.5 w-2.5 text-primary ml-auto flex-shrink-0" />
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-border space-y-1.5">
            <button className="w-full text-xs py-1.5 rounded bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors font-mono flex items-center justify-center gap-1.5">
              <Wifi className="h-3 w-3" /> Connect (WS)
            </button>
            <button className="w-full text-xs py-1.5 rounded bg-secondary text-muted-foreground border border-border hover:bg-secondary/80 transition-colors font-mono flex items-center justify-center gap-1.5">
              <Terminal className="h-3 w-3" /> Connect (SSH)
            </button>
          </div>
        </div>

        {/* Main terminal area */}
        <div className="flex-1 flex flex-col">
          {/* Tab bar */}
          <div className="flex border-b border-border bg-card/60">
            <div className="flex items-center gap-2 px-4 py-2 border-r border-border bg-background/40">
              <Terminal className="h-3 w-3 text-primary" />
              <span className="text-xs font-mono text-muted-foreground">Terminal — prod-server-01</span>
              <span className="text-muted-foreground/50 text-xs ml-1">×</span>
            </div>
          </div>

          {/* Terminal output */}
          <div className="flex-1 p-4 font-mono text-sm bg-background/30 overflow-hidden">
            {terminalOutput.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: 0.4 + i * 0.07 }}
                className={`leading-6 ${line.color}`}
              >
                {line.text}
              </motion.div>
            ))}
            <div className="leading-6 text-terminal-green">
              admin@prod-server-01:~$ <span className="animate-terminal-cursor inline-block w-2 h-4 bg-primary align-middle" />
            </div>
          </div>

          {/* Status bar */}
          <div className="flex items-center gap-4 px-4 py-1.5 border-t border-border bg-card/80 text-[10px] font-mono text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-terminal-green" />
              WebXTerm: Connected
            </span>
            <span>prod-server-01</span>
            <span className="ml-auto">linux · amd64</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const features = [
  {
    icon: Server,
    title: "Machine Explorer Sidebar",
    description: "A full tree view in the VS Code Activity Bar showing all your registered machines with live online/offline status indicators. Click any machine to connect.",
    tags: ["Activity Bar", "Live status", "Quick connect"],
  },
  {
    icon: Terminal,
    title: "Integrated Terminal Sessions",
    description: "Full PTY terminal sessions open directly inside VS Code via WebSocket tunneling — with color support, resizing, and copy/paste. No SSH setup required.",
    tags: ["WebSocket", "Full PTY", "No SSH needed"],
  },
  {
    icon: Network,
    title: "Port Forwarding",
    description: "Forward ports from your remote machine to localhost through the WebXTerm tunnel. Access internal databases, APIs, and dev servers without leaving VS Code.",
    tags: ["Tunnel", "localhost", "No exposure"],
  },
  {
    icon: GitBranch,
    title: "Dual Connection Modes",
    description: "Choose between WebSocket tunneling (default, works anywhere, no SSH setup) or SSH mode via the Remote-SSH extension for teams that prefer SSH workflows.",
    tags: ["WebSocket", "SSH mode", "Remote-SSH"],
  },
];

const installSteps = [
  {
    step: "01",
    title: "Open Extensions",
    desc: "Press Ctrl+Shift+X (⌘⇧X on Mac) to open the Extensions panel in VS Code.",
    code: null,
  },
  {
    step: "02",
    title: "Search & Install",
    desc: "Search for \"WebXTerm\" and click Install. Or install from the command line:",
    code: "code --install-extension vsay.vsay-terminal",
  },
  {
    step: "03",
    title: "Login via Command Palette",
    desc: "Press Ctrl+Shift+P, run \"WebXTerm: Login\", enter your backend URL and credentials.",
    code: null,
  },
  {
    step: "04",
    title: "Connect to a Machine",
    desc: "Click the WebXTerm icon in the Activity Bar. Your machines appear in the sidebar — click the WebSocket icon to connect.",
    code: null,
  },
];

const commands = [
  { icon: LogIn,     cmd: "WebXTerm: Login",              desc: "Authenticate with your WebXTerm backend URL and credentials." },
  { icon: LogOut,    cmd: "WebXTerm: Logout",             desc: "Clear stored credentials from the current VS Code session." },
  { icon: RefreshCw, cmd: "WebXTerm: Refresh Machines",   desc: "Reload the machine list in the sidebar." },
  { icon: Wifi,      cmd: "WebXTerm: Connect (WebSocket)",desc: "Open a WebSocket terminal to the selected machine." },
  { icon: Terminal,  cmd: "WebXTerm: Connect (SSH)",      desc: "Launch a connection via the Remote-SSH extension." },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function VSCodePage() {
  return (
    <div className="min-h-screen pt-24">

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-15 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] bg-[hsl(190_95%_55%/0.05)] rounded-full blur-3xl pointer-events-none" />
        <FloatingOrb size={280} x="5%" y="10%" delay={0} cyan />
        <FloatingOrb size={220} x="80%" y="20%" delay={1.2} />
        {[{ x: "20%", y: "70%" }, { x: "88%", y: "55%" }, { x: "45%", y: "85%" }].map((p, i) => (
          <motion.div key={i} className="absolute w-1 h-1 rounded-full bg-[hsl(190,95%,55%,0.5)] pointer-events-none"
            style={{ left: p.x, top: p.y }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2.5 + i * 0.5, repeat: Infinity, delay: i * 0.8 }} />
        ))}
        <div className="container mx-auto px-4 relative">
          <SectionHeading
            badge="VSAY VS Code Extension"
            title={<>Infrastructure Access <span className="text-gradient-green">Inside Your IDE</span></>}
            description="Browse machines, open terminal sessions, forward ports — all from the VS Code sidebar. Your JWT token lives only in memory for the current session."
          />
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 -mt-6"
          >
            {[
              { icon: Code, text: "VS Code Marketplace" },
              { icon: Wifi, text: "WebSocket tunneling" },
              { icon: Network, text: "Port forwarding" },
              { icon: Zap, text: "No SSH keys needed" },
            ].map((c) => (
              <div key={c.text} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/60 border border-border/60 text-xs text-muted-foreground">
                <c.icon className="h-3 w-3 text-[hsl(190,95%,55%)]" />
                {c.text}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── VS Code Mockup ───────────────────────────────────────────────── */}
      <section className="py-8 border-t border-border relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[hsl(190_95%_55%/0.04)] rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 relative">
          <VSCodeMockup />
        </div>
      </section>

      {/* ── Feature Cards ───────────────────────────────────────────────── */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[10px] font-mono text-primary/60 uppercase tracking-[0.2em]">Capabilities</span>
            <h2 className="text-2xl md:text-3xl font-bold mt-2">
              What the Extension <span className="text-gradient-green">Gives You</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="glass-card p-6 group hover:border-primary/30 transition-all duration-300 relative overflow-hidden cursor-default"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[hsl(190_95%_55%/0.04)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <motion.div
                  animate={{ scale: [1, 1.03, 1], opacity: [0.3, 0.07, 0.3] }}
                  transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.5 }}
                  className="absolute inset-0 rounded-xl border border-primary/10 pointer-events-none"
                />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-xl bg-[hsl(190_95%_55%/0.1)] border border-[hsl(190_95%_55%/0.2)] group-hover:bg-[hsl(190_95%_55%/0.2)] transition-colors">
                      <f.icon className="h-5 w-5 text-[hsl(190,95%,55%)]" />
                    </div>
                    <motion.span
                      animate={{ scale: [1, 1.6, 1], opacity: [1, 0.2, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5 }}
                      className="w-2 h-2 rounded-full bg-[hsl(190,95%,55%)] mt-1"
                    />
                  </div>
                  <h3 className="font-semibold text-base mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{f.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {f.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary font-mono text-muted-foreground border border-border/50">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Installation Steps ───────────────────────────────────────────── */}
      <section className="py-20 border-t border-border relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[10px] font-mono text-primary/60 uppercase tracking-[0.2em]">Setup</span>
            <h2 className="text-2xl md:text-3xl font-bold mt-2">
              Get Running in <span className="text-gradient-green">4 Steps</span>
            </h2>
          </motion.div>

          {/* Steps with connecting line */}
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical line (mobile) */}
              <div className="md:hidden absolute left-[1.6rem] top-8 bottom-8 w-px bg-primary/15" />

              <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-4 md:gap-5">
                {/* Horizontal line (desktop) */}
                <div className="hidden md:block absolute top-[1.9rem] left-[calc(12.5%+1.5rem)] right-[calc(12.5%+1.5rem)] h-px bg-primary/15 overflow-hidden">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute top-0 h-full w-[18%]"
                      style={{ background: "linear-gradient(to right, transparent, hsl(190 95% 55%), transparent)" }}
                      animate={{ left: ["-18%", "105%"] }}
                      transition={{ duration: 2.2, delay: i * 0.75, repeat: Infinity, ease: "linear" }}
                    />
                  ))}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[3px] border-b-[3px] border-l-[5px] border-transparent border-l-[hsl(190,95%,55%,0.5)]" />
                </div>

                {installSteps.map((s, i) => (
                  <motion.div
                    key={s.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.12 }}
                    className="flex md:flex-col md:items-center md:text-center gap-4 md:gap-3"
                  >
                    <div className="relative flex-shrink-0">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.7 }}
                        className="absolute inset-0 rounded-full bg-[hsl(190_95%_55%/0.2)] blur-md"
                      />
                      <div className="relative w-12 h-12 rounded-full bg-card border border-[hsl(190_95%_55%/0.3)] flex items-center justify-center z-10">
                        <span className="text-sm font-bold font-mono text-[hsl(190,95%,55%)]">{s.step}</span>
                      </div>
                    </div>
                    <div className="flex-1 md:flex-none">
                      <h4 className="font-semibold text-sm mb-1">{s.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                      {s.code && (
                        <div className="mt-2 flex items-center gap-2 bg-background/60 border border-border rounded px-2.5 py-1.5">
                          <code className="text-[10px] font-mono text-[hsl(190,95%,55%)] truncate">{s.code}</code>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Command Palette Reference ────────────────────────────────────── */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[10px] font-mono text-primary/60 uppercase tracking-[0.2em]">Command Palette</span>
            <h2 className="text-2xl font-bold mt-2">
              All <span className="text-gradient-green">Commands</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              Access all features via <kbd className="px-2 py-0.5 rounded bg-secondary border border-border font-mono text-xs">Ctrl+Shift+P</kbd>
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto space-y-3">
            {commands.map((c, i) => (
              <motion.div
                key={c.cmd}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="glass-card p-4 flex items-start gap-4 group hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex-shrink-0 p-2 rounded-lg bg-[hsl(190_95%_55%/0.1)] border border-[hsl(190_95%_55%/0.2)] group-hover:bg-[hsl(190_95%_55%/0.2)] transition-colors">
                  <c.icon className="h-4 w-4 text-[hsl(190,95%,55%)]" />
                </div>
                <div>
                  <code className="text-sm font-mono text-foreground">{c.cmd}</code>
                  <p className="text-xs text-muted-foreground mt-1">{c.desc}</p>
                </div>
                <CheckCircle className="h-4 w-4 text-primary/40 ml-auto flex-shrink-0 mt-0.5" />
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
            <div className="absolute inset-0 bg-gradient-to-br from-[hsl(190_95%_55%/0.05)] to-transparent pointer-events-none" />
            <motion.div
              animate={{ scale: [1, 1.015, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3.5, repeat: Infinity }}
              className="absolute inset-0 rounded-xl border border-[hsl(190_95%_55%/0.2)] pointer-events-none"
            />
            <div className="relative z-10">
              <span className="text-[10px] font-mono text-primary/60 uppercase tracking-[0.2em]">Install Now</span>
              <h2 className="text-2xl font-bold mt-2 mb-3">
                Get the <span className="text-gradient-green">Extension</span>
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Available on the VS Code Marketplace. Search for &ldquo;WebXTerm&rdquo; or install with one command.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <motion.a
                  href="https://marketplace.visualstudio.com/items?itemName=vsay.vsay-terminal"
                  target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors glow-green text-sm"
                >
                  <Download className="h-4 w-4" /> VS Code Marketplace
                </motion.a>
                <motion.a
                  href="https://docs.webxterm.me/docs/products/vsay-vscode-extension"
                  target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors border border-border text-sm"
                >
                  Read Docs <ArrowRight className="h-4 w-4" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
