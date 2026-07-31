"use client"

import { useEffect, useState } from "react"

export function useScrollProgress(maxDistance = 400) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    if (prefersReducedMotion) return

    const onScroll = () => {
      setProgress(Math.min(window.scrollY / maxDistance, 1))
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [maxDistance])

  return progress
}
