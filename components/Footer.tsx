import Link from "next/link";
import { Terminal } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Features", href: "/features" },
    { label: "Architecture", href: "/architecture" },
    { label: "CLI", href: "/cli" },
    { label: "VS Code Extension", href: "/vscode" },
    { label: "Pricing", href: "/pricing" },
  ],
  Resources: [
    { label: "Documentation", href: "https://docs.webxterm.me/", external: true },
    { label: "Community", href: "https://community.webxterm.me/", external: true },
    { label: "Console", href: "https://console.webxterm.me/", external: true },
  ],
  Company: [
    { label: "Contact", href: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                <Terminal className="h-4 w-4 text-primary" />
              </div>
              <span className="text-lg font-bold font-mono">
                Web<span className="text-primary">Xterm</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Secure terminal access for all your infrastructure. Manage servers from browser, CLI, or IDE.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm mb-3">{title}</h4>
              <ul className="space-y-2">
                {links.map((l) => (
                  <li key={l.label}>
                    {"external" in l && l.external ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link
                        href={l.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 WebXterm. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground font-mono">
            <span className="text-primary">$</span> echo &quot;Built for developers, by developers&quot;
          </p>
        </div>
      </div>
    </footer>
  );
}
