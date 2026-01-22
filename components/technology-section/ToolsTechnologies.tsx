"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  DiVisualstudio,
  DiReact,
  DiNodejsSmall,
  DiGithubBadge,
  DiBootstrap,
  DiJavascript1,
  DiCss3,
  DiHtml5,
  DiFirebase,
  DiJava,
  DiDjango,
  DiGit, // New import for Git
  DiDotnet // For C#
} from "react-icons/di";
import {
  SiTailwindcss,
  SiTypescript,
  SiFigma,
  SiCanva,
  SiKotlin,
  SiFlutter, // New import for Flutter
  SiDart, // New import for Dart
} from "react-icons/si";

// ToolCard Component
interface ToolCardProps {
  icon: React.ReactNode;
  name: string;
  category: string;
  bgColor: string;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};

const ToolCard: React.FC<ToolCardProps> = ({
  icon,
  name,
  category,
  bgColor,
}) => {
  return (
    <motion.div
      variants={itemVariants}
      className="relative p-6 rounded-xl border border-gray-700/50 backdrop-blur-md bg-[#0F2E26]/50
                 transition-all duration-300 hover:border-gray-600 hover:scale-105 cursor-pointer"
      whileHover={{
        boxShadow: "0 0 20px rgba(198, 161, 91, 0.2)",
      }}
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center text-2xl`}
        >
          {icon}
        </div>
        <div>
          <h3 className="text-white font-semibold text-lg">{name}</h3>
          <p className="text-gray-400 text-sm">{category}</p>
        </div>
      </div>
    </motion.div>
  );
};

// Main Component
const ToolsTechnologies: React.FC = () => {
  const tools = [
    {
      icon: <DiVisualstudio size={32} />,
      name: "Visual Studio Code",
      category: "Code Editor",
      bgColor: "bg-blue-600/20 text-blue-400",
    },
    {
      icon: <DiReact size={32} />,
      name: "React JS",
      category: "Framework",
      bgColor: "bg-cyan-500/20 text-cyan-300",
    },
    {
      icon: <DiDjango size={32} />,
      name: "Django",
      category: "Framework",
      bgColor: "bg-green-700/20 text-green-500",
    },
    {
      icon: <SiTailwindcss size={28} />,
      name: "Tailwind CSS",
      category: "Framework",
      bgColor: "bg-cyan-400/20 text-cyan-200",
    },
    {
      icon: <DiBootstrap size={32} />,
      name: "Bootstrap",
      category: "Framework",
      bgColor: "bg-purple-600/20 text-purple-400",
    },
    {
      icon: <DiJavascript1 size={32} />,
      name: "JavaScript",
      category: "Language",
      bgColor: "bg-yellow-400/20 text-yellow-200",
    },
    {
      icon: <DiNodejsSmall size={32} />,
      name: "Node JS",
      category: "JavaScript Runtime",
      bgColor: "bg-green-600/20 text-green-400",
    },
    {
      icon: <DiGithubBadge size={32} />,
      name: "GitHub",
      category: "Repository",
      bgColor: "bg-gray-700/20 text-gray-400",
    },
    {
      icon: <DiGit size={32} />,
      name: "Git",
      category: "Version Control",
      bgColor: "bg-orange-700/20 text-orange-500",
    },
    {
      icon: <DiJava size={32} />,
      name: "Java",
      category: "Language",
      bgColor: "bg-red-600/20 text-red-400",
    },
    {
      icon: <SiFlutter size={28} />,
      name: "Flutter",
      category: "Framework",
      bgColor: "bg-blue-500/20 text-blue-300",
    },
    {
      icon: <SiDart size={28} />,
      name: "Dart",
      category: "Language",
      bgColor: "bg-blue-400/20 text-blue-200",
    },
    {
      icon: <DiDotnet size={32} />,
      name: "C#",
      category: "Language",
      bgColor: "bg-purple-800/20 text-purple-600",
    },
    {
      icon: <SiCanva size={28} />,
      name: "Canva",
      category: "Design App",
      bgColor: "bg-cyan-400/20 text-cyan-200",
    },
    {
      icon: <SiFigma size={28} />,
      name: "Figma",
      category: "Design App",
      bgColor: "bg-purple-500/20 text-purple-300",
    },
    {
      icon: <SiKotlin size={28} />,
      name: "Kotlin",
      category: "Language",
      bgColor: "bg-purple-600/20 text-purple-400",
    },
    {
      icon: <DiFirebase size={32} />,
      name: "Firebase",
      category: "Framework",
      bgColor: "bg-yellow-500/20 text-yellow-300",
    },
    {
      icon: <DiHtml5 size={32} />,
      name: "HTML",
      category: "Language",
      bgColor: "bg-orange-600/20 text-orange-400",
    },
    { icon: <DiCss3 size={32} />, name: "CSS", category: "Language", bgColor: "bg-blue-500/20 text-blue-300" },
    {
      icon: <SiTypescript size={28} />,
      name: "TypeScript",
      category: "Language",
      bgColor: "bg-blue-600/20 text-blue-400",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.1 }}
          className="mb-12"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-white mb-3"
          >
            Tools & Technologies
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg"
            style={{ color: "#C6A15B" }}
          >
            My Professional Skills
          </motion.p>
        </motion.div>

        {/* Grid */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ amount: 0.1 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center"
                >          {tools.map((tool, index) => (
            <ToolCard
              key={index}
              icon={tool.icon}
              name={tool.name}
              category={tool.category}
              bgColor={tool.bgColor}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ToolsTechnologies;
