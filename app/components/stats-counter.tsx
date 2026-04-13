"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface StatProps {
  value: string;
  label: string;
  suffix?: string;
}

function useCountUp(target: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);

  return count;
}

function StatCard({ value, label, suffix = "" }: StatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10);
  const count = useCountUp(numericValue, 2200, visible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const formatCount = (n: number) => {
    if (numericValue >= 1000000) return (n / 1000000).toFixed(n >= numericValue ? 0 : 1) + "M";
    if (numericValue >= 1000) return (n / 1000).toFixed(n >= numericValue ? 0 : 0) + "K";
    return n.toString();
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center gap-2 group"
    >
      <div className="relative">
        <span className="text-5xl md:text-6xl font-display text-white tracking-tight">
          {visible ? formatCount(count) : "0"}
          <span className="text-zinc-300">{suffix}</span>
        </span>
        <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <span className="text-xs uppercase tracking-[0.2em] text-zinc-400 font-sans text-center">
        {label}
      </span>
    </motion.div>
  );
}

export default function StatsCounter() {
  const stats: StatProps[] = [
    { value: "30000000", label: "Monthly Views", suffix: "+" },
    { value: "50000", label: "Avg Story Views", suffix: "+" },
    { value: "333000", label: "Total Followers", suffix: "+" },
  ];

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full max-w-4xl mx-auto px-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
    >
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </motion.div>
  );
}
