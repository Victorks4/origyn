"use client"

import Link from "next/link"
import { X } from "lucide-react"
import { OrigynLogo } from "@/components/origyn-logo"

const navLinks = [
  { label: "Coleção", href: "#colecao" },
  { label: "Novidades", href: "#novidades" },
  { label: "Sobre", href: "#sobre" },
]

const exploreLinks = [
  { label: "Loja", href: "#loja" },
  { label: "Lookbook", href: "#lookbook" },
  { label: "Manifesto", href: "#manifesto" },
  { label: "Materiais", href: "#materiais" },
  { label: "Editorial", href: "#novidades" },
  { label: "Nossa história", href: "#sobre" },
]

type MobileMenuProps = {
  open: boolean
  onClose: () => void
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  if (!open) return null

  return (
    <div
      id="mobile-menu"
      className="fixed inset-0 z-[60]"
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navegação"
    >
      <button
        type="button"
        aria-label="Fechar menu"
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="absolute right-4 top-20 w-[calc(100%-2rem)] max-w-sm rounded-2xl border border-white/10 bg-zinc-900/95 p-6 shadow-2xl backdrop-blur-xl md:right-6 md:max-w-md">
        <div className="mb-6 flex items-center justify-between">
          <OrigynLogo className="text-foreground" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar menu"
            className="flex size-9 items-center justify-center rounded-full bg-foreground/10 transition-colors hover:bg-foreground/20"
          >
            <X className="size-5 text-foreground" />
          </button>
        </div>

        <nav aria-label="Menu principal">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Navegar
          </p>
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block rounded-xl px-4 py-3 text-base font-medium text-foreground/90 transition-colors hover:bg-foreground/10 hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Explorar" className="mt-6">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Explorar
          </p>
          <ul className="flex flex-col gap-1">
            {exploreLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block rounded-xl px-4 py-3 text-sm text-foreground/70 transition-colors hover:bg-foreground/10 hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="#login"
                onClick={onClose}
                className="block rounded-xl px-4 py-3 text-sm text-foreground/70 transition-colors hover:bg-foreground/10 hover:text-foreground"
              >
                Entrar
              </Link>
            </li>
          </ul>
        </nav>

        <Link
          href="#loja"
          onClick={onClose}
          className="mt-6 flex w-full items-center justify-center rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          Comprar
        </Link>
      </div>
    </div>
  )
}
