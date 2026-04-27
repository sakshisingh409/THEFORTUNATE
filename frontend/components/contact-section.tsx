"use client"

import React from "react"

import { useState } from "react"
import { MapPin, Phone, Mail, Send, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useInView } from "@/hooks/use-in-view"

const contactInfo = [
  {
    icon: MapPin,
    label: "Address",
    value: "42 Gandhi Nagar, Sector 12, New Delhi 110001, India",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 98765 43210",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@thefortunates.org",
  },
]

export function ContactSection() {
  const { ref, isInView } = useInView()
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  const resetForm = () => {
    setName("")
    setEmail("")
    setSubject("")
    setMessage("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      })

      const data = (await res.json().catch(() => null)) as { error?: string } | null
      if (!res.ok) {
        setSubmitError(data?.error ?? "Failed to send message. Please try again.")
        setIsSubmitting(false)
        return
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Network error. Please try again."
      setSubmitError(msg)
      setIsSubmitting(false)
      return
    }

    resetForm()
    setSubmitted(true)
    setIsSubmitting(false)
  }

  return (
    <section id="contact" className="py-20 lg:py-32">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6">
        <div
          className={`mx-auto max-w-2xl text-center transition-all duration-700 ${isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] text-accent">
            Contact Us
          </p>
          <h2 className="mt-3 font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground text-balance">
            {"Let's start a conversation."}
          </h2>
        </div>

        <div className="mt-12 lg:mt-16 grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div
            className={`transition-all duration-700 delay-100 ${isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <div className="flex flex-col gap-6 sm:gap-8">
              {contactInfo.map((info) => (
                <div key={info.label} className="flex gap-4">
                  <div className="flex h-10 sm:h-12 w-10 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <info.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      {info.label}
                    </p>
                    <p className="mt-1 text-sm sm:text-base text-foreground">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 sm:mt-10 overflow-hidden rounded-2xl border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.456!2d77.229!3d28.632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM3JzU1LjIiTiA3N8KwMTMnNDQuNCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="The Fortunates Location"
              />
            </div>
          </div>

          <div
            className={`transition-all duration-700 delay-300 ${isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            {submitted ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-8 sm:p-12 text-center">
                <CheckCircle2 className="h-12 sm:h-14 w-12 sm:w-14 text-primary" />
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
                  Message Sent!
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {"Thank you for reaching out. We'll get back to you within 24 hours."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
                <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-xs sm:text-sm font-medium text-foreground">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      required
                      className="h-10 sm:h-12 text-sm"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-xs sm:text-sm font-medium text-foreground">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                      className="h-10 sm:h-12 text-sm"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="mb-2 block text-xs sm:text-sm font-medium text-foreground">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    placeholder="How can we help?"
                    required
                    className="h-10 sm:h-12 text-sm"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="mb-2 block text-xs sm:text-sm font-medium text-foreground">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more..."
                    required
                    rows={5}
                    className="resize-none text-sm"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
                <Button type="submit" size="lg" className="h-10 sm:h-12 text-sm sm:text-base" disabled={isSubmitting}>
                  <Send className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
                {submitError ? (
                  <p className="text-sm text-destructive">{submitError}</p>
                ) : null}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
