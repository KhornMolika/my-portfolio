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
  const navBg = useTransform(scrollY, [0, 100], ["rgba(15, 46, 38, 0)", "rgba(15, 46, 38, 0.5)"]);
  const navBackdropFilter = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(16px)"]);
  const navBorder = useTransform(scrollY, [0, 100], ["1px solid rgba(255, 255, 255, 0)", "1px solid rgba(255, 255, 255, 0.1)"]);
  const navBoxShadow = useTransform(scrollY, [0, 100], ["0 0 0 rgba(0,0,0,0)", "0 4px 30px rgba(0,0,0,0.1)"]);
  const navBorderRadius = useTransform(scrollY, [0, 100], ["0px", "12px"]);
  const navWidth = useTransform(scrollY, [0, 100], ["100%", "80%"]);
  const navTop = useTransform(scrollY, [0, 100], ["0px", "16px"]);
  const navPadding = useTransform(scrollY, [0, 100], ["24px", "16px"]);

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