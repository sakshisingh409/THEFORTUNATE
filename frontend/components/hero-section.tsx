"use client"

import { useEffect, useState } from "react"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[2500ms] ease-out"
        style={{
          backgroundImage: "url('/images/hero.jpg')",
          transform: visible ? "scale(1)" : "scale(1.15)",
        }}
      />
      <div className="absolute inset-0 bg-foreground/60" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 text-center">
        <p
          className={`mb-4 text-xs sm:text-sm font-medium uppercase tracking-[0.25em] text-primary-foreground/80 transition-all duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          Together, we can make a difference
        </p>
        <h1
          className={`font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-primary-foreground transition-all duration-900 delay-200 ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          <span className="text-balance">Breaking the cycle of poverty, one life at a time.</span>
        </h1>
        <p
          className={`mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-primary-foreground/90 transition-all duration-700 delay-[400ms] px-2 ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          The Fortunates empowers communities through education, healthcare, and sustainable development to create lasting change for future generations.
        </p>
        <div
          className={`mt-8 sm:mt-10 flex flex-col items-center justify-center gap-3 sm:gap-4 sm:flex-row transition-all duration-700 delay-[600ms] ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          <Button size="lg" className="w-full sm:w-auto sm:min-w-[160px] text-sm sm:text-base transition-transform duration-300 hover:scale-105" asChild>
            <Link href="/donate">Donate Now</Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto sm:min-w-[160px] border-primary-foreground/30 bg-transparent text-sm sm:text-base text-primary-foreground transition-all duration-300 hover:scale-105 hover:bg-primary-foreground/10 hover:text-primary-foreground"
            asChild
          >
            <Link href="/volunteer">Join as Volunteer</Link>
          </Button>
        </div>
      </div>

      <a
        href="#about"
        className={`absolute bottom-10 left-1/2 z-10 -translate-x-1/2 transition-all duration-700 delay-[800ms] ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        aria-label="Scroll down"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/30 text-primary-foreground/70 transition-all duration-300 hover:border-primary-foreground hover:text-primary-foreground hover:scale-110 animate-bounce">
          <ArrowDown className="h-5 w-5" />
        </div>
      </a>
    </section>
  )
}
