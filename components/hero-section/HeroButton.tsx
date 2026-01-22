"use client";
import { motion, HTMLMotionProps } from "framer-motion";
import { ArrowRight, Download, LucideIcon } from "lucide-react";
import {  ReactNode, useState } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type IconType = "download" | "arrow";
type IconPosition = "left" | "right";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "className"> {
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
  icon,
  iconPosition = "right",
  onClick,
  className = "",
  ...props
}: ButtonProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const variants: Record<ButtonVariant, { base: string; hover: string }> = {
    primary: {
      base: "bg-gradient-to-br from-[#6F8F7A] via-[#8FA67F] to-[#C6A15B] text-white",
      hover: "shadow-2xl shadow-[#C6A15B]/60",
    },
    secondary: {
      base: "bg-white/5 backdrop-blur-md border border-white/10 text-white",
      hover: "bg-white/10 border-[#C6A15B]/50 shadow-xl shadow-[#C6A15B]/30",
    },
    ghost: {
      base: "bg-transparent border-2 border-[#C6A15B]/30 text-[#C6A15B]",
      hover: "border-[#C6A15B] bg-[#C6A15B]/10 shadow-lg shadow-[#C6A15B]/20",
    },
  };

  const selectedVariant = variants[variant];

  const iconMap: Record<IconType, LucideIcon | null> = {
    download: Download,
    arrow: ArrowRight,
  };

  const IconComponent = icon ? iconMap[icon] : null;

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateXValue = ((y - centerY) / centerY) * -15;
    const rotateYValue = ((x - centerX) / centerX) * 15;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div className="perspective-1000" style={{ perspective: "1000px" }}>
      <motion.button
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative overflow-hidden px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${selectedVariant.base} ${className}`}
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        }}
        whileHover={{ 
          scale: 1.05,
          z: 50,
        }}
        whileTap={{ 
          scale: 0.95,
          z: 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        {...props}
      >
        {/* 3D depth layers */}
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-black/20 to-transparent"
          style={{
            transform: "translateZ(-8px)",
            transformStyle: "preserve-3d",
          }}
        />
        
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent"
          style={{
            transform: "translateZ(-4px)",
            transformStyle: "preserve-3d",
          }}
        />

        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6 }}
          style={{ transform: "translateZ(2px)" }}
        />

        {/* Dynamic light reflection */}
        <motion.div
          className="absolute inset-0 rounded-xl"
          style={{
            background: `radial-gradient(circle at ${50 + rotateY * 2}% ${50 - rotateX * 2}%, rgba(255,255,255,0.3) 0%, transparent 50%)`,
            transform: "translateZ(4px)",
          }}
        />

        {/* Glow effect */}
        {variant === "primary" && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#6F8F7A] to-[#C6A15B] opacity-0 blur-xl"
            whileHover={{ opacity: 0.6 }}
            transition={{ duration: 0.3 }}
            style={{ transform: "translateZ(-12px)" }}
          />
        )}

        {/* Content with 3D pop */}
        <motion.span 
          className="relative z-10 flex items-center justify-center gap-2"
          style={{
            transform: "translateZ(8px)",
            transformStyle: "preserve-3d",
          }}
        >
          {IconComponent && iconPosition === "left" && (
            <motion.div
              whileHover={{ x: -3 }}
              style={{ transform: "translateZ(4px)" }}
            >
              <IconComponent className="w-5 h-5" />
            </motion.div>
          )}
          <motion.span
            style={{ transform: "translateZ(6px)" }}
          >
            {children}
          </motion.span>
          {IconComponent && iconPosition === "right" && (
            <motion.div
              whileHover={{ x: 3 }}
              style={{ transform: "translateZ(4px)" }}
            >
              <IconComponent className="w-5 h-5" />
            </motion.div>
          )}
        </motion.span>

        {/* Ripple effect */}
        <motion.div
          className="absolute inset-0 rounded-xl bg-white/30"
          initial={{ scale: 0, opacity: 0.5 }}
          whileTap={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{ transform: "translateZ(1px)" }}
        />

        {/* Edge highlight */}
        <motion.div
          className="absolute inset-0 rounded-xl border border-white/20"
          style={{
            transform: "translateZ(10px)",
          }}
        />
      </motion.button>
    </div>
  );
}