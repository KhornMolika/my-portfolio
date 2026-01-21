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
      duration: 0.5,
    },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const webProjects: ChromaItem[] = [
  {
    image: "/images/ampor_latest.png",
    title: "Web Project 1 Title",
    subtitle: "Description for Web Project",
    handle: "@webdev1",
    borderColor: "var(--project-gold)",
    url: "https://github.com/webproject1",
  },
  {
    image: "/images/ampor_latest.png",
    title: "Web Project 2 Title",
    subtitle: "Description for Web Project",
    handle: "@webdev2",
    borderColor: "var(--project-gold)",
    url: "https://github.com/webproject2",
  },
  {
    image: "/images/ampor_latest.png",
    title: "Web Project 3 Title",
    subtitle: "Description for Web Project",
    handle: "@webdev3",
    borderColor: "var(--project-gold)",
    url: "https://github.com/webproject3",
  },
];

const appProjects: ChromaItem[] = [
  {
    image: "/images/ampor_latest.png",
    title: "App Project 1 Title",
    subtitle: "Description for App Project",
    handle: "@appdev1",
    borderColor: "var(--project-gold)",
    url: "https://github.com/appproject1",
  },
  {
    image: "/images/ampor_latest.png",
    title: "App Project 2 Title",
    subtitle: "Description for App Project",
    handle: "@appdev2",
    borderColor: "var(--project-gold)",
    url: "https://github.com/appproject2",
  },
  {
    image: "/images/ampor_latest.png",
    title: "App Project 3 Title",
    subtitle: "Description for App Project",
    handle: "@appdev3",
    borderColor: "var(--project-gold)",
    url: "https://github.com/appproject3",
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
          damping={0.45}
          fadeOut={0.6}
          ease="power3.out"
          itemVariants={itemVariants} // Pass itemVariants
        />
        <ChromaGrid
          items={appProjects}
          radius={300}
          damping={0.45}
          fadeOut={0.6}
          ease="power3.out"
          itemVariants={itemVariants} // Pass itemVariants
        />
      </motion.div>
    </div>
  );
};

export default ProjectsSection;