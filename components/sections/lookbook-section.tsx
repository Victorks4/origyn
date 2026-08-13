"use client"

import { useCallback, useEffect, useRef, useState } from "react"
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

type LookbookCardProps = {
  look: (typeof looks)[number]
  isActive: boolean
}

function LookbookCard({ look, isActive }: LookbookCardProps) {
  return (
    <article
      className={cn(
        "lookbook-panel relative shrink-0 snap-center overflow-hidden rounded-2xl border bg-muted transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform",
        isActive
          ? "z-10 w-[min(90vw,340px)] -translate-y-4 scale-100 border-primary/50 opacity-100 shadow-[0_28px_56px_-16px_rgba(0,0,0,0.75)] sm:w-[min(82vw,360px)]"
          : "z-0 w-[min(70vw,270px)] translate-y-3 scale-[0.9] border-border/30 opacity-45 sm:w-[min(62vw,300px)]",
        "lg:w-full lg:translate-y-0 lg:opacity-100 lg:snap-align-none",
        isActive
          ? "lg:z-10 lg:scale-[1.04] lg:border-primary/40 lg:shadow-[0_24px_48px_-20px_rgba(0,0,0,0.55)]"
          : "lg:z-0 lg:scale-100 lg:border-border"
      )}
      style={{ aspectRatio: "4 / 5" }}
    >
      <img
        src={look.image}
        alt={look.label}
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out",
          isActive ? "scale-110 lg:scale-105" : "scale-100",
          look.label === "Noite" && "brightness-110"
        )}
      />
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent transition-opacity duration-700",
          isActive ? "opacity-100" : "opacity-90 lg:opacity-80"
        )}
      />
      <div
        className={cn(
          "absolute inset-0 transition-colors duration-700",
          isActive ? "bg-primary/15 lg:bg-primary/10" : "bg-black/20 lg:bg-transparent"
        )}
      />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <div
          className={cn(
            "mb-3 h-px bg-primary transition-all duration-700",
            isActive ? "w-12 lg:w-10" : "w-0"
          )}
        />
        <p
          className={cn(
            "text-sm font-medium uppercase tracking-widest transition-all duration-700",
            isActive ? "text-white" : "text-white/60 lg:text-white"
          )}
        >
          {look.label}
        </p>
        <p
          className={cn(
            "mt-1 text-sm transition-all duration-700",
            isActive
              ? "translate-y-0 opacity-100 text-white/80"
              : "translate-y-2 opacity-0 text-white/70"
          )}
        >
          {look.subtitle}
        </p>
      </div>
    </article>
  )
}

export function LookbookSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const pausedRef = useRef(false)
  const isScrollingRef = useRef(false)
  const indexSourceRef = useRef<"auto" | "user">("auto")

  const scrollToIndex = useCallback((index: number, behavior: ScrollBehavior = "smooth") => {
    const track = trackRef.current
    if (!track) return

    const card = track.children[index] as HTMLElement | undefined
    if (!card) return

    const left = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2
    isScrollingRef.current = true
    track.scrollTo({ left: Math.max(0, left), behavior })

    window.setTimeout(() => {
      isScrollingRef.current = false
    }, behavior === "smooth" ? 500 : 0)
  }, [])

  const updateActiveFromScroll = useCallback(() => {
    const track = trackRef.current
    if (!track || isScrollingRef.current) return
    if (window.matchMedia("(min-width: 1024px)").matches) return

    const center = track.scrollLeft + track.clientWidth / 2
    const cards = Array.from(track.children) as HTMLElement[]

    const index = cards.findIndex((card) => {
      const left = card.offsetLeft
      const right = left + card.offsetWidth
      return center >= left && center < right
    })

    if (index >= 0 && index !== activeIndex) {
      indexSourceRef.current = "user"
      setActiveIndex(index)
    }
  }, [activeIndex])

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

  useEffect(() => {
    if (window.matchMedia("(min-width: 1024px)").matches) return
    if (indexSourceRef.current === "user") {
      indexSourceRef.current = "auto"
      return
    }
    scrollToIndex(activeIndex)
  }, [activeIndex, scrollToIndex])

  useGSAP(
    () => {
      registerGsap()

      gsap.from(".lookbook-panel", {
        scrollTrigger: {
          trigger: ".lookbook-track",
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
          ref={trackRef}
          className="lookbook-track -mx-3 mt-12 flex items-center gap-3 overflow-x-auto scroll-smooth px-3 py-6 [-ms-overflow-style:none] [scrollbar-width:none] sm:-mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden lg:mx-0 lg:grid lg:grid-cols-3 lg:items-stretch lg:gap-6 lg:overflow-visible lg:px-0 lg:py-0"
          style={{ scrollSnapType: "x mandatory" }}
          onMouseEnter={() => {
            pausedRef.current = true
          }}
          onMouseLeave={() => {
            pausedRef.current = false
          }}
          onTouchStart={() => {
            pausedRef.current = true
          }}
          onTouchEnd={() => {
            window.setTimeout(() => {
              pausedRef.current = false
            }, 3000)
          }}
          onScroll={updateActiveFromScroll}
        >
          {looks.map((look, index) => (
            <LookbookCard
              key={look.label}
              look={look}
              isActive={activeIndex === index}
            />
          ))}
        </div>

        <div className="mt-6 flex justify-center gap-2 lg:hidden">
          {looks.map((look, index) => (
            <button
              key={look.label}
              type="button"
              aria-label={`Ver look ${look.label}`}
              aria-current={activeIndex === index ? "true" : undefined}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                activeIndex === index
                  ? "w-6 bg-primary"
                  : "w-1.5 bg-foreground/25"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
