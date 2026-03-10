"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Terminal, Shield, Monitor, Code, Cpu, ArrowRight, Check, X } from "lucide-react";
import TerminalWindow from "@/components/TerminalWindow";
import TypingAnimation from "@/components/TypingAnimation";
import SectionHeading from "@/components/SectionHeading";
import FeatureCard from "@/components/FeatureCard";

const heroTerminalLines = [
  { text: "$ vsay agent install", color: "green", delay: 300 },
  { text: "Installing VSAY agent v1.1.0...", color: "muted", delay: 200 },
  { text: "✓ Agent installed successfully", color: "green", delay: 400 },
  { text: "$ vsay agent start", color: "green", delay: 600 },
  { text: "Connecting to WebXTerm portal...", color: "muted", delay: 200 },
  { text: "✓ Connected! Machine registered as prod-server-01", color: "cyan", delay: 400 },
  { text: "✓ Ready for remote terminal access", color: "green", delay: 200 },
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

const accessMethods = [
  { title: "Web Terminal", desc: "Browser-based SSH with full terminal capabilities", icon: Monitor },
  { title: "VSAY VS Code Extension", desc: "Manage servers directly from your IDE", icon: Code },
  { title: "VSAY Shell CLI", desc: "Command-line tool for automation and scripting", icon: Terminal },
  { title: "Agent-Based Access", desc: "Deploy agents for seamless, secure connections", icon: Cpu },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="hero-glow absolute inset-0" />
        <div className="grid-pattern absolute inset-0 opacity-30" />
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block px-3 py-1 mb-6 text-xs font-mono font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                Terminal Management Platform
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
                Secure Terminal Access for{" "}
                <span className="text-gradient-green">All Your Infrastructure</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                Manage servers, laptops, and bare-metal machines securely from your browser, CLI, or IDE.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://console.webxterm.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors glow-green"
                >
                  Get Started <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="https://docs.webxterm.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors border border-border"
                >
                  Documentation
                </a>
                <a
                  href="https://community.webxterm.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors border border-border"
                >
                  Community
                </a>
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

      {/* Access Methods */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge="Access Methods"
            title={<>Multiple Ways to <span className="text-gradient-green">Connect</span></>}
            description="Choose the access method that fits your workflow."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {accessMethods.map((m, i) => (
              <FeatureCard key={m.title} icon={m.icon} title={m.title} description={m.desc} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
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

      {/* Pricing Table */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4">
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
                    <th className="text-center p-4 text-sm font-semibold">Community</th>
                    <th className="text-center p-4 text-sm font-semibold text-primary">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingFeatures.map((f, i) => (
                    <tr key={f.feature} className={`border-b border-border/50 ${i % 2 === 0 ? "bg-secondary/20" : ""}`}>
                      <td className="p-4 text-sm">{f.feature}</td>
                      <td className="p-4 text-center">
                        {f.community ? (
                          <Check className="h-4 w-4 text-primary mx-auto" />
                        ) : (
                          <X className="h-4 w-4 text-muted-foreground mx-auto" />
                        )}
                      </td>
                      <td className="p-4 text-center">
                        <Check className="h-4 w-4 text-primary mx-auto" />
                      </td>
                    </tr>
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

      {/* CTA */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Secure Your <span className="text-gradient-green">Infrastructure</span>?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
              Get started with WebXterm in minutes. Install the agent and access your machines from anywhere.
            </p>
            <a
              href="https://console.webxterm.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-colors glow-green"
            >
              Get Started Free <ArrowRight className="h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
