"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionHeading from "@/components/SectionHeading";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  badge?: string;
  title?: React.ReactNode;
  description?: string;
  /** Heading level for the section title. */
  as?: "h1" | "h2";
}

/**
 * Renders an accessible FAQ accordion and emits FAQPage structured data
 * (schema.org) so search engines and AI answer engines can surface the
 * questions and answers directly. The JSON-LD text must match the visible
 * copy, so both are driven from the same `items` array.
 */
export default function FAQ({
  items,
  badge = "FAQ",
  title = <>Frequently Asked Questions</>,
  description,
  as = "h2",
}: FAQProps) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <SectionHeading as={as} badge={badge} title={title} description={description} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <Accordion type="single" collapsible className="w-full">
          {items.map((item, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="glass-card mb-3 px-5 border-border/60"
            >
              <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </>
  );
}
