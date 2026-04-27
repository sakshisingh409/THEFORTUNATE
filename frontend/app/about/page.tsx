"use client"

import { Eye, Heart, Shield, Target, Award, Globe } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useInView } from "@/hooks/use-in-view"
import Image from "next/image"

const values = [
  { icon: Heart, title: "Compassion", description: "Approaching every community with empathy and care." },
  { icon: Shield, title: "Transparency", description: "Full accountability in every rupee spent and every program run." },
  { icon: Target, title: "Impact-Driven", description: "Measuring success by real, measurable change in people's lives." },
  { icon: Award, title: "Excellence", description: "Striving for the highest standards in all our programs." },
  { icon: Globe, title: "Inclusivity", description: "Serving all communities regardless of background or belief." },
  { icon: Eye, title: "Accountability", description: "Open books, published reports, and community oversight." },
]

const timeline = [
  { year: "2018", title: "Founded", description: "Started with a small team of 5 volunteers in New Delhi." },
  { year: "2019", title: "First School Built", description: "Opened our first community learning center in rural Rajasthan." },
  { year: "2020", title: "COVID-19 Response", description: "Distributed food and medical supplies to 10,000+ families." },
  { year: "2021", title: "Healthcare Expansion", description: "Launched mobile health clinics across 3 states." },
  { year: "2022", title: "Women Empowerment", description: "Started vocational training programs for 2,000+ women." },
  { year: "2023", title: "National Recognition", description: "Awarded Best NGO for Community Development by NITI Aayog." },
  { year: "2024", title: "125K Lives Impacted", description: "Crossed 125,000 direct beneficiaries across all programs." },
]

export default function AboutPage() {
  const { ref: heroRef, isInView: heroVisible } = useInView()
  const { ref: missionRef, isInView: missionVisible } = useInView()
  const { ref: valuesRef, isInView: valuesVisible } = useInView()
  const { ref: timelineRef, isInView: timelineVisible } = useInView()

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0 opacity-20">
          <Image src="/images/problem.jpg" alt="" fill className="object-cover" priority />
        </div>
        <div ref={heroRef} className="relative z-10 mx-auto max-w-4xl px-6 py-32 text-center">
          <p className={`text-sm font-semibold uppercase tracking-[0.25em] text-primary-foreground/70 transition-all duration-700 ${heroVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            About Us
          </p>
          <h1 className={`mt-4 font-serif text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl transition-all duration-700 delay-200 ${heroVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            <span className="text-balance">Guided by purpose, driven by compassion.</span>
          </h1>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 lg:py-32">
        <div ref={missionRef} className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2">
            <div className={`transition-all duration-700 ${missionVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-accent">Our Mission</p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
                Empowering the underserved to live with dignity.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                The Fortunates is dedicated to empowering underserved communities through sustainable programs in education, health, and livelihood, enabling every individual to live with dignity and purpose.
              </p>
            </div>
            <div className={`transition-all duration-700 delay-200 ${missionVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-accent">Our Vision</p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
                A world of equal opportunity for all.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                We envision a world where every person, regardless of circumstance, has equal access to opportunities that allow them to thrive and contribute meaningfully to society.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-secondary py-24 lg:py-32">
        <div ref={valuesRef} className="mx-auto max-w-7xl px-6">
          <div className={`mx-auto max-w-2xl text-center transition-all duration-700 ${valuesVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-accent">Our Values</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
              The principles that guide everything we do.
            </h2>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((val, i) => (
              <div
                key={val.title}
                className={`group rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl cursor-default ${valuesVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                style={{ transitionDelay: valuesVisible ? `${200 + i * 80}ms` : "0ms" }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
                  <val.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 font-serif text-xl font-bold text-card-foreground">{val.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 lg:py-32">
        <div ref={timelineRef} className="mx-auto max-w-3xl px-6">
          <div className={`text-center transition-all duration-700 ${timelineVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-accent">Our Journey</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
              From 5 volunteers to 125,000 lives changed.
            </h2>
          </div>
          <div className="mt-16 relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border md:left-1/2 md:-translate-x-1/2" />
            <div className="flex flex-col gap-10">
              {timeline.map((item, i) => (
                <div
                  key={item.year}
                  className={`relative flex items-start gap-6 pl-12 md:pl-0 transition-all duration-700 ${timelineVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"} ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  style={{ transitionDelay: timelineVisible ? `${200 + i * 100}ms` : "0ms" }}
                >
                  <div className={`hidden md:block flex-1 ${i % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}>
                    <p className="font-serif text-lg font-bold text-primary">{item.year}</p>
                    <h3 className="mt-1 font-serif text-xl font-bold text-foreground">{item.title}</h3>
                    <p className="mt-2 text-muted-foreground">{item.description}</p>
                  </div>
                  <div className="absolute left-2 top-1 h-5 w-5 rounded-full border-2 border-primary bg-card md:relative md:left-0 md:top-0 md:shrink-0" />
                  <div className={`flex-1 md:hidden`}>
                    <p className="font-serif text-lg font-bold text-primary">{item.year}</p>
                    <h3 className="mt-1 font-serif text-xl font-bold text-foreground">{item.title}</h3>
                    <p className="mt-2 text-muted-foreground">{item.description}</p>
                  </div>
                  <div className={`hidden md:block flex-1 ${i % 2 === 0 ? "pl-8" : "pr-8"}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
