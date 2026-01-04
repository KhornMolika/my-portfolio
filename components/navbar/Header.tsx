"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import GooeyNav from "@/components/Navbar";

export interface NavItem {
  label: string;
  href: string;
}

interface HeaderProps {
  items: NavItem[];
}

const Header: React.FC<HeaderProps> = ({ items }) => {
  const { scrollY } = useScroll();

  // Improved scroll transforms with better ranges
  const backgroundColor = useTransform(
    scrollY,
    [0, 50, 150],
    ["rgba(10, 25, 20, 0)", "rgba(10, 25, 20, 0.7)", "rgba(10, 25, 20, 0.95)"]
  );

  const backdropBlur = useTransform(
    scrollY,
    [0, 50, 150],
    ["blur(0px)", "blur(8px)", "blur(16px)"]
  );

  const boxShadow = useTransform(
    scrollY,
    [0, 50, 150],
    [
      "0 0 0 rgba(0, 0, 0, 0)",
      "0 2px 20px rgba(0, 0, 0, 0.1)",
      "0 4px 40px rgba(0, 0, 0, 0.2)",
    ]
  );

  const borderBottom = useTransform(
    scrollY,
    [0, 50],
    ["1px solid rgba(255, 255, 255, 0)", "1px solid rgba(255, 255, 255, 0.1)"]
  );

  return (
    <motion.header
      className="w-full fixed top-0 left-0 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        backgroundColor,
        backdropFilter: backdropBlur,
        WebkitBackdropFilter: backdropBlur,
        boxShadow,
        borderBottom,
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* LEFT: Brand */}
          <motion.div
            className="text-lg sm:text-xl md:text-2xl font-semibold text-white tracking-wide z-50"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ fontFamily: "'Ephesis', cursive" }}
          >
            KHORN Molika
          </motion.div>

          {/* RIGHT: Gooey Nav */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <GooeyNav items={items} />
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
