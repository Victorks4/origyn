"use client"

import { useEffect, useRef, useState } from "react"
import { gsap, registerGsap } from "@/lib/gsap/register"
import { markLoaderComplete } from "@/lib/loader-events"

const PHRASES = [
  "Vestindo histórias, não tendências.",
  "O essencial nunca sai de moda.",
  "Cada peça conta uma origem.",
  "Estilo é o que resta quando a moda passa.",
  "Tecendo identidade, fio a fio.",
  "A elegância começa no detalhe.",
  "Sua origem, seu estilo.",
]

const LOAD_DURATION = 2000
const PHRASE_INTERVAL = 2000

export function PageLoader() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const phraseRef = useRef<HTMLParagraphElement>(null)
  const percentRef = useRef<HTMLSpanElement>(null)
  const [visible, setVisible] = useState(true)
  const phraseIndexRef = useRef(0)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    if (prefersReducedMotion) {
      markLoaderComplete()
      setVisible(false)
      return
    }

    registerGsap()

    const overlay = overlayRef.current
    const bar = barRef.current
    const phrase = phraseRef.current
    const percent = percentRef.current
    if (!overlay || !bar || !phrase || !percent) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    let phraseTimer: ReturnType<typeof setInterval> | null = null
    let rafId = 0
    let disposed = false

    const setPhrase = (index: number) => {
      phrase.textContent = PHRASES[index]
      gsap.fromTo(
        phrase,
        { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }
      )
    }

    const cyclePhrase = () => {
      gsap.to(phrase, {
        autoAlpha: 0,
        y: -8,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          phraseIndexRef.current =
            (phraseIndexRef.current + 1) % PHRASES.length
          setPhrase(phraseIndexRef.current)
        },
      })
    }

    const startTime = Date.now()

    const updateProgress = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min((elapsed / LOAD_DURATION) * 100, 100)

      gsap.set(bar, { scaleX: progress / 100, transformOrigin: "left center" })
      percent.textContent = `${Math.round(progress)}%`

      if (!disposed && progress < 100) {
        rafId = requestAnimationFrame(updateProgress)
      }
    }

    const finish = () => {
      if (disposed) return
      disposed = true

      if (phraseTimer) clearInterval(phraseTimer)
      cancelAnimationFrame(rafId)

      gsap.set(bar, { scaleX: 1 })
      percent.textContent = "100%"

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = previousOverflow
          markLoaderComplete()
          setVisible(false)
        },
      })

      tl.to([phrase, percent], {
        autoAlpha: 0,
        y: -12,
        duration: 0.35,
        stagger: 0.05,
        ease: "power2.in",
      })
        .to(
          bar.parentElement,
          { autoAlpha: 0, duration: 0.3, ease: "power2.in" },
          "-=0.2"
        )
        .to(
          overlay,
          {
            yPercent: -100,
            duration: 0.95,
            ease: "power3.inOut",
          },
          "-=0.05"
        )
    }

    setPhrase(0)
    gsap.set(bar, { scaleX: 0, transformOrigin: "left center" })
    rafId = requestAnimationFrame(updateProgress)
    phraseTimer = setInterval(cyclePhrase, PHRASE_INTERVAL)

    const durationTimeout = setTimeout(finish, LOAD_DURATION)

    return () => {
      disposed = true
      if (phraseTimer) clearInterval(phraseTimer)
      clearTimeout(durationTimeout)
      cancelAnimationFrame(rafId)
      document.body.style.overflow = previousOverflow
    }
  }, [])

  if (!visible) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex flex-col bg-[oklch(0.14_0.008_60)] will-change-transform"
      aria-hidden="true"
    >
      <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
        <p className="font-serif text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Origyn
        </p>
        <p
          ref={phraseRef}
          className="mt-5 max-w-sm text-sm leading-relaxed text-white/55 sm:text-base"
        >
          {PHRASES[0]}
        </p>
      </div>

      <div className="px-8 pb-12 sm:px-12">
        <div className="mx-auto w-full max-w-md">
          <div className="h-px overflow-hidden rounded-full bg-white/10">
            <div
              ref={barRef}
              className="h-full w-full rounded-full bg-primary"
            />
          </div>
          <span
            ref={percentRef}
            className="mt-3 block text-center text-xs tabular-nums tracking-[0.2em] text-white/35"
          >
            0%
          </span>
        </div>
      </div>
    </div>
  )
}
