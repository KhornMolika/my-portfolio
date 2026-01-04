"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ==================== COLOR CONFIGURATION ====================
const COLORS = {
  // Border & Glow
  borderColor: "#ffffff", // Border color

  // Text Colors
  inactiveText: "#ffffff", // Default/inactive text
  activeText: "#ffffff", // Active/hovered text

  // Fill Color
  fillColor: "#ffffff", // Fill background color

  // Glow Effects
  glowBackground: "rgba(255, 255, 255, 0.2)", // Background glow
  glowHoverShadow: "rgba(255, 255, 255, 0.4)", // Hover shadow
  glowDefaultShadow: "rgba(255, 255, 255, 0.2)", // Default shadow

  // Background (page background - not used in component but for reference)
  pageBackground: "#0F2E26", // Dark green
};

// ==================== STYLE CONFIGURATION ====================
const STYLE_OPTIONS = {
  hasFill: false, // true = filled background, false = transparent
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
  const navRef = useRef<HTMLUListElement>(null);

  // Set active index based on current pathname
  useEffect(() => {
    const currentIndex = items.findIndex((item) => item.href === pathname);
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
    }
  }, [pathname, items]);

  useEffect(() => {
    const updatePill = () => {
      if (!navRef.current) return;
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
    setIsHovering(true);
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setHoveredIndex(null);
  };

  return (
    <nav className="relative">
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
            ? `2px solid ${COLORS.borderColor}`
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
  );
};

export default Navbar;
