"use client";

import { useEffect, useState } from "react";

interface TypingAnimationProps {
  lines: { text: string; color?: string; delay?: number }[];
  speed?: number;
}

export default function TypingAnimation({ lines, speed = 40 }: TypingAnimationProps) {
  const [displayedLines, setDisplayedLines] = useState<{ text: string; color?: string }[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentLine >= lines.length) return;

    const line = lines[currentLine];
    const delay = currentChar === 0 ? (line.delay || 0) : speed;

    const timer = setTimeout(() => {
      if (currentChar < line.text.length) {
        setDisplayedLines((prev) => {
          const newLines = [...prev];
          if (newLines.length <= currentLine) {
            newLines.push({ text: "", color: line.color });
          }
          newLines[currentLine] = {
            text: line.text.slice(0, currentChar + 1),
            color: line.color,
          };
          return newLines;
        });
        setCurrentChar((c) => c + 1);
      } else {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [currentLine, currentChar, lines, speed]);

  useEffect(() => {
    const interval = setInterval(() => setShowCursor((c) => !c), 530);
    return () => clearInterval(interval);
  }, []);

  const colorClass = (color?: string) => {
    switch (color) {
      case "green": return "text-terminal-green";
      case "cyan": return "text-terminal-cyan";
      case "yellow": return "text-terminal-yellow";
      case "red": return "text-terminal-red";
      case "purple": return "text-terminal-purple";
      case "blue": return "text-terminal-blue";
      case "muted": return "text-muted-foreground";
      default: return "text-foreground";
    }
  };

  return (
    <div className="font-mono text-sm">
      {displayedLines.map((line, i) => (
        <div key={i} className={colorClass(line.color)}>
          {line.text}
        </div>
      ))}
      {currentLine < lines.length && (
        <span className={`inline-block w-2 h-4 bg-primary ml-0.5 ${showCursor ? "opacity-100" : "opacity-0"}`} />
      )}
      {currentLine >= lines.length && (
        <div>
          <span className="text-primary">$ </span>
          <span className={`inline-block w-2 h-4 bg-primary ml-0.5 ${showCursor ? "opacity-100" : "opacity-0"}`} />
        </div>
      )}
    </div>
  );
}
