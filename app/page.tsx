import AboutMe from "@/components/about-section/AboutMe";
import HeroSection from "../components/hero-section/HeroSection";
import ToolsTechnologies from "@/components/technology-section/ToolsTechnologies";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutMe />
      <ToolsTechnologies />
    </main>
  );
}
