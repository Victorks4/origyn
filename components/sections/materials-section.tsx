"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { registerGsap, gsap } from "@/lib/gsap/register"

const materials = [
  {
    name: "Algodão orgânico",
    description: "Fibra cultivada sem agrotóxicos, toque macio e durável.",
    image: "/materials/algodao.jpg",
  },
  {
    name: "Lã merino",
    description: "Termorregulação natural para peças de inverno elegantes.",
    image: "/materials/la.jpg",
  },
  {
    name: "Linho europeu",
    description: "Respirável e atemporal, perfeito para o clima brasileiro.",
    image: "/materials/linho.jpg",
  },
  {
    name: "Couro vegetal",
    description: "Alternativa sustentável com acabamento premium.",
    image: "/materials/couro-vegetal.jpg",
  },
]

export function MaterialsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      registerGsap()

      gsap.from(".material-card", {
        scrollTrigger: {
          trigger: ".materials-grid",
          start: "top 80%",
        },
        y: 32,
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
      id="materiais"
      className="border-t border-border bg-card py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-xl">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Materiais
          </p>
          <h2 className="mt-3 font-serif text-4xl font-semibold tracking-[-0.02em] text-foreground sm:text-5xl">
            Origem consciente em cada fibra
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Selecionamos tecidos que respeitam o planeta sem abrir mão da
            sofisticação.
          </p>
        </div>

        <div className="materials-grid mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {materials.map((material) => (
            <article
              key={material.name}
              className="material-card overflow-hidden rounded-2xl border border-border bg-background transition-colors hover:border-foreground/20"
            >
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={material.image}
                  alt={material.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-medium text-foreground">{material.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {material.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
