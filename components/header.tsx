"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"

const navItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Problema", href: "#problema" },
  { label: "Solucion", href: "#solucion" },
  { label: "Beneficios", href: "#beneficios" },
  { label: "Proceso", href: "#proceso" },
  { label: "Casos", href: "#casos" },
  { label: "FAQ", href: "#faq" },
] as const

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  const handleNavigate = () => {
    setIsMenuOpen(false)
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-border/60 shadow-sm"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="#inicio" className="flex items-center gap-2" onClick={handleNavigate}>
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
            <img src="/briax-logo.png" alt="BrIAx" className="h-15 w-auto" />
          </motion.div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="hidden sm:inline-flex rounded-full bg-primary/90 px-5 text-sm font-medium hover:bg-primary"
            asChild
          >
            <a href="https://calendly.com/brian-niwoyda/30min" target="_blank" rel="noopener noreferrer">
              Agendar demo
            </a>
          </Button>

          <Button
            size="icon"
            variant="ghost"
            className="md:hidden"
            aria-label="Abrir menu"
            onClick={handleToggleMenu}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-sm">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleNavigate}
                  className="rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
                >
                  {item.label}
                </a>
              ))}
              <Button
                className="rounded-full bg-primary/90 py-2 text-sm font-medium hover:bg-primary"
                asChild
              >
                <a href="https://calendly.com/brian-niwoyda/30min" target="_blank" rel="noopener noreferrer">
                  Agendar demo
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
