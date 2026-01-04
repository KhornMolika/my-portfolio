import React from "react";
import AboutContent from "./AboutContent";
import Lanyard from "../ElasticBand";

interface StatCardProps {
  value: string;
  label: string;
  subtitle?: string;
}

const StatCard: React.FC<StatCardProps> = ({ value, label, subtitle }) => (
  <div className="flex flex-col">
    <div className="flex items-baseline gap-1">
      <span className="text-5xl font-bold text-white">{value}</span>
      <span className="text-2xl" style={{ color: "#C6A15B" }}>
        +
      </span>
    </div>
    <p className="text-white font-medium mt-2">{label}</p>
    {subtitle && (
      <p className="text-sm mt-1" style={{ color: "#6F8F7A" }}>
        {subtitle}
      </p>
    )}
  </div>
);

const AboutMe: React.FC = () => {
  return (
    <section className="w-full max-w-6xl mx-auto p-6">
      <div
        className="relative rounded-3xl border-2 p-8 md:p-12 overflow-hidden"
        style={{ backgroundColor: "#0F2E26", borderColor: "#6F8F7A80" }}
      >
        {/* Background glow effect */}
        <div
          className="absolute inset-0 rounded-3xl blur-xl"
          style={{ backgroundColor: "#6F8F7A20" }}
        />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left content - Phone mockup */}
          <AboutContent />

          {/* Right content - Text */}
          <Lanyard
            transparent={true}
            wireColor="#ff6b6b"
            wireWidth={1.5}
            cardColor="#4ecdc4"
            frontImage="https://picsum.photos/400/600"
            backImage="https://picsum.photos/400/601"
            metalColor="#silver"
            lanyardTexture="https://example.com/pattern.png"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
