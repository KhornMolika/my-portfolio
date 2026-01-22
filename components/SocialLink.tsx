"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Facebook, Send, LucideIcon } from "lucide-react";
import { useState } from "react";

type SocialPlatform = "github" | "linkedin" | "facebook" | "telegram";

interface SocialLinkProps {
  platform: SocialPlatform;
  href?: string;
  index?: number;
}

export default function SocialLink({
  platform,
  href = "#",
  index = 0,
}: SocialLinkProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHoveringParent, setIsHoveringParent] = useState(false);

  const iconMap: Record<SocialPlatform, LucideIcon> = {
    github: Github,
    linkedin: Linkedin,
    facebook: Facebook,
    telegram: Send,
  };

  const colorMap: Record<SocialPlatform, { bg: string; border: string; icon: string; glow: string }> = {
    github: {
      bg: "rgba(139, 92, 246, 0.1)",
      border: "rgba(139, 92, 246, 0.2)",
      icon: "#8b5cf6",
      glow: "rgba(139, 92, 246, 0.35)",
    },
    linkedin: {
      bg: "rgba(10, 102, 194, 0.1)",
      border: "rgba(10, 102, 194, 0.2)",
      icon: "#0a66c2",
      glow: "rgba(10, 102, 194, 0.35)",
    },
    facebook: {
      bg: "rgba(24, 119, 242, 0.1)", // Facebook blue
      border: "rgba(24, 119, 242, 0.2)",
      icon: "#1877f2",
      glow: "rgba(24, 119, 242, 0.35)",
    },
    telegram: {
      bg: "rgba(0, 136, 204, 0.1)", // Telegram blue
      border: "rgba(0, 136, 204, 0.2)",
      icon: "#0088cc",
      glow: "rgba(0, 136, 204, 0.35)",
    },
  };

  const Icon = iconMap[platform];
  const colors = colorMap[platform];

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateXValue = ((y - centerY) / centerY) * -8;
    const rotateYValue = ((x - centerX) / centerX) * 8;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div style={{ perspective: "1000px" }}>
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group block"
        style={{
          transformStyle: "preserve-3d",
        }}
        initial={{ opacity: 0, y: 20, z: -30, scale: 0.9 }}
        animate={{ 
          opacity: 1, 
          y: 0, 
          z: 0, 
          scale: 1,
          rotateX: rotateX,
          rotateY: rotateY,
        }}
        transition={{ 
          duration: 0.7, 
          delay: 0.6 + index * 0.1,
          ease: [0.16, 1, 0.3, 1],
          rotateX: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
          rotateY: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
        }}
        whileHover={{
          scale: 1.08,
          z: 35,
          transition: {
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1]
          }
        }}
        whileTap={{
          scale: 0.96,
          transition: {
            duration: 0.15,
            ease: [0.16, 1, 0.3, 1]
          }
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onHoverStart={() => setIsHoveringParent(true)}
        onHoverEnd={() => setIsHoveringParent(false)}
      >
        {/* Soft glow */}
        <motion.div
          className="absolute -inset-1 rounded-2xl opacity-0 blur-2xl"
          style={{
            background: colors.glow,
            transform: "translateZ(-8px)",
          }}
          initial={{ opacity: 0 }}
          whileHover={{ 
            opacity: 1,
            scale: 1.1,
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Main glass container */}
        <motion.div
          className="w-12 h-12 flex items-center justify-center rounded-2xl backdrop-blur-2xl relative overflow-hidden"
          style={{
            transformStyle: "preserve-3d",
            background: "rgba(255, 255, 255, 0.04)",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.1)",
          }}
          whileHover={{
            background: colors.bg,
            borderColor: colors.border,
            boxShadow: `0 12px 40px 0 ${colors.glow}`,
            transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
          }}
        >
          {/* Animated gradient overlay */}
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-0"
            style={{
              background: `linear-gradient(135deg, ${colors.bg}, transparent)`,
              transform: "translateZ(1px)",
            }}
            whileHover={{ 
              opacity: 1,
              transition: { duration: 0.4 }
            }}
          />

          {/* Glass reflection that follows mouse */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${50 + rotateY * 2.5}% ${50 - rotateX * 2.5}%, rgba(255,255,255,0.12) 0%, transparent 60%)`,
              transform: "translateZ(3px)",
              mixBlendMode: "overlay",
            }}
            animate={{
              background: `radial-gradient(circle at ${50 + rotateY * 2.5}% ${50 - rotateX * 2.5}%, rgba(255,255,255,0.12) 0%, transparent 60%)`,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />

          {/* Subtle shimmer */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: "linear-gradient(110deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)",
              backgroundSize: "200% 100%",
              transform: "translateZ(2px)",
            }}
            animate={{
              backgroundPosition: ["200% 0%", "-200% 0%"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Top glass edge */}
          <motion.div
            className="absolute top-0 left-3 right-3 h-px rounded-full"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
              transform: "translateZ(4px)",
            }}
            whileHover={{
              background: `linear-gradient(90deg, transparent, ${colors.border}, transparent)`,
            }}
          />

          {/* Icon with smooth transitions */}
          <motion.div
            className="relative z-10"
            style={{
              transform: "translateZ(6px)",
              transformStyle: "preserve-3d",
            }}
            animate={{
              scale: isHoveringParent ? 1.15 : 1,
              color: isHoveringParent ? colors.icon : "rgba(148, 163, 184, 0.7)",
              filter: isHoveringParent ? "drop-shadow(0 4px 8px rgba(0,0,0,0.2))" : "none",
              y: [0, -2, 0], // Existing animation
            }}
            transition={{
              scale: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
              color: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
              filter: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }, // Existing animation
            }}
          >
            <Icon className="w-5 h-5" strokeWidth={1.5} />
          </motion.div>

          {/* Subtle inner border */}
          <motion.div
            className="absolute inset-px rounded-2xl border border-white/5 pointer-events-none"
            style={{
              transform: "translateZ(5px)",
            }}
            whileHover={{
              borderColor: `${colors.border}40`,
            }}
          />
        </motion.div>

        {/* Floating indicator dot */}
        <motion.div
          className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full opacity-0"
          style={{ 
            transform: "translateZ(8px)",
            background: colors.icon,
            boxShadow: `0 0 8px ${colors.glow}`,
          }}
          whileHover={{ 
            opacity: 1, 
            scale: 1.5,
            y: -2,
            transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
          }}
        />
      </motion.a>
    </div>
  );
}