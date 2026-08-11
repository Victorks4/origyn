"use client"

import { useRef } from "react"
import { Check } from "lucide-react"
import { useGSAP } from "@gsap/react"
import { registerGsap, gsap, ScrollTrigger } from "@/lib/gsap/register"
import { waitForLoaderComplete } from "@/lib/loader-events"

const stats = [
  { title: "Feito para durar", subtitle: "Peças atemporais" },
  { title: "Origem consciente", subtitle: "Materiais selecionados" },
  { title: "Entrega no Brasil", subtitle: "Frete grátis acima de R$299" },
]

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoWrapRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      registerGsap()

      const videoWrap = videoWrapRef.current
      if (!videoWrap) return

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches

      if (prefersReducedMotion) {
        gsap.set(
          ".hero-badge, .hero-headline, .hero-desc, .hero-cta, .hero-stat",
          { autoAlpha: 1, y: 0, scale: 1 }
        )
        return
      }

      const startHeroMotion = () => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
          onUpdate: (self) => {
            gsap.set(videoWrap, {
              scale: 1 + self.progress * 0.06,
              y: self.progress * 30,
            })
          },
        })

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

        tl.from(".hero-badge", { y: 24, autoAlpha: 0, duration: 0.7, delay: 0.2 })
          .from(
            ".hero-headline",
            { y: 32, autoAlpha: 0, duration: 0.9 },
            "-=0.4"
          )
          .from(".hero-desc", { y: 20, autoAlpha: 0, duration: 0.7 }, "-=0.5")
          .from(
            ".hero-cta",
            { y: 16, autoAlpha: 0, scale: 0.95, duration: 0.6, stagger: 0.1 },
            "-=0.4"
          )
          .from(
            ".hero-stat",
            { y: 20, autoAlpha: 0, duration: 0.6, stagger: 0.1 },
            "-=0.3"
          )
      }

      return waitForLoaderComplete(startHeroMotion)
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] overflow-hidden"
    >
      <div
        ref={videoWrapRef}
        className="absolute inset-0 will-change-transform"
      >
        <video
          className="h-full w-full scale-[1.08] object-cover object-[center_42%]"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero-poster.webp"
          aria-hidden="true"
        >
          <source src="/hero.webm" type='video/webm; codecs="av01.0.08M.08"' />
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-background/80 via-transparent to-background/20"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-background/40 via-transparent to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_bottom_right,rgba(20,18,16,0.95)_0%,rgba(20,18,16,0.55)_38%,transparent_68%)]"
      />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-7xl flex-col px-6 lg:px-12 xl:px-16">
        <div className="flex flex-1 flex-col justify-center pb-8 pt-28">
          <div className="max-w-2xl">
            <span className="hero-badge inline-flex items-center gap-2 text-sm font-medium text-white/90">
              <Check className="size-4 text-primary" strokeWidth={2.5} />
              Nova coleção disponível
            </span>

            <h1 className="hero-headline mt-4 font-serif text-5xl font-semibold leading-[1.0] tracking-[-0.02em] text-white sm:text-6xl lg:text-[4.5rem]">
              Seu estilo,
              <br />
              sua origem
            </h1>

            <p className="hero-desc mt-5 max-w-md text-pretty text-lg leading-relaxed text-white/75">
              A Origyn traduz quem você é em peças femininas e unissex que
              atravessam o tempo. Descubra roupas autênticas, pensadas para
              acompanhar a sua história.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#loja"
                className="hero-cta inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-medium text-zinc-900 transition-opacity hover:opacity-90"
              >
                Comprar agora
              </a>
              <a
                href="#colecao"
                className="hero-cta inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                Ver a coleção
              </a>
            </div>
          </div>
        </div>

        <dl className="hero-stats grid grid-cols-1 gap-6 border-t border-white/15 pt-6 pb-8 sm:grid-cols-3 lg:pb-10">
          {stats.map((item, index) => (
            <div
              key={item.title}
              className={`hero-stat ${index > 0 ? "sm:border-l sm:border-white/15 sm:pl-8" : ""}`}
            >
              <dt className="text-sm font-semibold text-white">
                {item.title}
              </dt>
              <dd className="mt-1 text-sm text-white/50">{item.subtitle}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
