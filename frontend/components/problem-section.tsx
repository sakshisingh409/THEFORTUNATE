"use client"

import { useInView } from "@/hooks/use-in-view"
import { useCounter } from "@/hooks/use-counter"

function Stat({ value, suffix, label, start }: { value: number; suffix: string; label: string; start: boolean }) {
  const count = useCounter(value, 2000, start)
  return (
    <div className="text-center">
      <p className="font-serif text-4xl font-bold text-primary md:text-5xl">
        {count.toLocaleString()}{suffix}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">{label}</p>
    </div>
  )
}

export function ProblemSection() {
  const { ref, isInView } = useInView()

  return (
    <section id="about" className="relative overflow-hidden py-24 lg:py-32">
      <div ref={ref} className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className={`transition-all duration-700 ${isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-accent">Why We Exist</p>
            <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl text-balance">
              Millions are trapped in a cycle they did not choose.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Around the world, entire communities lack access to quality education, healthcare, and economic opportunity. Generational poverty keeps families from ever reaching their full potential. We exist to change that.
            </p>
          </div>

          <div className={`relative overflow-hidden rounded-2xl transition-all duration-700 delay-200 ${isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <img
              src="/images/problem.jpg"
              alt="A child writing on a small chalkboard, representing the struggle for education access"
              className="h-[400px] w-full object-cover"
            />
          </div>
        </div>

        <div className={`mt-20 grid grid-cols-2 gap-8 md:grid-cols-4 transition-all duration-700 delay-400 ${isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <Stat value={250} suffix="M+" label="Children out of school worldwide" start={isInView} />
          <Stat value={700} suffix="M+" label="People living in extreme poverty" start={isInView} />
          <Stat value={2} suffix="B+" label="Lack access to basic healthcare" start={isInView} />
          <Stat value={60} suffix="%" label="Youth unemployed in developing regions" start={isInView} />
        </div>
      </div>
    </section>
  )
}
