import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import EmailSection from "./components/EmailSection";
import Footer from "./components/Footer";
import AchievementsSection from "./components/AchievementsSection";
import TrustStrip from "./components/TrustStrip";
import TestimonialsSection from "./components/TestimonialsSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <Navbar />
      <div className="mx-auto w-full max-w-6xl mt-28 px-4 sm:px-6 lg:px-8 py-4">
        <HeroSection />
        <TrustStrip />
        <AchievementsSection />
        <AboutSection />
        <ProjectsSection />
        <TestimonialsSection />
        <EmailSection />
      </div>
      <Footer />
    </main>
  );
}
