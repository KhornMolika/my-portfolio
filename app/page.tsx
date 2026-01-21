import AboutMe from "@/components/about-section/AboutMe";
import HeroSection from "../components/hero-section/HeroSection";
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
    </main>
  );
}
