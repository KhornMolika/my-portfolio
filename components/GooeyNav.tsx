"use client";

import React, { useState, useRef, useEffect } from "react";

export interface GooeyNavItem {
  label: string;
  href: string;
}

export interface GooeyNavProps {
  items: GooeyNavItem[];
  initialActiveIndex?: number;
}

const GooeyNav: React.FC<GooeyNavProps> = ({
  items,
  initialActiveIndex = 0,
}) => {
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLUListElement>(null);

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
        className="absolute bottom-0 h-10 bg-white/30 rounded-full blur-lg transition-all duration-500 ease-out"
        style={{
          left: pillStyle.left - 4,
          width: pillStyle.width + 8,
          transform: isHovering ? "scale(1.1)" : "scale(1)",
        }}
      />

      {/* Moving pill with spring animation */}
      <span
        className="absolute bottom-0 h-10 bg-white rounded-full shadow-lg z-0"
        style={{
          left: pillStyle.left,
          width: pillStyle.width,
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
              <a
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveIndex(index);
                }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                className="relative px-4 py-2 inline-block font-medium cursor-pointer"
                style={{
                  color: isActive || isHovered ? "#000" : "#fff",
                  transition:
                    "color 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s ease-out",
                  transform:
                    isHovered && !isActive
                      ? "translateY(-1px)"
                      : "translateY(0)",
                }}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default GooeyNav;
