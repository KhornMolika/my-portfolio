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
      <section id="about">
        <AboutMe />
      </section>
      <section id="skills">
        <ToolsTechnologies />
      </section>
      <section id="projects">
        <ProjectsSection />
      </section>
      <section id="contact">
        <ContactSection />
      </section>
    </main>
  );
}
