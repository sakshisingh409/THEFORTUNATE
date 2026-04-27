"use client"

import { Calendar, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useInView } from "@/hooks/use-in-view"
import Image from "next/image"
import Link from "next/link"

const upcomingEvents = [
  {
    date: "Mar 15, 2026",
    title: "Annual Education Summit",
    location: "New Delhi, India",
    description: "Join educators, policymakers, and community leaders to discuss innovative approaches to education in underserved regions.",
  },
  {
    date: "Apr 22, 2026",
    title: "Earth Day Community Drive",
    location: "Mumbai, India",
    description: "A city-wide initiative to plant 10,000 trees and conduct environmental awareness workshops with local schools.",
  },
  {
    date: "May 8, 2026",
    title: "Women's Skill Workshop",
    location: "Jaipur, India",
    description: "Free 3-day intensive training in digital literacy, tailoring, and financial management for women from rural areas.",
  },
  {
    date: "Jun 15, 2026",
    title: "Youth Tech Bootcamp",
    location: "Bangalore, India",
    description: "A week-long coding and digital skills bootcamp for underprivileged youth, in partnership with leading tech companies.",
  },
]

const pastEvents = [
  {
    date: "Jan 10, 2026",
    title: "Health Camp Marathon",
    location: "Chennai, India",
    description: "Over 2,000 families received free medical check-ups, vaccinations, and health education across 15 villages.",
  },
  {
    date: "Dec 5, 2025",
    title: "Annual Charity Gala",
    location: "New Delhi, India",
    description: "Our flagship fundraising event raised over 50 lakh for education programs, with 500+ attendees.",
  },
  {
    date: "Oct 20, 2025",
    title: "Rural Library Launch",
    location: "Lucknow, India",
    description: "Inaugurated 5 new community libraries in partnership with local panchayats, stocked with 10,000+ books.",
  },
]

export default function EventsPage() {
  const { ref: heroRef, isInView: heroVisible } = useInView()
  const { ref: upcomingRef, isInView: upcomingVisible } = useInView()
  const { ref: pastRef, isInView: pastVisible } = useInView()

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
            Events & Campaigns
          </p>
          <h1 className={`mt-4 font-serif text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl transition-all duration-700 delay-200 ${heroVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            <span className="text-balance">Join us on the ground.</span>
          </h1>
        </div>
      </section>

      {/* Upcoming */}
      <section className="py-24 lg:py-32">
        <div ref={upcomingRef} className="mx-auto max-w-7xl px-6">
          <div className={`transition-all duration-700 ${upcomingVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-accent">Upcoming Events</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
              Get involved in our next initiatives.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {upcomingEvents.map((event, i) => (
              <div
                key={event.title}
                className={`group rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:border-primary/30 cursor-default ${upcomingVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                style={{ transitionDelay: upcomingVisible ? `${200 + i * 100}ms` : "0ms" }}
              >
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                  Upcoming
                </span>
                <h3 className="mt-4 font-serif text-xl font-bold text-card-foreground">{event.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{event.description}</p>
                <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{event.date}</span>
                  <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{event.location}</span>
                </div>
                <Button variant="link" asChild className="mt-4 h-auto p-0 text-primary group">
                  <Link href={`/events/register?event=${encodeURIComponent(event.title)}`} className="group">
                    Register Now{" "}
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past */}
      <section className="bg-secondary py-24 lg:py-32">
        <div ref={pastRef} className="mx-auto max-w-7xl px-6">
          <div className={`transition-all duration-700 ${pastVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-accent">Past Events</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
              Look back at our recent impact.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {pastEvents.map((event, i) => (
              <div
                key={event.title}
                className={`rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg ${pastVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                style={{ transitionDelay: pastVisible ? `${200 + i * 100}ms` : "0ms" }}
              >
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Past
                </span>
                <h3 className="mt-4 font-serif text-xl font-bold text-card-foreground">{event.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{event.description}</p>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{event.date}</span>
                  <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{event.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
