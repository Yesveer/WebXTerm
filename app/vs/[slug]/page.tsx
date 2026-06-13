import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ArrowRight } from "lucide-react";
import { comparisons, getComparison } from "@/lib/comparisons";

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) return {};
  const url = `https://webxterm.me/vs/${c.slug}`;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    keywords: c.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url,
    },
  };
}

export default async function ComparisonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) notFound();

  const url = `https://webxterm.me/vs/${c.slug}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://webxterm.me" },
      { "@type": "ListItem", position: 2, name: "Compare", item: "https://webxterm.me/vs" },
      { "@type": "ListItem", position: 3, name: c.title, item: url },
    ],
  };

  // FAQ-style structured data so AI answer engines can quote the verdict directly.
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `${c.title}: which should I choose?`,
        acceptedAnswer: { "@type": "Answer", text: c.verdict },
      },
    ],
  };

  return (
    <div className="min-h-screen pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{c.title}</span>
          </nav>

          <span className="inline-block px-3 py-1 mb-4 text-xs font-mono font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
            Comparison
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
            {c.title.split("vs")[0]}<span className="text-gradient-green">vs{c.title.split("vs")[1]}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-10">{c.intro}</p>

          <div className="flex flex-wrap gap-3 mb-14">
            <a
              href="https://console.webxterm.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors glow-green"
            >
              Try WebXterm Free <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/features"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors border border-border"
            >
              See all features
            </Link>
          </div>

          {/* Comparison table */}
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            WebXterm vs {c.competitor.replace(/^(a|an) /i, "")} at a glance
          </h2>
          <div className="glass-card overflow-hidden mb-14">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-sm font-semibold">Capability</th>
                    <th className="text-left p-4 text-sm font-semibold text-primary">WebXterm</th>
                    <th className="text-left p-4 text-sm font-semibold">{c.competitor.replace(/^(a|an) /i, "")}</th>
                  </tr>
                </thead>
                <tbody>
                  {c.rows.map((row, i) => (
                    <tr key={row.feature} className={`border-b border-border/50 ${i % 2 === 0 ? "bg-secondary/20" : ""}`}>
                      <td className="p-4 text-sm font-medium">{row.feature}</td>
                      <td className="p-4 text-sm text-foreground">{row.webxterm}</td>
                      <td className="p-4 text-sm text-muted-foreground">{row.competitor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* When to choose */}
          <div className="grid md:grid-cols-2 gap-6 mb-14">
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold mb-4">When WebXterm is the better fit</h2>
              <ul className="space-y-3">
                {c.chooseWebxterm.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold mb-4">When {c.competitor.replace(/^(a|an) /i, "the ")} may fit better</h2>
              <ul className="space-y-3">
                {c.chooseCompetitor.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="text-primary flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Verdict */}
          <div className="glass-card p-8 border-primary/30">
            <h2 className="text-2xl font-bold mb-4">The verdict</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">{c.verdict}</p>
            <a
              href="https://console.webxterm.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors glow-green"
            >
              Get Started Free <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Other comparisons */}
          <div className="mt-14">
            <h2 className="text-xl font-bold mb-4">Compare WebXterm with other tools</h2>
            <div className="flex flex-wrap gap-3">
              {comparisons
                .filter((other) => other.slug !== c.slug)
                .map((other) => (
                  <Link
                    key={other.slug}
                    href={`/vs/${other.slug}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors border border-border"
                  >
                    {other.title} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
