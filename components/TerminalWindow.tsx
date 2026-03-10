"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface TerminalWindowProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function TerminalWindow({ title = "terminal", children, className = "" }: TerminalWindowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`terminal-window ${className}`}
    >
      <div className="terminal-header">
        <div className="terminal-dot bg-terminal-red" />
        <div className="terminal-dot bg-terminal-yellow" />
        <div className="terminal-dot bg-terminal-green" />
        <span className="ml-2 text-xs text-muted-foreground font-mono">{title}</span>
      </div>
      <div className="p-4 font-mono text-sm leading-relaxed">
        {children}
      </div>
    </motion.div>
  );
}
