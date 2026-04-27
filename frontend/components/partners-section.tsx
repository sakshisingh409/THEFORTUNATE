"use client"

import { useInView } from "@/hooks/use-in-view"

const partners = [
  "UNICEF",
  "World Bank",
  "UNDP",
  "Red Cross",
  "Oxfam",
  "Save the Children",
  "CARE International",
  "Gates Foundation",
  "WHO",
  "ActionAid",
]

function PartnerLogo({ name }: { name: string }) {
  return (
    <div className="flex h-20 min-w-[180px] items-center justify-center rounded-xl border border-border bg-card px-8 transition-all duration-300 hover:border-primary/30 hover:shadow-md">
      <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground transition-colors duration-300 hover:text-foreground">
        {name}
      </span>
    </div>
  )
}

export function PartnersSection() {
  const { ref, isInView } = useInView()

  return (
    <section className="py-24 lg:py-32 overflow-hidden">
      <div ref={ref} className="mx-auto max-w-7xl px-6">
        <div
          className={`mx-auto max-w-2xl text-center transition-all duration-700 ${isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-accent">
            Our Partners
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
            Trusted by organizations who believe in change.
          </h2>
        </div>
      </div>

      <div
        className={`mt-16 transition-all duration-700 delay-300 ${isInView ? "opacity-100" : "opacity-0"}`}
      >
        <div className="flex animate-marquee gap-6">
          {[...partners, ...partners].map((partner, i) => (
            <PartnerLogo key={`${partner}-${i}`} name={partner} />
          ))}
        </div>
      </div>
    </section>
  )
}
