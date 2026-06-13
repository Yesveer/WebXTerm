import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { comparisons } from "@/lib/comparisons";

export const metadata: Metadata = {
  title: "Compare WebXterm – Alternatives to Teleport, Bastion Hosts & Cloud Shell",
  description:
    "See how WebXterm compares to Teleport, traditional bastion hosts, and cloud provider shells for secure browser-based SSH and infrastructure access.",
  keywords: [
    "WebXterm comparison",
    "WebXterm alternatives",
    "Teleport alternative",
    "bastion host alternative",
    "jump server alternative",
    "CloudShell alternative",
    "secure access platform comparison",
  ],
  alternates: { canonical: "https://webxterm.me/vs" },
  openGraph: {
    title: "Compare WebXterm with Teleport, Bastion Hosts & Cloud Shell",
    description:
      "How WebXterm compares to other ways of accessing your infrastructure securely.",
    url: "https://webxterm.me/vs",
  },
};

export default function CompareIndexPage() {
  return (
    <div className="min-h-screen pt-24">
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-mono font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
            Compare
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
            How WebXterm <span className="text-gradient-green">Compares</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-12">
            There are many ways to access your servers securely. Here is how WebXterm
            stacks up against the most common alternatives — so you can pick the right
            tool for your team.
          </p>

          <div className="grid gap-4">
            {comparisons.map((c) => (
              <Link
                key={c.slug}
                href={`/vs/${c.slug}`}
                className="glass-card p-6 flex items-center justify-between gap-4 hover:border-primary/40 transition-colors group"
              >
                <div>
                  <h2 className="text-xl font-bold mb-1">{c.title}</h2>
                  <p className="text-sm text-muted-foreground">{c.metaDescription}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
