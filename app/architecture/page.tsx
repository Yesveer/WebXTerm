"use client";

import { motion } from "framer-motion";
import { ArrowRight, Server, Monitor, Globe, Shield } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const steps = [
  { icon: Monitor, label: "User Machine", desc: "Install the lightweight WebXterm agent on your server, laptop, or cloud instance.", color: "text-terminal-cyan" },
  { icon: Server, label: "Agent", desc: "The agent establishes a secure outbound connection to the WebXterm server. No inbound ports needed.", color: "text-terminal-green" },
  { icon: Globe, label: "WebXterm Server", desc: "Central server manages authentication, session routing, and audit logging.", color: "text-terminal-yellow" },
  { icon: Shield, label: "Web Portal", desc: "Access your machines via browser, VS Code, or CLI with full terminal capabilities.", color: "text-terminal-purple" },
];

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen pt-24">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge="Architecture"
            title={<>How <span className="text-gradient-green">WebXterm</span> Works</>}
            description="A simple, secure architecture that connects your machines to a central management portal."
          />

          {/* Flow diagram */}
          <div className="max-w-4xl mx-auto mb-20">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-0">
              {steps.map((step, i) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex items-center gap-4 md:flex-1"
                >
                  <div className="glass-card p-6 flex-1 text-center hover:border-primary/30 transition-colors">
                    <step.icon className={`h-8 w-8 mx-auto mb-3 ${step.color}`} />
                    <h3 className="font-semibold mb-2">{step.label}</h3>
                    <p className="text-xs text-muted-foreground">{step.desc}</p>
                  </div>
                  {i < steps.length - 1 && (
                    <ArrowRight className="hidden md:block h-5 w-5 text-primary shrink-0" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="max-w-3xl mx-auto space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8"
            >
              <h3 className="text-xl font-semibold mb-4">Agent-Based Architecture</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                WebXterm uses a lightweight agent that runs on your machines. The agent initiates an outbound connection to the WebXterm server — no inbound ports or firewall changes needed.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Once connected, the machine appears in your WebXterm portal. From there, you can open terminal sessions, monitor logs, perform port forwarding, and manage your infrastructure.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The agent supports Linux, macOS, and Windows across x86 and ARM architectures. It uses minimal resources and can be managed as a system service.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8"
            >
              <h3 className="text-xl font-semibold mb-4">Security Model</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                All connections are encrypted with TLS. The Enterprise edition adds mutual TLS (mTLS) for certificate-based authentication, plus OIDC/SSO integration via Keycloak.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Every session is logged with a complete audit trail — who connected, when, and what commands were executed. RBAC policies let you control access at the team and machine level.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
