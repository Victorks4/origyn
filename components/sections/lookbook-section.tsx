"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { registerGsap, gsap } from "@/lib/gsap/register"

const looks = [
  { label: "Inverno 26", image: "/placeholder.jpg" },
  { label: "Essencial", image: "/placeholder.jpg" },
  { label: "Noite", image: "/placeholder.jpg" },
]

export function LookbookSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      registerGsap()

      gsap.from(".lookbook-panel", {
        scrollTrigger: {
          trigger: ".lookbook-grid",
          start: "top 80%",
        },
        y: 48,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
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

        <div className="lookbook-grid mt-12 grid gap-4 lg:grid-cols-3 lg:gap-6">
          {looks.map((look, index) => (
            <article
              key={look.label}
              className={`lookbook-panel group relative overflow-hidden rounded-2xl bg-muted ${
                index === 0 ? "lg:row-span-1 lg:aspect-[3/4]" : "aspect-[4/5]"
              }`}
            >
              <img
                src={look.image}
                alt={look.label}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <span className="absolute bottom-5 left-5 text-sm font-medium uppercase tracking-widest text-white">
                {look.label}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
