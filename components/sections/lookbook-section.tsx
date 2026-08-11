"use client"

import { useEffect, useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import { registerGsap, gsap } from "@/lib/gsap/register"
import { cn } from "@/lib/utils"

const looks = [
  {
    label: "Inverno 26",
    subtitle: "Camadas e texturas",
    image: "/lookbook/inverno-26.jpg",
  },
  {
    label: "Essencial",
    subtitle: "O básico elevado",
    image: "/lookbook/essencial.jpg",
  },
  {
    label: "Noite",
    subtitle: "Elegância discreta",
    image: "/lookbook/noite.jpg",
  },
]

const CYCLE_MS = 4000

export function LookbookSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const pausedRef = useRef(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (prefersReducedMotion) return

    const intervalId = window.setInterval(() => {
      if (!pausedRef.current) {
        setActiveIndex((current) => (current + 1) % looks.length)
      }
    }, CYCLE_MS)

    return () => window.clearInterval(intervalId)
  }, [])

  useGSAP(
    () => {
      registerGsap()

      gsap.from(".lookbook-panel", {
        scrollTrigger: {
          trigger: ".lookbook-grid",
          start: "top 85%",
          once: true,
        },
        y: 40,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        clearProps: "transform",
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="lookbook"
      className="bg-background py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-xl">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Lookbook
          </p>
          <h2 className="mt-3 font-serif text-4xl font-semibold tracking-[-0.02em] text-foreground sm:text-5xl">
            Três visões, uma origem
          </h2>
        </div>

        <div
          className="lookbook-grid mt-12 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
          onMouseEnter={() => {
            pausedRef.current = true
          }}
          onMouseLeave={() => {
            pausedRef.current = false
          }}
        >
          {looks.map((look, index) => {
            const isActive = activeIndex === index

            return (
              <article
                key={look.label}
                className={cn(
                  "lookbook-panel relative w-full overflow-hidden rounded-2xl border bg-muted transition-all duration-700 ease-in-out will-change-transform",
                  isActive
                    ? "z-10 scale-[1.04] border-primary/40 shadow-[0_24px_48px_-20px_rgba(0,0,0,0.55)]"
                    : "z-0 scale-100 border-border"
                )}
                style={{ aspectRatio: "4 / 5" }}
              >
                <img
                  src={look.image}
                  alt={look.label}
                  className={cn(
                    "absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out",
                    isActive ? "scale-105" : "scale-100",
                    look.label === "Noite" && "brightness-110"
                  )}
                />
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent transition-opacity duration-700",
                    isActive ? "opacity-100" : "opacity-80"
                  )}
                />
                <div
                  className={cn(
                    "absolute inset-0 transition-colors duration-700",
                    isActive ? "bg-primary/10" : "bg-transparent"
                  )}
                />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div
                    className={cn(
                      "mb-3 h-px bg-primary transition-all duration-700",
                      isActive ? "w-10" : "w-0"
                    )}
                  />
                  <p className="text-sm font-medium uppercase tracking-widest text-white">
                    {look.label}
                  </p>
                  <p
                    className={cn(
                      "mt-1 text-sm text-white/70 transition-all duration-700",
                      isActive ? "opacity-100" : "opacity-0"
                    )}
                  >
                    {look.subtitle}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
