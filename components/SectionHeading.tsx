"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionHeadingProps {
  badge?: string;
  title: ReactNode;
  description?: string;
  className?: string;
  /** Heading level for the title. Use "h1" for the primary page heading. */
  as?: "h1" | "h2";
}

export default function SectionHeading({ badge, title, description, className = "", as = "h2" }: SectionHeadingProps) {
  const Heading = as;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`text-center max-w-3xl mx-auto mb-16 ${className}`}
    >
      {badge && (
        <span className="inline-block px-3 py-1 mb-4 text-xs font-mono font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
          {badge}
        </span>
      )}
      <Heading className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
        {title}
      </Heading>
      {description && (
        <p className="text-lg text-muted-foreground">{description}</p>
      )}
    </motion.div>
  );
}
