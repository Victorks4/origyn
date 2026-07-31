import Link from "next/link"

const footerLinks = [
  { label: "Coleção", href: "#colecao" },
  { label: "Lookbook", href: "#lookbook" },
  { label: "Novidades", href: "#novidades" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background py-12 lg:py-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 lg:flex-row lg:items-end lg:justify-between lg:px-10">
        <div>
          <Link
            href="/"
            className="font-serif text-2xl font-semibold tracking-tight text-foreground"
          >
            Origyn
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Moda autêntica para quem valoriza origem, qualidade e design
            atemporal.
          </p>
        </div>

        <nav aria-label="Links do rodapé">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex gap-4 text-sm text-muted-foreground">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            Instagram
          </a>
          <a
            href="https://pinterest.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            Pinterest
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-border px-6 pt-6 lg:px-10">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Origyn. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
