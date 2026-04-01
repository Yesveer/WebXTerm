"use client";

import { motion } from "framer-motion";
import {
  Terminal, Monitor, Shield, Code, Cpu, ScrollText, Network,
  Users, Lock, Activity, Globe, CheckCircle, Zap, Server, Eye,
  ArrowRight, Database,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import TerminalWindow from "@/components/TerminalWindow";
import TypingAnimation from "@/components/TypingAnimation";
import Link from "next/link";

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
      animate={{ y: [0, -16, 0], opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 7 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const terminalLines = [
  { text: "$ vsay-shell-cli login https://console.webxterm.me", color: "green", delay: 300 },
  { text: "✓ Authenticated as admin@company.com", color: "cyan", delay: 500 },
  { text: "$ vsay-shell-cli list", color: "green", delay: 600 },
  { text: "NAME               STATUS    OS       ARCH", color: "muted", delay: 200 },
  { text: "prod-server-01     online    linux    amd64", color: "foreground", delay: 100 },
  { text: "prod-server-02     online    linux    arm64", color: "foreground", delay: 100 },
  { text: "dev-laptop         online    macos    arm64", color: "foreground", delay: 100 },
  { text: "staging-k8s        offline   linux    amd64", color: "red", delay: 150 },
  { text: "$ vsay-shell-cli connect prod-server-01", color: "green", delay: 600 },
  { text: "Establishing connection...", color: "muted", delay: 300 },
  { text: "✓ Connected via TLS 1.3", color: "green", delay: 300 },
  { text: "admin@prod-server-01:~$ docker ps", color: "green", delay: 500 },
  { text: "CONTAINER ID   IMAGE          STATUS", color: "muted", delay: 200 },
  { text: "a1b2c3d4       nginx:latest   Up 3 days", color: "foreground", delay: 100 },
  { text: "e5f6g7h8       redis:7        Up 3 days", color: "foreground", delay: 100 },
];

const features = [
  {
    icon: Globe,
    title: "Browser-Based Web Terminal",
    description: "Full xterm.js terminal in your browser — color support, Unicode, copy/paste, and resize. No client software required. Connects over encrypted WebSocket (wss://).",
    tags: ["xterm.js", "WebSocket", "No install"],
  },
  {
    icon: Monitor,
    title: "Real-Time Health Monitoring",
    description: "Agent heartbeats stream CPU, memory, and disk stats to the dashboard. See the health of every machine at a glance, updated live.",
    tags: ["CPU", "Memory", "Disk", "Live"],
  },
  {
    icon: ScrollText,
    title: "Complete Audit Logs",
    description: "Every command is logged with the user, timestamp, and exit code. Full session recording gives you a tamper-evident trail for compliance and forensics.",
    tags: ["Compliance", "SOC2", "HIPAA"],
  },
  {
    icon: Network,
    title: "Port Forwarding",
    description: "Securely tunnel remote ports to localhost through the WebXTerm connection. Access internal databases, APIs, and services without exposing them to the internet.",
    tags: ["Tunnel", "No VPN", "Secure"],
  },
  {
    icon: Users,
    title: "RBAC & Team Access",
    description: "Role-based access control lets you control exactly which users can reach which machines. Manage teams, assign permissions, and revoke access from one dashboard.",
    tags: ["Teams", "Roles", "Permissions"],
  },
  {
    icon: Shield,
    title: "TLS & mTLS Encryption",
    description: "All connections are encrypted with TLS 1.3 by default. Enterprise edition adds mutual TLS (mTLS) for certificate-based authentication of agents.",
    tags: ["TLS 1.3", "mTLS (Enterprise)"],
  },
  {
    icon: Cpu,
    title: "Lightweight Agent",
    description: "The vsay-agent is a single static binary that runs as a systemd/launchd/Windows service. Connects outbound — no open inbound ports needed.",
    tags: ["Linux", "macOS", "Windows", "ARM"],
  },
  {
    icon: Code,
    title: "VS Code Extension",
    description: "VSAY VS Code Extension brings machine browsing, integrated terminal sessions, and port forwarding directly into your IDE via the Activity Bar.",
    tags: ["IDE", "WebSocket", "SSH mode"],
  },
  {
    icon: Lock,
    title: "SSO & OIDC (Enterprise)",
    description: "Enterprise edition integrates with Keycloak, Microsoft, GitHub, and Okta via OIDC/OAuth2. Multi-tenancy and org-level isolation included.",
    tags: ["OIDC", "Keycloak", "Microsoft", "GitHub"],
  },
];

const securityLayers = [
  { icon: Lock, title: "TLS 1.3 in transit", desc: "All traffic encrypted — browser to portal, portal to agent." },
  { icon: Shield, title: "mTLS (Enterprise)", desc: "Certificate-based mutual auth between portal and agents." },
  { icon: Eye, title: "Session recording", desc: "Every command logged with user, timestamp, and exit code." },
  { icon: Users, title: "RBAC policies", desc: "Per-user, per-machine access control enforced at the portal." },
  { icon: Lock, title: "JWT authentication", desc: "Bcrypt-hashed credentials with short-lived JWT tokens." },
  { icon: Zap, title: "Zero open ports", desc: "Agent connects outbound — your firewall stays closed." },
];

const monitoringStats = [
  { label: "CPU Usage", value: "12%", color: "text-terminal-green", bar: 12 },
  { label: "Memory", value: "3.2 / 8 GB", color: "text-terminal-cyan", bar: 40 },
  { label: "Disk", value: "42 / 100 GB", color: "text-terminal-yellow", bar: 42 },
  { label: "Uptime", value: "14d 6h", color: "text-primary", bar: 95 },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function FeaturesPage() {
  return (
    <div className="min-h-screen pt-24">

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-15 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <FloatingOrb size={300} x="5%" y="0%" delay={0} cyan />
        <FloatingOrb size={250} x="75%" y="20%" delay={1.2} />
        {[{ x: "20%", y: "30%" }, { x: "80%", y: "50%" }, { x: "50%", y: "80%" }].map((p, i) => (
          <motion.div key={i} className="absolute w-1 h-1 rounded-full bg-primary/40 pointer-events-none"
            style={{ left: p.x, top: p.y }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2.5 + i * 0.5, repeat: Infinity, delay: i * 0.7 }} />
        ))}
        <div className="container mx-auto px-4 relative">
          <SectionHeading
            badge="Features"
            title={<>Powerful Tools for <span className="text-gradient-green">Infrastructure Management</span></>}
            description="Everything you need to securely access, monitor, and manage your machines — from any browser, IDE, or terminal."
          />
          {/* Stats chips */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 -mt-6"
          >
            {[
              { icon: Cpu, text: "9 core features" },
              { icon: Globe, text: "Browser · CLI · IDE" },
              { icon: Zap, text: "Zero inbound ports" },
              { icon: Shield, text: "TLS 1.3 by default" },
            ].map((c) => (
              <div key={c.text} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/60 border border-border/60 text-xs text-muted-foreground">
                <c.icon className="h-3 w-3 text-primary" />
                {c.text}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Feature Cards ───────────────────────────────────────────────── */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="glass-card p-6 group hover:border-primary/30 transition-all duration-300 relative overflow-hidden cursor-default"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <motion.div
                  animate={{ scale: [1, 1.03, 1], opacity: [0.3, 0.07, 0.3] }}
                  transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.3 }}
                  className="absolute inset-0 rounded-xl border border-primary/15 pointer-events-none"
                />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
                      <f.icon className="h-5 w-5 text-primary" />
                    </div>
                    {/* Status dot */}
                    <motion.span
                      animate={{ scale: [1, 1.6, 1], opacity: [1, 0.2, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                      className="w-2 h-2 rounded-full bg-primary mt-1"
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

      {/* ── Live Terminal Demo ───────────────────────────────────────────── */}
      <section className="py-20 border-t border-border relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/4 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[10px] font-mono text-primary/60 uppercase tracking-[0.2em]">Live Demo</span>
              <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-4">
                Web Terminal in <span className="text-gradient-green">Action</span>
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Connect to any registered machine in seconds. Full xterm.js terminal with color support, Unicode, and native copy/paste — running entirely in your browser over an encrypted WebSocket tunnel.
              </p>
              <ul className="space-y-3">
                {[
                  "Login once, access all your machines",
                  "Full PTY terminal — colors, resizing, scrollback",
                  "Commands logged to audit trail automatically",
                  "Multiple sessions open simultaneously",
                ].map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex items-center gap-2.5 text-sm text-muted-foreground"
                  >
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <TerminalWindow title="webxterm — prod-server-01" className="glow-green">
                <TypingAnimation lines={terminalLines} speed={22} />
              </TerminalWindow>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Real-Time Monitoring ─────────────────────────────────────────── */}
      <section className="py-20 border-t border-border relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            {/* Machine health card */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card overflow-hidden"
            >
              {/* Card header */}
              <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border bg-card/80">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-terminal-red" />
                  <div className="w-3 h-3 rounded-full bg-terminal-yellow" />
                  <div className="w-3 h-3 rounded-full bg-terminal-green" />
                </div>
                <span className="text-xs font-mono text-muted-foreground">prod-server-01 — health monitor</span>
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="ml-auto flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-terminal-green" />
                  <span className="text-[10px] font-mono text-terminal-green">LIVE</span>
                </motion.div>
              </div>
              <div className="p-5 space-y-4">
                {monitoringStats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs text-muted-foreground font-mono">{stat.label}</span>
                      <span className={`text-xs font-mono font-semibold ${stat.color}`}>{stat.value}</span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${stat.bar}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                        className={`h-full rounded-full ${
                          i === 0 ? "bg-terminal-green" :
                          i === 1 ? "bg-terminal-cyan" :
                          i === 2 ? "bg-terminal-yellow" : "bg-primary"
                        }`}
                      />
                    </div>
                  </motion.div>
                ))}
                <div className="pt-2 border-t border-border">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Processes", value: "142" },
                      { label: "Network I/O", value: "2.4 MB/s" },
                      { label: "Load Avg", value: "0.52" },
                    ].map((s) => (
                      <div key={s.label} className="text-center">
                        <p className="text-sm font-semibold font-mono text-primary">{s.value}</p>
                        <p className="text-[10px] text-muted-foreground">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-[10px] font-mono text-primary/60 uppercase tracking-[0.2em]">Monitoring</span>
              <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-4">
                Real-Time Machine <span className="text-gradient-green">Health</span>
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                The vsay-agent sends continuous heartbeats carrying CPU, memory, disk, and network metrics. Your dashboard always shows the live state of every machine in your fleet.
              </p>
              <ul className="space-y-3">
                {[
                  "CPU, memory, disk stats from agent heartbeats",
                  "Online / offline status for every machine",
                  "Process count and network I/O visibility",
                  "Historical data for capacity planning",
                ].map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex items-center gap-2.5 text-sm text-muted-foreground"
                  >
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Security Layers ──────────────────────────────────────────────── */}
      <section className="py-20 border-t border-border relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-primary/3 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[10px] font-mono text-primary/60 uppercase tracking-[0.2em]">Security</span>
            <h2 className="text-2xl md:text-3xl font-bold mt-2">
              Security at <span className="text-gradient-green">Every Layer</span>
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {securityLayers.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="glass-card p-5 flex items-start gap-4 group hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="flex-shrink-0 p-2.5 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors relative z-10">
                  <item.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="relative z-10">
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
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
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
            <motion.div
              animate={{ scale: [1, 1.015, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3.5, repeat: Infinity }}
              className="absolute inset-0 rounded-xl border border-primary/20 pointer-events-none"
            />
            <div className="relative z-10">
              <span className="text-[10px] font-mono text-primary/60 uppercase tracking-[0.2em]">Get Started</span>
              <h2 className="text-2xl font-bold mt-2 mb-3">
                Ready to <span className="text-gradient-green">Deploy?</span>
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Install the agent on any machine and see it appear in your dashboard in under 5 minutes.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <motion.a
                  href="https://console.webxterm.me/" target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors glow-green text-sm"
                >
                  Start Free <ArrowRight className="h-4 w-4" />
                </motion.a>
                <Link
                  href="/architecture"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors border border-border text-sm"
                >
                  View Architecture
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
