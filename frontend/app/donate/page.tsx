"use client"

import { useState } from "react"
import { Heart, ShieldCheck, Eye, Users, BookOpen, HeartPulse, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useInView } from "@/hooks/use-in-view"
import { useCounter } from "@/hooks/use-counter"
import Image from "next/image"

const presetAmounts = [500, 1000, 2000, 5000, 10000, 25000]

const transparencyItems = [
  { icon: ShieldCheck, label: "100% Secure Payments" },
  { icon: Eye, label: "Full Transparency Reports" },
  { icon: Heart, label: "80G Tax Benefits" },
]

const impactCards = [
  { icon: BookOpen, value: 50000, suffix: "+", label: "Students Educated", color: "text-primary" },
  { icon: HeartPulse, value: 30000, suffix: "+", label: "Health Check-ups", color: "text-accent" },
  { icon: Users, value: 8000, suffix: "+", label: "Women Empowered", color: "text-primary" },
  { icon: Leaf, value: 15000, suffix: "+", label: "Trees Planted", color: "text-accent" },
]

function ImpactCard({ icon: Icon, value, suffix, label, color, start, delay }: {
  icon: typeof BookOpen; value: number; suffix: string; label: string; color: string; start: boolean; delay: number
}) {
  const count = useCounter(value, 2500, start)
  return (
    <div
      className={`flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-lg ${start ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
      style={{ transitionDelay: start ? `${delay}ms` : "0ms" }}
    >
      <Icon className={`h-8 w-8 ${color}`} />
      <p className="font-serif text-2xl font-bold text-foreground md:text-3xl">
        {count.toLocaleString()}{suffix}
      </p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  )
}

export default function DonatePage() {
  const { ref: heroRef, isInView: heroVisible } = useInView()
  const { ref: impactRef, isInView: impactVisible } = useInView()
  const { ref: formRef, isInView: formVisible } = useInView()
  const [selectedAmount, setSelectedAmount] = useState<number | null>(1000)
  const [customAmount, setCustomAmount] = useState("")

  const handlePreset = (amount: number) => {
    setSelectedAmount(amount)
    setCustomAmount("")
  }

  const handleCustom = (value: string) => {
    setCustomAmount(value)
    setSelectedAmount(null)
  }

  const displayAmount = selectedAmount ?? (customAmount ? Number(customAmount) : 0)

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
            Make a Donation
          </p>
          <h1 className={`mt-4 font-serif text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl transition-all duration-700 delay-200 ${heroVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            <span className="text-balance">Your generosity can rewrite futures.</span>
          </h1>
          <p className={`mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/80 transition-all duration-700 delay-[400ms] ${heroVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            Every contribution, big or small, directly funds education, healthcare, and livelihood programs for families in need.
          </p>
        </div>
      </section>

      {/* Impact Summary */}
      <section className="py-24 lg:py-32">
        <div ref={impactRef} className="mx-auto max-w-7xl px-6">
          <div className={`mx-auto max-w-2xl text-center transition-all duration-700 ${impactVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-accent">Where Your Money Goes</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
              Real impact, transparent results.
            </h2>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {impactCards.map((card, i) => (
              <ImpactCard key={card.label} {...card} start={impactVisible} delay={200 + i * 150} />
            ))}
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="bg-secondary py-24 lg:py-32">
        <div ref={formRef} className="mx-auto max-w-4xl px-6">
          <div className={`transition-all duration-700 ${formVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <div className="rounded-2xl border border-border bg-card p-8 lg:p-12">
              <div className="text-center">
                <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">Choose Your Donation Amount</h2>
                <p className="mt-2 text-muted-foreground">Select a preset amount or enter a custom value.</p>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-6">
                {presetAmounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => handlePreset(amount)}
                    className={`rounded-xl border px-4 py-3 text-sm font-bold transition-all duration-300 hover:scale-105 ${
                      selectedAmount === amount
                        ? "border-primary bg-primary text-primary-foreground shadow-lg"
                        : "border-border bg-background text-foreground hover:border-primary/50"
                    }`}
                  >
                    {"\u20B9"}{amount.toLocaleString()}
                  </button>
                ))}
              </div>

              <div className="mt-6">
                <label htmlFor="donate-custom" className="mb-2 block text-sm font-medium text-foreground">
                  Or enter a custom amount
                </label>
                <Input
                  id="donate-custom"
                  type="number"
                  placeholder="Enter amount"
                  value={customAmount}
                  onChange={(e) => handleCustom(e.target.value)}
                  className="h-12 text-base"
                />
              </div>

              {displayAmount > 0 && (
                <div className="mt-6 rounded-xl bg-primary/5 border border-primary/10 p-4 text-center transition-all duration-300">
                  <p className="text-sm text-muted-foreground">
                    {"Your donation of "}
                    <span className="font-bold text-foreground">{"\u20B9"}{displayAmount.toLocaleString()}</span>
                    {" can provide "}
                    <span className="font-semibold text-primary">
                      {displayAmount >= 25000
                        ? "a full scholarship for a year."
                        : displayAmount >= 10000
                          ? "a complete health camp for 50 families."
                          : displayAmount >= 5000
                            ? "a full year of education for a child."
                            : displayAmount >= 2000
                              ? "medical supplies for a village health camp."
                              : displayAmount >= 1000
                                ? "school supplies for 5 children."
                                : "meals for a family for a week."}
                    </span>
                  </p>
                </div>
              )}

              <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
                {transparencyItems.map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <item.icon className="h-4 w-4 text-primary" />
                    <span className="text-xs font-medium text-muted-foreground">{item.label}</span>
                  </div>
                ))}
              </div>

              <Button
                size="lg"
                className="mt-8 w-full bg-accent text-accent-foreground text-base font-bold transition-all duration-300 hover:bg-accent/90 hover:scale-[1.02] hover:shadow-lg h-14"
              >
                <Heart className="mr-2 h-5 w-5" />
                Donate {"\u20B9"}{displayAmount > 0 ? displayAmount.toLocaleString() : "Now"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
