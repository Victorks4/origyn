"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { registerGsap, gsap } from "@/lib/gsap/register"

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      registerGsap()

      gsap.from(".about-reveal", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        clipPath: "inset(0 100% 0 0)",
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.inOut",
      })

      gsap.from(".about-image", {
        scrollTrigger: {
          trigger: ".about-image",
          start: "top 80%",
        },
        scale: 1.1,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="sobre"
      className="border-t border-border bg-background py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="about-reveal text-sm font-medium uppercase tracking-widest text-primary">
              Sobre
            </p>
            <h2 className="about-reveal mt-3 font-serif text-4xl font-semibold tracking-[-0.02em] text-foreground sm:text-5xl">
              Moda com propósito e identidade
            </h2>
            <p className="about-reveal mt-4 text-lg leading-relaxed text-muted-foreground">
              A Origyn nasceu da crença de que roupas podem ser mais do que
              tendências: podem ser extensão de quem somos. Criamos peças
              femininas e unissex para quem valoriza autenticidade, qualidade e
              design atemporal.
            </p>
            <p className="about-reveal mt-4 text-lg leading-relaxed text-muted-foreground">
              Cada coleção é uma narrativa visual, pensada para inspirar
              confiança e expressar individualidade sem excessos.
            </p>
          </div>

          <div className="about-image group relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-muted lg:aspect-square">
            <img
              src="/about/atelier.jpg"
              alt="Editorial Origyn, moda feminina atemporal"
              className="h-full w-full object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
