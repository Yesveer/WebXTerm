"use client";

import { Terminal, Monitor, Shield, Code, Cpu, ScrollText, Network, Users } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import FeatureCard from "@/components/FeatureCard";
import TerminalWindow from "@/components/TerminalWindow";
import TypingAnimation from "@/components/TypingAnimation";

const features = [
  { icon: Terminal, title: "Web Terminal", description: "Full-featured browser-based terminal with SSH access. No client software needed — just open your browser and connect." },
  { icon: Monitor, title: "Session Management", description: "Open multiple terminal sessions simultaneously. Monitor active sessions and manage them from a central dashboard." },
  { icon: ScrollText, title: "Audit Logs", description: "Complete audit trail of all terminal sessions. Track who accessed what, when, and what commands were executed." },
  { icon: Code, title: "VSAY VS Code Extension", description: "Connect to your machines directly from VS Code. Remote terminals, session management, and port forwarding inside your IDE." },
  { icon: Terminal, title: "VSAY Shell CLI", description: "Powerful command-line tool for automation and scripting. Connect to machines from your local terminal with a single command." },
  { icon: Cpu, title: "Agent Architecture", description: "Lightweight agent installs on any machine — Linux, macOS, Windows. Supports x86, ARM, and other architectures." },
  { icon: Shield, title: "Secure Connections", description: "TLS encryption by default. Enterprise plan adds mTLS, OIDC/SSO via Keycloak, and advanced RBAC policies." },
  { icon: Network, title: "Port Forwarding", description: "Securely forward ports through the WebXterm tunnel. Access internal services without exposing them to the public internet." },
  { icon: Users, title: "Team Collaboration", description: "Role-based access control for teams. Manage permissions, assign machines, and collaborate securely." },
];

const terminalLines = [
  { text: "$ ssh prod-server-01", color: "green", delay: 300 },
  { text: "Establishing secure connection...", color: "muted", delay: 200 },
  { text: "✓ Connected via TLS 1.3", color: "cyan", delay: 400 },
  { text: "Last login: Mon Mar 9 10:30:00 2026", color: "muted", delay: 200 },
  { text: "admin@prod-server-01:~$ docker ps", color: "green", delay: 600 },
  { text: "CONTAINER ID   IMAGE          STATUS", color: "muted", delay: 200 },
  { text: "a1b2c3d4       nginx:latest   Up 3 days", color: "foreground", delay: 100 },
  { text: "e5f6g7h8       redis:7        Up 3 days", color: "foreground", delay: 100 },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen pt-24">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge="Features"
            title={<>Powerful Tools for <span className="text-gradient-green">Infrastructure Management</span></>}
            description="Everything you need to securely access and manage your machines from anywhere."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {features.map((f, i) => (
              <FeatureCard key={f.title} icon={f.icon} title={f.title} description={f.description} delay={i * 0.08} />
            ))}
          </div>

          {/* Terminal Demo */}
          <div className="max-w-3xl mx-auto">
            <SectionHeading
              badge="Live Demo"
              title={<>Web Terminal in <span className="text-gradient-green">Action</span></>}
              description="Connect to any machine and run commands directly from your browser."
            />
            <TerminalWindow title="webxterm — prod-server-01" className="glow-green">
              <TypingAnimation lines={terminalLines} speed={25} />
            </TerminalWindow>
          </div>
        </div>
      </section>
    </div>
  );
}
