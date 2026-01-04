"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScroll, useTransform, motion } from "framer-motion";

// ==================== COLOR CONFIGURATION ====================
const COLORS = {
  // Border & Glow
  borderColor: "rgba(255, 255, 255, 0.3)", // Subtle border color

  // Text Colors
  inactiveText: "rgba(255, 255, 255, 0.7)", // Default/inactive text (more subtle)
  activeText: "#ffffff", // Active/hovered text (bright white)

  // Fill Color
  fillColor: "rgba(255, 255, 255, 0.15)", // Subtle fill background

  // Glow Effects
  glowBackground: "rgba(255, 255, 255, 0.1)", // Subtle background glow
  glowHoverShadow: "rgba(255, 255, 255, 0.3)", // Hover shadow
  glowDefaultShadow: "rgba(255, 255, 255, 0.15)", // Default shadow

  // Background (page background - not used in component but for reference)
  pageBackground: "#0F2E26", // Dark green
  mobileOverlayBg: "rgba(0, 0, 0, 0.6)", // Mobile overlay
};

// ==================== STYLE CONFIGURATION ====================
const STYLE_OPTIONS = {
  hasFill: true, // true = filled background, false = transparent
  hasBorder: true, // true = show border, false = no border
};
// =============================================================

export interface NavbarItem {
  label: string;
  href: string;
}

export interface NavbarProps {
  items: NavbarItem[];
}

const Navbar: React.FC<NavbarProps> = ({ items }) => {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(0);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLUListElement>(null);

  // Get scroll position for mobile menu background
  const { scrollY } = useScroll();

  // Transform scroll to background color (matches Header component)
  const mobileMenuBg = useTransform(
    scrollY,
    [0, 50, 150],
    [
      "rgba(10, 25, 20, 0.75)", // Light when at top
      "rgba(10, 25, 20, 0.90)", // Medium when scrolling
      "rgba(10, 25, 20, 0.98)", // Solid when scrolled
    ]
  );

  // Set active index based on current pathname
  useEffect(() => {
    const currentIndex = items.findIndex((item) => item.href === pathname);
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
    }
  }, [pathname, items]);

  useEffect(() => {
    const updatePill = () => {
      if (!navRef.current || window.innerWidth < 768) return;
      const targetIndex =
        isHovering && hoveredIndex !== null ? hoveredIndex : activeIndex;
      const targetLi = navRef.current.children[targetIndex] as HTMLElement;
      if (targetLi) {
        setPillStyle({
          left: targetLi.offsetLeft,
          width: targetLi.offsetWidth,
        });
      }
    };

    updatePill();
    window.addEventListener("resize", updatePill);
    return () => window.removeEventListener("resize", updatePill);
  }, [activeIndex, items, isHovering, hoveredIndex]);

  const handleMouseEnter = (index: number) => {
    if (window.innerWidth < 768) return;
    setIsHovering(true);
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    if (window.innerWidth < 768) return;
    setIsHovering(false);
    setHoveredIndex(null);
  };

  const handleMobileClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="relative hidden md:block">
        {/* Glow effect behind the pill */}
        <span
          className="absolute bottom-0 h-10 rounded-full blur-lg transition-all duration-500 ease-out"
          style={{
            left: pillStyle.left - 4,
            width: pillStyle.width + 8,
            backgroundColor: COLORS.glowBackground,
            transform: isHovering ? "scale(1.1)" : "scale(1)",
          }}
        />

        {/* Moving pill with spring animation */}
        <span
          className="absolute bottom-0 h-10 rounded-full z-0"
          style={{
            left: pillStyle.left,
            width: pillStyle.width,
            border: STYLE_OPTIONS.hasBorder
              ? `1.5px solid ${COLORS.borderColor}`
              : "none",
            backgroundColor: STYLE_OPTIONS.hasFill
              ? COLORS.fillColor
              : "transparent",
            boxShadow: isHovering
              ? `0 0 20px ${COLORS.glowHoverShadow}`
              : `0 0 10px ${COLORS.glowDefaultShadow}`,
            transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
            transform: isHovering ? "scale(1.05)" : "scale(1)",
          }}
        />

        <ul ref={navRef} className="relative flex gap-6 list-none p-0 m-0 z-10">
          {items.map((item, index) => {
            const isActive = activeIndex === index;
            const isHovered = hoveredIndex === index;

            return (
              <li key={index} className="relative z-10">
                <Link
                  href={item.href}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  className="relative px-4 py-2 inline-block font-medium cursor-pointer"
                  style={{
                    color:
                      isActive || isHovered
                        ? COLORS.activeText
                        : COLORS.inactiveText,
                    transition:
                      "color 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s ease-out",
                    transform:
                      isHovered && !isActive
                        ? "translateY(-1px)"
                        : "translateY(0)",
                  }}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
        aria-label="Toggle menu"
      >
        <span
          className={`w-6 h-0.5 bg-white transition-all duration-300 ${
            isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`w-6 h-0.5 bg-white transition-all duration-300 ${
            isMobileMenuOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`w-6 h-0.5 bg-white transition-all duration-300 ${
            isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 backdrop-blur-sm transition-opacity duration-300 z-40 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{
          backgroundColor: COLORS.mobileOverlayBg,
        }}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu with scroll-synced background */}
      <motion.nav
        className={`md:hidden fixed top-0 right-0 h-screen w-64 shadow-2xl transition-transform duration-300 ease-out z-40 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          backgroundColor: mobileMenuBg,
          backdropFilter: "blur(16px)",
          borderLeft: `1px solid ${COLORS.borderColor}`,
          background: `linear-gradient(135deg, rgba(10, 25, 20, 0.95) 0%, rgba(15, 46, 38, 0.98) 100%)`,
        }}
      >
        <ul className="flex flex-col gap-2 list-none p-0 m-0 pt-24 px-6">
          {items.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <li key={index}>
                <Link
                  href={item.href}
                  onClick={handleMobileClick}
                  className="block px-4 py-3 font-medium rounded-lg transition-all duration-200"
                  style={{
                    color: isActive ? COLORS.activeText : COLORS.inactiveText,
                    backgroundColor: isActive
                      ? "rgba(255, 255, 255, 0.2)"
                      : "rgba(255, 255, 255, 0.1)",
                    borderLeft: isActive
                      ? `3px solid ${COLORS.borderColor}`
                      : "3px solid transparent",
                    boxShadow: isActive
                      ? "0 2px 8px rgba(0, 0, 0, 0.2)"
                      : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor =
                        "rgba(255, 255, 255, 0.15)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor =
                        "rgba(255, 255, 255, 0.1)";
                    }
                  }}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </motion.nav>
    </>
  );
};

export default Navbar;
