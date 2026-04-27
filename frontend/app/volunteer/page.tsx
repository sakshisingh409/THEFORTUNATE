"use client"

import React from "react"
import { useState } from "react"
import { Heart, Users, Clock, MapPin, BookOpen, HeartPulse, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useInView } from "@/hooks/use-in-view"
import Image from "next/image"

const roles = [
  {
    icon: BookOpen,
    title: "Teaching & Mentoring",
    description: "Help children and adults learn. Share knowledge in subjects, career guidance, or life skills.",
    commitment: "4-8 hours/week",
  },
  {
    icon: HeartPulse,
    title: "Healthcare Support",
    description: "Assist at health camps, organize wellness programs, and support community health initiatives.",
    commitment: "Flexible hours",
  },
  {
    icon: Users,
    title: "Community Outreach",
    description: "Engage with families, conduct awareness drives, and help identify underserved communities.",
    commitment: "6-10 hours/week",
  },
  {
    icon: MapPin,
    title: "Field Coordination",
    description: "On-ground project management, logistics support, and local partner coordination.",
    commitment: "Part-time / Full-time",
  },
  {
    icon: Heart,
    title: "Fundraising & Events",
    description: "Organize charity events, run crowdfunding campaigns, and manage donor relationships.",
    commitment: "Project-based",
  },
  {
    icon: Clock,
    title: "Remote / Digital",
    description: "Content creation, social media management, web development, and graphic design from anywhere.",
    commitment: "Flexible remote",
  },
]

export default function VolunteerPage() {
  const { ref: heroRef, isInView: heroVisible } = useInView()
  const { ref: rolesRef, isInView: rolesVisible } = useInView()
  const { ref: formRef, isInView: formVisible } = useInView()
  const [submitted, setSubmitted] = useState(false)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [city, setCity] = useState("")
  const [preferredRole, setPreferredRole] = useState("")
  const [motivation, setMotivation] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const resetForm = () => {
    setName("")
    setEmail("")
    setPhone("")
    setCity("")
    setPreferredRole("")
    setMotivation("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const res = await fetch("http://localhost:5001/volunteers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          city,
          preferredRole,
          motivation,
        }),
      })

      const data = (await res.json().catch(() => null)) as { error?: string } | null

      if (!res.ok) {
        setSubmitError(data?.error ?? "Failed to submit. Please try again.")
        setIsSubmitting(false)
        return
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Network error. Please try again."
      setSubmitError(message)
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
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0 opacity-20">
          <Image src="/images/hero.jpg" alt="" fill className="object-cover" priority />
        </div>
        <div ref={heroRef} className="relative z-10 mx-auto max-w-4xl px-6 py-32 text-center">
          <p className={`text-sm font-semibold uppercase tracking-[0.25em] text-primary-foreground/70 transition-all duration-700 ${heroVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            Join Our Mission
          </p>
          <h1 className={`mt-4 font-serif text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl transition-all duration-700 delay-200 ${heroVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            <span className="text-balance">Volunteer with The Fortunates</span>
          </h1>
          <p className={`mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/80 transition-all duration-700 delay-[400ms] ${heroVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            Your time and skills can transform lives. Join thousands of passionate individuals creating real impact in communities that need it most.
          </p>
        </div>
      </section>

      {/* Roles & Responsibilities */}
      <section className="py-24 lg:py-32">
        <div ref={rolesRef} className="mx-auto max-w-7xl px-6">
          <div className={`mx-auto max-w-2xl text-center transition-all duration-700 ${rolesVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-accent">Roles & Responsibilities</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
              Find the role that fits you best.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Whether you have 2 hours a week or want to go full-time, there is a place for you.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {roles.map((role, i) => (
              <div
                key={role.title}
                className={`group rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl cursor-default ${rolesVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                style={{ transitionDelay: rolesVisible ? `${200 + i * 80}ms` : "0ms" }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
                  <role.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 font-serif text-xl font-bold text-card-foreground">{role.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{role.description}</p>
                <p className="mt-4 flex items-center gap-2 text-sm font-medium text-primary">
                  <Clock className="h-4 w-4" />
                  {role.commitment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Form */}
      <section className="bg-secondary py-24 lg:py-32">
        <div ref={formRef} className="mx-auto max-w-3xl px-6">
          <div className={`text-center transition-all duration-700 ${formVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-accent">Apply Now</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
              Ready to make a difference?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Fill out the form below and our team will reach out to you within 48 hours.
            </p>
          </div>

          <div className={`mt-12 transition-all duration-700 delay-200 ${formVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            {submitted ? (
              <div className="flex flex-col items-center gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-12 text-center">
                <CheckCircle2 className="h-14 w-14 text-primary" />
                <h3 className="font-serif text-2xl font-bold text-foreground">Application Submitted!</h3>
                <p className="text-muted-foreground">
                  {"Thank you for your interest in volunteering. We'll be in touch soon."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-8 lg:p-10">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="vol-name" className="mb-2 block text-sm font-medium text-foreground">Full Name</label>
                    <Input
                      id="vol-name"
                      placeholder="Jane Doe"
                      required
                      className="h-12"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="vol-email" className="mb-2 block text-sm font-medium text-foreground">Email</label>
                    <Input
                      id="vol-email"
                      type="email"
                      placeholder="jane@example.com"
                      required
                      className="h-12"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="vol-phone" className="mb-2 block text-sm font-medium text-foreground">Phone Number</label>
                    <Input
                      id="vol-phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      required
                      className="h-12"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="vol-city" className="mb-2 block text-sm font-medium text-foreground">City</label>
                    <Input
                      id="vol-city"
                      placeholder="New Delhi"
                      required
                      className="h-12"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="vol-role" className="mb-2 block text-sm font-medium text-foreground">Preferred Role</label>
                  <select
                    id="vol-role"
                    required
                    className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    value={preferredRole}
                    onChange={(e) => setPreferredRole(e.target.value)}
                    disabled={isSubmitting}
                  >
                    <option value="">Select a role...</option>
                    {roles.map((r) => (
                      <option key={r.title} value={r.title}>{r.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="vol-message" className="mb-2 block text-sm font-medium text-foreground">Why do you want to volunteer?</label>
                  <Textarea
                    id="vol-message"
                    placeholder="Tell us about your motivation..."
                    required
                    rows={4}
                    className="resize-none"
                    value={motivation}
                    onChange={(e) => setMotivation(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="h-12 text-base transition-transform duration-300 hover:scale-[1.02]"
                  disabled={isSubmitting}
                >
                  <Heart className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
                {submitError ? (
                  <p className="text-sm text-destructive">{submitError}</p>
                ) : null}
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
