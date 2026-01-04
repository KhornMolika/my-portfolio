"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

export interface HeroAvatarTagProps {
  /** Path to avatar image */
  avatarSrc: string;
  /** Alt text for avatar image */
  avatarAlt?: string;
  /** Badge text content */
  text: string;
  /** Animation variants for parent container (optional) */
  variants?: Variants;
  /** Avatar size in pixels (default: 20) */
  avatarSize?: number;
  /** Whether to show avatar (default: true) */
  showAvatar?: boolean;
  /** Horizontal padding (default: "px-3") */
  paddingX?: string;
  /** Vertical padding (default: "py-1.5") */
  paddingY?: string;
  /** Border radius for container (default: "rounded-full") */
  borderRadius?: string;
  /** Whether avatar should have circular border (default: true) */
  avatarCircleBorder?: boolean;
  /** Whether avatar should be grayscale (default: false) */
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
    <motion.div
      className="inline-block"
      variants={variants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className={`group relative ${paddingX} ${paddingY}
           bg-linear-to-r from-[#6F8F7A]/5 to-[#C6A15B]/5
           backdrop-blur-sm border border-[#6F8F7A]/20
           ${borderRadius} overflow-hidden`}
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.1,
        }}
        whileHover={{
          borderColor: "rgba(198, 161, 91, 0.35)",
          boxShadow: "0 6px 24px rgba(198, 161, 91, 0.12)",
          scale: 1.02,
        }}
      >
        <motion.div
          className="absolute inset-0 bg-linear-to-r from-[#6F8F7A]/10 to-[#C6A15B]/10"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        />

        <motion.p
          className="relative text-[#C6A15B] text-xs font-light
              tracking-[0.15em] flex items-center gap-1.5
              justify-center lg:justify-start whitespace-nowrap"
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
              style={{ width: avatarSize, height: avatarSize }}
              initial={{ scale: 0, rotate: -180 }}
              animate={{
                scale: 1,
                rotate: 0,
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2,
              }}
            >
              {/* Avatar image container with breathing animation */}
              <motion.div
                className="w-full h-full"
                animate={{ scale: [1, 1.05, 1] }}
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

              {/* Pulse effect */}
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
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {text}
          </motion.span>
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default HeroAvatarTag;
