"use client";

import { motion, Variants } from "framer-motion";
import { MapPin } from "lucide-react";
import SocialLink from "@/components/SocialLink";
import ButtonCus from "@/components/hero-section/HeroButton";
import HeroAvatarTag from "./HeroAvatarTag";

type SocialPlatform = "github" | "linkedin" | "twitter" | "mail";

export default function HeroContent() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const socialPlatforms: SocialPlatform[] = [
    "github",
    "linkedin",
    "twitter",
    "mail",
  ];

  return (
    <>
      {/* Font import */}
      <link
        href="https://fonts.googleapis.com/css2?family=Ephesis&family=Inter:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <motion.div
        className="space-y-8 sm:space-y-10 w-full text-center lg:text-left flex flex-col items-center lg:items-start"
        style={{ fontFamily: "'Inter', sans-serif" }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3 }}
      >


        <motion.div variants={itemVariants}>
          <HeroAvatarTag
            avatarSrc="/images/pixel.png"
            text={'"BUILDING THE FUTURE"'}
            paddingX="px-8"
            paddingY="py-4"
            avatarSize={28}
            borderRadius="rounded-xl"
            avatarCircleBorder={false}
          />
        </motion.div>

        {/* Name with staggered animation */}
        <motion.div className="space-y-2" variants={itemVariants}>
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl
               font-light text-white leading-[1.15] tracking-tight"
          >
            Hi, I'm
          </motion.h1>

          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl
               font-normal leading-[1.15]"
            style={{ fontFamily: "'Ephesis', cursive" }}
          >
            <motion.span
              className="bg-linear-to-r from-[#6F8F7A] via-[#C6A15B] to-[#6F8F7A]
                 text-transparent bg-clip-text"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Khorn Molika
            </motion.span>
          </motion.h2>

          <motion.div
            className="h-0.5 bg-linear-to-r from-[#6F8F7A] to-[#C6A15B] rounded-full"
            style={{ transformOrigin: "left" }}
          />
        </motion.div>

        {/* Description with fade */}
        <motion.p
          className="text-sm sm:text-base md:text-md text-slate-300/90 leading-relaxed max-w-2xl font-light"
          variants={itemVariants}
        >
          Full-stack web developer passionate about building responsive,
          performant applications. Experienced in React, TypeScript, and modern
          frameworks, with a commitment to writing clean, maintainable code and
          creating seamless user experiences.
        </motion.p>

        {/* Buttons with hover effects */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          variants={itemVariants}
        >
          <ButtonCus variant="primary" icon="download" iconPosition="right">
            Download Resume
          </ButtonCus>

          <ButtonCus variant="secondary" icon="arrow" iconPosition="right">
            View Projects
          </ButtonCus>
        </motion.div>

        {/* Social links with modern minimal design */}
        <motion.div className="flex items-center gap-4" variants={itemVariants}>
          <motion.span
            className="text-sm text-slate-400 font-light tracking-wider"
          >
            CONNECT
          </motion.span>
          <motion.div
            className="h-px w-8 bg-linear-to-r from-slate-600 to-transparent"
            style={{ transformOrigin: "left" }}
          />
          <div className="flex gap-3">
            {socialPlatforms.map((platform, index) => (
              <SocialLink
                key={platform}
                platform={platform}
                href="#"
                index={index}
              />
            ))}
          </div>
        </motion.div>

        {/* Subtle stats or info */}
        <motion.div
          className="flex flex-wrap gap-6 sm:gap-8 pt-4"
          variants={itemVariants}
        >
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-emerald-400"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.8, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <span className="text-sm text-slate-400 font-light">
              Available for freelance
            </span>
          </motion.div>
          <div className="h-4 w-px bg-slate-700"></div>
          <motion.div
            className="text-sm text-slate-400 font-light flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <MapPin className="w-4 h-4 text-[#C6A15B]" />
            Based in Phnom Penh
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}
