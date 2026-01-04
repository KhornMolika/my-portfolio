"use client";

import { motion } from "framer-motion";
import GooeyNav from "@/components/Navbar";

export interface NavItem {
  label: string;
  href: string;
}

interface HeaderProps {
  items: NavItem[];
}

const Header: React.FC<HeaderProps> = ({ items }) => {
  return (
    <motion.header
      className="w-full fixed top-0 left-0 bg-transparent z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between h-20">
          {/* LEFT: Brand */}
          <motion.div
            className="text-xl font-semibold text-white tracking-wide"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            KHORN Molika
          </motion.div>

          {/* RIGHT: Gooey Nav */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <GooeyNav items={items}  />
          </motion.div>
        </div>
      </div>

      {/* Spacer so content doesn't hide under header if fixed */}
      <div className="h-20"></div>
    </motion.header>
  );
};

export default Header;
