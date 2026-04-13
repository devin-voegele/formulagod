"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="w-full py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black pointer-events-none" />

      <div className="relative max-w-2xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-400 mb-3 font-sans">
            Get In Touch
          </p>
          <h2 className="text-4xl md:text-5xl font-display text-white mb-4">
            Let's Work Together
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Whether you're a brand, team, or media company — reach out and let's
            create something extraordinary.
          </p>
          <div className="mt-6 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-zinc-500 to-transparent" />
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4 py-16 text-center"
          >
            <CheckCircle className="w-14 h-14 text-zinc-300" />
            <h3 className="text-2xl font-display text-white">Message Sent</h3>
            <p className="text-zinc-400 text-sm max-w-sm">
              Thanks for reaching out. We'll get back to you as soon as possible.
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-widest text-zinc-500 font-sans">
                  Name <span className="text-zinc-400">*</span>
                </label>
                <input
                  required
                  type="text"
                  placeholder="Your name"
                  className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-500/60 focus:bg-zinc-900 transition-all duration-300 font-sans"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-widest text-zinc-500 font-sans">
                  Brand / Company
                </label>
                <input
                  type="text"
                  placeholder="Your brand or company"
                  className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-500/60 focus:bg-zinc-900 transition-all duration-300 font-sans"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-widest text-zinc-500 font-sans">
                Email Address <span className="text-zinc-400">*</span>
              </label>
              <input
                required
                type="email"
                placeholder="your@email.com"
                className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-500/60 focus:bg-zinc-900 transition-all duration-300 font-sans"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-widest text-zinc-500 font-sans">
                Subject <span className="text-zinc-400">*</span>
              </label>
              <input
                required
                type="text"
                placeholder="What's this about?"
                className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-500/60 focus:bg-zinc-900 transition-all duration-300 font-sans"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-widest text-zinc-500 font-sans">
                Message <span className="text-zinc-400">*</span>
              </label>
              <textarea
                required
                rows={5}
                placeholder="Tell us about your project..."
                className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-500/60 focus:bg-zinc-900 transition-all duration-300 resize-none font-sans"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2.5 bg-white hover:bg-zinc-200 disabled:bg-zinc-700 text-black font-sans text-sm uppercase tracking-widest py-4 rounded-lg transition-all duration-300 group"
            >
              {loading ? (
                <span className="animate-pulse">Sending...</span>
              ) : (
                <>
                  <span>Submit</span>
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </>
              )}
            </button>
          </motion.form>
        )}

        <div className="mt-12 pt-8 border-t border-zinc-800/50 text-center">
          <p className="text-xs text-zinc-600 font-sans uppercase tracking-widest mb-2">
            Or reach us directly
          </p>
          <a
            href="mailto:ellis@formulagod.com"
            className="text-zinc-400 hover:text-white transition-colors duration-300 text-sm font-sans"
          >
            ellis@formulagod.com
          </a>
        </div>
      </div>
    </section>
  );
}
