"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useGSAP } from "@gsap/react"
import { registerGsap, gsap } from "@/lib/gsap/register"
import { products } from "@/lib/products"

const AUTOPLAY_INTERVAL_MS = 2000

export function CollectionCarousel() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  const scroll = useCallback((direction: "left" | "right") => {
    const track = trackRef.current
    if (!track) return

    const cardWidth = track.querySelector("article")?.clientWidth ?? 300
    const step = cardWidth + 24
    const max = track.scrollWidth - track.clientWidth

    if (direction === "right" && track.scrollLeft >= max - 2) {
      track.scrollTo({ left: 0, behavior: "smooth" })
      return
    }

    if (direction === "left" && track.scrollLeft <= 2) {
      track.scrollTo({ left: max, behavior: "smooth" })
      return
    }

    track.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    })
  }, [])

  const updateProgress = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const max = track.scrollWidth - track.clientWidth
    setProgress(max > 0 ? track.scrollLeft / max : 0)
  }, [])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (prefersReducedMotion) return

    const track = trackRef.current
    if (!track) return

    let paused = false
    const pause = () => {
      paused = true
    }
    const resume = () => {
      paused = false
    }

    track.addEventListener("mouseenter", pause)
    track.addEventListener("mouseleave", resume)
    track.addEventListener("focusin", pause)
    track.addEventListener("focusout", resume)

    const intervalId = window.setInterval(() => {
      if (!paused) scroll("right")
    }, AUTOPLAY_INTERVAL_MS)

    return () => {
      window.clearInterval(intervalId)
      track.removeEventListener("mouseenter", pause)
      track.removeEventListener("mouseleave", resume)
      track.removeEventListener("focusin", pause)
      track.removeEventListener("focusout", resume)
    }
  }, [scroll])

  useGSAP(
    () => {
      registerGsap()

      gsap.from(".collection-header > *", {
        scrollTrigger: {
          trigger: ".collection-header",
          start: "top 85%",
        },
        y: 32,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      })

      gsap.from(".collection-card", {
        scrollTrigger: {
          trigger: ".collection-track",
          start: "top 80%",
        },
        y: 48,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="colecao"
      className="bg-background py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="collection-header flex items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              Coleção
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold tracking-[-0.02em] text-foreground sm:text-5xl">
              Peças que contam histórias
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Cada peça é pensada para expressar autenticidade, do corte ao
              acabamento, sem comprometer elegância.
            </p>
          </div>

          <div className="hidden shrink-0 gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Anterior"
              className="flex size-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-foreground/10"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Próximo"
              className="flex size-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-foreground/10"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          onScroll={updateProgress}
          className="collection-track mt-10 flex gap-6 overflow-x-auto scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {products.map((product) => (
            <article
              key={product.name}
              className="collection-card group w-[280px] shrink-0 snap-start overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-foreground/20 sm:w-[320px]"
            >
              <div className="aspect-[3/4] overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {product.category}
                </p>
                <h3 className="mt-1 font-medium text-foreground">
                  {product.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {product.price}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 h-px w-full bg-border">
          <div
            className="h-px bg-primary transition-all duration-300"
            style={{ width: `${Math.max(progress * 100, 8)}%` }}
          />
        </div>
      </div>
    </section>
  )
}
