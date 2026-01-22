"use client";

import { motion } from "framer-motion";
import ProfileCard from "../ProfileCard";
import { useRef } from "react";
import gsap from "gsap";

export default function HeroAvatar() {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    const rotateX = gsap.utils.mapRange(0, height, -8, 8)(y);
    const rotateY = gsap.utils.mapRange(0, width, 8, -8)(x);

    gsap.to(containerRef.current, {
      rotationX: rotateX,
      rotationY: rotateY,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(containerRef.current, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.3 }}
      className="relative w-full max-w-md lg:max-w-lg flex justify-center lg:justify-end mx-auto px-4 sm:px-6 lg:px-0"
    >
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-full flex items-center justify-center lg:justify-end"
      >
        {/* Glowing ring */}
        <motion.div
          className="absolute inset-0 bg-linear-to-r from-[#6F8F7A] via-[#C6A15B] to-[#6F8F7A] rounded-full blur-2xl opacity-30"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Main circle */}
        <motion.div variants={itemVariants} className="relative z-10">
          <ProfileCard
            name="KHORN Molika"
            title="Software Engineer"
            handle="khornmolika"
            status="Online"
            contactText="Contact Me"
            avatarUrl="/images/pixel.png"
            showUserInfo={true}
            enableTilt={false}
            enableMobileTilt={false}
            onContactClick={() => {
              document.getElementById("contact")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          />
        </motion.div>

        {/* Floating elements */}
        {/* Top right floating square with enhanced mobile design */}
        <motion.div
          className="absolute -z-10 
            top-0 right-4
            sm:-top-2 sm:right-8
            md:-top-4 md:right-12
            lg:-top-6 lg:right-2
            w-12 h-12
            sm:w-16 sm:h-16
            md:w-20 md:h-20
            lg:w-24 lg:h-24
            bg-linear-to-br from-[#C6A15B] via-[#D4B56E] to-[#6F8F7A] 
            rounded-xl sm:rounded-2xl shadow-lg shadow-[#C6A15B]/20
            opacity-70 sm:opacity-80"
          style={{ rotate: 12 }}
          animate={{
            y: [0, -15, 0],
            rotate: [12, 18, 12],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Top left accent circle - only visible on sm+ */}
        <motion.div
          className="absolute -z-10
            hidden sm:block
            sm:top-8 sm:left-8
            md:top-4 md:left-16
            lg:top-0 lg:left-24
            w-10 h-10
            sm:w-14 sm:h-14
            md:w-16 md:h-16
            lg:w-20 lg:h-20
            bg-linear-to-br from-[#8BA992] to-[#6F8F7A]/40
            rounded-full shadow-md shadow-[#6F8F7A]/20
            opacity-50"
          animate={{
            y: [0, -10, 0],
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />

        {/* Bottom left floating circle with glow */}
        <motion.div
          className="absolute -z-10
            bottom-2 left-4
            sm:-bottom-4 sm:left-8
            md:-bottom-6 md:left-16
            lg:-bottom-8 lg:left-24
            w-14 h-14
            sm:w-20 sm:h-20
            md:w-24 md:h-24
            lg:w-32 lg:h-32
            bg-linear-to-br from-[#6F8F7A] via-[#8BA992] to-[#C6A15B]
            rounded-full shadow-xl shadow-[#6F8F7A]/30
            opacity-60 sm:opacity-70"
          animate={{
            y: [0, 15, 0],
            x: [0, -8, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Bottom right small accent - mobile friendly */}
        <motion.div
          className="absolute -z-10
            bottom-8 right-6
            sm:bottom-4 sm:right-12
            md:bottom-0 md:right-16
            lg:-bottom-2 lg:right-20
            w-8 h-8
            sm:w-12 sm:h-12
            md:w-14 md:h-14
            lg:w-16 lg:h-16
            bg-linear-to-br from-[#C6A15B]/60 to-[#D4B56E]/40
            rounded-lg sm:rounded-xl
            shadow-md shadow-[#C6A15B]/15
            opacity-60"
          style={{ rotate: -15 }}
          animate={{
            y: [0, 12, 0],
            rotate: [-15, -20, -15],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>
    </motion.div>
  );
}