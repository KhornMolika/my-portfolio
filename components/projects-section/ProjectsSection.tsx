"use client";

import React from "react";
import ChromaGrid, { ChromaItem } from "../ChromaGrid";
import { motion } from "framer-motion"; // Import motion

const itemVariants = { // Defined here
  hidden: { opacity: 0, y: 20 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const webProjects: ChromaItem[] = [
  {
    image: "/images/ampor_latest.png",
    title: "Aroma Shop",
    subtitle: "E-commerce project",
    handle: "@Django",
    borderColor: "var(--project-gold)",
    url: "https://github.com/KhornMolika/aroma-django-restapi-e-commerce.git",
  },
  {
    image: "/images/ampor_latest.png",
    title: "Teaching Records",
    subtitle: "Analyze teaching hours",
    handle: "@Django",
    borderColor: "var(--project-gold)",
    url: "https://github.com/KhornMolika/teaching-record-hub.git",
  },
  {
    image: "/images/ampor_latest.png",
    title: "CMS",
    subtitle: "Content Mangement System",
    handle: "@PHP",
    borderColor: "var(--project-gold)",
    url: "https://github.com/KhornMolika/content-management-system.git",
  },
];

const appProjects: ChromaItem[] = [
  {
    image: "/images/ampor_latest.png",
    title: "Voco Hotel",
    subtitle: "Booking Hotel",
    handle: "@static-web",
    borderColor: "var(--project-gold)",
    url: "https://github.com/KhornMolika/voco-hotel-web-development.git",
  },
  {
    image: "/images/ampor_latest.png",
    title: "Todo list",
    subtitle: "Create tasks",
    handle: "@flutter",
    borderColor: "var(--project-gold)",
    url: "https://github.com/KhornMolika/flutter-todo-app/releases/tag/v1.0.0",
  },
  {
    image: "/images/ampor_latest.png",
    title: "Mini E-commerce",
    subtitle: "Mini Mart",
    handle: "@flutter",
    borderColor: "var(--project-gold)",
    url: "https://github.com/KhornMolika/flutter-mini-mart-e-commerce_app/releases/tag/v1.0.0",
  },
];

const ProjectsSection = () => {
  return (
    <div
      className="max-w-7xl mx-auto"
      style={{ height: "auto", position: "relative" }}
    >
      {/* Header */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3 }}
        className="mb-12"
      >
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-5xl font-bold text-white mb-3"
        >
          Projects
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-lg"
          style={{ color: "var(--project-gold)" }}
        >
          My Latest Creations
        </motion.p>
      </motion.div>

      <motion.div // Added motion.div and perspective
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.1 }}
        className="flex flex-col items-center gap-8"
        style={{ perspective: "1000px" }}
      >
        <ChromaGrid
          items={webProjects}
          radius={300}
          damping={0.8}
          fadeOut={0.6}
          ease="power4.inOut"
          itemVariants={itemVariants} // Pass itemVariants
        />
        <ChromaGrid
          items={appProjects}
          radius={300}
          damping={0.8}
          fadeOut={0.6}
          ease="power4.inOut"
          itemVariants={itemVariants} // Pass itemVariants
        />
      </motion.div>
    </div>
  );
};

export default ProjectsSection;