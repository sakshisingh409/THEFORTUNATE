"use client"

import React from "react"
import { useState } from "react"
import { MapPin, Phone, Mail, Send, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useInView } from "@/hooks/use-in-view"
import Image from "next/image"

const contactInfo = [
  { icon: MapPin, label: "Address", value: "42 Gandhi Nagar, Sector 12, New Delhi 110001, India" },
  { icon: Phone, label: "Phone", value: "+91 98765 43210" },
  { icon: Mail, label: "Email", value: "hello@thefortunates.org" },
]

export default function ContactPage() {
  const { ref: heroRef, isInView: heroVisible } = useInView()
  const { ref: formRef, isInView: formVisible } = useInView()
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
    <main>
      <Navbar />

      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0 opacity-20">
          <Image src="/images/hero.jpg" alt="" fill className="object-cover" priority />
        </div>
        <div ref={heroRef} className="relative z-10 mx-auto max-w-4xl px-6 py-32 text-center">
          <p className={`text-sm font-semibold uppercase tracking-[0.25em] text-primary-foreground/70 transition-all duration-700 ${heroVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            Get in Touch
          </p>
          <h1 className={`mt-4 font-serif text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl transition-all duration-700 delay-200 ${heroVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            <span className="text-balance">{"Let's start a conversation."}</span>
          </h1>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 lg:py-32">
        <div ref={formRef} className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div className={`transition-all duration-700 ${formVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
              <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">{"We'd love to hear from you."}</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Whether you want to partner, volunteer, donate, or simply learn more about our work, reach out and our team will respond within 24 hours.
              </p>

              <div className="mt-10 flex flex-col gap-8">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex gap-4 group">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
                      <info.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{info.label}</p>
                      <p className="mt-1 text-foreground">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 overflow-hidden rounded-2xl border border-border">
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

            <div className={`transition-all duration-700 delay-200 ${formVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
              {submitted ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-12 text-center">
                  <CheckCircle2 className="h-14 w-14 text-primary" />
                  <h3 className="font-serif text-2xl font-bold text-foreground">Message Sent!</h3>
                  <p className="text-muted-foreground">{"Thank you for reaching out. We'll get back to you within 24 hours."}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-8 lg:p-10">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-foreground">Full Name</label>
                      <Input
                        id="contact-name"
                        placeholder="John Doe"
                        required
                        className="h-12"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-foreground">Email</label>
                      <Input
                        id="contact-email"
                        type="email"
                        placeholder="john@example.com"
                        required
                        className="h-12"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-subject" className="mb-2 block text-sm font-medium text-foreground">Subject</label>
                    <Input
                      id="contact-subject"
                      placeholder="How can we help?"
                      required
                      className="h-12"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-foreground">Message</label>
                    <Textarea
                      id="contact-message"
                      placeholder="Tell us more..."
                      required
                      rows={5}
                      className="resize-none"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="h-12 text-base transition-transform duration-300 hover:scale-[1.02]"
                    disabled={isSubmitting}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                  {submitError ? <p className="text-sm text-destructive">{submitError}</p> : null}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
