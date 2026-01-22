"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ActiveLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
}

const ActiveLink: React.FC<ActiveLinkProps> = ({
  href,
  children,
  className = "",
  activeClassName = "active",
}) => {
  const [isActive, setIsActive] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScrollSpy = () => {
      const element = document.querySelector(href);
      if (element) {
        const rect = element.getBoundingClientRect();
        const isInView = rect.top <= 100 && rect.bottom >= 100;
        setIsActive(isInView);
      }
    };

    window.addEventListener("scroll", handleScrollSpy);
    return () => {
      window.removeEventListener("scroll", handleScrollSpy);
    };
  }, [href]);

  return (
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
          transformStyle: "preserve-3d",
        }}
        whileHover={{ z: 20, scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative"
      >
        <Link
          href={href}
          onClick={handleScroll}
          className={`${className} ${
            isActive ? activeClassName : ""
          } transition-all duration-300 group`}
        >
          <span
            className="relative z-10 transition-all duration-300 group-hover:text-white"
            style={{
              textShadow: isActive
                ? "0 2px 8px rgba(0,0,0,0.3)"
                : "none",
            }}
          >
            {children}
          </span>
          {isActive && (
            <motion.div
              layoutId="active-pill"
              className="absolute inset-0 bg-gradient-to-r from-[#6F8F7A] to-[#C6A15B] rounded-full -z-10"
              style={{ 
                transform: "translateZ(-5px)",
                boxShadow: "0 0 12px rgba(198, 161, 91, 0.6)",
              }}
            />
          )}
          <motion.div
            className="absolute inset-0 rounded-full -z-20"
            style={{
              background:
                "linear-gradient(135deg, rgba(111, 143, 122, 0.2) 0%, rgba(198, 161, 91, 0.1) 100%)",
              transform: "translateZ(-10px)",
            }}
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          />
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default ActiveLink;
