"use client"

import { Eye, Heart, Shield } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"

const cards = [
  {
    icon: Heart,
    title: "Our Mission",
    description:
      "To empower underserved communities through sustainable programs in education, health, and livelihood, enabling every individual to live with dignity and purpose.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "A world where every person, regardless of circumstance, has equal access to opportunities that allow them to thrive and contribute meaningfully to society.",
  },
  {
    icon: Shield,
    title: "Our Values",
    description:
      "Compassion, transparency, and community-driven impact guide everything we do. We believe in accountability, collaboration, and the inherent potential of every individual.",
  },
]

export function MissionSection() {
  const { ref, isInView } = useInView()

  return (
    <section className="bg-secondary py-20 lg:py-32">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className={`mx-auto max-w-2xl text-center transition-all duration-700 ${isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] text-accent">Who We Are</p>
          <h2 className="mt-3 font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground text-balance">
            Guided by purpose, driven by compassion.
          </h2>
        </div>

        <div className="mt-12 lg:mt-16 grid gap-6 sm:gap-8 md:grid-cols-3">
          {cards.map((card, i) => (
            <div
              key={card.title}
              className={`group rounded-2xl border border-border bg-card p-6 sm:p-8 transition-all duration-700 hover:-translate-y-2 hover:shadow-xl cursor-default ${isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              style={{ transitionDelay: isInView ? `${200 + i * 150}ms` : "0ms" }}
            >
              <div className="flex h-11 sm:h-12 w-11 sm:w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
                <card.icon className="h-5 sm:h-6 w-5 sm:w-6" />
              </div>
              <h3 className="mt-6 font-serif text-lg sm:text-xl font-bold text-card-foreground">{card.title}</h3>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
