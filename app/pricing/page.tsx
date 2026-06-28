"use client";

import { motion } from "framer-motion";
import { Check, Minus, ArrowRight, Sparkles, ShieldCheck, Server, Users } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

/* ───────────────────────── Plans ───────────────────────── */

type Plan = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  unit: string;
  machines: string;
  cta: string;
  href: string;
  external: boolean;
  popular: boolean;
  features: string[];
};

const PLANS: Plan[] = [
  {
    id: "community",
    name: "Community",
    tagline: "Try every feature, on us.",
    price: "Free",
    unit: "for 30 days",
    machines: "Up to 10 machines",
    cta: "Start Free Trial",
    href: "https://console.webxterm.me/",
    external: true,
    popular: false,
    features: [
      "All 6 core features",
      "Up to 10 machines",
      "Unlimited users",
      "Self-hosted deployment",
      "Community forum support",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    tagline: "For growing teams.",
    price: "₹499",
    unit: "/ machine · month",
    machines: "Up to 100 machines",
    cta: "Get Started",
    href: "https://console.webxterm.me/",
    external: true,
    popular: false,
    features: [
      "Up to 100 machines",
      "Multi-tenancy",
      "SSO / OIDC + MFA",
      "Email support · 48h SLA",
      "99.5% uptime SLA",
    ],
  },
  {
    id: "business",
    name: "Business",
    tagline: "Best value at scale.",
    price: "₹399",
    unit: "/ machine · month",
    machines: "Up to 500 machines",
    cta: "Get Started",
    href: "https://console.webxterm.me/",
    external: true,
    popular: true,
    features: [
      "Everything in Professional",
      "Up to 500 machines",
      "Session recording + export",
      "Priority support · 24h SLA",
      "99.9% SLA + audit export",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For large, regulated orgs.",
    price: "Custom",
    unit: "quote",
    machines: "Unlimited machines",
    cta: "Contact Sales",
    href: "/contact",
    external: false,
    popular: false,
    features: [
      "Unlimited machines",
      "Air-gapped deployment",
      "Full session replay",
      "SOC2 / ISO mapped reports",
      "Dedicated onboarding",
    ],
  },
];

/* ───────────────────────── Comparison matrix ───────────────────────── */

// value === true → check · false → dash · string → text
type Cell = boolean | string;
const ROWS: { label: string; values: [Cell, Cell, Cell, Cell] }[] = [
  { label: "Price", values: ["Free 30 days", "₹499/machine/mo", "₹399/machine/mo", "Custom quote"] },
  { label: "Machine range", values: ["Up to 10", "Up to 100", "Up to 500", "Unlimited"] },
  { label: "Users", values: ["Unlimited", "Unlimited", "Unlimited", "Unlimited"] },
  { label: "Core features", values: ["All 6 features", "All 6 features", "All 6 features", "All 6 features"] },
  { label: "Multi-tenancy", values: [false, true, true, true] },
  { label: "SSO / OIDC", values: [false, true, true, true] },
  { label: "On-premise deployment", values: ["Self-hosted", "Self-hosted", "Self-hosted", "Self-hosted + Air-gapped"] },
  { label: "MFA (Keycloak)", values: [false, true, true, true] },
  { label: "Session recording", values: ["Commands only", "Commands only", "Commands + export", "Full session replay"] },
  { label: "Support", values: ["Community forum", "Email (48h SLA)", "Priority (24h SLA)", "Dedicated + onboarding"] },
  { label: "SLA", values: [false, "99.50%", "99.90%", "Custom"] },
  { label: "Compliance reports", values: [false, false, "Audit export", "SOC2 / ISO mapped"] },
];

function MatrixCell({ value, highlight }: { value: Cell; highlight: boolean }) {
  return (
    <td className={`p-3.5 text-center text-sm align-middle ${highlight ? "bg-primary/[0.06]" : ""}`}>
      {value === true ? (
        <Check className="h-4 w-4 text-primary mx-auto" />
      ) : value === false ? (
        <Minus className="h-4 w-4 text-muted-foreground/40 mx-auto" />
      ) : (
        <span className={highlight ? "text-foreground font-medium" : "text-muted-foreground"}>{value}</span>
      )}
    </td>
  );
}

/* ───────────────────────── Page ───────────────────────── */

export default function PricingPage() {
  return (
    <div className="min-h-screen pt-24">
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-[0.12] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] max-w-full h-[320px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative">
          <SectionHeading
            as="h1"
            badge="Pricing"
            title={<>Simple Pricing, <span className="text-gradient-green">Scales With You</span></>}
            description="Start free for 30 days. Pay per machine as you grow — Professional, Business, or a custom Enterprise plan. Unlimited users on every tier."
          />

          {/* ── Plan cards ── */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto mb-8">
            {PLANS.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className={`relative flex flex-col glass-card p-6 transition-all duration-300 ${
                  plan.popular
                    ? "border-primary/50 glow-green lg:-translate-y-3 lg:scale-[1.03]"
                    : "hover:border-primary/30"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider shadow-lg">
                    <Sparkles className="h-3 w-3" /> Most Popular
                  </span>
                )}

                <h3 className={`text-lg font-bold ${plan.popular ? "text-primary" : ""}`}>{plan.name}</h3>
                <p className="text-xs text-muted-foreground mb-5 h-8">{plan.tagline}</p>

                <div className="mb-1 flex items-end gap-1.5">
                  <span className="text-3xl font-bold tracking-tight">{plan.price}</span>
                  <span className="text-xs text-muted-foreground mb-1">{plan.unit}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 mb-6 rounded-full bg-secondary/50 border border-border/60 text-[11px] font-mono text-muted-foreground">
                  <Server className="h-3 w-3 text-primary" />
                  {plan.machines}
                </div>

                <a
                  href={plan.href}
                  {...(plan.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`inline-flex items-center justify-center gap-2 w-full px-5 py-2.5 rounded-lg font-medium text-sm transition-colors mb-6 ${
                    plan.popular
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border"
                  }`}
                >
                  {plan.cta} <ArrowRight className="h-4 w-4" />
                </a>

                <ul className="space-y-2.5 mt-auto">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Check className="h-3.5 w-3.5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* trust strip */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground mb-20"
          >
            <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-primary" /> Unlimited users on every plan</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-primary" /> TLS 1.3 &amp; audit logs included</span>
            <span className="flex items-center gap-1.5"><Server className="h-3.5 w-3.5 text-primary" /> Self-hostable on your infra</span>
          </motion.div>

          {/* ── Comparison table ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
              Compare <span className="text-gradient-green">Every Plan</span>
            </h2>
            <p className="text-sm text-muted-foreground text-center mb-8">
              All features, side by side. Scroll horizontally on smaller screens.
            </p>

            <div className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3.5 text-sm font-semibold sticky left-0 bg-card/80 backdrop-blur-sm z-10 min-w-[170px]">
                        Features
                      </th>
                      {PLANS.map((p) => (
                        <th
                          key={p.id}
                          className={`p-3.5 text-center min-w-[140px] ${p.popular ? "bg-primary/[0.06]" : ""}`}
                        >
                          <span className={`block text-sm font-bold ${p.popular ? "text-primary" : ""}`}>{p.name}</span>
                          <span className="block text-[11px] font-normal text-muted-foreground mt-0.5">
                            {p.price === "Free" ? "Free 30 days" : p.price === "Custom" ? "Custom quote" : `${p.price}/mo`}
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ROWS.map((row, ri) => (
                      <tr key={row.label} className={`border-b border-border/50 ${ri % 2 === 0 ? "bg-secondary/10" : ""}`}>
                        <td className={`p-3.5 text-sm font-medium sticky left-0 z-10 ${ri % 2 === 0 ? "bg-secondary/10" : "bg-card/60"} backdrop-blur-sm`}>
                          {row.label}
                        </td>
                        {row.values.map((v, ci) => (
                          <MatrixCell key={ci} value={v} highlight={PLANS[ci].popular} />
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          {/* ── Final CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card max-w-3xl mx-auto mt-20 p-10 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Not sure which plan <span className="text-gradient-green">fits?</span>
              </h2>
              <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto">
                Start the 30-day free trial in minutes, or talk to us about volume pricing,
                air-gapped deployment, and compliance for your organization.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href="https://console.webxterm.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors glow-green text-sm"
                >
                  Start Free Trial <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors border border-border text-sm"
                >
                  Contact Sales
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
