"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

interface Person {
  name: string;
  title: string;
  description: string;
  image: string;
}

const row1: Person[] = [
  {
    name: "David Coulthard",
    title: "F1 Legend & TV Presenter",
    description: "13-time Grand Prix winner and beloved Sky Sports F1 pundit. One of the most recognisable faces in motorsport.",
    image: "/david.webp",
  },
  {
    name: "Kimi Antonelli",
    title: "Mercedes F1 Driver",
    description: "The next generation of F1 talent. Mercedes-backed prodigy and one of the most hyped young drivers in the sport.",
    image: "/kimi.webp",
  },
  {
    name: "Nico Hülkenberg",
    title: "Haas F1 Driver",
    description: "The Hulk — one of the most experienced drivers on the grid with over 200 Grand Prix starts.",
    image: "/nicoooooooooo+uuuuuuuuulk.webp",
  },
];

const row2: Person[] = [
  {
    name: "Logan Sargeant",
    title: "F1 Driver",
    description: "First American in Formula 1 in over a decade. Williams Racing driver bringing US audiences to the sport.",
    image: "/logan.webp",
  },
  {
    name: "Las Vegas GP",
    title: "Formula 1 Grand Prix",
    description: "The most glamorous race on the F1 calendar. FormulaGod was on the ground delivering exclusive content from the Strip.",
    image: "/vegas.webp",
  },
  {
    name: "Australian GP",
    title: "Formula 1 Grand Prix",
    description: "The season opener at Albert Park, Melbourne. FormulaGod brought fans closer to the action than ever before.",
    image: "/auss.webp",
  },
  {
    name: "Pietro Fittipaldi",
    title: "F1 Driver & Racing Heir",
    description: "Grandson of two-time F1 World Champion Emerson Fittipaldi. Reserve driver and racing ambassador.",
    image: "/pietro.webp",
  },
];

function PersonCard({ person, index }: { person: Person; index: number }) {
  const [hovered, setHovered] = useState(false);

  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);
  const rotate = useSpring(useTransform(x, [-100, 100], [-20, 20]), springConfig);
  const translateX = useSpring(useTransform(x, [-100, 100], [-20, 20]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const half = (e.currentTarget as HTMLElement).offsetWidth / 2;
    x.set(e.nativeEvent.offsetX - half);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="flex flex-col items-center gap-3 group cursor-pointer"
    >
      {/* Circle photo + tooltip anchor */}
      <div
        className="relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); x.set(0); }}
        onMouseMove={handleMouseMove}
      >
        {/* Animated tooltip */}
        <AnimatePresence mode="wait">
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.7 }}
              animate={{ opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 260, damping: 10 } }}
              exit={{ opacity: 0, y: 16, scale: 0.7 }}
              style={{ translateX, rotate, whiteSpace: "nowrap" }}
              className="absolute -top-20 left-1/2 z-50 flex flex-col items-center rounded-xl bg-zinc-900 border border-zinc-700 shadow-2xl px-4 py-2.5 pointer-events-none"
            >
              <p className="font-bold text-white text-sm">{person.name}</p>
              <p className="text-zinc-400 text-xs mt-0.5">{person.title}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Circle image */}
        <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full overflow-hidden ring-2 ring-zinc-700 ring-offset-2 ring-offset-black transition-all duration-500 group-hover:ring-zinc-300 group-hover:ring-offset-4">
          <img
            src={person.image}
            alt={person.name}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
          />
        </div>
      </div>

      {/* Name below */}
      <div className="text-center">
        <p className="text-sm font-display text-white uppercase tracking-wider group-hover:text-zinc-200 transition-colors duration-300">
          {person.name}
        </p>
        <p className="text-xs text-zinc-500 font-sans mt-0.5">{person.title}</p>
      </div>
    </motion.div>
  );
}

export default function FamousFaces() {
  return (
    <section className="w-full py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-400 mb-3 font-sans">
            The Network
          </p>
          <h2 className="text-4xl md:text-6xl font-display text-white mb-4 uppercase tracking-wide">
            Famous Faces
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto text-sm leading-relaxed font-sans">
            We are followed by some of the most famous people and organisations in motorsport.
          </p>
          <div className="mt-6 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-zinc-500 to-transparent" />
        </motion.div>

        {/* Row 1 — 3 people */}
        <div className="grid grid-cols-2 sm:flex sm:justify-center gap-6 sm:gap-8 md:gap-16 mb-10 md:mb-14">
          {row1.map((person, i) => (
            <PersonCard key={person.name} person={person} index={i} />
          ))}
        </div>

        {/* Row 2 — 4 people */}
        <div className="grid grid-cols-2 sm:flex sm:justify-center gap-6 sm:gap-8 md:gap-12">
          {row2.map((person, i) => (
            <PersonCard key={person.name} person={person} index={i + 3} />
          ))}
        </div>
      </div>
    </section>
  );
}
