import { ScrollProgress } from "@/components/scroll-progress"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ProblemSection } from "@/components/problem-section"
import { MissionSection } from "@/components/mission-section"
import { ImpactSection } from "@/components/impact-section"
import { ProgramsSection } from "@/components/programs-section"
import { StoriesSection } from "@/components/stories-section"
import { PartnersSection } from "@/components/partners-section"
import { GetInvolvedSection } from "@/components/get-involved-section"
import { DonationSection } from "@/components/donation-section"
import { EventsSection } from "@/components/events-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main>
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <MissionSection />
      <ImpactSection />
      <ProgramsSection />
      <StoriesSection />
      <PartnersSection />
      <GetInvolvedSection />
      <DonationSection />
      <EventsSection />
      <NewsletterSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
