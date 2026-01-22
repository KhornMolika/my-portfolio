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
    >
      {/* Background with gradient border effect */}
      <div
        className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 backdrop-blur-md border border-white/10 transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-[#6F8F7A]/20 group-hover:to-[#C6A15B]/20 group-hover:border-[#C6A15B]/40"
      >
        {/* Icon */}
        <div
          className="text-slate-300 group-hover:text-[#C6A15B] transition-colors duration-300"
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </motion.a>
  );
}
