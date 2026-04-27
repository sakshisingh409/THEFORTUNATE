"use client"

import React from "react"

import { useState } from "react"
import { Mail, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useInView } from "@/hooks/use-in-view"

export function NewsletterSection() {
  const { ref, isInView } = useInView()
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail("")
    }
  }

  return (
    <section className="bg-secondary py-20 lg:py-32">
      <div ref={ref} className="mx-auto max-w-3xl px-4 sm:px-6">
        <div
          className={`text-center transition-all duration-700 ${isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <div className="mx-auto flex h-14 sm:h-16 w-14 sm:w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Mail className="h-7 sm:h-8 w-7 sm:w-8 text-primary" />
          </div>
          <h2 className="mt-6 font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground text-balance">
            Be part of the change.
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
            Subscribe to our newsletter for impact stories, event updates, and ways to get involved.
          </p>
        </div>

        <div
          className={`mt-8 sm:mt-10 transition-all duration-700 delay-200 ${isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          {submitted ? (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8 text-center">
              <CheckCircle2 className="h-10 w-10 text-primary" />
              <p className="font-serif text-lg sm:text-xl font-bold text-foreground">
                Thank you for subscribing!
              </p>
              <p className="text-sm sm:text-base text-muted-foreground">
                {"You'll receive our next newsletter in your inbox."}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 sm:h-12 flex-1 text-sm sm:text-base"
              />
              <Button type="submit" size="lg" className="h-11 sm:h-12 w-full sm:w-auto sm:min-w-[160px] text-sm sm:text-base">
                Subscribe
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
