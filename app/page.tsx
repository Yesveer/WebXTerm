"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import {
  Terminal, Shield, Monitor, Code, Cpu, ArrowRight, Check, X,
  Lock, Eye, KeyRound, ShieldCheck, Server, FileText, Users,
  Globe, Activity, Zap,
} from "lucide-react";
import TerminalWindow from "@/components/TerminalWindow";
import TypingAnimation from "@/components/TypingAnimation";
import SectionHeading from "@/components/SectionHeading";
import FeatureCard from "@/components/FeatureCard";

// ─── Animated counter ────────────────────────────────────────────────────────
function Counter({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(eased * to));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to]);

  return <span ref={ref}>{prefix}{val.toLocaleString()}{suffix}</span>;
}

// ─── Floating background orb ─────────────────────────────────────────────────
function FloatingOrb({ size, x, y, delay, cyan = false }: {
  size: number; x: string; y: string; delay: number; cyan?: boolean;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size, height: size, left: x, top: y,
        background: cyan
          ? "radial-gradient(circle, hsl(190 95% 55% / 0.08) 0%, transparent 70%)"
          : "radial-gradient(circle, hsl(160 100% 50% / 0.07) 0%, transparent 70%)",
        filter: "blur(1px)",
      }}
      animate={{ y: [0, -18, 0], opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 6 + delay * 1.5, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

// ─── Animated flow line (packets moving along) ───────────────────────────────
function FlowLine({ label = "", reverse = false }: { label?: string; reverse?: boolean }) {
  return (
    <div className="hidden md:flex flex-col items-center justify-center gap-1.5 flex-shrink-0 w-24">
      {label && (
        <span className="text-[9px] font-mono text-primary/50 uppercase tracking-widest whitespace-nowrap">
          {label}
        </span>
      )}
      <div className="relative w-full h-px bg-primary/15 overflow-hidden">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute top-0 h-full w-12 bg-gradient-to-r from-transparent via-primary to-transparent"
            initial={{ x: reverse ? "300%" : "-100%" }}
            animate={{ x: reverse ? "-100%" : "300%" }}
            transition={{ duration: 1.6, delay: i * 0.55, repeat: Infinity, ease: "linear" }}
          />
        ))}
        <div
          className={`absolute top-1/2 -translate-y-1/2 w-0 h-0 border-t-[3px] border-b-[3px] border-transparent ${
            reverse
              ? "left-0 border-r-[5px] border-r-primary/50"
              : "right-0 border-l-[5px] border-l-primary/50"
          }`}
        />
      </div>
    </div>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────
const heroTerminalLines = [
  { text: "$ vsay agent install", color: "green", delay: 300 },
  { text: "Installing VSAY agent v1.1.0...", color: "muted", delay: 200 },
  { text: "✓ Agent installed successfully", color: "green", delay: 400 },
  { text: "$ vsay agent start", color: "green", delay: 600 },
  { text: "Connecting to WebXTerm portal...", color: "muted", delay: 200 },
  { text: "✓ Connected! Machine registered as prod-server-01", color: "cyan", delay: 400 },
  { text: "✓ Ready for remote terminal access", color: "green", delay: 200 },
];

const accessMethods = [
  { title: "Web Terminal", desc: "Browser-based SSH with full terminal capabilities", icon: Monitor, status: "Live" },
  { title: "VSAY VS Code Extension", desc: "Manage servers directly from your IDE", icon: Code, status: "Live" },
  { title: "VSAY Shell CLI", desc: "Command-line tool for automation and scripting", icon: Terminal, status: "Live" },
  { title: "Agent-Based Access", desc: "Deploy agents for seamless, secure connections", icon: Cpu, status: "Live" },
];

const features = [
  { icon: Terminal, title: "Web Terminal", description: "Browser-based SSH access with full terminal capabilities. No client installation required." },
  { icon: Monitor, title: "Session Management", description: "Open multiple terminal sessions, monitor logs, and track active connections in real-time." },
  { icon: Shield, title: "Secure Access", description: "TLS encryption, audit logs, and RBAC. Enterprise plan includes mTLS and OIDC/SSO." },
  { icon: Code, title: "VS Code Extension", description: "Connect to machines, use remote terminals, and forward ports directly inside VS Code." },
  { icon: Cpu, title: "Agent Architecture", description: "Lightweight agent runs on any machine — servers, laptops, bare-metal, cloud instances." },
  { icon: Terminal, title: "VSAY Shell CLI", description: "Command-line tool for automation, scripting, and connecting from your local terminal." },
];

const pricingFeatures = [
  { feature: "Secure SSH Access", community: true, enterprise: true },
  { feature: "Web Terminal", community: true, enterprise: true },
  { feature: "Team Collaboration (RBAC)", community: true, enterprise: true },
  { feature: "Real-time Monitoring", community: true, enterprise: true },
  { feature: "Audit Logs", community: true, enterprise: true },
  { feature: "TLS Encryption", community: true, enterprise: true },
  { feature: "VSAY Shell CLI", community: true, enterprise: true },
  { feature: "VSAY VSCode Extension", community: true, enterprise: true },
  { feature: "API Access", community: true, enterprise: true },
  { feature: "MTLS (Mutual TLS)", community: false, enterprise: true },
  { feature: "OIDC / SSO (Keycloak)", community: false, enterprise: true },
  { feature: "Multi-tenancy (Organizations)", community: false, enterprise: true },
  { feature: "Organization API", community: false, enterprise: true },
  { feature: "Priority Support", community: false, enterprise: true },
];

const pamPillars = [
  {
    icon: Lock,
    label: "Zero-Trust",
    title: "Zero-Trust Access Control",
    description: "Agent-based architecture connects outbound — no inbound firewall rules, no open ports, no VPNs. Every session is authenticated and encrypted end-to-end.",
    features: ["No inbound ports required", "TLS + mTLS encryption", "Per-session authorization"],
  },
  {
    icon: Eye,
    label: "Full Visibility",
    title: "Complete Audit Trail",
    description: "Every command typed, every session started, every login attempt — all recorded with full context. Built for compliance from the ground up.",
    features: ["Full command history logging", "Session logs", "Real-time activity tracking"],
  },
  {
    icon: Users,
    label: "Access Governance",
    title: "RBAC & Team Access",
    description: "Granular role-based access control so every engineer only reaches what they need. Manage all permissions from one centralized dashboard.",
    features: ["Per-user machine access", "Role-based permissions", "Centralized admin controls"],
  },
  {
    icon: KeyRound,
    label: "SSO & Identity",
    title: "Enterprise Identity Integration",
    description: "Plug into your existing identity provider. OIDC, Keycloak, Microsoft, GitHub, and Okta — bring your own SSO with zero credential sprawl.",
    features: ["OIDC / OAuth2 support", "Keycloak & Microsoft SSO", "GitHub & Okta integration"],
  },
];

const pamFlow = [
  { icon: Users, title: "Authenticate", description: "User logs in via JWT or Enterprise SSO. Identity verified against your IdP." },
  { icon: ShieldCheck, title: "Authorize", description: "RBAC policies evaluated. Only allowed machines are accessible." },
  { icon: Server, title: "Connect", description: "vsay-agent receives the tunnel. No inbound ports needed." },
  { icon: FileText, title: "Audit", description: "Every command logged in real-time. Tamper-evident trail." },
];

const traditionalPAM = [
  "Complex VPN setup required",
  "Open inbound firewall ports",
  "Separate credentials per tool",
  "No unified audit trail",
  "Expensive enterprise licensing",
];

const webxtermPAM = [
  "Agent-based, zero VPN needed",
  "Zero inbound ports required",
  "SSO & OIDC integration",
  "Complete session logs",
  "Free community edition",
];

// ─── Page ────────────────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div className="min-h-screen">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="hero-glow absolute inset-0" />
        <div className="grid-pattern absolute inset-0 opacity-30" />

        {/* Floating orbs */}
        <FloatingOrb size={400} x="60%" y="-10%" delay={0} />
        <FloatingOrb size={250} x="80%" y="40%" delay={1.2} cyan />
        <FloatingOrb size={300} x="-5%" y="20%" delay={2} cyan />
        <FloatingOrb size={180} x="40%" y="60%" delay={0.8} />

        {/* Scattered blinking dots */}
        {[
          { x: "15%", y: "25%" }, { x: "72%", y: "18%" }, { x: "88%", y: "60%" },
          { x: "5%", y: "70%" }, { x: "55%", y: "80%" }, { x: "30%", y: "10%" },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/40 pointer-events-none"
            style={{ left: pos.x, top: pos.y }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }}
            transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, delay: i * 0.6 }}
          />
        ))}

        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {/* Animated badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-mono font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
              >
                <motion.span
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-primary"
                />
                Terminal Management Platform
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
                Secure Terminal Access for{" "}
                <span className="text-gradient-green">All Your Infrastructure</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                Manage servers, laptops, and bare-metal machines securely from your browser, CLI, or IDE.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <motion.a
                  href="https://console.webxterm.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors glow-green"
                >
                  Get Started <ArrowRight className="h-4 w-4" />
                </motion.a>
                <motion.a
                  href="https://docs.webxterm.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors border border-border"
                >
                  Documentation
                </motion.a>
                <motion.a
                  href="https://community.webxterm.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors border border-border"
                >
                  Community
                </motion.a>
              </div>

              {/* Hero mini-stats */}
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Zap, text: "Zero open ports" },
                  { icon: Globe, text: "Linux · macOS · Windows" },
                  { icon: Activity, text: "Free community edition" },
                ].map((chip, i) => (
                  <motion.div
                    key={chip.text}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/60 border border-border/60 text-xs text-muted-foreground"
                  >
                    <chip.icon className="h-3 w-3 text-primary" />
                    {chip.text}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <TerminalWindow title="webxterm — agent setup" className="glow-green">
                <TypingAnimation lines={heroTerminalLines} speed={30} />
              </TerminalWindow>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Animated Stats Strip ──────────────────────────────────────────── */}
      <section className="py-14 border-t border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-secondary/20 pointer-events-none" />
        {/* Scan line */}
        <motion.div
          className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-primary/5 to-transparent pointer-events-none"
          animate={{ x: ["-10%", "110%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
        />
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { to: 0, suffix: "", label: "Open inbound ports", note: "Zero-trust", icon: Lock },
              { to: 3, suffix: "", label: "OS platforms", note: "Linux · macOS · Win", icon: Globe },
              { to: 14, suffix: "+", label: "Enterprise features", note: "SSO, mTLS, RBAC…", icon: Shield },
              { to: 99, suffix: ".9%", label: "Platform uptime", note: "Always available", icon: Activity },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="flex items-center gap-2 mb-1">
                  <s.icon className="h-4 w-4 text-primary/60" />
                  <span className="text-3xl md:text-4xl font-bold text-primary font-mono">
                    <Counter to={s.to} suffix={s.suffix} />
                  </span>
                </div>
                <p className="text-sm font-medium">{s.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Access Methods ────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge="Access Methods"
            title={<>Multiple Ways to <span className="text-gradient-green">Connect</span></>}
            description="Choose the access method that fits your workflow — browser, IDE, or terminal."
          />

          {/* Mini flow: You → Portal → Machine */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-2 mb-10 max-w-lg mx-auto"
          >
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary border border-border text-xs font-mono">
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-[hsl(190,95%,55%)]"
              />
              You
            </div>
            <FlowLine label="HTTPS" />
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary border border-primary/30 text-xs font-mono text-primary">
              <motion.span
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-primary"
              />
              Portal
            </div>
            <FlowLine label="gRPC/TLS" />
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary border border-border text-xs font-mono">
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: 0.5 }}
                className="w-1.5 h-1.5 rounded-full bg-primary"
              />
              Machine
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {accessMethods.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="glass-card p-6 group hover:border-primary/30 transition-all duration-300 relative overflow-hidden cursor-default"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                {/* Pulsing ring */}
                <motion.div
                  animate={{ scale: [1, 1.03, 1], opacity: [0.3, 0.07, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  className="absolute inset-0 rounded-xl border border-primary/20 pointer-events-none"
                />
                {/* Status dot */}
                <span className="absolute top-3 right-3">
                  <motion.span
                    animate={{ scale: [1, 1.8, 1], opacity: [1, 0.2, 1] }}
                    transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.4 }}
                    className="block w-2 h-2 rounded-full bg-primary"
                  />
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 mb-4 group-hover:bg-primary/20 transition-colors relative z-10">
                  <m.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-base mb-1.5 relative z-10">{m.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed relative z-10">{m.desc}</p>
                <div className="flex items-center gap-1 mt-3 relative z-10">
                  <span className="text-[10px] font-mono text-primary/60 uppercase tracking-wider">{m.status}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAM Solution ──────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-border relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-15 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/4 rounded-full blur-3xl pointer-events-none" />
        <FloatingOrb size={350} x="5%" y="30%" delay={0.5} cyan />
        <FloatingOrb size={280} x="75%" y="50%" delay={1.5} />

        <div className="container mx-auto px-4 relative">
          <SectionHeading
            badge="Privileged Access Management"
            title={<>One Platform. <span className="text-gradient-green">Complete PAM.</span></>}
            description="WebXTerm is a full Privileged Access Management solution — control who accesses what, record every session, and enforce zero-trust across your entire fleet."
          />

          {/* Traditional vs WebXTerm */}
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="glass-card p-6 border-destructive/20"
            >
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2 h-2 rounded-full bg-destructive" />
                <span className="text-sm font-semibold text-muted-foreground">Traditional PAM</span>
              </div>
              <ul className="space-y-3">
                {traditionalPAM.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
                    className="flex items-center gap-3 text-sm text-muted-foreground"
                  >
                    <X className="h-4 w-4 text-destructive/70 flex-shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="glass-card p-6 border-primary/25 relative overflow-hidden"
            >
              <motion.div
                animate={{ opacity: [0.03, 0.07, 0.03] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-primary pointer-events-none"
              />
              <div className="flex items-center gap-2 mb-5 relative">
                <motion.span
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-primary"
                />
                <span className="text-sm font-semibold text-primary">WebXTerm</span>
              </div>
              <ul className="space-y-3 relative">
                {webxtermPAM.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
                    className="flex items-center gap-3 text-sm"
                  >
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* PAM Pillars */}
          <div className="grid md:grid-cols-2 gap-6 mb-24">
            {pamPillars.map((pillar, i) => (
              <motion.div
                key={pillar.label}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="glass-card p-6 group hover:border-primary/30 transition-all duration-300 relative overflow-hidden cursor-default"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="flex items-start gap-4 relative">
                  <div className="flex-shrink-0 p-3 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
                    <pillar.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-primary/60 uppercase tracking-[0.15em]">{pillar.label}</span>
                    <h3 className="text-lg font-semibold mt-0.5 mb-2">{pillar.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{pillar.description}</p>
                    <ul className="space-y-2">
                      {pillar.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Check className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Access Flow — 4 Steps with animated packets */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <span className="text-[10px] font-mono text-primary/60 uppercase tracking-[0.2em]">How It Works</span>
              <h3 className="text-2xl md:text-3xl font-bold mt-2">
                Access Flow in <span className="text-gradient-green">4 Steps</span>
              </h3>
            </motion.div>

            <div className="relative max-w-3xl mx-auto">
              {/* Animated connecting line */}
              <div className="hidden md:block absolute top-[2.1rem] left-[calc(12.5%+2.25rem)] right-[calc(12.5%+2.25rem)] h-px bg-primary/15 overflow-hidden">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute top-0 h-full w-[18%]"
                    style={{ background: "linear-gradient(to right, transparent, hsl(160 100% 50%), transparent)" }}
                    animate={{ left: ["-18%", "105%"] }}
                    transition={{ duration: 2.2, delay: i * 0.75, repeat: Infinity, ease: "linear" }}
                  />
                ))}
                {/* Arrow tip at right end */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[3px] border-b-[3px] border-l-[5px] border-transparent border-l-primary/50" />
              </div>

              <div className="grid md:grid-cols-4 gap-6">
                {pamFlow.map((step, i) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                    className="flex flex-col items-center text-center group"
                  >
                    <div className="relative mb-4">
                      <motion.div
                        animate={{ scale: [1, 1.18, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.7 }}
                        className="absolute inset-0 rounded-full bg-primary/20 blur-md"
                      />
                      <div className="relative w-[4.5rem] h-[4.5rem] rounded-full bg-card border border-primary/30 flex items-center justify-center group-hover:border-primary/60 group-hover:bg-primary/5 transition-all duration-300 z-10">
                        <step.icon className="h-6 w-6 text-primary" />
                      </div>
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center z-20 shadow-lg">
                        {i + 1}
                      </span>
                    </div>
                    <h4 className="font-semibold text-sm mb-1.5">{step.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge="Features"
            title={<>Everything You Need to <span className="text-gradient-green">Manage Infrastructure</span></>}
            description="From web terminals to audit logs, WebXterm provides a complete platform for secure infrastructure access."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <FeatureCard key={f.title} icon={f.icon} title={f.title} description={f.description} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing Table ─────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-border relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary/3 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 relative">
          <SectionHeading
            badge="Editions"
            title={<>Community vs <span className="text-gradient-green">Enterprise</span></>}
            description="Start free with Community, upgrade to Enterprise for advanced security and multi-tenancy."
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto glass-card overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-sm font-semibold">Feature</th>
                    <th className="text-center p-4 text-sm font-semibold text-muted-foreground">Community</th>
                    <th className="text-center p-4 text-sm font-semibold relative">
                      <div className="relative inline-flex flex-col items-center gap-1">
                        <motion.span
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 2.5, repeat: Infinity }}
                          className="absolute -inset-3 rounded-lg bg-primary/8 pointer-events-none"
                        />
                        <span className="relative text-primary">Enterprise</span>
                        <span className="relative text-[9px] font-mono text-primary/60 uppercase tracking-widest">
                          Full Access
                        </span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pricingFeatures.map((f, i) => (
                    <motion.tr
                      key={f.feature}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.04 }}
                      className={`border-b border-border/50 hover:bg-secondary/20 transition-colors ${i % 2 === 0 ? "bg-secondary/10" : ""}`}
                    >
                      <td className="p-4 text-sm">{f.feature}</td>
                      <td className="p-4 text-center">
                        {f.community ? (
                          <Check className="h-4 w-4 text-primary mx-auto" />
                        ) : (
                          <X className="h-4 w-4 text-muted-foreground/40 mx-auto" />
                        )}
                      </td>
                      <td className="p-4 text-center relative">
                        <Check className="h-4 w-4 text-primary mx-auto" />
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
          <div className="text-center mt-8">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              View full pricing details <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card max-w-3xl mx-auto p-12 text-center relative overflow-hidden"
          >
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/6 via-transparent to-[hsl(190_95%_55%/0.04)] pointer-events-none" />

            {/* Animated border pulse */}
            <motion.div
              animate={{ scale: [1, 1.01, 1], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3.5, repeat: Infinity }}
              className="absolute inset-0 rounded-xl border border-primary/20 pointer-events-none"
            />

            {/* Floating orbs inside card */}
            <FloatingOrb size={180} x="70%" y="-20%" delay={0} />
            <FloatingOrb size={140} x="-10%" y="60%" delay={1} cyan />

            {/* Blinking dots */}
            {[{ x: "10%", y: "20%" }, { x: "85%", y: "75%" }, { x: "90%", y: "15%" }].map((p, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-primary/50 pointer-events-none"
                style={{ left: p.x, top: p.y }}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: i * 0.7 }}
              />
            ))}

            <div className="relative z-10">
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block w-2 h-2 rounded-full bg-primary mb-4"
              />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Secure Your <span className="text-gradient-green">Infrastructure</span>?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
                Install the agent in minutes. No firewall changes. No VPN. Access your machines from anywhere.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <motion.a
                  href="https://console.webxterm.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-colors glow-green"
                >
                  Get Started Free <ArrowRight className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="https://docs.webxterm.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-secondary text-secondary-foreground font-semibold text-lg hover:bg-secondary/80 transition-colors border border-border"
                >
                  Read Docs
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
