"use client";

import React, { useState } from "react";
import ActiveLink from "./navbar/ActiveLink";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";

export interface NavbarItem {
  label: string;
  href: string;
}

export interface NavbarProps {
  items: NavbarItem[];
}

const Navbar: React.FC<NavbarProps> = ({ items }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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


  // Animate various properties on scroll
  const navBg = useTransform(scrollY, [0, 100], ["rgba(15, 46, 38, 0)", "rgba(15, 46, 38, 0.6)"]);
  const navBackdropFilter = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(24px)"]);
  const navBorder = useTransform(scrollY, [0, 100], ["1px solid rgba(255, 255, 255, 0)", "1px solid rgba(255, 255, 255, 0.15)"]);
  const navBoxShadow = useTransform(scrollY, [0, 100], ["0 0 0 rgba(0,0,0,0)", "0 8px 30px rgba(0,0,0,0.2)"]);
  const navBorderRadius = useTransform(scrollY, [0, 100], ["0px", "16px"]);
  const navWidth = useTransform(scrollY, [0, 100], ["100%", "90%"]);
  const navTop = useTransform(scrollY, [0, 100], ["0px", "16px"]);
  const navPadding = useTransform(scrollY, [0, 100], ["20px", "12px"]);
  const layersOpacity = useTransform(scrollY, [0, 50], [0, 1]);

  const navLinks = items.map((item) => (
    <ActiveLink
      key={item.label}
      href={item.href}
      className="relative text-gray-300 transition-colors px-3 py-1.5 font-semibold"
      activeClassName="text-white"
    >
      {item.label}
    </ActiveLink>
  ));

  return (
    <motion.nav
      style={{
        backgroundColor: navBg,
        backdropFilter: navBackdropFilter,
        WebkitBackdropFilter: navBackdropFilter,
        border: navBorder,
        boxShadow: navBoxShadow,
        borderRadius: navBorderRadius,
        width: navWidth,
        top: navTop,
        padding: navPadding,
      }}
      className="fixed left-1/2 -translate-x-1/2 z-50"
    >
      {/* Frosted glass background layer */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        style={{
          opacity: layersOpacity,
          background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
          transform: "translateZ(-15px)",
          transformStyle: "preserve-3d",
          backdropFilter: "blur(20px)",
        }}
      />
      
      {/* Top edge highlight */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[1px] rounded-full"
        style={{
          opacity: layersOpacity,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
          transform: "translateZ(-10px)",
        }}
      />

      {/* Subtle animated shimmer */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        style={{
          opacity: layersOpacity,
          background: "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)",
          backgroundSize: "200% 100%",
          transform: "translateZ(-5px)",
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

      {/* Inner glass highlight */}
      <motion.div
        className="absolute inset-[2px] rounded-xl"
        style={{
          opacity: layersOpacity,
          background: "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.08), transparent 70%)",
          transform: "translateZ(-20px)",
        }}
      />

      <div className="flex justify-between items-center w-full">
        <motion.div
          className="relative"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            perspective: "500px",
            transformStyle: "preserve-3d",
          }}
        >
          <motion.div
            style={{
              transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            }}
            whileHover={{ z: 15, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Link
              href="/"
              className="text-white font-bold text-2xl"
              style={{
                fontFamily: "'Ephesis', cursive",
                textShadow: "0 2px 8px rgba(0,0,0,0.3)",
              }}
            >
              Khorn Molika
            </Link>
          </motion.div>
        </motion.div>
        <div className="hidden md:flex items-center gap-4 relative">
          {navLinks}
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-2 p-4 rounded-xl border border-gray-700/50 backdrop-blur-md bg-[#0F2E26]/50"
          >
            <div className="flex flex-col items-center gap-4">
              {navLinks}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <link
        href="https://fonts.googleapis.com/css2?family=Ephesis&family=Inter:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
    </motion.nav>
  );
};

export default Navbar;