"use client";
import React from "react";
import { twMerge } from "tailwind-merge";
import styles from "./style.module.css";

interface BeamProps {
  className?: string;
  delay?: string;
  duration?: string;
  width?: string;
}

const Beam = ({ className, delay = "0s", duration = "2s", width = "50px" }: BeamProps) => {
  return (
    <span
      className={twMerge("absolute z-40", styles.meteor, className)}
      style={{
        ["--meteor-delay" as string]: delay,
        ["--meteor-duration" as string]: duration,
        ["--meteor-width" as string]: width,
      }}
    />
  );
};

export default Beam;
