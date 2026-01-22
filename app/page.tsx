import AboutMe from "@/components/about-section/AboutMe";
import ContactSection from "@/components/contact-section/ContactSection";
import HeroSection from "../components/hero-section/HeroSection";
import ProjectsSection from "@/components/projects-section/ProjectsSection";
import ToolsTechnologies from "@/components/technology-section/ToolsTechnologies";

export default function Home() {
  return (
    <main>
      <section id="home">
        <HeroSection />
      </section>
      <section id="about" className="py-16 sm:py-20">
        <AboutMe />
      </section>
      <section id="skills" className="py-16 sm:py-20">
        <ToolsTechnologies />
      </section>
      <section id="projects" className="py-16 sm:py-20">
        <ProjectsSection />
      </section>
      <section id="contact" className="py-16 sm:py-20">
        <ContactSection />
      </section>
    </main>
  );
}
