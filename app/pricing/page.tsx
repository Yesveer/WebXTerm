"use client";

import { motion } from "framer-motion";
import { Check, X, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const features = [
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

export default function PricingPage() {
  return (
    <div className="min-h-screen pt-24">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge="Pricing"
            title={<>Choose Your <span className="text-gradient-green">Edition</span></>}
            description="Start free with Community. Upgrade to Enterprise for advanced security and organization features."
          />

          {/* Plan cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8"
            >
              <h3 className="text-2xl font-bold mb-2">Community</h3>
              <p className="text-muted-foreground mb-6">Free forever for individuals and small teams.</p>
              <div className="text-4xl font-bold mb-6">
                Free
              </div>
              <a
                href="https://console.webxterm.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors border border-border"
              >
                Get Started <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card p-8 border-primary/30 glow-green"
            >
              <h3 className="text-2xl font-bold mb-2 text-primary">Enterprise</h3>
              <p className="text-muted-foreground mb-6">For organizations needing advanced security and multi-tenancy.</p>
              <div className="text-4xl font-bold mb-6">
                Contact Us
              </div>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                Contact Sales <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          </div>

          {/* Comparison table */}
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
                  {features.map((f, i) => (
                    <tr key={f.feature} className={`border-b border-border/50 ${i % 2 === 0 ? "bg-secondary/20" : ""}`}>
                      <td className="p-4 text-sm">{f.feature}</td>
                      <td className="p-4 text-center">
                        {f.community ? <Check className="h-4 w-4 text-primary mx-auto" /> : <X className="h-4 w-4 text-muted-foreground mx-auto" />}
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
        </div>
      </section>
    </div>
  );
}
