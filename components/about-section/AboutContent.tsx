"use client";

import AboutTag from "./AboutTag";
import { motion } from "framer-motion";
import TextType from "../TextType"; // Import the TextType component

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function AboutContent() {
  const fullDescription = `I'm a full-stack developer with a passion for creating beautiful and functional web applications. I have a strong background in both front-end and back-end development, and I'm always looking for new challenges and opportunities to learn.\n\nWhen I'm not coding, you can find me exploring the latest in AI and machine learning, or tinkering with new technologies. I'm a firm believer in the power of technology to make a positive impact on the world, and I'm excited to be a part of this ever-evolving industry.`;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.3 }}
    >
      <motion.div variants={itemVariants}>
        <AboutTag />
      </motion.div>
      <motion.h2
        variants={itemVariants}
        className="text-4xl md:text-5xl font-bold text-white mb-6 mt-4"
      >
        About Me
      </motion.h2>

      <motion.div variants={itemVariants} className="h-64">
        <TextType
          text={fullDescription}
          typingSpeed={50}
          pauseDuration={1500}
          deletingSpeed={0} // Prevents deleting
          loop={false}
          showCursor={false}
          startOnVisible={true}
          className="leading-relaxed"
          style={{ color: "#6F8F7A" }}
        />
      </motion.div>
    </motion.div>
  );
}

