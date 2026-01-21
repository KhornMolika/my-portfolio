"use client";

import React from "react";
import { motion } from "framer-motion";
import ShinyText from "./ShinyText";

const Footer: React.FC = () => {
  return (
    <motion.footer
      className="w-full pb-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center gap-2">
          {/* Brand/Name */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <ShinyText
              text="KHORN MOLIKA"
              speed={1.5}
              color="#C6A15B"
              shineColor="#ffffff"
              spread={90}
            />
          </motion.div>

          {/* Copyright */}
          <motion.div
            className="text-gray-500 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            © {new Date().getFullYear()} All rights reserved
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
