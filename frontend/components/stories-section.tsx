"use client"

import { Quote } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"

const stories = [
  {
    image: "/images/story-1.jpg",
    name: "Priya Sharma",
    age: "14",
    quote: "I never thought I would go to school. Now I dream of becoming a doctor and helping my village.",
    before: "Working in the fields at age 8, with no access to formal education.",
    after: "Top of her class, now preparing for science college entrance exams.",
  },
  {
    image: "/images/story-2.jpg",
    name: "Lakshmi Devi",
    age: "38",
    quote: "The tailoring program gave me more than a skill. It gave me my independence and my voice.",
    before: "Dependent on daily wage labor with no financial security.",
    after: "Running her own tailoring business, employing 3 other women from her village.",
  },
]

export function StoriesSection() {
  const { ref, isInView } = useInView()

  return (
    <section id="stories" className="bg-secondary py-20 lg:py-32">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className={`mx-auto max-w-2xl text-center transition-all duration-700 ${isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] text-accent">Real Stories</p>
          <h2 className="mt-3 font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground text-balance">
            People donate because of stories, not stats.
          </h2>
        </div>

        <div className="mt-12 lg:mt-16 flex flex-col gap-12 lg:gap-16">
          {stories.map((story, i) => (
            <div
              key={story.name}
              className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 transition-all duration-700 ${isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              style={{ transitionDelay: isInView ? `${300 + i * 200}ms` : "0ms" }}
            >
              <div className={`${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={story.image || "/placeholder.svg"}
                    alt={`${story.name}, age ${story.age}`}
                    className="h-64 sm:h-80 lg:h-[400px] w-full object-cover"
                  />
                </div>
              </div>

              <div className={`${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <Quote className="h-8 w-8 sm:h-10 sm:w-10 text-primary/30" />
                <blockquote className="mt-4 font-serif text-xl sm:text-2xl lg:text-3xl font-medium italic leading-relaxed text-foreground">
                  {`"${story.quote}"`}
                </blockquote>
                <p className="mt-6 font-semibold text-sm sm:text-base text-foreground">
                  {story.name}, <span className="font-normal text-muted-foreground">age {story.age}</span>
                </p>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                  <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 lg:p-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-destructive">Before</p>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">{story.before}</p>
                  </div>
                  <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 lg:p-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-primary">After</p>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">{story.after}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
