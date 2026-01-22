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
        className="relative w-full max-w-sm sm:max-w-md lg:max-w-none flex items-center justify-center lg:justify-end"
      >
        {/* Glowing ring */}
        <motion.div
          className="absolute inset-0 bg-linear-to-r from-[#6F8F7A] via-[#C6A15B] to-[#6F8F7A] rounded-full blur-2xl opacity-30"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
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
        {/* Top right floating square */}
        <motion.div
          className="absolute -z-10 
            -top-2 right-2
            sm:-top-4 sm:right-6
            md:-top-4 md:right-8
            lg:-top-4 lg:right-0.5
            w-12 h-12
            sm:w-16 sm:h-16
            md:w-20 md:h-20
            lg:w-24 lg:h-24
            bg-linear-to-br from-[#C6A15B] to-[#6F8F7A] rounded-lg rotate-12 opacity-80"
          animate={{
            y: [0, -20, 0],
            rotate: [12, 18, 12],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Bottom left floating circle */}
        <motion.div
          className="absolute -z-10
            -bottom-4 left-2
            sm:-bottom-6 sm:left-4
            md:-bottom-6 md:left-12
            lg:-bottom-6 lg:left-20
            w-16 h-16
            sm:w-20 sm:h-20
            md:w-24 md:h-24
            lg:w-32 lg:h-32
            bg-linear-to-br from-[#6F8F7A] to-[#C6A15B]
            rounded-full opacity-60"
          animate={{
            y: [0, 20, 0],
            x: [0, -10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>
    </motion.div>
  );
}
