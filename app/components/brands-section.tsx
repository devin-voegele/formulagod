"use client";
import React from "react";
import { motion } from "framer-motion";
import { PinContainer } from "../ui/3d-pin";

interface Brand {
  name: string;
  logo: string;
  url: string;
  description: string;
}

const brands: Brand[] = [
  {
    name: "ESPN",
    logo: "/ESPN.webp",
    url: "https://www.espn.com",
    description: "Global sports media giant",
  },
  {
    name: "Netflix",
    logo: "/Netflix.webp",
    url: "https://www.netflix.com",
    description: "World's leading streaming platform",
  },
  {
    name: "Williams Racing",
    logo: "/williams+logo+for+website.webp",
    url: "https://www.williamsf1.com",
    description: "Formula 1 constructor",
  },
  {
    name: "Snapdragon",
    logo: "/Snapdragon_Logo.svg.webp",
    url: "https://www.qualcomm.com/snapdragon",
    description: "Qualcomm's flagship chip brand",
  },
  {
    name: "Stake F1 Team",
    logo: "/stake+logo+for+website.webp",
    url: "https://www.stakef1team.com",
    description: "Formula 1 constructor",
  },
  {
    name: "Eight Sleep",
    logo: "/Eight-Sleep-Logo.webp",
    url: "https://www.eightsleep.com",
    description: "Sleep fitness technology",
  },
  {
    name: "Kalshi",
    logo: "/Kalshi_logo.svg.webp",
    url: "https://www.kalshi.com",
    description: "Prediction markets platform",
  },
  {
    name: "Raising Cane's",
    logo: "/Raising_Cane's_Chicken_Fingers_logo.svg.webp",
    url: "https://www.raisingcanes.com",
    description: "American restaurant chain",
  },
];

export default function BrandsSection() {
  return (
    <section className="w-full py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950/50 to-black pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-6"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-400 mb-3 font-sans">
            Partnerships
          </p>
          <h2 className="text-4xl md:text-5xl font-display text-white mb-4">
            Trusted By The Best
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto text-sm leading-relaxed font-sans">
            We have worked with the biggest brands in the world and been featured
            alongside the largest media companies.
          </p>
          <div className="mt-6 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-zinc-500 to-transparent" />
        </motion.div>

        {/* Desktop: 3D pin cards */}
        <div className="hidden md:flex flex-wrap justify-center">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className="w-[280px] h-[280px]"
            >
              <PinContainer title={brand.url.replace("https://www.", "")} href={brand.url}>
                <div className="flex flex-col items-center justify-center w-[220px] h-[200px] gap-4 bg-zinc-950/80">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-36 h-20 object-contain filter brightness-90 hover:brightness-110 transition-all duration-300"
                  />
                  <div className="text-center">
                    <p className="text-zinc-300 text-sm font-sans font-medium">{brand.name}</p>
                    <p className="text-zinc-600 text-xs font-sans mt-0.5">{brand.description}</p>
                  </div>
                </div>
              </PinContainer>
            </motion.div>
          ))}
        </div>

        {/* Mobile: simple grid */}
        <div className="md:hidden grid grid-cols-2 gap-4 mt-8">
          {brands.map((brand, i) => (
            <motion.a
              key={brand.name}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:border-zinc-600 transition-all duration-300"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-24 h-14 object-contain brightness-90"
              />
              <p className="text-zinc-400 text-xs font-sans text-center">{brand.name}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
