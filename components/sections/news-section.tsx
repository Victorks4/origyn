"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { registerGsap, gsap } from "@/lib/gsap/register"

export function NewsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      registerGsap()

      gsap.from(".news-image", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
        y: 32,
        duration: 1.2,
        ease: "power3.out",
        clearProps: "transform",
      })

      gsap.from(".news-content > *", {
        scrollTrigger: {
          trigger: ".news-content",
          start: "top 80%",
        },
        x: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="novidades"
      className="border-t border-border bg-card py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="news-image aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-muted">
            <img
              src="/editorial/novidades.jpg"
              alt="Nova coleção de inverno Origyn"
              className="h-full w-full object-cover object-center"
            />
          </div>

          <div className="news-content">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              Novidades
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold tracking-[-0.02em] text-foreground sm:text-5xl">
              A nova era da moda consciente
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Nossa coleção de inverno chega com tecidos naturais, cortes
              arquitetônicos e uma paleta inspirada nas origens. Criatividade e
              autenticidade em cada detalhe.
            </p>
            <a
              href="#loja"
              className="mt-8 inline-flex items-center justify-center rounded-full border border-foreground/25 px-7 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/10"
            >
              Explorar novidades
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
