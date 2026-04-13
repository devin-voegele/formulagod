"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";

const YTIcon = () => (
  <svg viewBox="0 0 32 32" fill="currentColor" className="w-8 h-8">
    <path d="M29.41,9.26a3.5,3.5,0,0,0-2.47-2.47C24.76,6.2,16,6.2,16,6.2s-8.76,0-10.94.59A3.5,3.5,0,0,0,2.59,9.26,36.13,36.13,0,0,0,2,16a36.13,36.13,0,0,0,.59,6.74,3.5,3.5,0,0,0,2.47,2.47C7.24,25.8,16,25.8,16,25.8s8.76,0,10.94-.59a3.5,3.5,0,0,0,2.47-2.47A36.13,36.13,0,0,0,30,16,36.13,36.13,0,0,0,29.41,9.26ZM13.2,20.2V11.8L20.47,16Z" />
  </svg>
);
const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);
const IGIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);
const ThreadsIcon = () => (
  <svg viewBox="0 0 192 192" fill="currentColor" className="w-7 h-7">
    <path d="M141.537 88.988a66.667 66.667 0 00-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.724-10.548 21.348-10.548h.229c8.249.053 14.474 2.452 18.503 7.129 2.932 3.405 4.893 8.111 5.864 14.05-7.314-1.243-15.224-1.626-23.68-1.14-23.82 1.371-39.134 15.264-38.105 34.568.522 9.792 5.4 18.216 13.735 23.719 7.047 4.652 16.124 6.927 25.557 6.412 12.458-.683 22.231-5.436 29.049-14.127 5.178-6.6 8.453-15.153 9.899-25.93 5.937 3.583 10.337 8.298 12.767 13.966 4.132 9.635 4.373 25.468-8.546 38.376-11.319 11.308-24.925 16.2-45.488 16.351-22.809-.169-40.06-7.484-51.275-21.742C35.236 139.966 29.808 120.682 29.605 96c.203-24.682 5.63-43.966 16.133-57.317C56.954 24.425 74.204 17.11 97.013 16.94c22.975.17 40.526 7.52 52.171 21.847 5.71 7.026 10.015 15.86 12.853 26.162l16.147-4.308c-3.44-12.68-8.853-23.606-16.219-32.668C147.036 9.607 125.202.195 97.07 0h-.113C68.882.195 47.292 9.642 32.788 28.08 19.882 44.485 13.224 67.315 13.001 95.932L13 96v.067c.224 28.617 6.882 51.447 19.788 67.854C47.292 182.358 68.882 191.805 96.957 192h.113c24.96-.173 42.554-6.708 57.048-21.189 18.963-18.945 18.392-42.692 12.142-57.27-4.484-10.454-13.033-18.945-24.723-24.553zM98.44 129.507c-10.44.588-21.286-4.098-21.82-14.135-.397-7.442 5.296-15.746 22.461-16.735 1.966-.113 3.895-.169 5.79-.169 6.235 0 12.068.606 17.371 1.765-1.978 24.702-13.58 28.713-23.802 29.274z" />
  </svg>
);

const platforms = [
  {
    title: "YouTube",
    description: "Main video channel",
    icon: <YTIcon />,
    ctaText: "Visit",
    ctaLink: "https://www.youtube.com/@formulagod",
    content: "FormulaGod's YouTube channel is the home of in-depth Formula 1 content — from race breakdowns and driver analysis to exclusive paddock footage and commentary. With hundreds of thousands of subscribers tuning in every week, it's one of the most-watched independent F1 channels on the platform.\n\nEvery race weekend is covered extensively, giving fans the context and insight they won't find anywhere else.",
  },
  {
    title: "Instagram",
    description: "Visual storytelling",
    icon: <IGIcon />,
    ctaText: "Visit",
    ctaLink: "https://www.instagram.com/formulagod",
    content: "On Instagram, FormulaGod brings the glamour and intensity of Formula 1 to life through stunning visuals, race-day stories, and behind-the-scenes content from the paddock.\n\nFrom Silverstone to Suzuka, the feed captures every high-octane moment of the season — keeping a highly engaged global audience connected to the sport they love, 365 days a year.",
  },
  {
    title: "X (Twitter)",
    description: "Real-time F1 coverage",
    icon: <XIcon />,
    ctaText: "Visit",
    ctaLink: "https://x.com/formula1god",
    content: "X is where FormulaGod lives in the moment — live race commentary, breaking news, hot takes, and instant reactions as the action unfolds on track.\n\nWith a fast-growing, highly engaged following, the FormulaGod X account is a go-to source for F1 fans who want real-time insight and discussion from one of the sport's most trusted independent voices.",
  },
  {
    title: "Threads",
    description: "Community conversations",
    icon: <ThreadsIcon />,
    ctaText: "Visit",
    ctaLink: "https://www.threads.com/@formulagod",
    content: "Threads is FormulaGod's space for longer-form conversation and community building — where fans debate, discuss and dissect everything Formula 1.\n\nFrom technical regulations to driver rivalries, the Threads presence fosters genuine dialogue with a passionate motorsport audience that wants more than just headlines.",
  },
];

export default function PlatformsSection() {
  const [active, setActive] = useState<(typeof platforms)[number] | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") setActive(null); };
    if (active) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <section className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950/60 to-black pointer-events-none" />

      <div className="relative max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-400 mb-3 font-sans">
            Where You'll Find Us
          </p>
          <h2 className="text-4xl md:text-5xl font-display text-white mb-4">
            Present Platforms
          </h2>
          <div className="mt-6 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-zinc-500 to-transparent" />
        </motion.div>

        {/* Backdrop */}
        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
              onClick={() => setActive(null)}
            />
          )}
        </AnimatePresence>

        {/* Expanded modal — no layoutId, plain fade+scale to avoid lag */}
        <AnimatePresence>
          {active && (
            <div className="fixed inset-0 grid place-items-center z-50 px-4">
              <motion.div
                ref={ref}
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 12 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="w-full max-w-[460px] flex flex-col bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl"
              >
                {/* Icon header */}
                <div className="flex items-center justify-between px-6 pt-6 pb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-zinc-800 text-white">
                      {active.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-xl font-display">{active.title}</h3>
                      <p className="text-zinc-400 text-sm font-sans">{active.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActive(null)}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors text-zinc-400"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>

                <div className="px-6 pb-6">
                  <div className="h-px bg-zinc-800 mb-4" />
                  <p className="text-zinc-400 text-sm leading-relaxed font-sans whitespace-pre-line">
                    {active.content}
                  </p>
                  <a
                    href={active.ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-block px-5 py-2.5 text-xs rounded-full font-bold bg-white text-black hover:bg-zinc-200 transition-colors font-sans uppercase tracking-widest"
                  >
                    {active.ctaText}
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Card list */}
        <ul className="flex flex-col gap-3">
          {platforms.map((platform, i) => (
            <motion.div
              key={platform.title}
              onClick={() => setActive(platform)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="p-3 sm:p-4 flex flex-row justify-between items-center hover:bg-zinc-900/60 border border-transparent hover:border-zinc-800 rounded-2xl cursor-pointer transition-all duration-200 group"
            >
              <div className="flex gap-4 items-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-800 text-white group-hover:bg-zinc-700 transition-colors">
                  {platform.icon}
                </div>
                <div>
                  <p className="font-medium text-white font-sans">{platform.title}</p>
                  <p className="text-zinc-400 text-sm font-sans">{platform.description}</p>
                </div>
              </div>
              <button className="px-4 py-2 text-xs rounded-full font-bold bg-zinc-800 hover:bg-white hover:text-black text-zinc-300 transition-all duration-200 font-sans uppercase tracking-widest">
                {platform.ctaText}
              </button>
            </motion.div>
          ))}
        </ul>
      </div>
    </section>
  );
}
