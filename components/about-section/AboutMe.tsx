"use client";

import React, { useRef } from "react";
import AboutContent from "./AboutContent";
import Lanyard from "../ElasticBand";
import { motion, useScroll, useTransform } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const AboutMe: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"]);

  return (
    <motion.section
      ref={targetRef}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.3 }}
      className="w-full max-w-6xl mx-auto p-6"
    >
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
            backImage="/images/card_avatar_bg.png"
          />
        </div>
      </div>
    </motion.section>
  );
};

export default AboutMe;
