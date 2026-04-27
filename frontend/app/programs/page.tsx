"use client"

import { BookOpen, HeartPulse, Users, Leaf, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useInView } from "@/hooks/use-in-view"
import Image from "next/image"
import Link from "next/link"

const programs = [
  {
    icon: BookOpen,
    title: "Education",
    description: "Quality learning programs for children and adults, from primary education to vocational training and digital literacy. We run learning centers, after-school programs, and scholarship initiatives.",
    stats: "50,000+ students",
    image: "/images/story-1.jpg",
  },
  {
    icon: HeartPulse,
    title: "Healthcare",
    description: "Community health initiatives including mobile clinics, preventive care, maternal health programs, and mental wellness support. We bring medical access to the most remote villages.",
    stats: "30,000+ check-ups",
    image: "/images/problem.jpg",
  },
  {
    icon: Users,
    title: "Women Empowerment",
    description: "Skill-building, microfinance, and leadership programs that help women become agents of change. From tailoring to digital skills, we create pathways to independence.",
    stats: "8,000+ women trained",
    image: "/images/story-2.jpg",
  },
  {
    icon: Leaf,
    title: "Environment",
    description: "Sustainable farming, clean water access, reforestation projects, and environmental awareness campaigns. We protect the planet while uplifting communities.",
    stats: "15,000+ trees planted",
    image: "/images/hero.jpg",
  },
  {
    icon: Wrench,
    title: "Skill Development",
    description: "Job training, apprenticeships, and entrepreneurship programs designed to create self-sufficient livelihoods. We partner with local businesses to ensure real job placement.",
    stats: "12,000+ trained",
    image: "/images/problem.jpg",
  },
]

export default function ProgramsPage() {
  const { ref: heroRef, isInView: heroVisible } = useInView()
  const { ref: listRef, isInView: listVisible } = useInView()

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
            Our Programs
          </p>
          <h1 className={`mt-4 font-serif text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl transition-all duration-700 delay-200 ${heroVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            <span className="text-balance">Five pillars of lasting change.</span>
          </h1>
        </div>
      </section>

      {/* Programs List */}
      <section className="py-24 lg:py-32">
        <div ref={listRef} className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-20">
            {programs.map((program, i) => (
              <div
                key={program.title}
                className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 transition-all duration-700 ${listVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                style={{ transitionDelay: listVisible ? `${200 + i * 100}ms` : "0ms" }}
              >
                <div className={`${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="group relative overflow-hidden rounded-2xl">
                    <img
                      src={program.image || "/placeholder.svg"}
                      alt={program.title}
                      className="h-[350px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-foreground/10 transition-opacity duration-300 group-hover:opacity-0" />
                  </div>
                </div>
                <div className={`${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <program.icon className="h-6 w-6" />
                  </div>
                  <h2 className="mt-6 font-serif text-3xl font-bold text-foreground">{program.title}</h2>
                  <p className="mt-2 font-serif text-lg font-semibold text-primary">{program.stats}</p>
                  <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{program.description}</p>
                  <Button className="mt-6 transition-transform duration-300 hover:scale-105" asChild>
                    <Link href="/donate">Support This Program</Link>
                  </Button>
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
