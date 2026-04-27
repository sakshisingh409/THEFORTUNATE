"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const menuItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Impact", href: "/impact" },
  { label: "Programs", href: "/programs" },
  { label: "Stories", href: "/stories" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
  { label: "Volunteer", href: "/volunteer" },
  { label: "Donate Now", href: "/donate" },
]

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [itemsVisible, setItemsVisible] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      const timer = setTimeout(() => setItemsVisible(true), 50)
      return () => clearTimeout(timer)
    } else {
      setItemsVisible(false)
    }
  }, [menuOpen])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        const button = event.target as Element
        if (!button.closest('button[aria-label*="menu"]')) {
          closeMenu()
        }
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [menuOpen])

  const closeMenu = useCallback(() => {
    setItemsVisible(false)
    setTimeout(() => setMenuOpen(false), 200)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-foreground/70 backdrop-blur-lg shadow-lg"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
          {/* Logo and Brand */}
          <Link href="/" className="relative z-50 flex items-center gap-2 group">
            <div className="relative h-8 w-8 sm:h-10 sm:w-10 overflow-hidden transition-transform duration-300 group-hover:scale-110 flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="The Fortunates logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className={`font-serif text-sm sm:text-xl font-bold transition-colors duration-300 hidden sm:inline`}>
              The Fortunates
            </span>
          </Link>

          {/* Hamburger Menu Button */}
          <button
            type="button"
            className="relative z-50 flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300 hover:bg-primary-foreground/10"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <div className="relative h-5 w-6">
              <span
                className={`absolute left-0 h-0.5 w-6 bg-primary-foreground transition-all duration-300 ease-in-out ${
                  menuOpen ? "top-2.5 rotate-45" : "top-0 rotate-0"
                }`}
              />
              <span
                className={`absolute left-0 top-2.5 h-0.5 w-6 bg-primary-foreground transition-all duration-300 ease-in-out ${
                  menuOpen ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 w-6 bg-primary-foreground transition-all duration-300 ease-in-out ${
                  menuOpen ? "top-2.5 -rotate-45" : "top-5 rotate-0"
                }`}
              />
            </div>
          </button>
        </nav>
      </header>

      {/* Compact Dropdown Menu */}
      <div
        ref={menuRef}
        className={`fixed top-16 right-4 z-40 w-72 rounded-lg shadow-2xl transition-all duration-200 ease-out origin-top-right ${
          menuOpen
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(12px)",
        }}
      >
        <nav className="flex flex-col py-2">
          {menuItems.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className={`px-4 py-3 text-sm font-medium transition-all duration-200 border-b border-foreground/5 last:border-b-0 hover:bg-primary/5 ${
                itemsVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-4 opacity-0"
              } ${
                item.label === "Donate Now"
                  ? "text-accent font-semibold hover:bg-accent/10"
                  : "text-foreground hover:text-primary"
              }`}
              style={{
                transitionDelay: itemsVisible ? `${i * 40}ms` : "0ms",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Backdrop for menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-30 bg-transparent"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </>
  )
}
