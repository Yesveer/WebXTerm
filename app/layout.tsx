import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://webxterm.me"),
  title: {
    default: "WebXterm – Web Terminal & Browser SSH for Your Infrastructure",
    template: "%s | WebXterm",
  },
  description:
    "WebXterm is a secure web terminal platform. Access any server, laptop, or bare-metal machine via browser SSH, CLI, or VS Code extension. TLS encrypted, audit logged, RBAC — free community edition available.",
  keywords: [
    // Core product
    "WebXterm",
    "web terminal",
    "browser SSH",
    "SSH in browser",
    "online terminal",
    "browser terminal",
    "web-based SSH client",
    "web SSH",
    // Access & connectivity
    "remote terminal",
    "remote terminal access",
    "secure terminal access",
    "remote server access",
    "remote machine access",
    "remote desktop terminal",
    "terminal over browser",
    "access server from browser",
    "SSH without client",
    "clientless SSH",
    "no install SSH",
    // Infrastructure & DevOps
    "infrastructure management",
    "server management",
    "DevOps terminal",
    "cloud terminal",
    "bare metal management",
    "laptop remote access",
    "server remote access",
    "infrastructure access platform",
    "DevOps tools",
    "SRE tools",
    "platform engineering",
    // Security
    "secure SSH access",
    "TLS terminal",
    "mTLS SSH",
    "SSO SSH",
    "RBAC terminal",
    "audit log SSH",
    "SSH audit trail",
    "zero trust terminal",
    "secure remote access",
    // Terminal management
    "terminal management platform",
    "terminal emulator",
    "terminal management",
    "session management",
    "multi session terminal",
    "terminal session",
    // Tools & integrations
    "VS Code SSH",
    "VS Code terminal extension",
    "SSH CLI tool",
    "port forwarding SSH",
    "SSH port forwarding",
    "SSH tunnel",
    "CLI remote access",
    // Platform support
    "Linux remote terminal",
    "macOS remote terminal",
    "Windows remote terminal",
    "ARM server access",
    "Raspberry Pi remote access",
    // Comparisons & alternatives
    "SSH alternative",
    "Bastion host alternative",
    "Jump server alternative",
    "Teleport alternative",
    "CloudShell alternative",
    "web console server",
    // Long tail
    "access home server from browser",
    "manage servers from browser",
    "terminal in browser",
    "free web terminal",
    "open source web terminal",
    "self hosted terminal",
  ],
  authors: [{ name: "WebXterm Team", url: "https://webxterm.me" }],
  creator: "WebXterm",
  publisher: "WebXterm",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://webxterm.me",
    siteName: "WebXterm",
    title: "WebXterm – Web Terminal & Browser SSH for Your Infrastructure",
    description:
      "Access any server securely from your browser. WebXterm provides web-based SSH terminal access, CLI, and VS Code extension for managing all your infrastructure.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "WebXterm – Secure Web Terminal Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WebXterm – Web Terminal & Browser SSH",
    description:
      "Secure browser-based SSH terminal for servers, laptops & bare-metal. Access your infrastructure from anywhere.",
    images: ["/og-image.png"],
    creator: "@webxterm",
  },
  alternates: {
    canonical: "https://webxterm.me",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "WebXterm",
              url: "https://webxterm.me",
              description:
                "WebXterm is a secure web terminal platform that provides browser-based SSH access to servers, laptops, and bare-metal machines. Manage your entire infrastructure from the browser, CLI, or VS Code.",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Linux, macOS, Windows",
              offers: [
                {
                  "@type": "Offer",
                  name: "Community Edition",
                  price: "0",
                  priceCurrency: "USD",
                  description: "Free forever for individuals and small teams",
                },
                {
                  "@type": "Offer",
                  name: "Enterprise Edition",
                  description:
                    "Advanced security with mTLS, SSO, and multi-tenancy",
                },
              ],
              featureList: [
                "Browser-based SSH terminal",
                "TLS encrypted connections",
                "Audit logs",
                "RBAC team collaboration",
                "VS Code extension",
                "CLI tool",
                "Port forwarding",
                "Multi-platform agent (Linux, macOS, Windows)",
              ],
              sameAs: [
                "https://console.webxterm.me",
                "https://docs.webxterm.me",
                "https://community.webxterm.me",
              ],
            }),
          }}
        />
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KBS8C7PB');`,
          }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GVW0QGERJB"
          strategy="afterInteractive"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-GVW0QGERJB');`,
          }}
        />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KBS8C7PB"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
