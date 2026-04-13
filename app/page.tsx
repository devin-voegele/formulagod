"use client";
import React, { useState, useEffect } from "react";
import Particles from "./components/particles";
import StatsCounter from "./components/stats-counter";
import FamousFaces from "./components/famous-faces";
import BrandsSection from "./components/brands-section";
import ContactSection from "./components/contact-section";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { LampContainer } from "@/components/ui/lamp";
import { Vortex } from "@/components/ui/vortex";
import LoadingScreen from "./components/loading-screen";
import { Globe } from "@/components/ui/globe";
import { Cover } from "@/components/ui/cover";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { CometCard } from "@/components/ui/comet-card";
import SocialDock from "./components/social-dock";
import PlatformsSection from "./components/platforms-section";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Community", href: "#community" },
  { name: "Famous Faces", href: "#faces" },
  { name: "Brands", href: "#brands" },
  { name: "Contact", href: "#contact" },
];

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [hoveredLink, setHoveredLink] = useState("");

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, -120]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.94]);
  const springY = useSpring(heroY, { stiffness: 80, damping: 20 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ["#about", "#community", "#faces", "#brands", "#contact"];
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((href) => {
      const el = document.querySelector(href);
      if (!el) return;
      const name = navLinks.find((l) => l.href === href)?.name ?? "";
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveLink(name); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      <div className="relative w-full min-h-screen">
      <LoadingScreen />
      <SocialDock />

      {/* ── NAV ── */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/80 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => scrollTo("#hero")}
            className="font-display text-xl text-white tracking-wider hover:text-zinc-300 transition-colors duration-300"
          >
            FORMULA<span className="text-zinc-300">GOD</span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => {
              const isActive = activeLink === l.name;
              const isHovered = hoveredLink === l.name;
              const showSquiggle = isActive || isHovered;
              return (
                <button
                  key={l.href}
                  onClick={() => { setActiveLink(l.name); scrollTo(l.href); }}
                  onMouseEnter={() => setHoveredLink(l.name)}
                  onMouseLeave={() => setHoveredLink("")}
                  className={`relative text-xs uppercase tracking-widest font-sans transition-colors duration-300 pb-2 ${
                    showSquiggle ? "text-white" : "text-zinc-400"
                  }`}
                >
                  {l.name}
                  {showSquiggle && (
                    <motion.div
                      layoutId="squiggle"
                      className="absolute -bottom-[2px] left-0 right-0 flex justify-center"
                    >
                      <svg width="37" height="8" viewBox="0 0 37 8" fill="none">
                        <motion.path
                          d="M1 5.39971C7.48565 -1.08593 6.44837 -0.12827 8.33643 6.47992C8.34809 6.52075 11.6019 2.72875 12.3422 2.33912C13.8991 1.5197 16.6594 2.96924 18.3734 2.96924C21.665 2.96924 23.1972 1.69759 26.745 2.78921C29.7551 3.71539 32.6954 3.7794 35.8368 3.7794"
                          stroke="#7043EC"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ strokeDasharray: 84.20591735839844, strokeDashoffset: 84.20591735839844 }}
                          animate={{ strokeDashoffset: 0 }}
                          transition={{ duration: 0.4 }}
                        />
                      </svg>
                    </motion.div>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-zinc-400 hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-zinc-800 px-6 py-6 flex flex-col gap-5">
            {navLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-sm uppercase tracking-widest text-zinc-400 hover:text-white transition-colors text-left font-sans"
              >
                {l.name}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section id="hero" className="relative flex flex-col items-center justify-center w-screen min-h-screen overflow-hidden">
      <Vortex backgroundColor="black" className="absolute inset-0 w-full h-full z-0" particleCount={270} baseHue={0} baseSpeed={0.05} rangeSpeed={0.2} baseRadius={0.5} rangeRadius={0.8} />

        <div className="relative z-20 flex flex-col items-center gap-8 px-6 text-center">

          {/* Logo */}
          <motion.img
            src="/logo.webp"
            alt="FormulaGod"
            width={90}
            height={90}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mx-auto"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
          />

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
          >
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight text-center text-white font-sans">
              FORMULA<Cover className="text-white">GOD</Cover>
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="text-zinc-400 text-sm md:text-base max-w-xl leading-relaxed font-sans -mt-2"
          >
            We have one of the largest motorsport communities in the world across multiple platforms reaching an engaged worldwide audience.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4"
          >
            <button
              onClick={() => scrollTo("#contact")}
              className="w-full sm:w-auto px-8 py-3 bg-white hover:bg-zinc-100 text-black text-xs uppercase tracking-widest font-sans rounded-full transition-all duration-300 hover:shadow-[0_0_28px_rgba(255,255,255,0.2)]"
            >
              Work With Us
            </button>
            <button
              onClick={() => scrollTo("#about")}
              className="w-full sm:w-auto px-8 py-3 border border-zinc-700 hover:border-zinc-400 text-zinc-400 hover:text-white text-xs uppercase tracking-widest font-sans rounded-full transition-all duration-300"
            >
              Learn More
            </button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          onClick={() => scrollTo("#community")}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors group"
        >
          <span className="text-[10px] uppercase tracking-widest font-sans">Scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </motion.button>
      </section>

      {/* ── COMMUNITY STATS ── */}
      <section id="community" className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950/60 to-black pointer-events-none" />

        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-400 mb-3 font-sans">
              The Networks
            </p>
            <h2 className="text-4xl md:text-5xl font-display text-white mb-4">
              The FormulaGod Community
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto text-sm leading-relaxed font-sans">
              A global motorsport audience that's passionate, engaged, and growing.
            </p>
            <div className="mt-6 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-zinc-500 to-transparent" />
          </motion.div>
          <StatsCounter />
        </div>
      </section>

      {/* ── GLOBAL REACH ── */}
      <section className="py-24 px-6 bg-black">

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-400 mb-3 font-sans">
              Worldwide
            </p>
            <h2 className="text-4xl md:text-5xl font-display text-white mb-6 leading-tight">
              Global Reach
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed font-sans mb-10">
              From Silverstone to Suzuka — FormulaGod's audience spans every corner of the globe, following the sport wherever it goes.
            </p>
            <div className="h-px w-16 bg-gradient-to-r from-zinc-500 to-transparent mb-10" />
            <div className="flex flex-col gap-6">
              {[
                "Reached F1 fans all over the world",
                "Presenting Grand Prix events across every continent",
                "Trusted by the biggest names in motorsport",
              ].map((label, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 * i }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-1.5 w-1 h-1 rounded-full bg-zinc-400 shrink-0" />
                  <p className="text-zinc-300 text-sm font-sans leading-relaxed">{label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex items-center justify-center"
          >
            <div className="relative w-full max-w-[400px] h-[300px] sm:h-[400px]">
              <Globe />
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black pointer-events-none" />

        <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-400 mb-3 font-sans">
              Who We Are
            </p>
            <h2 className="text-4xl md:text-5xl font-display text-white mb-6 leading-tight">
              More Than a
              <br />
              <span className="text-zinc-300">Media Channel</span>
            </h2>
            <div className="space-y-4 text-zinc-400 text-sm leading-relaxed font-sans">
              <p>
                FormulaGod is one of the world's largest independent motorsport
                media brands — built from a genuine passion for Formula 1 and
                the culture that surrounds it.
              </p>
              <p>
                With over 333,000 followers across platforms and 30 million
                monthly views, we've built a community that doesn't just watch
                motorsport — they live it. Our audience is global, engaged, and
                deeply invested in the sport.
              </p>
              <p>
                From pit lane access at the Las Vegas GP to exclusive driver
                interviews, we sit at the intersection of motorsport and
                culture — connecting brands with the fans that matter most.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-3">
              <div className="h-px w-8 bg-zinc-500" />
              <span className="text-xs uppercase tracking-widest text-zinc-500 font-sans">
                Est. by Ellis — ellis@formulagod.com
              </span>
            </div>
          </motion.div>

          {/* About visual panel — comet cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {[
              { title: "Multi-Platform", bg: "MULTI", description: "YouTube, Instagram, X & Threads." },
              { title: "Global Audience", bg: "WORLD", description: "F1 fans across every continent." },
              { title: "Daily Content",  bg: "DAILY", description: "Fresh motorsport content every day." },
              { title: "Exclusive Access", bg: "ACCESS", description: "Pit lane & paddock presence." },
            ].map((item) => (
              <CometCard key={item.title} rotateDepth={10} translateDepth={10}>
                <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-[#141414] p-5 h-40">
                  <p className="font-sans text-sm font-bold text-white relative z-10">{item.title}</p>
                  <p className="absolute inset-0 flex items-center justify-start pl-5 font-display text-5xl font-bold text-white/10 select-none pointer-events-none tracking-tight">
                    {item.bg}
                  </p>
                  <p className="font-sans text-xs text-zinc-500 leading-relaxed relative z-10">{item.description}</p>
                </div>
              </CometCard>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PLATFORMS ── */}
      <PlatformsSection />

      {/* ── FAMOUS FACES ── */}
      <section id="faces">
        <FamousFaces />
      </section>

      {/* ── BRANDS ── */}
      <section id="brands">
        <BrandsSection />
      </section>

      {/* ── CONTACT ── */}
      <ContactSection />

      {/* ── FOOTER ── */}
      <footer className="border-t border-zinc-900 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-lg text-white tracking-wider">
            FORMULA<span className="text-zinc-300">GOD</span>
          </span>
          <p className="text-xs text-zinc-600 font-sans">
            © {new Date().getFullYear()} FormulaGod. All rights reserved.
          </p>
          <a
            href="mailto:ellis@formulagod.com"
            className="text-xs text-zinc-500 hover:text-white transition-colors font-sans"
          >
            ellis@formulagod.com
          </a>
        </div>
      </footer>
      </div>
    </div>
  );
}
