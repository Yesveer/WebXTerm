import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact – Get in Touch with WebXterm Team",
  description:
    "Have questions about WebXterm? Contact us for enterprise pricing, support, or partnership inquiries. Meet the team behind the web terminal platform.",
  keywords: [
    "webxterm contact",
    "web terminal support",
    "enterprise terminal contact",
    "webxterm team",
    "SSH platform support",
  ],
  alternates: {
    canonical: "https://webxterm.me/contact",
  },
  openGraph: {
    title: "Contact WebXterm – Enterprise Sales & Support",
    description:
      "Reach out to the WebXterm team for enterprise pricing, support, or partnership opportunities.",
    url: "https://webxterm.me/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
