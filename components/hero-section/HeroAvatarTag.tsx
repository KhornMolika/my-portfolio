"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import ShinyText from "../ShinyText";

export interface HeroAvatarTagProps {
  avatarSrc: string;
  avatarAlt?: string;
  text: string;
  variants?: Variants;
  avatarSize?: number;
  showAvatar?: boolean;
  paddingX?: string;
  paddingY?: string;
  borderRadius?: string;
  avatarCircleBorder?: boolean;
  grayscale?: boolean;
}

const HeroAvatarTag: React.FC<HeroAvatarTagProps> = ({
  avatarSrc,
  avatarAlt = "Avatar",
  text,
  variants,
  avatarSize = 20,
  showAvatar = true,
  paddingX = "px-3",
  paddingY = "py-1.5",
  borderRadius = "rounded-full",
  avatarCircleBorder = true,
  grayscale = false,
}) => {
  return (
    <div style={{ perspective: "1200px" }}>
      <motion.div
        className="inline-block"
        variants={variants}
        initial="hidden"
        animate="visible"
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          className={`group relative ${paddingX} ${paddingY}
            bg-linear-to-r from-[#6F8F7A]/5 to-[#C6A15B]/5
            backdrop-blur-sm border border-[#6F8F7A]/20
            ${borderRadius} overflow-hidden`}
          style={{ transformStyle: "preserve-3d" }}
          initial={{ opacity: 0, y: -20, z: -100, rotateX: -15, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, z: 0, rotateX: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.1,
          }}
          whileHover={{
            rotateY: 5,
            rotateX: -3,
            z: 50,
            scale: 1.05,
            borderColor: "rgba(198, 161, 91, 0.35)",
            boxShadow: "0 20px 50px rgba(198, 161, 91, 0.25), 0 0 30px rgba(111, 143, 122, 0.2)",
          }}
        >
          {/* Hover gradient */}
          <motion.div
            className="absolute inset-0 bg-linear-to-r from-[#6F8F7A]/10 to-[#C6A15B]/10"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          />

          <motion.div
            className="relative text-[#C6A15B] text-xs font-light
              tracking-[0.15em] flex items-center gap-1.5
              justify-center lg:justify-start whitespace-nowrap"
            style={{ transformStyle: "preserve-3d" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {showAvatar && (
              <motion.div
                className={`relative overflow-hidden shrink-0 ${
                  avatarCircleBorder
                    ? "rounded-full ring-1 ring-[#C6A15B]/30"
                    : ""
                }`}
                style={{ 
                  width: avatarSize, 
                  height: avatarSize,
                  transformStyle: "preserve-3d"
                }}
                initial={{ scale: 0, rotate: -180, z: -50 }}
                animate={{ scale: 1, rotate: 0, z: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.2,
                }}
                whileHover={{
                  rotateY: 360,
                  z: 30,
                  scale: 1.1,
                  transition: { duration: 0.6, ease: "easeOut" }
                }}
              >
                {/* Avatar image */}
                <motion.div
                  className="w-full h-full"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    z: [0, 5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "easeInOut",
                  }}
                >
                  <Image
                    src={avatarSrc}
                    alt={avatarAlt}
                    fill
                    className={`object-contain ${grayscale ? "grayscale" : ""}`}
                  />
                </motion.div>

                {/* Pulse */}
                <motion.div
                  className={`absolute inset-0 bg-[#C6A15B]/20 pointer-events-none ${
                    avatarCircleBorder ? "rounded-full" : ""
                  }`}
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            )}

            <motion.span
              style={{ transformStyle: "preserve-3d" }}
              initial={{ opacity: 0, x: -10, z: -30 }}
              animate={{ opacity: 1, x: 0, z: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                z: 20,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            > 
              <ShinyText text={text} speed={1.5} color="#C6A15B" shineColor="#ffffff" spread={90} />
            </motion.span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroAvatarTag;