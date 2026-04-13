"use client"

import { useEffect, useRef } from "react"
import createGlobe, { COBEOptions } from "cobe"
import { useMotionValue, useSpring } from "framer-motion"

import { cn } from "@/lib/utils"

const MOVEMENT_DAMPING = 1400

const GLOBE_CONFIG: COBEOptions = {
  width: 600,
  height: 600,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 1.2,
  mapSamples: 16000,
  mapBrightness: 6,
  baseColor: [0.18, 0.18, 0.18],
  markerColor: [200, 0, 0],
  glowColor: [0.4, 0.4, 0.4],
  markers: [
    // Bahrain GP
    { location: [26.0325, 50.5106], size: 0.05 },
    // Saudi Arabia GP - Jeddah
    { location: [21.6277, 39.1022], size: 0.05 },
    // Australian GP - Melbourne
    { location: [-37.8497, 144.968], size: 0.07 },
    // Japanese GP - Suzuka
    { location: [34.8431, 136.541], size: 0.05 },
    // Monaco GP
    { location: [43.7347, 7.4206], size: 0.06 },
    // British GP - Silverstone
    { location: [52.0786, -1.0169], size: 0.07 },
    // Italian GP - Monza
    { location: [45.6156, 9.2811], size: 0.05 },
    // Singapore GP
    { location: [1.2914, 103.864], size: 0.06 },
    // US GP - Austin
    { location: [30.1328, -97.6411], size: 0.07 },
    // Las Vegas GP
    { location: [36.1699, -115.1398], size: 0.08 },
    // Abu Dhabi GP
    { location: [24.4672, 54.6031], size: 0.06 },
    // Brazilian GP - São Paulo
    { location: [-23.7036, -46.6997], size: 0.07 },
    // Canadian GP - Montreal
    { location: [45.5017, -73.5673], size: 0.06 },
    // Spanish GP - Barcelona
    { location: [41.57, 2.2611], size: 0.05 },
    // Mexican GP
    { location: [19.4042, -99.0907], size: 0.07 },
  ],
}

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string
  config?: COBEOptions
}) {
  let phi = 0
  let width = 0
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)

  const r = useMotionValue(0)
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  })

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab"
    }
  }

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      pointerInteractionMovement.current = delta
      r.set(r.get() + delta / MOVEMENT_DAMPING)
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current!

    const globe = createGlobe(canvas, {
      ...config,
      width: canvas.offsetWidth * 2,
      height: canvas.offsetWidth * 2,
      onRender: (state) => {
        if (!pointerInteracting.current) phi += 0.005
        state.phi = phi + rs.get()
        state.width = canvas.offsetWidth * 2
        state.height = canvas.offsetWidth * 2
      },
    })

    setTimeout(() => { canvas.style.opacity = "1" }, 0)

    return () => { globe.destroy() }
  }, [rs, config])

  return (
    <div
      className={cn(
        "relative w-full h-full",
        className
      )}
    >
      <canvas
        className={cn(
          "absolute inset-0 w-full h-full opacity-0 transition-opacity duration-500"
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX
          updatePointerInteraction(e.clientX)
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  )
}
