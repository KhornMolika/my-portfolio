"use client";
import { motion, HTMLMotionProps } from "framer-motion";
import { ArrowRight, Download, LucideIcon } from "lucide-react";
import { ReactNode, useState } from "react";

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
      base: "bg-gradient-to-br from-[#6F8F7A]/80 via-[#8FA67F]/70 to-[#C6A15B]/80 text-white backdrop-blur-xl border border-white/20",
      hover: "shadow-xl shadow-[#C6A15B]/40",
    },
    secondary: {
      base: "bg-white/10 backdrop-blur-2xl border border-white/20 text-white",
      hover: "bg-white/20 border-[#C6A15B]/60 shadow-lg shadow-[#C6A15B]/20",
    },
    ghost: {
      base: "bg-white/5 backdrop-blur-xl border-2 border-[#C6A15B]/40 text-[#C6A15B]",
      hover: "border-[#C6A15B] bg-[#C6A15B]/15 shadow-md shadow-[#C6A15B]/15",
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
    
    const rotateXValue = ((y - centerY) / centerY) * -12;
    const rotateYValue = ((x - centerX) / centerX) * 12;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.button
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${selectedVariant.base} hover:${selectedVariant.hover} ${className}`}
      style={{
        transformStyle: "preserve-3d",
        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      whileHover={{ 
        scale: 1.05,
        z: 20, // Keep some local z-depth on hover
      }}
      whileTap={{ 
        scale: 0.95,
        z: 10,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      {...props}
    >
      {/* Glass frosted background layer */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)",
          transform: "translateZ(-10px)",
          transformStyle: "preserve-3d",
          backdropFilter: "blur(20px)",
        }}
      />
      
      {/* Glass highlight top edge */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[1px] rounded-full"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
          transform: "translateZ(12px)",
        }}
      />

      {/* 3D depth layers with glass effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: "linear-gradient(to bottom right, rgba(0,0,0,0.1), transparent)",
          transform: "translateZ(-8px)",
          transformStyle: "preserve-3d",
        }}
      />
      
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: "linear-gradient(to top left, rgba(255,255,255,0.1), transparent)",
          transform: "translateZ(-4px)",
          transformStyle: "preserve-3d",
        }}
      />

      {/* Animated shimmer effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)",
          backgroundSize: "200% 100%",
          transform: "translateZ(6px)",
        }}
        animate={{
          backgroundPosition: ["200% 0%", "-200% 0%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Dynamic light reflection based on tilt */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${50 + rotateY * 3}% ${50 - rotateX * 3}%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
          transform: "translateZ(8px)",
          mixBlendMode: "overlay",
        }}
      />

      {/* Glow effect with glassmorphism */}
      {variant === "primary" && (
        <motion.div
          className="absolute -inset-1 rounded-2xl opacity-0 blur-2xl"
          style={{
            background: "linear-gradient(135deg, rgba(111, 143, 122, 0.6), rgba(198, 161, 91, 0.6))",
            transform: "translateZ(-15px)",
          }}
          whileHover={{ opacity: 0.8 }}
          transition={{ duration: 0.4 }}
        />
      )}

      {/* Glass inner glow */}
      <motion.div
        className="absolute inset-[2px] rounded-2xl"
        style={{
          background: "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.15), transparent 70%)",
          transform: "translateZ(2px)",
        }}
      />

      {/* Content with enhanced 3D pop */}
      <motion.span 
        className="relative z-10 flex items-center justify-center gap-2.5"
        style={{
          transform: "translateZ(14px)",
          transformStyle: "preserve-3d",
          textShadow: "0 1px 4px rgba(0,0,0,0.15)",
        }}
      >
        {IconComponent && iconPosition === "left" && (
          <motion.div
            whileHover={{ x: -4, scale: 1.1 }}
            style={{ 
              transform: "translateZ(6px)",
              transformStyle: "preserve-3d",
            }}
          >
            <IconComponent className="w-5 h-5" />
          </motion.div>
        )}
        <motion.span
          style={{ 
            transform: "translateZ(8px)",
            letterSpacing: "0.02em",
          }}
        >
          {children}
        </motion.span>
        {IconComponent && iconPosition === "right" && (
          <motion.div
            whileHover={{ x: 4, scale: 1.1 }}
            style={{ 
              transform: "translateZ(6px)",
              transformStyle: "preserve-3d",
            }}
          >
            <IconComponent className="w-5 h-5" />
          </motion.div>
        )}
      </motion.span>

      {/* Ripple effect on tap */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)",
          transform: "translateZ(3px)",
        }}
        initial={{ scale: 0, opacity: 0 }}
        whileTap={{ scale: 2.5, opacity: [0.5, 0] }}
        transition={{ duration: 0.5 }}
      />

      {/* Glass border highlight */}
      <motion.div
        className="absolute inset-0 rounded-2xl border border-white/30"
        style={{
          transform: "translateZ(15px)",
        }}
        whileHover={{
          borderColor: "rgba(255,255,255,0.5)",
        }}
      />

      {/* Bottom shadow for depth */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          boxShadow: "inset 0 -1px 4px rgba(0,0,0,0.1)",
          transform: "translateZ(1px)",
        }}
      />
    </motion.button>
  );
}