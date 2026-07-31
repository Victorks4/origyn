"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { registerGsap, gsap } from "@/lib/gsap/register"

export function NewsletterSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      registerGsap()

      gsap.from(".newsletter-content > *", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="contato"
      className="relative overflow-hidden border-t border-border py-24 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background"
      />

      <div className="newsletter-content relative mx-auto max-w-2xl px-6 text-center lg:px-10">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">
          Newsletter
        </p>
        <h2 className="mt-3 font-serif text-4xl font-semibold tracking-[-0.02em] text-foreground sm:text-5xl">
          Receba lançamentos antes de todos
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Entre para a lista Origyn e seja o primeiro a conhecer novas coleções
          e edições limitadas.
        </p>

        <form
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="seu@email.com"
            aria-label="E-mail"
            className="rounded-full border border-border bg-background/80 px-5 py-3.5 text-sm text-foreground backdrop-blur-sm placeholder:text-muted-foreground focus:border-foreground/30 focus:outline-none sm:min-w-[280px]"
          />
          <button
            type="submit"
            className="rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Inscrever-se
          </button>
        </form>
      </div>
    </section>
  )
}
