import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { CollectionCarousel } from "@/components/sections/collection-carousel"
import { ManifestoSection } from "@/components/sections/manifesto-section"
import { LookbookSection } from "@/components/sections/lookbook-section"
import { NewsSection } from "@/components/sections/news-section"
import { MaterialsSection } from "@/components/sections/materials-section"
import { AboutSection } from "@/components/sections/about-section"
import { NewsletterSection } from "@/components/sections/newsletter-section"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <main className="relative">
      <a
        href="#colecao"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
      >
        Pular para o conteúdo
      </a>
      <SiteHeader />
      <Hero />
      <CollectionCarousel />
      <ManifestoSection />
      <LookbookSection />
      <NewsSection />
      <MaterialsSection />
      <AboutSection />
      <NewsletterSection />
      <SiteFooter />
    </main>
  )
}
