"use client"

import { useInView } from "@/hooks/use-in-view"
import { useCounter } from "@/hooks/use-counter"
import { Users, Building2, HandHeart, Award } from "lucide-react"

const stats = [
  { icon: Users, value: 125000, suffix: "+", label: "Lives Impacted" },
  { icon: Building2, value: 340, suffix: "+", label: "Projects Completed" },
  { icon: HandHeart, value: 5200, suffix: "+", label: "Active Volunteers" },
  { icon: Award, value: 85, suffix: "+", label: "Partner Organizations" },
]

function ImpactStat({ icon: Icon, value, suffix, label, start, delay }: {
  icon: typeof Users
  value: number
  suffix: string
  label: string
  start: boolean
  delay: number
}) {
  const count = useCounter(value, 2500, start)

  return (
    <div
      className={`flex flex-col items-center gap-4 rounded-2xl border border-primary-foreground/20 bg-primary-foreground/5 p-8 transition-all duration-700 ${start ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
      style={{ transitionDelay: start ? `${delay}ms` : "0ms" }}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-foreground/10">
        <Icon className="h-7 w-7 text-primary-foreground" />
      </div>
      <p className="font-serif text-3xl font-bold text-primary-foreground md:text-4xl">
        {count.toLocaleString()}{suffix}
      </p>
      <p className="text-sm font-medium text-primary-foreground/70">{label}</p>
    </div>
  )
}

export function ImpactSection() {
  const { ref, isInView } = useInView()

  return (
    <section id="impact" className="bg-primary py-24 lg:py-32">
      <div ref={ref} className="mx-auto max-w-7xl px-6">
        <div className={`mx-auto max-w-2xl text-center transition-all duration-700 ${isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary-foreground/70">Our Impact</p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-primary-foreground md:text-4xl text-balance">
            Numbers that tell our story.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-primary-foreground/80">
            Every number represents a life changed, a community strengthened, and hope restored.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <ImpactStat
              key={stat.label}
              {...stat}
              start={isInView}
              delay={200 + i * 150}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
