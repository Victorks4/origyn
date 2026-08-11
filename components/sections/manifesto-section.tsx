"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { registerGsap, gsap } from "@/lib/gsap/register"

export function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      registerGsap()

      gsap.from(".manifesto-quote", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 40,
        opacity: 0,
        scale: 0.98,
        duration: 1,
        ease: "power3.out",
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="border-t border-border bg-card py-28 lg:py-36"
    >
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">
          Manifesto
        </p>
        <blockquote className="manifesto-quote mt-6 font-serif text-3xl font-semibold leading-[1.15] tracking-[-0.02em] text-foreground sm:text-4xl lg:text-5xl">
          &ldquo;Roupas não são tendência. São extensão de quem você é.&rdquo;
        </blockquote>
        <p className="mt-8 text-lg text-muted-foreground">
          Na Origyn, cada coleção nasce de uma narrativa, não de um algoritmo.
        </p>
      </div>
    </section>
  )
}
