"use client"

import { useState } from "react"
import { Heart, ShieldCheck, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useInView } from "@/hooks/use-in-view"

const presetAmounts = [500, 1000, 2000, 5000, 10000]

const transparencyItems = [
  { icon: ShieldCheck, label: "100% Secure Payments" },
  { icon: Eye, label: "Full Transparency Reports" },
  { icon: Heart, label: "80G Tax Benefits" },
]

export function DonationSection() {
  const { ref, isInView } = useInView()
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
    <section id="donate" className="relative overflow-hidden bg-primary py-24 lg:py-32">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary-foreground/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full bg-primary-foreground/20 blur-3xl" />
      </div>

      <div ref={ref} className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div
            className={`transition-all duration-700 ${isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary-foreground/70">
              Make a Donation
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-primary-foreground md:text-4xl lg:text-5xl text-balance">
              Your generosity can rewrite someone's future.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-primary-foreground/80">
              Every contribution funds real programs on the ground. From school supplies to medical camps, your donation directly changes lives.
            </p>

            <div className="mt-10 flex flex-col gap-4">
              {transparencyItems.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/10">
                    <item.icon className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <span className="text-sm font-medium text-primary-foreground/90">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`transition-all duration-700 delay-200 ${isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <div className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-8 backdrop-blur-sm lg:p-10">
              <p className="text-center font-serif text-lg font-semibold text-primary-foreground">
                Choose an amount
              </p>

              <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-5">
                {presetAmounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => handlePreset(amount)}
                    className={`rounded-xl border px-4 py-3 text-sm font-bold transition-all duration-200 ${
                      selectedAmount === amount
                        ? "border-primary-foreground bg-primary-foreground text-primary"
                        : "border-primary-foreground/20 bg-transparent text-primary-foreground hover:border-primary-foreground/50"
                    }`}
                  >
                    {"\u20B9"}{amount.toLocaleString()}
                  </button>
                ))}
              </div>

              <div className="mt-6">
                <label
                  htmlFor="custom-amount"
                  className="mb-2 block text-sm font-medium text-primary-foreground/70"
                >
                  Or enter a custom amount
                </label>
                <Input
                  id="custom-amount"
                  type="number"
                  placeholder="Enter amount"
                  value={customAmount}
                  onChange={(e) => handleCustom(e.target.value)}
                  className="border-primary-foreground/20 bg-primary-foreground/5 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-primary-foreground"
                />
              </div>

              {displayAmount > 0 && (
                <p className="mt-4 text-center text-sm text-primary-foreground/70">
                  {"Your donation of "}
                  <span className="font-bold text-primary-foreground">
                    {"\u20B9"}{displayAmount.toLocaleString()}
                  </span>
                  {" can provide "}
                  {displayAmount >= 5000
                    ? "a full year of education for a child."
                    : displayAmount >= 2000
                      ? "medical supplies for a village health camp."
                      : displayAmount >= 1000
                        ? "school supplies for 5 children."
                        : "meals for a family for a week."}
                </p>
              )}

              <Button
                size="lg"
                className="mt-8 w-full bg-accent text-accent-foreground text-base font-bold hover:bg-accent/90"
              >
                <Heart className="mr-2 h-5 w-5" />
                Donate {"\u20B9"}{displayAmount > 0 ? displayAmount.toLocaleString() : ""}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
