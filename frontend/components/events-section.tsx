"use client"

import { Calendar, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useInView } from "@/hooks/use-in-view"
import Link from "next/link"

const events = [
  {
    date: "Mar 15, 2026",
    title: "Annual Education Summit",
    location: "New Delhi, India",
    description:
      "Join educators, policymakers, and community leaders to discuss innovative approaches to education in underserved regions.",
    type: "Upcoming",
  },
  {
    date: "Apr 22, 2026",
    title: "Earth Day Community Drive",
    location: "Mumbai, India",
    description:
      "A city-wide initiative to plant 10,000 trees and conduct environmental awareness workshops with local schools.",
    type: "Upcoming",
  },
  {
    date: "May 8, 2026",
    title: "Women's Skill Workshop",
    location: "Jaipur, India",
    description:
      "Free 3-day intensive training in digital literacy, tailoring, and financial management for women from rural areas.",
    type: "Upcoming",
  },
  {
    date: "Jan 10, 2026",
    title: "Health Camp Marathon",
    location: "Chennai, India",
    description:
      "Over 2,000 families received free medical check-ups, vaccinations, and health education across 15 villages.",
    type: "Past",
  },
]

export function EventsSection() {
  const { ref, isInView } = useInView()

  return (
    <section id="events" className="py-24 lg:py-32">
      <div ref={ref} className="mx-auto max-w-7xl px-6">
        <div
          className={`mx-auto max-w-2xl text-center transition-all duration-700 ${isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-accent">
            Events & Campaigns
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
            Join us on the ground or follow our journey.
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {events.map((event, i) => (
            <div
              key={event.title}
              className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:border-primary/30 cursor-default ${isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              style={{ transitionDelay: isInView ? `${200 + i * 100}ms` : "0ms" }}
            >
              <div className="flex items-start justify-between">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                    event.type === "Upcoming"
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {event.type}
                </span>
              </div>

              <h3 className="mt-4 font-serif text-xl font-bold text-card-foreground">
                {event.title}
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {event.description}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {event.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {event.location}
                </span>
              </div>

              {event.type === "Upcoming" && (
                <Button variant="link" asChild className="mt-4 h-auto p-0 text-primary">
                  <Link href={`/events/register?event=${encodeURIComponent(event.title)}`}>
                    Register Now <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
