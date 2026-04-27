"use client"

import { Users, Building2, HandHeart, Award, BookOpen, HeartPulse, Leaf, Wrench } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useInView } from "@/hooks/use-in-view"
import { useCounter } from "@/hooks/use-counter"
import Image from "next/image"

const mainStats = [
  { icon: Users, value: 125000, suffix: "+", label: "Lives Impacted" },
  { icon: Building2, value: 340, suffix: "+", label: "Projects Completed" },
  { icon: HandHeart, value: 5200, suffix: "+", label: "Active Volunteers" },
  { icon: Award, value: 85, suffix: "+", label: "Partner Organizations" },
]

const programImpact = [
  { icon: BookOpen, title: "Education", stats: "50,000+ students enrolled", description: "From rural learning centers to digital classrooms, we bring quality education to those who need it most." },
  { icon: HeartPulse, title: "Healthcare", stats: "30,000+ check-ups", description: "Mobile health clinics, maternal care, and preventive health programs across 3 states." },
  { icon: Users, title: "Women Empowerment", stats: "8,000+ women trained", description: "Vocational skills, microfinance, and leadership programs transforming livelihoods." },
  { icon: Leaf, title: "Environment", stats: "15,000+ trees planted", description: "Sustainable farming, clean water access, and reforestation in degraded lands." },
  { icon: Wrench, title: "Skill Development", stats: "12,000+ trained", description: "Job-ready skills and entrepreneurship programs creating self-sufficient livelihoods." },
]

function StatCard({ icon: Icon, value, suffix, label, start, delay }: {
  icon: typeof Users; value: number; suffix: string; label: string; start: boolean; delay: number
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

export default function ImpactPage() {
  const { ref: heroRef, isInView: heroVisible } = useInView()
  const { ref: statsRef, isInView: statsVisible } = useInView()
  const { ref: programRef, isInView: programVisible } = useInView()

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0 opacity-20">
          <Image src="/images/story-1.jpg" alt="" fill className="object-cover" priority />
        </div>
        <div ref={heroRef} className="relative z-10 mx-auto max-w-4xl px-6 py-32 text-center">
          <p className={`text-sm font-semibold uppercase tracking-[0.25em] text-primary-foreground/70 transition-all duration-700 ${heroVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            Our Impact
          </p>
          <h1 className={`mt-4 font-serif text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl transition-all duration-700 delay-200 ${heroVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            <span className="text-balance">Numbers that tell our story.</span>
          </h1>
          <p className={`mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/80 transition-all duration-700 delay-[400ms] ${heroVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            Every number represents a life changed, a community strengthened, and hope restored.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary py-24 lg:py-32">
        <div ref={statsRef} className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {mainStats.map((stat, i) => (
              <StatCard key={stat.label} {...stat} start={statsVisible} delay={200 + i * 150} />
            ))}
          </div>
        </div>
      </section>

      {/* Program Impact */}
      <section className="py-24 lg:py-32">
        <div ref={programRef} className="mx-auto max-w-7xl px-6">
          <div className={`mx-auto max-w-2xl text-center transition-all duration-700 ${programVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-accent">Impact by Program</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
              Creating change across every pillar.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 place-items-center">
            {programImpact.map((program, i) => (
              <div
                key={program.title}
                className={`group flex flex-col items-center text-center gap-4 rounded-2xl border border-border bg-card p-6 max-w-sm w-full transition-all duration-500 hover:-translate-y-1 hover:shadow-lg ${programVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                style={{ transitionDelay: programVisible ? `${200 + i * 100}ms` : "0ms" }}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                  <program.icon className="h-10 w-10" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-card-foreground">{program.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{program.description}</p>
                </div>
                <div className="pt-4 text-center">
                  <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Impact</p>
                  <p className="mt-1 font-serif text-2xl font-bold text-primary">{program.stats}</p>
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
