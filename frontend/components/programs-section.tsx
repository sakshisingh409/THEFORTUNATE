"use client"

import { BookOpen, HeartPulse, Users, Leaf, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useInView } from "@/hooks/use-in-view"

const programs = [
  {
    icon: BookOpen,
    title: "Education",
    description: "Quality learning programs for children and adults, from primary education to vocational training and digital literacy.",
  },
  {
    icon: HeartPulse,
    title: "Healthcare",
    description: "Community health initiatives including mobile clinics, preventive care, maternal health programs, and mental wellness support.",
  },
  {
    icon: Users,
    title: "Women Empowerment",
    description: "Skill-building, microfinance, and leadership programs that help women become agents of change in their communities.",
  },
  {
    icon: Leaf,
    title: "Environment",
    description: "Sustainable farming, clean water access, reforestation projects, and environmental awareness campaigns for communities.",
  },
  {
    icon: Wrench,
    title: "Skill Development",
    description: "Job training, apprenticeships, and entrepreneurship programs designed to create self-sufficient livelihoods.",
  },
]

export function ProgramsSection() {
  const { ref, isInView } = useInView()

  return (
    <section id="programs" className="py-20 lg:py-32">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className={`mx-auto max-w-2xl text-center transition-all duration-700 ${isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] text-accent">Our Programs</p>
          <h2 className="mt-3 font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground text-balance">
            Creating impact across five pillars of change.
          </h2>
        </div>

        <div className="mt-12 lg:mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, i) => (
            <div
              key={program.title}
              className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl cursor-default ${isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              style={{ transitionDelay: isInView ? `${200 + i * 100}ms` : "0ms" }}
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-150" />
              <div className="relative">
                <div className="flex h-11 sm:h-12 w-11 sm:w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 group-hover:rotate-3">
                  <program.icon className="h-5 sm:h-6 w-5 sm:w-6" />
                </div>
                <h3 className="mt-6 font-serif text-lg sm:text-xl font-bold text-card-foreground">{program.title}</h3>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground">{program.description}</p>
                <Button variant="link" className="mt-4 h-auto p-0 text-sm sm:text-base text-primary">
                  Learn More
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
