"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ArrowRight, Download, LucideIcon } from "lucide-react";
import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type IconType = "download" | "arrow" | null;
type IconPosition = "left" | "right";

interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "className"> {
  children: ReactNode;
  variant?: ButtonVariant;
  icon?: IconType;
  iconPosition?: IconPosition;
  onClick?: () => void;
  className?: string;
}

export default function HeroButton({
  children,
  variant = "primary",
  icon = null,
  iconPosition = "right",
  onClick,
  className = "",
  ...props
}: ButtonProps) {
  const variants: Record<ButtonVariant, { base: string; hover: string }> = {
    primary: {
      base: "bg-linear-to-r from-[#6F8F7A] to-[#C6A15B] text-white shadow-lg shadow-[#6F8F7A]/20",
      hover: "shadow-2xl shadow-[#C6A15B]/40",
    },
    secondary: {
      base: "bg-white/5 backdrop-blur-md border border-white/10 text-white shadow-lg shadow-black/10",
      hover: "bg-white/10 border-[#C6A15B]/50 shadow-xl shadow-[#C6A15B]/20",
    },
    ghost: {
      base: "bg-transparent border-2 border-[#C6A15B]/30 text-[#C6A15B]",
      hover: "border-[#C6A15B] bg-[#C6A15B]/10",
    },
  };

  const selectedVariant = variants[variant];

  const iconMap: Record<string, LucideIcon> = {
    download: Download,
    arrow: ArrowRight,
  };

  const IconComponent = icon ? iconMap[icon] : null;

  return (
    <motion.button
      className={`
        group relative px-8 py-4 rounded-xl font-medium
        transition-all duration-500 overflow-hidden
        ${selectedVariant.base}
        hover:${selectedVariant.hover}
        ${className}
        cursor-pointer
      `}
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6 }}
      />

      {/* Glow effect on hover */}
      {variant === "primary" && (
        <motion.div
          className="absolute inset-0 bg-linear-to-r from-[#C6A15B] to-[#6F8F7A] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          initial={false}
        />
      )}

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-3">
        {IconComponent && iconPosition === "left" && (
          <motion.div
            whileHover={{
              x: variant === "primary" ? 2 : 0,
              y: variant === "primary" ? 2 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <IconComponent className="w-5 h-5" />
          </motion.div>
        )}

        <span>{children}</span>

        {IconComponent && iconPosition === "right" && (
          <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.3 }}>
            <IconComponent className="w-5 h-5" />
          </motion.div>
        )}
      </span>

      {/* Ripple effect */}
      <span className="absolute inset-0 rounded-xl overflow-hidden">
        <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </span>
    </motion.button>
  );
}
