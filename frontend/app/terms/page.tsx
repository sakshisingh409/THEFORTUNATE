"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function TermsOfService() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-1 pt-32 pb-24 px-6 max-w-4xl mx-auto w-full">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-8 text-foreground">Terms of Service</h1>
        <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none text-muted-foreground space-y-6">
          <p className="font-medium text-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-bold text-foreground mt-8">1. Acceptance of Terms</h2>
          <p>By accessing and using the website of The Fortunates, you accept and agree to be bound by the terms and provision of this agreement.</p>
          
          <h2 className="text-2xl font-bold text-foreground mt-8">2. Use of Website</h2>
          <p>You agree to use our website only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the website.</p>
          
          <h2 className="text-2xl font-bold text-foreground mt-8">3. Donations</h2>
          <p>All donations made through our website are voluntary. We utilize secure payment gateways, and you will receive a receipt for your contribution. Donations are non-refundable unless there was an error in processing.</p>
          
          <h2 className="text-2xl font-bold text-foreground mt-8">4. Intellectual Property</h2>
          <p>The content, organization, graphics, design, compilation, magnetic translation, digital conversion and other matters related to the Site are protected under applicable copyrights, trademarks and other proprietary rights.</p>
          
          <h2 className="text-2xl font-bold text-foreground mt-8">5. Disclaimer</h2>
          <p>The materials on The Fortunates' website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
        </div>
      </section>
      <Footer />
    </main>
  )
}
