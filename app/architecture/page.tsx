"use client";

import { motion } from "framer-motion";
import {
  Server, Monitor, Globe, Shield, Lock, Database, FileText,
  Cpu, Code, Terminal, CheckCircle, Zap, Key, Users,
  Network, HardDrive, ArrowRight,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import TerminalWindow from "@/components/TerminalWindow";
import TypingAnimation from "@/components/TypingAnimation";

// ─── Animated flow line between nodes ───────────────────────────────────────
function FlowLine({ label, reverse = false }: { label: string; reverse?: boolean }) {
  return (
    <div className="hidden md:flex flex-col items-center justify-center gap-1.5 flex-shrink-0 w-24">
      <span className="text-[9px] font-mono text-primary/60 uppercase tracking-widest whitespace-nowrap">
        {label}
      </span>
      <div className="relative w-full h-px bg-primary/15 overflow-hidden">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute top-0 h-full w-12 bg-gradient-to-r from-transparent via-primary to-transparent"
            initial={{ x: reverse ? "300%" : "-100%" }}
            animate={{ x: reverse ? "-100%" : "300%" }}
            transition={{
              duration: 1.6,
              delay: i * 0.55,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
        {/* Arrow tip */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 w-0 h-0 border-t-[3px] border-b-[3px] border-transparent ${
            reverse
              ? "left-0 border-r-[5px] border-r-primary/50"
              : "right-0 border-l-[5px] border-l-primary/50"
          }`}
        />
      </div>
      <div className="w-1 h-1 rounded-full bg-primary/40" />
    </div>
  );
}

// ─── Single architecture node ────────────────────────────────────────────────
function ArchNode({
  icon: Icon,
  title,
  subtitle,
  tags,
  colorClass,
  glowClass,
  delay = 0,
  status,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  tags: string[];
  colorClass: string;
  glowClass: string;
  delay?: number;
  status?: "online" | "relay" | "secure";
}) {
  const statusColors: Record<string, string> = {
    online: "bg-terminal-green",
    relay:  "bg-terminal-cyan",
    secure: "bg-terminal-purple",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay }}
      className={`glass-card p-5 flex flex-col items-center text-center gap-3 relative overflow-hidden group hover:border-primary/30 transition-all duration-300 min-w-[150px]`}
    >
      {/* Pulsing ring */}
      <motion.div
        animate={{ scale: [1, 1.04, 1], opacity: [0.4, 0.1, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, delay: delay + 0.5 }}
        className="absolute inset-0 rounded-xl border border-primary/20 pointer-events-none"
      />
      {/* Glow bg */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${glowClass}`} />

      {/* Status dot */}
      {status && (
        <span className={`absolute top-3 right-3 w-2 h-2 rounded-full ${statusColors[status]}`}>
          <motion.span
            animate={{ scale: [1, 1.8, 1], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: delay }}
            className={`absolute inset-0 rounded-full ${statusColors[status]} opacity-50`}
          />
        </span>
      )}

      <div className={`p-3 rounded-xl border relative z-10 ${colorClass}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div className="relative z-10">
        <h4 className="font-semibold text-sm">{title}</h4>
        <p className="text-[11px] text-muted-foreground mt-0.5">{subtitle}</p>
      </div>
      <div className="flex flex-wrap gap-1 justify-center relative z-10">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-[9px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground font-mono border border-border/50"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Portal sub-component card ───────────────────────────────────────────────
function PortalCard({
  icon: Icon,
  title,
  desc,
  delay = 0,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="flex items-start gap-3 p-4 rounded-lg bg-secondary/30 border border-border/50 hover:border-primary/25 hover:bg-primary/5 transition-all duration-300 group"
    >
      <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────
const agentTerminalLines = [
  { text: "$ vsay agent install", color: "green", delay: 300 },
  { text: "Downloading vsay-agent v1.1.0 (linux/amd64)...", color: "muted", delay: 200 },
  { text: "✓ Agent binary installed to /usr/local/bin/vsay", color: "green", delay: 500 },
  { text: "$ vsay agent configure --token <API_KEY>", color: "green", delay: 700 },
  { text: "✓ Config saved: /etc/vsay/config.yaml", color: "cyan", delay: 300 },
  { text: "$ vsay agent start", color: "green", delay: 600 },
  { text: "Initiating outbound gRPC connection to portal...", color: "muted", delay: 300 },
  { text: "✓ TLS handshake complete", color: "green", delay: 400 },
  { text: "✓ Machine registered: prod-server-01", color: "cyan", delay: 300 },
  { text: "✓ Agent online — awaiting sessions", color: "green", delay: 200 },
];

const portalCards = [
  {
    icon: Key,
    title: "Auth Service",
    desc: "JWT-based authentication with bcrypt. Enterprise: OIDC/OAuth2 via Keycloak, Microsoft, GitHub, Okta.",
  },
  {
    icon: Network,
    title: "Session Router",
    desc: "Routes encrypted terminal sessions between users and agents over persistent gRPC tunnels.",
  },
  {
    icon: FileText,
    title: "Audit Logger",
    desc: "Immutable log of every login, session, and command. Full trail for compliance and forensics.",
  },
  {
    icon: Database,
    title: "Machine Registry",
    desc: "Tracks agent heartbeats, CPU/memory/disk stats, connection status, and machine metadata.",
  },
];

const securityItems = [
  { icon: Lock, label: "TLS Encryption", desc: "All data in transit is encrypted via TLS." },
  { icon: Shield, label: "mTLS (Enterprise)", desc: "Certificate-based mutual authentication." },
  { icon: Users, label: "RBAC", desc: "Per-user, per-machine access policies." },
  { icon: FileText, label: "Audit Trail", desc: "Every session and command is recorded." },
  { icon: Key, label: "SSO / OIDC", desc: "Enterprise: Keycloak, Microsoft, GitHub, Okta." },
  { icon: Zap, label: "No Inbound Ports", desc: "Agent connects outbound — zero firewall changes." },
];

const platforms = [
  { name: "Linux", archs: ["x86_64", "arm64"], icon: Terminal, color: "text-terminal-green" },
  { name: "macOS", archs: ["Intel", "Apple Silicon"], icon: Monitor, color: "text-terminal-cyan" },
  { name: "Windows", archs: ["x86_64"], icon: HardDrive, color: "text-terminal-blue" },
];

// ─── Page ────────────────────────────────────────────────────────────────────
export default function ArchitecturePage() {
  return (
    <div className="min-h-screen pt-24">

      {/* Hero */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-15 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 relative">
          <SectionHeading
            badge="Architecture"
            title={<>How <span className="text-gradient-green">WebXTerm</span> Works</>}
            description="Agent-based, zero-trust architecture. The agent connects outbound — no open ports, no VPN, no firewall changes."
          />
        </div>
      </section>

      {/* ── Animated Connection Flow Diagram ─────────────────────────────── */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-0 overflow-x-auto pb-4">

            {/* Client Layer */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-3"
            >
              {[
                { icon: Globe, label: "Browser", sub: "Web Terminal" },
                { icon: Code, label: "VS Code", sub: "Extension" },
                { icon: Terminal, label: "VSAY CLI", sub: "Shell Tool" },
              ].map((c, i) => (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="glass-card px-4 py-3 flex items-center gap-3 hover:border-primary/30 transition-all duration-300 group"
                >
                  <div className="p-1.5 rounded-lg bg-[hsl(190_95%_55%/0.1)] border border-[hsl(190_95%_55%/0.2)] group-hover:bg-[hsl(190_95%_55%/0.2)] transition-colors">
                    <c.icon className="h-4 w-4 text-[hsl(190,95%,55%)]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold">{c.label}</p>
                    <p className="text-[10px] text-muted-foreground">{c.sub}</p>
                  </div>
                  {/* Live dot */}
                  <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.4 }}
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-[hsl(190,95%,55%)]"
                  />
                </motion.div>
              ))}
              <p className="text-[10px] font-mono text-center text-muted-foreground mt-1 uppercase tracking-widest">
                Client Layer
              </p>
            </motion.div>

            {/* Connection: Client → Portal */}
            <FlowLine label="HTTPS / WSS" />

            {/* WebXTerm Portal (center) */}
            <ArchNode
              icon={Globe}
              title="WebXTerm Portal"
              subtitle="Central Hub"
              tags={["Auth", "Router", "Audit", "Registry"]}
              colorClass="bg-[hsl(160_100%_50%/0.1)] border-[hsl(160_100%_50%/0.25)] text-primary"
              glowClass="bg-gradient-to-br from-primary/5 to-transparent"
              delay={0.2}
              status="relay"
            />

            {/* Connection: Portal → Agent */}
            <FlowLine label="gRPC / TLS" />

            {/* Agent */}
            <ArchNode
              icon={Cpu}
              title="vsay-agent"
              subtitle="On your machine"
              tags={["Outbound only", "Systemd", "Heartbeat"]}
              colorClass="bg-[hsl(160_100%_50%/0.1)] border-[hsl(160_100%_50%/0.2)] text-primary"
              glowClass="bg-gradient-to-br from-primary/5 to-transparent"
              delay={0.35}
              status="online"
            />

            {/* Connection: Agent → Machine */}
            <FlowLine label="Local IPC" />

            {/* Target Machine Layer */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col gap-3"
            >
              {[
                { icon: Server, label: "prod-server-01", sub: "Linux / x86" },
                { icon: Monitor, label: "dev-laptop", sub: "macOS / ARM" },
                { icon: HardDrive, label: "bare-metal-02", sub: "Linux / ARM" },
              ].map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  className="glass-card px-4 py-3 flex items-center gap-3 hover:border-primary/30 transition-all duration-300 group"
                >
                  <div className="p-1.5 rounded-lg bg-[hsl(160_100%_50%/0.1)] border border-[hsl(160_100%_50%/0.2)] group-hover:bg-[hsl(160_100%_50%/0.2)] transition-colors">
                    <m.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-mono font-semibold">{m.label}</p>
                    <p className="text-[10px] text-muted-foreground">{m.sub}</p>
                  </div>
                  {/* Online pulse */}
                  <motion.span
                    animate={{ scale: [1, 1.6, 1], opacity: [1, 0.2, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.7 }}
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
                  />
                </motion.div>
              ))}
              <p className="text-[10px] font-mono text-center text-muted-foreground mt-1 uppercase tracking-widest">
                Machine Layer
              </p>
            </motion.div>
          </div>

          {/* Flow legend */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-8"
          >
            {[
              { color: "bg-[hsl(190,95%,55%)]", label: "Client connection (HTTPS/WSS)" },
              { color: "bg-primary", label: "Agent tunnel (gRPC/TLS — outbound)" },
              { color: "bg-primary animate-pulse", label: "Active session" },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${l.color}`} />
                <span className="text-xs text-muted-foreground">{l.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Portal Internals ──────────────────────────────────────────────── */}
      <section className="py-20 border-t border-border relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="text-[10px] font-mono text-primary/60 uppercase tracking-[0.2em]">
              Portal Internals
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mt-2">
              What Lives Inside the <span className="text-gradient-green">Portal</span>
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm">
              The WebXTerm portal is the control plane — it handles identity, routing, monitoring, and audit without ever storing your credentials.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {portalCards.map((c, i) => (
              <PortalCard key={c.title} icon={c.icon} title={c.title} desc={c.desc} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Agent + Terminal demo ─────────────────────────────────────────── */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[10px] font-mono text-primary/60 uppercase tracking-[0.2em]">
                Agent Architecture
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-4">
                Lightweight. <span className="text-gradient-green">Outbound-only.</span>
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                The <span className="text-foreground font-mono text-xs">vsay-agent</span> is a small binary that runs as a system service on any machine. It initiates an outbound gRPC connection to the WebXTerm portal — meaning zero firewall changes and zero open ports on your end.
              </p>
              <ul className="space-y-3">
                {[
                  "Connects outbound over gRPC + TLS",
                  "Runs as systemd / launchd / Windows Service",
                  "Sends heartbeats: CPU, memory, disk stats",
                  "Handles terminal sessions & port forwarding",
                  "Minimal footprint — single binary, no dependencies",
                ].map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -12 }}
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

            {/* Terminal */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <TerminalWindow title="vsay-agent — setup & connect" className="glow-green">
                <TypingAnimation lines={agentTerminalLines} speed={28} />
              </TerminalWindow>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Security Model ────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-border relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/3 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[10px] font-mono text-primary/60 uppercase tracking-[0.2em]">
              Security Model
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mt-2">
              Security at <span className="text-gradient-green">Every Layer</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {securityItems.map((item, i) => (
              <motion.div
                key={item.label}
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
                  <p className="text-sm font-semibold">{item.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Platform Support ──────────────────────────────────────────────── */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[10px] font-mono text-primary/60 uppercase tracking-[0.2em]">
              Platform Support
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mt-2">
              Runs <span className="text-gradient-green">Everywhere</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-3">
              Deploy the agent on any machine — cloud, bare-metal, or laptop.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-6 max-w-2xl mx-auto">
            {platforms.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="glass-card p-6 flex flex-col items-center gap-4 hover:border-primary/30 transition-all duration-300 group min-w-[170px]"
              >
                <div className="relative">
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.1, 0.4] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.8 }}
                    className="absolute inset-0 rounded-full bg-primary/20 blur-sm pointer-events-none"
                  />
                  <div className="relative p-3.5 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                    <p.icon className={`h-7 w-7 ${p.color}`} />
                  </div>
                </div>
                <div className="text-center">
                  <p className="font-semibold">{p.name}</p>
                  <div className="flex flex-wrap gap-1 justify-center mt-2">
                    {p.archs.map((a) => (
                      <span
                        key={a}
                        className="text-[9px] px-2 py-0.5 rounded-full bg-secondary font-mono text-muted-foreground border border-border/50"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card max-w-3xl mx-auto p-10 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
            <motion.div
              animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 rounded-xl border border-primary/15 pointer-events-none"
            />
            <div className="relative z-10">
              <span className="text-[10px] font-mono text-primary/60 uppercase tracking-[0.2em]">
                Get Started
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-3">
                Deploy in <span className="text-gradient-green">Under 5 Minutes</span>
              </h2>
              <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto">
                Install the agent on any machine and see it appear in your portal instantly. No firewall rules, no VPN setup, no certificates to manage.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href="https://docs.webxterm.me/docs/getting-started"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors glow-green text-sm"
                >
                  Read the Docs <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="https://console.webxterm.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors border border-border text-sm"
                >
                  Open Console
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
