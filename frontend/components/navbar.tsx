"use client"

import { useState, useEffect } from "react"
import { Menu, X, HandHeart, ChevronRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Stories", href: "/stories" },
  { label: "Events", href: "/events" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/90 backdrop-blur-md shadow-sm py-3 border-b border-border/50" : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3 z-50 relative">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3 shadow-lg ${
              scrolled ? "bg-primary text-primary-foreground" : "bg-primary text-primary-foreground"
            }`}>
              <HandHeart className="h-6 w-6" />
            </div>
            <span className={`font-serif text-xl font-bold tracking-tight transition-colors duration-300 ${
              scrolled || mobileMenuOpen ? "text-foreground" : "text-primary-foreground"
            } group-hover:text-primary`}>
              The Fortunates
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (pathname !== "/" && link.href !== "/" && pathname?.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-bold tracking-wide transition-all duration-300 hover:text-primary ${
                    scrolled 
                      ? isActive ? "text-primary" : "text-foreground/70"
                      : isActive ? "text-primary-foreground" : "text-primary-foreground/80 hover:text-primary-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              href="/donate" 
              className="inline-flex h-11 items-center justify-center rounded-full bg-accent px-6 text-sm font-bold text-accent-foreground shadow-lg transition-all hover:bg-accent/90 hover:scale-105 hover:shadow-xl"
            >
              Donate Now
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`relative z-50 md:hidden p-2 -mr-2 transition-colors duration-300 ${
              scrolled || mobileMenuOpen ? "text-foreground" : "text-primary-foreground"
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-background/95 backdrop-blur-xl transition-all duration-500 ease-in-out md:hidden flex flex-col pt-24 pb-8 px-6 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-6 mt-8">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center justify-between border-b border-border/50 pb-4 text-2xl font-serif font-medium transition-all duration-500 ${
                mobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span className={pathname === link.href ? "text-primary" : "text-foreground"}>
                {link.label}
              </span>
              <ChevronRight className={`h-6 w-6 ${pathname === link.href ? "text-primary" : "text-muted-foreground/50"}`} />
            </Link>
          ))}
        </div>
        <div 
          className={`mt-auto transition-all duration-500 delay-300 flex flex-col gap-4 ${
            mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <Link 
            href="/contact" 
            className="flex h-14 w-full items-center justify-center rounded-xl border border-border bg-card text-lg font-bold text-foreground shadow-sm"
          >
            Contact Us
          </Link>
          <Link 
            href="/donate" 
            className="flex h-14 w-full items-center justify-center rounded-xl bg-accent text-lg font-bold text-accent-foreground shadow-xl"
          >
            Donate Now
          </Link>
        </div>
      </div>
    </>
  )
}
