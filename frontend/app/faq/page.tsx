"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const faqs = [
  {
    question: "How can I volunteer with The Fortunates?",
    answer: "You can sign up to volunteer through our Volunteer page. We have opportunities for teaching, medical assistance, and community outreach.",
  },
  {
    question: "Where does my donation go?",
    answer: "85% of all donations go directly to our programs (Education, Healthcare, Women Empowerment, etc.). The remaining 15% is used for administrative and operational expenses.",
  },
  {
    question: "Do you provide tax exemption certificates?",
    answer: "Yes! All donations made to The Fortunates are eligible for 80G tax exemption under the Income Tax Act.",
  },
  {
    question: "Can I sponsor a specific child's education?",
    answer: "Yes, you can choose to sponsor a child's complete education for a year. Please contact us directly at hello@thefortunates.org for sponsorship details.",
  },
]

export default function FAQPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-1 pt-32 pb-24 px-6 max-w-3xl mx-auto w-full">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-12 text-foreground text-center">Frequently Asked Questions</h1>
        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-card p-6 rounded-2xl border border-border shadow-sm">
              <h3 className="text-xl font-bold text-foreground mb-3">{faq.question}</h3>
              <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  )
}
