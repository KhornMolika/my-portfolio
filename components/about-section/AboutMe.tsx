import React from "react";
import AboutContent from "./AboutContent";
import Lanyard from "../ElasticBand";

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
            wireColor="#C6A15B"
            wireWidth={1.5}
            cardColor="#6F8F7A"
            backCardColor="#6F8F7A"
            frontImage="/images/ampor_latest.png"
            backImage="/images/pixel.png"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
