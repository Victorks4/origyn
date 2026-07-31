"use client"

import { Suspense, useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { ThreadScene } from "@/components/three/thread-scene"

type ThreadCanvasProps = {
  scrollProgress?: number
}

export function ThreadCanvas({ scrollProgress = 0 }: ThreadCanvasProps) {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    const isMobile = window.matchMedia("(max-width: 768px)").matches
    setEnabled(!prefersReducedMotion && !isMobile)
  }, [])

  if (!enabled) return null

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[5]"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 4, 4]} intensity={1.2} />
        <Suspense fallback={null}>
          <ThreadScene scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  )
}
