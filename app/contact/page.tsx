"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Send, Linkedin, Github, ExternalLink, Loader2 } from "lucide-react";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import { sendContactEmail } from "@/app/actions/contact";

const teamMembers = [
  // {
  //   name: "Rishabh Aggarwal",
  //   title: "Software Engineer",
  //   image: "https://github.com/rishi97.png",
  //   linkedin: "https://www.linkedin.com/in/rishabh-aggarwal-r2000/",
  //   github: "https://github.com/rishi97",
  // },
  {
    name: "Amitesh Singh",
    title: "Software Engineer",
    image: "https://github.com/amiteshsinghcore.png",
    linkedin: "https://www.linkedin.com/in/amitesh-singh-7bba04204",
    github: "https://github.com/amiteshsinghcore",
    x: "https://x.com/amiteshhsingh",
  },
  {
    name: "Yesveer Singh",
    title: "Software Engineer",
    image: "https://github.com/Yesveer.png",
    linkedin: "https://www.linkedin.com/in/kaal-bhairav/",
    github: "https://github.com/Yesveer",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await sendContactEmail(form);
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    } catch {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge="Contact"
            title={<>Get in <span className="text-gradient-green">Touch</span></>}
            description="Have questions? We'd love to hear from you."
          />

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">Email</h3>
                </div>
                <a href="mailto:kaalbhairavy@gmail.com" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  kaalbhairavy@gmail.com
                </a>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">Phone</h3>
                </div>
                <a href="tel:+918787016919" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  +91 8787016919
                </a>
              </div>
            </motion.div>

            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4">
                {submitted && (
                  <div className="rounded-lg bg-primary/10 border border-primary/20 px-4 py-3 text-sm text-primary text-center">
                    ✓ Message sent! We&apos;ll get back to you soon.
                  </div>
                )}
                {error && (
                  <div className="rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive text-center">
                    {error}
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium mb-1.5">Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    placeholder="Tell us about your needs..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</>
                  ) : (
                    <><Send className="h-4 w-4" /> Send Message</>
                  )}
                </button>
              </form>
            </motion.div>
          </div>

          {/* Team Section */}
          <div className="mt-24 max-w-4xl mx-auto">
            <SectionHeading
              badge="Team"
              title={<>Meet the <span className="text-gradient-green">Team</span></>}
              description="The people behind WebXterm."
            />
            <div className="grid sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
              {teamMembers.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-6 text-center"
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={80}
                    height={80}
                    className="rounded-full mx-auto mb-4 border-2 border-primary/30"
                  />
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{member.title}</p>
                  <div className="flex items-center justify-center gap-3">
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        <Linkedin className="h-5 w-5" />
                      </a>
                    )}
                    {member.github && (
                      <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        <Github className="h-5 w-5" />
                      </a>
                    )}
                    {member.x && (
                      <a href={member.x} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
