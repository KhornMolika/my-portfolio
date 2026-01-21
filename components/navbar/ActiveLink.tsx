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
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative"
    >
      <Link href={href} onClick={handleScroll} className={`${className} ${isActive ? activeClassName : ""}`}>
        {children}
        {isActive && (
          <motion.div
            layoutId="active-pill"
            className="absolute inset-0 bg-zinc-800/50 rounded-full -z-10"
          />
        )}
      </Link>
    </motion.div>
  );
};

export default ActiveLink;
