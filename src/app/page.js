import Script from "next/script";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import EmailSection from "./components/EmailSection";
import Footer from "./components/Footer";
import AchievementsSection from "./components/AchievementsSection";
import TrustStrip from "./components/TrustStrip";
import TestimonialsSection from "./components/TestimonialsSection";
import ServicePackagesSection from "./components/ServicePackagesSection";
import FAQSection from "./components/FAQSection";
import StickyWhatsAppCTA from "./components/StickyWhatsAppCTA";

const baseUrl = "https://msaeed.tech";

export const metadata = {
  title: "Web Developer in Dubai | Mohammed Saeed",
  description:
    "Mohammed Saeed builds modern, high-converting websites for startups and local businesses. View projects, case studies, and service packages.",
  alternates: {
    canonical: "/",
  },
};

const faqSchemaItems = [
  {
    question: "How long does a typical website project take?",
    answer:
      "Most projects are completed in 5 to 14 days depending on scope and feedback speed.",
  },
  {
    question: "Do you help with content and structure?",
    answer:
      "Yes. I help shape page structure, messaging flow, and conversion-focused sections.",
  },
  {
    question: "Can I request revisions?",
    answer:
      "Yes. Revisions are included in every package to ensure the site matches your goals.",
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <Script
        id="home-seo-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Mohammed Saeed Portfolio",
              url: baseUrl,
              inLanguage: "en",
            },
            {
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Mohammed Saeed - Web Development",
              url: baseUrl,
              areaServed: "Dubai",
              serviceType: [
                "Business Website Development",
                "Website Redesign",
                "Conversion-Focused Landing Pages",
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqSchemaItems.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.answer,
                },
              })),
            },
          ]),
        }}
      />

      <Navbar />
      <div className="mx-auto w-full max-w-6xl mt-28 px-4 sm:px-6 lg:px-8 py-4">
        <HeroSection />
        <TrustStrip />
        <AchievementsSection />
        <AboutSection />
        <ProjectsSection />
        <ServicePackagesSection />
        <TestimonialsSection />
        <FAQSection />
        <EmailSection />
      </div>
      <Footer />
      <StickyWhatsAppCTA />
    </main>
  );
}
