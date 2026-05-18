"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-1 pt-32 pb-24 px-6 max-w-4xl mx-auto w-full">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-8 text-foreground">Privacy Policy</h1>
        <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none text-muted-foreground space-y-6">
          <p className="font-medium text-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-bold text-foreground mt-8">1. Introduction</h2>
          <p>The Fortunates ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or interact with our organization.</p>
          
          <h2 className="text-2xl font-bold text-foreground mt-8">2. Information We Collect</h2>
          <p>We may collect personal information that you voluntarily provide to us when you:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Register as a volunteer</li>
            <li>Make a donation</li>
            <li>Sign up for our newsletter</li>
            <li>Contact us via our website forms</li>
          </ul>
          
          <h2 className="text-2xl font-bold text-foreground mt-8">3. How We Use Your Information</h2>
          <p>We use the information we collect to process donations, send you newsletters (if you opted in), communicate with you about our programs and events, and improve our website and services.</p>
          
          <h2 className="text-2xl font-bold text-foreground mt-8">4. Data Security</h2>
          <p>We implement a variety of security measures to maintain the safety of your personal information. All payment transactions are processed through secure gateway providers and are not stored or processed on our servers.</p>
          
          <h2 className="text-2xl font-bold text-foreground mt-8">5. Contact Us</h2>
          <p>If you have questions or comments about this Privacy Policy, please contact us at info@thefortunates.org.</p>
        </div>
      </section>
      <Footer />
    </main>
  )
}
