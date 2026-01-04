"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, LucideIcon } from "lucide-react";

type SocialPlatform = "github" | "linkedin" | "twitter" | "mail";

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
  const iconMap: Record<SocialPlatform, LucideIcon> = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    mail: Mail,
  };

  const Icon = iconMap[platform];

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Background with gradient border effect */}
      <motion.div
        className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 backdrop-blur-md border border-white/10 transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-[#6F8F7A]/20 group-hover:to-[#C6A15B]/20 group-hover:border-[#C6A15B]/40"
        whileHover={{ boxShadow: "0 10px 30px rgba(198, 161, 91, 0.3)" }}
      >
        {/* Icon */}
        <motion.div
          className="text-slate-300 group-hover:text-[#C6A15B] transition-colors duration-300"
          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
        >
          <Icon className="w-5 h-5" />
        </motion.div>
      </motion.div>

      {/* Tooltip */}
      <motion.div
        className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-900/95 backdrop-blur-sm border border-[#C6A15B]/30 rounded-lg text-xs text-white whitespace-nowrap pointer-events-none"
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {platform.charAt(0).toUpperCase() + platform.slice(1)}
        <motion.div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900/95 border-r border-b border-[#C6A15B]/30 rotate-45" />
      </motion.div>

      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#6F8F7A] to-[#C6A15B] opacity-0 blur-xl -z-10"
        whileHover={{ opacity: 0.3 }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );
}
