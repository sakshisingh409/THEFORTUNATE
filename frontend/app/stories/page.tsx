"use client"

import { Quote } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useInView } from "@/hooks/use-in-view"
import Image from "next/image"

const stories = [
  {
    image: "/images/story-1.jpg",
    name: "Priya Sharma",
    age: "14",
    program: "Education",
    quote: "I never thought I would go to school. Now I dream of becoming a doctor and helping my village.",
    before: "Working in the fields at age 8, with no access to formal education.",
    after: "Top of her class, now preparing for science college entrance exams.",
    fullStory: "Priya grew up in a small farming village where girls rarely attended school. When The Fortunates opened a learning center nearby, her parents were hesitant but agreed to let her attend. Within a year, she was reading fluently. Now at 14, she tops her class and dreams of becoming a doctor to serve her community.",
  },
  {
    image: "/images/story-2.jpg",
    name: "Lakshmi Devi",
    age: "38",
    program: "Women Empowerment",
    quote: "The tailoring program gave me more than a skill. It gave me my independence and my voice.",
    before: "Dependent on daily wage labor with no financial security.",
    after: "Running her own tailoring business, employing 3 other women from her village.",
    fullStory: "Lakshmi spent 20 years as a daily wage laborer, earning barely enough to feed her family. Through our vocational training program, she learned tailoring and business management. Today, she runs a successful tailoring shop in her village, employs three other women, and is a respected voice in her community.",
  },
  {
    image: "/images/problem.jpg",
    name: "Rajesh Kumar",
    age: "22",
    program: "Skill Development",
    quote: "From an uncertain future to a career I am proud of. The Fortunates believed in me when no one else did.",
    before: "School dropout with no employable skills, working odd jobs.",
    after: "Certified electrician with a stable job and supporting his family.",
    fullStory: "Rajesh dropped out of school at 15 to support his family. With no skills, he worked odd jobs that barely paid. Our skill development program trained him as an electrician over 6 months. He now works for a reputable company, earns a stable income, and has enrolled his younger siblings in school.",
  },
]

export default function StoriesPage() {
  const { ref: heroRef, isInView: heroVisible } = useInView()
  const { ref: storiesRef, isInView: storiesVisible } = useInView()

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0 opacity-20">
          <Image src="/images/story-2.jpg" alt="" fill className="object-cover" priority />
        </div>
        <div ref={heroRef} className="relative z-10 mx-auto max-w-4xl px-6 py-32 text-center">
          <p className={`text-sm font-semibold uppercase tracking-[0.25em] text-primary-foreground/70 transition-all duration-700 ${heroVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            Impact Stories
          </p>
          <h1 className={`mt-4 font-serif text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl transition-all duration-700 delay-200 ${heroVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            <span className="text-balance">Real lives. Real change.</span>
          </h1>
        </div>
      </section>

      {/* Stories */}
      <section className="py-24 lg:py-32">
        <div ref={storiesRef} className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-24">
            {stories.map((story, i) => (
              <div
                key={story.name}
                className={`grid items-start gap-12 lg:grid-cols-2 lg:gap-16 transition-all duration-700 ${storiesVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                style={{ transitionDelay: storiesVisible ? `${200 + i * 150}ms` : "0ms" }}
              >
                <div className={`${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="group relative overflow-hidden rounded-2xl">
                    <img
                      src={story.image || "/placeholder.svg"}
                      alt={`${story.name}, age ${story.age}`}
                      className="h-[450px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground">
                        {story.program}
                      </span>
                    </div>
                  </div>
                </div>

                <div className={`${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <Quote className="h-10 w-10 text-primary/30" />
                  <blockquote className="mt-4 font-serif text-2xl font-medium italic leading-relaxed text-foreground md:text-3xl">
                    {`"${story.quote}"`}
                  </blockquote>
                  <p className="mt-6 font-semibold text-foreground">
                    {story.name}, <span className="font-normal text-muted-foreground">age {story.age}</span>
                  </p>
                  <p className="mt-6 leading-relaxed text-muted-foreground">{story.fullStory}</p>

                  <div className="mt-8 grid grid-cols-2 gap-6">
                    <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-destructive">Before</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{story.before}</p>
                    </div>
                    <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-primary">After</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{story.after}</p>
                    </div>
                  </div>
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
