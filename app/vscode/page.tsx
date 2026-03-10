"use client";

import { motion } from "framer-motion";
import { Code, Terminal, Monitor, Network } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import FeatureCard from "@/components/FeatureCard";

const vsCodeFeatures = [
  { icon: Terminal, title: "Remote Terminal", description: "Open terminal sessions to any registered machine directly inside VS Code." },
  { icon: Monitor, title: "Server Management", description: "Browse your machine list in the VS Code sidebar. See status, OS, and architecture at a glance." },
  { icon: Network, title: "Port Forwarding", description: "Forward remote ports to localhost. Access databases, APIs, and services without leaving your IDE." },
  { icon: Code, title: "Session Management", description: "Manage multiple sessions, view history, and switch between machines seamlessly." },
];

export default function VSCodePage() {
  return (
    <div className="min-h-screen pt-24">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge="VSAY VS Code Extension"
            title={<>Infrastructure Access <span className="text-gradient-green">Inside Your IDE</span></>}
            description="Connect to machines, manage sessions, and forward ports — all from VS Code."
          />

          <div className="grid md:grid-cols-2 gap-6 mb-20">
            {vsCodeFeatures.map((f, i) => (
              <FeatureCard key={f.title} icon={f.icon} title={f.title} description={f.description} delay={i * 0.1} />
            ))}
          </div>

          {/* VS Code mockup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto glass-card overflow-hidden glow-cyan"
          >
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-card/80">
              <div className="w-3 h-3 rounded-full bg-terminal-red" />
              <div className="w-3 h-3 rounded-full bg-terminal-yellow" />
              <div className="w-3 h-3 rounded-full bg-terminal-green" />
              <span className="ml-2 text-xs text-muted-foreground font-mono">Visual Studio Code — WebXterm</span>
            </div>
            <div className="flex min-h-[400px]">
              {/* Sidebar */}
              <div className="w-56 border-r border-border bg-card/40 p-3 hidden md:block">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">
                  WebXterm Servers
                </div>
                {[
                  { name: "prod-server-01", status: "online", os: "linux" },
                  { name: "prod-server-02", status: "online", os: "linux" },
                  { name: "dev-laptop", status: "online", os: "macos" },
                  { name: "staging-k8s", status: "offline", os: "linux" },
                ].map((s) => (
                  <motion.div
                    key={s.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className={`flex items-center gap-2 px-2 py-1.5 rounded text-xs font-mono cursor-pointer hover:bg-secondary/50 transition-colors ${s.name === "prod-server-01" ? "bg-primary/10 text-primary" : ""}`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${s.status === "online" ? "bg-terminal-green" : "bg-muted-foreground"}`} />
                    <span className={s.name === "prod-server-01" ? "text-primary" : "text-foreground"}>{s.name}</span>
                  </motion.div>
                ))}
                <div className="mt-4 px-2">
                  <button className="w-full text-xs py-1.5 rounded bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors font-mono">
                    + Connect
                  </button>
                </div>
              </div>
              {/* Main area - terminal */}
              <div className="flex-1 p-4 font-mono text-sm bg-background/50">
                <div className="text-muted-foreground mb-2">
                  <span className="text-primary">●</span> Connected to prod-server-01
                </div>
                <div className="space-y-1">
                  <div><span className="text-terminal-green">admin@prod-server-01</span>:<span className="text-terminal-blue">~</span>$ ls -la</div>
                  <div className="text-muted-foreground">total 48</div>
                  <div className="text-muted-foreground">drwxr-xr-x  6 admin admin 4096 Mar  9 10:30 .</div>
                  <div className="text-muted-foreground">drwxr-xr-x  3 root  root  4096 Mar  1 00:00 ..</div>
                  <div className="text-muted-foreground">-rw-r--r--  1 admin admin  220 Mar  1 00:00 .bash_logout</div>
                  <div className="text-muted-foreground">drwxr-xr-x  2 admin admin 4096 Mar  5 14:20 deploy</div>
                  <div className="text-terminal-cyan">drwxr-xr-x  4 admin admin 4096 Mar  8 09:15 app</div>
                  <div className="mt-2"><span className="text-terminal-green">admin@prod-server-01</span>:<span className="text-terminal-blue">~</span>$ <span className="animate-terminal-cursor inline-block w-2 h-4 bg-primary" /></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
