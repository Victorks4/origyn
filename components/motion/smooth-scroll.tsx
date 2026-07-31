"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import Lenis from "lenis"
import "lenis/dist/lenis.css"
import { registerGsap, gsap, ScrollTrigger } from "@/lib/gsap/register"
import { LenisProvider } from "@/lib/lenis-context"

type SmoothScrollProps = {
  children: ReactNode
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null)
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    if (prefersReducedMotion) return

    registerGsap()

    const instance = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenisRef.current = instance
    setLenis(instance)

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length) {
          instance.scrollTo(value, { immediate: true })
        }
        return instance.scroll
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }
      },
    })

    instance.on("scroll", ScrollTrigger.update)

    ScrollTrigger.addEventListener("refresh", () => {
      instance.resize()
    })

    const ticker = (time: number) => {
      instance.raf(time * 1000)
    }

    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => {
      ScrollTrigger.scrollerProxy(document.documentElement, {})
      gsap.ticker.remove(ticker)
      instance.destroy()
      lenisRef.current = null
      setLenis(null)
    }
  }, [])

  return <LenisProvider lenis={lenis}>{children}</LenisProvider>
}
