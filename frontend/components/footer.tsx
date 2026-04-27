"use client"

import Image from "next/image"
import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Programs", href: "/programs" },
  { label: "Impact Stories", href: "/stories" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
]

const programLinks = [
  { label: "Education", href: "/programs" },
  { label: "Healthcare", href: "/programs" },
  { label: "Women Empowerment", href: "/programs" },
  { label: "Environment", href: "/programs" },
  { label: "Skill Development", href: "/programs" },
]

const socialLinks = [
  { 
    label: "Facebook", 
    href: "#",
    icon: Facebook,
    color: "hover:text-blue-600"
  },
  { 
    label: "Twitter", 
    href: "#",
    icon: Twitter,
    color: "hover:text-blue-400"
  },
  { 
    label: "Instagram", 
    href: "https://www.instagram.com/thefortunates?igsh=OW5mcXFudHhocTVo",
    icon: Instagram,
    color: "hover:text-pink-600"
  },
  { 
    label: "LinkedIn", 
    href: "#",
    icon: Linkedin,
    color: "hover:text-blue-700"
  },
  { 
    label: "YouTube", 
    href: "#",
    icon: Youtube,
    color: "hover:text-red-600"
  },
]

export function Footer() {
  const { ref, isInView } = useInView()

  return (
    <footer className="bg-foreground py-16 lg:py-20">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6">
        <div
          className={`grid gap-8 sm:gap-12 md:grid-cols-2 lg:grid-cols-4 transition-all duration-700 ${isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-10 w-10 overflow-hidden flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/images/logo.png"
                  alt="The Fortunates logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-serif text-lg sm:text-xl font-bold text-background transition-colors duration-300 group-hover:text-accent">
                The Fortunates
              </span>
            </Link>
            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-background/60">
              Breaking the cycle of poverty through education, health, and sustainable development. Registered under the Indian Trusts Act.
            </p>
            <p className="mt-4 text-xs text-background/40">
              Reg. No: NGO/2024/DEL/001234
            </p>
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-background/80">
              Quick Links
            </h4>
            <ul className="mt-4 flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-background/50 transition-all duration-300 hover:text-background hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-background/80">
              Programs
            </h4>
            <ul className="mt-4 flex flex-col gap-3">
              {programLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-background/50 transition-all duration-300 hover:text-background hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-background/80">
              Follow Us
            </h4>
            <div className="mt-4 flex flex-wrap gap-4">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className={`h-10 w-10 flex items-center justify-center rounded-lg bg-background/10 text-background transition-all duration-300 hover:bg-background/20 ${link.color}`}
                    aria-label={link.label}
                    title={link.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
            <p className="mt-6 text-xs sm:text-sm text-background/60">
              Stay connected with us on social media
            </p>
          </div>
        </div>

        <div
          className={`mt-12 sm:mt-16 flex flex-col items-center justify-between gap-4 border-t border-background/10 pt-6 sm:pt-8 text-center sm:text-left transition-all duration-700 delay-200 ${isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <p className="text-xs sm:text-sm text-background/40">
            {"© 2026 The Fortunates. All rights reserved."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <a href="#" className="text-xs sm:text-sm text-background/40 transition-colors duration-300 hover:text-background">
              Privacy Policy
            </a>
            <a href="#" className="text-xs sm:text-sm text-background/40 transition-colors duration-300 hover:text-background">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
