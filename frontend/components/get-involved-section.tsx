"use client"

import { Heart, HandHeart, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useInView } from "@/hooks/use-in-view"

const actions = [
  {
    icon: Heart,
    title: "Donate",
    description:
      "Your contribution directly funds education, healthcare, and livelihood programs for families in need. Every rupee counts.",
    cta: "Donate Now",
    href: "#donate",
  },
  {
    icon: HandHeart,
    title: "Volunteer",
    description:
      "Lend your time, skills, and passion. Whether on-ground or remote, your involvement creates real impact in communities.",
    cta: "Join Us",
    href: "#volunteer",
  },
  {
    icon: Users,
    title: "Partner With Us",
    description:
      "Collaborate with The Fortunates through CSR initiatives, institutional partnerships, or co-creating programs for lasting change.",
    cta: "Get in Touch",
    href: "#contact",
  },
]

export function GetInvolvedSection() {
  const { ref, isInView } = useInView()

  return (
    <section id="volunteer" className="bg-secondary py-24 lg:py-32">
      <div ref={ref} className="mx-auto max-w-7xl px-6">
        <div
          className={`mx-auto max-w-2xl text-center transition-all duration-700 ${isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-accent">
            Get Involved
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
            Be part of something bigger than yourself.
          </h2>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {actions.map((action, i) => (
            <div
              key={action.title}
              className={`group flex flex-col items-center rounded-2xl border border-border bg-card p-10 text-center transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl cursor-default ${isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              style={{ transitionDelay: isInView ? `${200 + i * 150}ms` : "0ms" }}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
                <action.icon className="h-8 w-8" />
              </div>
              <h3 className="mt-6 font-serif text-2xl font-bold text-card-foreground">
                {action.title}
              </h3>
              <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">
                {action.description}
              </p>
              <Button className="mt-8" size="lg" asChild>
                <a href={action.href}>{action.cta}</a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
