"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { LayoutGrid } from "lucide-react"
import { gsap, registerGsap } from "@/lib/gsap/register"
import { useLenis } from "@/lib/lenis-context"
import { MobileMenu } from "@/components/mobile-menu"
import { OrigynLogo } from "@/components/origyn-logo"

const navLinks = [
  { label: "Coleção", href: "#colecao" },
  { label: "Novidades", href: "#novidades" },
  { label: "Sobre", href: "#sobre" },
]

const MORPH_DISTANCE = 160

function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t
}

export function SiteHeader() {
  const lenis = useLenis()
  const lenisRef = useRef(lenis)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLButtonElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  lenisRef.current = lenis

  const setNavMorph = useCallback((p: number) => {
    const wrapper = wrapperRef.current
    const nav = navRef.current
    const grid = gridRef.current
    if (!wrapper || !nav || !grid) return

    const expandedWidth = Math.min(window.innerWidth - 80, 1280)
    const compactWidth = Math.min(720, expandedWidth - 120)

    const width = lerp(expandedWidth, compactWidth, p)
    const paddingX = lerp(28, 18, p)
    const bgAlpha = lerp(0, 0.9, p)
    const blur = lerp(0, 20, p)
    const borderAlpha = lerp(0, 0.12, p)
    const radius = lerp(8, 9999, p)
    const scale = lerp(1, 0.98, p)
    const shadowAlpha = lerp(0, 0.3, p)
    const topPad = lerp(20, 14, p)

    gsap.set(wrapper, { paddingTop: topPad })

    const navBackdrop = blur > 0 ? `blur(${blur}px)` : "none"
    const gridBackdrop = blur > 0 ? `blur(${blur}px)` : "blur(6px)"

    gsap.set(nav, {
      width,
      flex: "0 0 auto",
      paddingLeft: paddingX,
      paddingRight: paddingX,
      paddingTop: 12,
      paddingBottom: 12,
      scale,
      borderRadius: radius,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: `rgba(255,255,255,${borderAlpha})`,
      backgroundColor:
        bgAlpha > 0.02
          ? `oklch(0.18 0.01 60 / ${bgAlpha})`
          : "transparent",
      backdropFilter: navBackdrop,
      boxShadow:
        shadowAlpha > 0.02
          ? `0 12px 40px rgba(0,0,0,${shadowAlpha})`
          : "none",
    })
    nav.style.webkitBackdropFilter = navBackdrop

    gsap.set(grid, {
      scale,
      borderRadius: 9999,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: `rgba(255,255,255,${lerp(0.12, 0.1, p)})`,
      backgroundColor:
        bgAlpha > 0.02
          ? `oklch(0.18 0.01 60 / ${bgAlpha})`
          : "rgba(255,255,255,0.06)",
      backdropFilter: gridBackdrop,
      boxShadow:
        shadowAlpha > 0.02
          ? `0 12px 40px rgba(0,0,0,${shadowAlpha})`
          : "none",
    })
    grid.style.webkitBackdropFilter = gridBackdrop
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  useEffect(() => {
    registerGsap()

    const getProgress = (scroll: number) =>
      Math.min(Math.max(scroll / MORPH_DISTANCE, 0), 1)

    const updateMorph = () => {
      const scroll = lenisRef.current?.scroll ?? window.scrollY
      setNavMorph(getProgress(scroll))
    }

    gsap.ticker.add(updateMorph)
    updateMorph()

    window.addEventListener("resize", updateMorph)

    return () => {
      gsap.ticker.remove(updateMorph)
      window.removeEventListener("resize", updateMorph)
    }
  }, [setNavMorph])

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div
          ref={wrapperRef}
          className="mx-auto flex w-full max-w-[calc(100%-1.5rem)] items-center justify-center gap-3 px-3 sm:max-w-[calc(100%-2rem)] sm:px-4"
        >
          <nav
            ref={navRef}
            aria-label="Navegação principal"
            className="pointer-events-auto flex min-w-0 shrink-0 items-center justify-between gap-4 will-change-[width,transform,background-color]"
          >
            <ul className="hidden items-center gap-6 md:flex md:flex-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="nav-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/"
              className="text-white md:flex-1 md:flex md:justify-center"
            >
              <OrigynLogo />
            </Link>

            <div className="flex items-center justify-end gap-3 md:flex-1">
              <Link href="#login" className="nav-link hidden sm:inline">
                Entrar
              </Link>
              <Link
                href="#loja"
                className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 transition-opacity hover:opacity-90"
              >
                Comprar
              </Link>
            </div>
          </nav>

          <button
            ref={gridRef}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label="Abrir menu"
            className="pointer-events-auto flex size-11 shrink-0 items-center justify-center will-change-transform"
          >
            <LayoutGrid className="size-5 text-white" />
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
