"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  Globe,
  Code,
  Terminal,
  Server,
  Monitor,
  HardDrive,
  ShieldCheck,
  Lock,
  Wifi,
  Key,
  Network,
  FileText,
  Database,
  Search,
  Bell,
  Sun,
  Palette,
  LayoutGrid,
  BookOpen,
  Users,
  Package,
  Settings,
  MonitorSmartphone,
  ChevronLeft,
  ChevronRight,
  Plus,
  Cpu,
  HeartPulse,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ClientId = "browser" | "vscode" | "cli";

const CLIENTS: { id: ClientId; icon: typeof Globe; label: string; sub: string }[] = [
  { id: "browser", icon: Globe, label: "Browser", sub: "Web Terminal" },
  { id: "vscode", icon: Code, label: "VS Code", sub: "Extension" },
  { id: "cli", icon: Terminal, label: "VSAY CLI", sub: "Shell Tool" },
];

const MACHINES = [
  { id: "prod-server-01", icon: Server, name: "prod-server-01", os: "Linux / x86", ip: "10.0.4.21" },
  { id: "dev-laptop", icon: Monitor, name: "dev-laptop", os: "macOS / ARM", ip: "10.0.4.36" },
  { id: "bare-metal-02", icon: HardDrive, name: "bare-metal-02", os: "Linux / ARM", ip: "10.0.4.44" },
];

const STEPPER = [
  { icon: Monitor, label: "Client" },
  { icon: ShieldCheck, label: "Controller" },
  { icon: Server, label: "Machines" },
];

/* ══════════════════════ Browser dashboard mock ══════════════════════ */

const navItems = [
  { icon: LayoutGrid, label: "Dashboard" },
  { icon: MonitorSmartphone, label: "Machines", active: true },
  { icon: BookOpen, label: "Documentation" },
  { icon: Users, label: "Community" },
  { icon: Package, label: "Packages" },
  { icon: Settings, label: "User Management" },
];

function BrowserDashboard() {
  return (
    <div className="w-full h-full flex flex-col bg-[#0a0f12] text-[8px] sm:text-[9px]">
      <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#11181c] border-b border-white/5">
        <span className="w-2 h-2 rounded-full bg-terminal-red/70" />
        <span className="w-2 h-2 rounded-full bg-terminal-yellow/70" />
        <span className="w-2 h-2 rounded-full bg-terminal-green/70" />
        <div className="ml-2 flex-1 rounded bg-black/40 px-2 py-0.5 font-mono text-muted-foreground truncate">
          console.webxterm.me/machines
        </div>
      </div>
      <div className="flex flex-1 min-h-0">
        <div className="w-[32%] border-r border-white/5 bg-[#0d1316] p-2 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="flex items-center justify-center w-4 h-4 rounded bg-primary text-[#04110c]">
              <Terminal className="h-2.5 w-2.5" />
            </span>
            <span className="font-bold text-primary">vsay terminal</span>
          </div>
          {navItems.map((n) => (
            <div
              key={n.label}
              className={cn(
                "flex items-center gap-1.5 px-1.5 py-1 rounded",
                n.active ? "bg-primary/15 text-primary" : "text-muted-foreground"
              )}
            >
              <n.icon className="h-2.5 w-2.5 flex-shrink-0" />
              <span className="truncate">{n.label}</span>
              {n.active && <span className="ml-auto w-1 h-1 rounded-full bg-primary" />}
            </div>
          ))}
        </div>
        <div className="flex-1 min-w-0 p-2.5 flex flex-col">
          <div className="flex items-center justify-end gap-2 mb-1.5 text-muted-foreground">
            <Palette className="h-2.5 w-2.5" />
            <Sun className="h-2.5 w-2.5" />
            <span className="relative">
              <Bell className="h-2.5 w-2.5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-terminal-red text-[6px] flex items-center justify-center text-white">3</span>
            </span>
            <span className="w-4 h-4 rounded-full bg-primary/30 text-primary flex items-center justify-center text-[6px] font-bold">SU</span>
          </div>
          <p className="text-[7px] text-muted-foreground/70">⌂ › Machines</p>
          <p className="font-bold text-white text-sm leading-tight">Machines</p>
          <p className="text-[7px] text-muted-foreground mb-1.5">Manage and monitor your connected servers</p>
          <span className="inline-flex items-center gap-1 self-start px-2 py-1 rounded bg-primary text-[#04110c] font-semibold mb-2">
            <Plus className="h-2.5 w-2.5" /> Add Machine
          </span>
          <div className="flex-1 rounded border border-white/5 bg-[#0d1316] p-2">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 rounded bg-black/40 px-2 py-1 w-[70%]">
                <Search className="h-2.5 w-2.5 text-muted-foreground" />
                <span className="text-muted-foreground">Search machines…</span>
              </div>
              <span className="text-muted-foreground">1 machine</span>
            </div>
            <div className="grid grid-cols-[1.4fr_1.6fr_0.9fr] gap-1 text-muted-foreground border-b border-white/5 pb-1.5">
              <span>Machine</span>
              <span>Operating System</span>
              <span>Status</span>
            </div>
            <motion.div
              animate={{ backgroundColor: ["rgba(45,212,160,0)", "rgba(45,212,160,0.07)", "rgba(45,212,160,0)"] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="grid grid-cols-[1.4fr_1.6fr_0.9fr] gap-1 items-center py-1.5 rounded"
            >
              <span className="text-white font-semibold">kaal</span>
              <span className="text-muted-foreground">debian kali-rolling aarch64</span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full border border-terminal-green/40 text-terminal-green w-fit">
                <span className="w-1 h-1 rounded-full bg-terminal-green" /> Online
              </span>
            </motion.div>
            <div className="flex items-center justify-between mt-2 text-muted-foreground">
              <span>Showing 1 of 1</span>
              <span className="flex items-center gap-1">
                <ChevronLeft className="h-2.5 w-2.5" />
                <span className="w-3 h-3 rounded bg-primary text-[#04110c] flex items-center justify-center">1</span>
                <ChevronRight className="h-2.5 w-2.5" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════ VS Code mock ══════════════════════ */

function VSCodeMock() {
  return (
    <div className="w-full h-full flex bg-[#1e1e1e] text-[9px]">
      <div className="w-6 bg-[#333333] flex flex-col items-center pt-2 gap-2.5 text-neutral-400">
        <Code className="h-3.5 w-3.5 text-white" />
        <Server className="h-3.5 w-3.5 text-primary" />
        <Search className="h-3.5 w-3.5" />
        <Settings className="h-3.5 w-3.5 mt-auto mb-2" />
      </div>
      <div className="w-[30%] bg-[#252526] p-2 border-r border-black/40">
        <p className="text-[7px] uppercase tracking-wider text-neutral-400 mb-1.5">WebXTerm Machines</p>
        {["prod-server-01", "dev-laptop", "bare-metal-02"].map((m, i) => (
          <div key={m} className={cn("flex items-center gap-1.5 px-1.5 py-1 rounded", i === 0 ? "bg-primary/15" : "")}>
            <span className={cn("w-1.5 h-1.5 rounded-full", i < 2 ? "bg-terminal-green" : "bg-neutral-500")} />
            <span className={cn("font-mono", i === 0 ? "text-primary" : "text-neutral-300")}>{m}</span>
          </div>
        ))}
      </div>
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex bg-[#2d2d2d] text-neutral-300 border-b border-black/40">
          <span className="px-2.5 py-1 bg-[#1e1e1e] border-r border-black/40 font-mono">Terminal — prod-server-01</span>
        </div>
        <div className="flex-1 p-3 font-mono text-[9px] leading-relaxed text-neutral-200">
          <p><span className="text-primary">admin@prod-server-01</span>:~$ uptime</p>
          <p className="text-neutral-400">14:22:01 up 42 days, load: 0.08</p>
          <p><span className="text-primary">admin@prod-server-01</span>:~$ <span className="animate-terminal-cursor">▋</span></p>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════ CLI mock ══════════════════════ */

const cliLines = [
  { t: "$ vsay connect prod-server-01", c: "text-primary" },
  { t: "↳ resolving via vsay-controller…", c: "text-muted-foreground" },
  { t: "✓ tunnel established (gRPC/TLS)", c: "text-terminal-green" },
  { t: "admin@prod-server-01:~$ whoami", c: "text-foreground" },
  { t: "admin", c: "text-muted-foreground" },
];

function CliMock() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setN((v) => (v + 1) % (cliLines.length + 3)), 700);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="w-full h-full bg-[#0a0e0a] p-3.5 font-mono text-[10px] leading-relaxed">
      <div className="flex items-center gap-1.5 mb-2">
        <span className="w-2 h-2 rounded-full bg-terminal-red/70" />
        <span className="w-2 h-2 rounded-full bg-terminal-yellow/70" />
        <span className="w-2 h-2 rounded-full bg-terminal-green/70" />
        <span className="ml-2 text-[9px] text-muted-foreground">vsay — zsh</span>
      </div>
      {cliLines.slice(0, Math.min(n, cliLines.length)).map((l, i) => (
        <p key={i} className={l.c}>{l.t}</p>
      ))}
      <span className="text-primary animate-terminal-cursor">▋</span>
    </div>
  );
}

/* ══════════════════════ Laptop ══════════════════════ */

function Laptop({
  selected,
  onSelect,
  showSelect,
}: {
  selected: ClientId | null;
  onSelect: (c: ClientId) => void;
  showSelect: boolean;
}) {
  return (
    <div className="w-full">
      <div
        className="relative mx-auto rounded-t-2xl border-[4px] border-neutral-700/80 bg-black overflow-hidden shadow-2xl"
        style={{ aspectRatio: "16 / 10" }}
      >
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-neutral-600 z-20" />
        <AnimatePresence mode="wait">
          {showSelect ? (
            <motion.div
              key="select"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 bg-[radial-gradient(ellipse_at_center,#0d1a14,#05080a)]"
            >
              <p className="text-base sm:text-xl font-semibold text-center">
                Please select <span className="text-gradient-green">what you use</span>
              </p>
              <div className="flex gap-3 w-full max-w-xl justify-center">
                {CLIENTS.map((c) => (
                  <motion.button
                    key={c.id}
                    onClick={() => onSelect(c.id)}
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    className={cn(
                      "flex-1 flex flex-col items-center gap-2 px-3 py-4 rounded-xl border transition-colors",
                      selected === c.id
                        ? "border-primary bg-primary/15 glow-green"
                        : "border-border bg-card/60 hover:border-primary/50"
                    )}
                  >
                    <span className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary">
                      <c.icon className="h-6 w-6" />
                    </span>
                    <span className="text-sm font-semibold">{c.label}</span>
                    <span className="text-[11px] text-muted-foreground">{c.sub}</span>
                  </motion.button>
                ))}
              </div>
              <p className="text-[11px] font-mono text-muted-foreground/60">↓ pick one, then keep scrolling</p>
            </motion.div>
          ) : (
            <motion.div
              key={selected ?? "none"}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="absolute inset-0"
            >
              {selected === "browser" && <BrowserDashboard />}
              {selected === "vscode" && <VSCodeMock />}
              {selected === "cli" && <CliMock />}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent" />
      </div>
      <div className="relative mx-auto h-3 w-[112%] -ml-[6%] bg-gradient-to-b from-neutral-700 to-neutral-800 rounded-b-md">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1.5 rounded-b-md bg-neutral-900/70" />
      </div>
    </div>
  );
}

/* ══════════════════════ Beams ══════════════════════ */

// Straight horizontal beam with packets flowing left → right.
function StraightBeam({
  label,
  originDot,
  arrowEnd,
  labelOpacity,
}: {
  label?: string;
  originDot?: boolean;
  arrowEnd?: boolean;
  labelOpacity?: MotionValue<number>;
}) {
  return (
    <div className="relative hidden md:flex flex-1 items-center min-w-[70px] self-center h-20">
      <div className="relative w-full h-[3px] rounded-full bg-gradient-to-r from-primary/55 via-primary/30 to-primary/45 overflow-visible">
        {label &&
          (labelOpacity ? (
            <motion.span
              style={{ opacity: labelOpacity }}
              className="absolute left-1/2 -translate-x-1/2 -top-7 text-[10px] font-mono text-primary uppercase tracking-widest whitespace-nowrap"
            >
              {label}
            </motion.span>
          ) : (
            <span className="absolute left-1/2 -translate-x-1/2 -top-7 text-[10px] font-mono text-primary/80 uppercase tracking-widest whitespace-nowrap">
              {label}
            </span>
          ))}

        {originDot && (
          <>
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary shadow-[0_0_16px_4px_hsl(160_100%_50%/0.8)]" />
            <motion.span
              className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary/40"
              animate={{ scale: [1, 2.6, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
          </>
        )}

        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute top-1/2 -mt-1 w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_12px_3px_hsl(160_100%_50%/0.85)]"
            initial={{ left: "-2%" }}
            animate={{ left: ["-2%", "102%"] }}
            transition={{ duration: 1.4, delay: i * 0.45, repeat: Infinity, ease: "linear" }}
          />
        ))}

        {arrowEnd && (
          <span className="absolute right-0 -mr-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-full border border-primary/50 bg-primary/15 text-primary">
            <ChevronRight className="h-3.5 w-3.5" />
          </span>
        )}
      </div>
    </div>
  );
}

// One incoming line that fans out into three (→ the three machines).
// Built as a crisp bracket so each line aligns exactly with a card row.
function FanBeam() {
  const rowTops = ["15.38%", "50%", "84.62%"]; // exact centres of the 3 h-[96px] cards (gap-3)
  const dot = "w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_2px_hsl(160_100%_50%/0.85)]";
  return (
    <div className="relative hidden md:block flex-1 self-stretch min-w-[130px]">
      <span className="absolute left-0 top-[calc(50%-1.6rem)] text-[9px] font-mono text-primary/70 uppercase tracking-widest whitespace-nowrap">
        1 tunnel → 3
      </span>

      {/* origin node at the left screen edge */}
      <span className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-3.5 h-3.5 rounded-full bg-primary shadow-[0_0_16px_4px_hsl(160_100%_50%/0.8)]" />
      <motion.span
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-3.5 h-3.5 rounded-full bg-primary/40"
        animate={{ scale: [1, 2.6, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      />

      {/* entry line: left edge → junction (at 50% width, vertical centre) */}
      <div className="absolute top-1/2 left-0 w-1/2 h-[3px] -translate-y-1/2 rounded-full bg-gradient-to-r from-primary/60 to-primary/45 overflow-visible">
        {[0, 1].map((i) => (
          <motion.span
            key={i}
            className={`absolute top-1/2 -mt-1 ${dot}`}
            initial={{ left: "0%" }}
            animate={{ left: ["0%", "100%"] }}
            transition={{ duration: 0.8, delay: i * 0.4, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>

      {/* vertical bus connecting the three rows */}
      <div
        className="absolute left-1/2 w-[2px] -translate-x-1/2 bg-primary/45 rounded-full"
        style={{ top: "15.38%", bottom: "15.38%" }}
      />
      {/* junction node */}
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_2px_hsl(160_100%_50%/0.8)]" />

      {/* three stubs: junction → each card */}
      {rowTops.map((top, i) => (
        <div
          key={i}
          className="absolute left-1/2 right-0 h-[3px] -translate-y-1/2 rounded-full bg-gradient-to-r from-primary/50 to-primary/45 overflow-visible"
          style={{ top }}
        >
          {[0, 1].map((j) => (
            <motion.span
              key={j}
              className={`absolute top-1/2 -mt-1 ${dot}`}
              initial={{ left: "0%" }}
              animate={{ left: ["0%", "100%"] }}
              transition={{ duration: 0.9, delay: i * 0.2 + j * 0.45, repeat: Infinity, ease: "linear" }}
            />
          ))}
          <span className="absolute right-0 -mr-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary" />
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════ Big machine card ══════════════════════ */

function BigMachine({ m, delay }: { m: (typeof MACHINES)[number]; delay: number }) {
  const Icon = m.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.5, delay }}
      className="glass-card p-4 h-[96px] flex items-center gap-4 border-primary/30 glow-green relative overflow-hidden"
    >
      <div className="relative w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
        <Icon className="h-7 w-7 text-primary" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-base font-mono font-bold">{m.name}</p>
        <p className="text-xs text-muted-foreground">{m.os}</p>
        <p className="text-[11px] font-mono text-muted-foreground/70">{m.ip}</p>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-terminal-green/40 text-terminal-green text-[10px]">
          <motion.span
            animate={{ scale: [1, 1.6, 1], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay }}
            className="w-1.5 h-1.5 rounded-full bg-terminal-green"
          />
          online
        </span>
        <div className="flex items-center gap-0.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
              className="block w-1 rounded-full bg-primary"
              style={{ height: 4 + i * 3 }}
            />
          ))}
          <Wifi className="h-3.5 w-3.5 text-primary ml-0.5" />
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════ Main — separate full-screen scenes ══════════════════════ */

export default function ArchitectureFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);
  const [selected, setSelected] = useState<ClientId | null>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const s = v < 0.36 ? 0 : v < 0.69 ? 1 : 2;
    if (s !== stage) setStage(s);
    if (s >= 1 && !selected) setSelected("browser");
    if (v < 0.03 && selected) setSelected(null);
  });

  // scenes slide one-at-a-time
  const s1x = useTransform(scrollYProgress, [0, 0.3, 0.4], ["0%", "0%", "-55%"]);
  const s1o = useTransform(scrollYProgress, [0.3, 0.4], [1, 0]);
  const s2x = useTransform(scrollYProgress, [0.32, 0.42, 0.64, 0.74], ["55%", "0%", "0%", "-55%"]);
  const s2o = useTransform(scrollYProgress, [0.34, 0.42, 0.64, 0.74], [0, 1, 1, 0]);
  const s3x = useTransform(scrollYProgress, [0.66, 0.76], ["55%", "0%"]);
  const s3o = useTransform(scrollYProgress, [0.66, 0.76], [0, 1]);

  // laptop beam label fades in as you start scrolling
  const beamLabel1 = useTransform(scrollYProgress, [0, 0.08, 0.3], [0, 1, 1]);

  return (
    <section ref={ref} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        <div className="absolute inset-0 grid-pattern opacity-[0.1] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] max-w-full h-[420px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        {/* top stepper */}
        <div className="relative z-30 pt-20 md:pt-24 flex items-center justify-center gap-2 md:gap-4">
          {STEPPER.map((s, i) => (
            <div key={s.label} className="flex items-center gap-2 md:gap-4">
              <div className="flex items-center gap-1.5">
                <span
                  className={cn(
                    "flex items-center justify-center w-7 h-7 rounded-lg border transition-colors duration-500",
                    i <= stage ? "bg-primary/15 border-primary/40 text-primary" : "border-border text-muted-foreground/50"
                  )}
                >
                  <s.icon className="h-3.5 w-3.5" />
                </span>
                <span
                  className={cn(
                    "text-[11px] font-mono uppercase tracking-wider transition-colors duration-500 hidden sm:inline",
                    i <= stage ? "text-primary" : "text-muted-foreground/50"
                  )}
                >
                  {s.label}
                </span>
              </div>
              {i < STEPPER.length - 1 && (
                <span className={cn("w-6 md:w-10 h-px transition-colors duration-500", i < stage ? "bg-primary/50" : "bg-border")} />
              )}
            </div>
          ))}
        </div>

        <div className="relative flex-1">
          {/* ───── Scene 1 — Laptop + outgoing tunnel ───── */}
          <motion.div
            style={{ x: s1x, opacity: s1o, pointerEvents: stage === 0 ? "auto" : "none" }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <span className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-mono rounded-full border bg-primary/10 text-primary/80 border-primary/20">
              Step 1 · Choose your client
            </span>
            <div className="flex items-center w-full">
              {/* left spacer keeps the laptop centred on desktop */}
              <div className="hidden md:block flex-1" />
              <div className="w-full max-w-xl flex-shrink-0 mx-auto px-4 md:px-0">
                <Laptop selected={selected} onSelect={setSelected} showSelect={!selected} />
              </div>
              {/* beam runs from the laptop all the way to the right screen edge */}
              <StraightBeam
                label="opening tunnel → vsay-controller"
                arrowEnd
                labelOpacity={beamLabel1}
              />
            </div>
            <motion.p
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-6 text-[11px] font-mono text-muted-foreground/70"
            >
              scroll to open a secure tunnel ↓
            </motion.p>
          </motion.div>

          {/* ───── Scene 2 — Controller with beams on both sides ───── */}
          <motion.div
            style={{ x: s2x, opacity: s2o, pointerEvents: stage === 1 ? "auto" : "none" }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <span className="mb-5 inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-mono rounded-full border bg-primary/10 text-primary/80 border-primary/20">
              Step 2 · The vsay-controller
            </span>
            <div className="flex items-center w-full">
              {/* incoming from client — reaches the left screen edge */}
              <StraightBeam label="from your client" originDot />

              <div className="relative glass-card border-primary/40 glow-green px-5 py-6 w-full max-w-[340px] mx-4 md:mx-0 flex-shrink-0 flex flex-col items-center text-center">
                {/* connection ports where the beams plug in (left = from client, right = to machines) */}
                <span className="hidden md:block absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-primary shadow-[0_0_12px_3px_hsl(160_100%_50%/0.8)] z-10" />
                <span className="hidden md:block absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-primary shadow-[0_0_12px_3px_hsl(160_100%_50%/0.8)] z-10" />
                <motion.span
                  animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 2.4, repeat: Infinity }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-primary/20 blur-xl"
                />
                <span className="relative p-3.5 rounded-2xl bg-primary/10 border border-primary/30 text-primary mb-3">
                  <ShieldCheck className="h-9 w-9" />
                </span>
                <h3 className="text-xl font-bold">vsay-controller</h3>
                <p className="text-xs text-muted-foreground mb-4">The control plane — authenticates, routes &amp; audits every session</p>
                <div className="grid grid-cols-2 gap-2 w-full">
                  {[
                    { icon: Key, label: "Auth" },
                    { icon: Network, label: "Router" },
                    { icon: FileText, label: "Audit" },
                    { icon: Database, label: "Registry" },
                  ].map((p, i) => (
                    <motion.div
                      key={p.label}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-secondary/40 border border-border/50"
                    >
                      <p.icon className="h-3.5 w-3.5 text-primary" />
                      <span className="text-[10px] font-mono text-muted-foreground">{p.label}</span>
                      <motion.span
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        className="ml-auto w-1 h-1 rounded-full bg-primary"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* outgoing to machines */}
              <StraightBeam label="to your machines" arrowEnd />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mt-6 text-[11px] font-mono">
              <span className="flex items-center gap-1 text-terminal-green"><Lock className="h-3 w-3" /> identity verified</span>
              <span className="flex items-center gap-1 text-terminal-green"><Users className="h-3 w-3" /> RBAC applied</span>
              <span className="flex items-center gap-1 text-terminal-green"><FileText className="h-3 w-3" /> audit started</span>
            </div>
          </motion.div>

          {/* ───── Scene 3 — single tunnel fans out to 3 machines ───── */}
          <motion.div
            style={{ x: s3x, opacity: s3o, pointerEvents: stage === 2 ? "auto" : "none" }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <span className="mb-5 inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-mono rounded-full border bg-primary/15 text-primary border-primary/30">
              <ShieldCheck className="h-3 w-3" /> Step 3 · Your machines — session live
            </span>
            <div className="flex items-stretch w-full">
              {/* single tunnel enters from the left screen edge, then fans into 3 */}
              <FanBeam />
              <div className="flex flex-col gap-3 flex-1 max-w-md mx-auto md:mx-0 px-4 md:px-0">
                {MACHINES.map((m, i) => (
                  <BigMachine key={m.id} m={m} delay={i * 0.12} />
                ))}
              </div>
              {/* right spacer balances the row so machines sit toward the centre */}
              <div className="hidden md:block flex-1" />
            </div>
            <div className="flex items-center gap-2 mt-6 text-xs text-muted-foreground">
              <Cpu className="h-4 w-4 text-primary" />
              <span>Each machine&apos;s agent dialed out — </span>
              <span className="text-primary font-mono">no inbound ports</span>
            </div>
            <p className="mt-3 flex items-center gap-2 text-sm font-semibold">
              <HeartPulse className="h-4 w-4 text-primary" />
              Encrypted session: <span className="text-gradient-green">client → controller → machine</span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
