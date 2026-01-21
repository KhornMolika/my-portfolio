"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Atom,
  Triangle,
  Palette,
  Type,
  Code,
  Circle,
  Github,
  PenTool,
  Smartphone,
  Keyboard,
  Flame,
  FileText,
  Brush,
} from "lucide-react";

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
      duration: 0.5,
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
      icon: <Zap size={24} />,
      name: "Visual Studio Code",
      category: "Code Editor",
      bgColor: "bg-blue-600/20 text-blue-400",
    },
    {
      icon: <Atom size={24} />,
      name: "React JS",
      category: "Framework",
      bgColor: "bg-cyan-500/20 text-cyan-300",
    },
    { icon: <Triangle size={24} />, name: "Next JS", category: "Framework", bgColor: "bg-white/20 text-white" },
    {
      icon: <Palette size={24} />,
      name: "Tailwind CSS",
      category: "Framework",
      bgColor: "bg-cyan-400/20 text-cyan-200",
    },
    {
      icon: <Type size={24} />,
      name: "Bootstrap",
      category: "Framework",
      bgColor: "bg-purple-600/20 text-purple-400",
    },
    {
      icon: <Code size={24} />,
      name: "JavaScript",
      category: "Language",
      bgColor: "bg-yellow-400/20 text-yellow-200",
    },
    {
      icon: <Circle size={24} />,
      name: "Node JS",
      category: "JavaScript Runtime",
      bgColor: "bg-green-600/20 text-green-400",
    },
    {
      icon: <Github size={24} />,
      name: "GitHub",
      category: "Repository",
      bgColor: "bg-gray-700/20 text-gray-400",
    },
    {
      icon: <PenTool size={24} />,
      name: "Adobe Illustrator",
      category: "Design App",
      bgColor: "bg-orange-600/20 text-orange-400",
    },
    {
      icon: <Palette size={24} />,
      name: "Canva",
      category: "Design App",
      bgColor: "bg-cyan-400/20 text-cyan-200",
    },
    {
      icon: <Smartphone size={24} />,
      name: "Figma",
      category: "Design App",
      bgColor: "bg-purple-500/20 text-purple-300",
    },
    {
      icon: <Keyboard size={24} />,
      name: "Kotlin",
      category: "Language",
      bgColor: "bg-purple-600/20 text-purple-400",
    },
    {
      icon: <Flame size={24} />,
      name: "Firebase",
      category: "Framework",
      bgColor: "bg-yellow-500/20 text-yellow-300",
    },
    {
      icon: <FileText size={24} />,
      name: "HTML",
      category: "Language",
      bgColor: "bg-orange-600/20 text-orange-400",
    },
    { icon: <Brush size={24} />, name: "CSS", category: "Language", bgColor: "bg-blue-500/20 text-blue-300" },
    {
      icon: <Code size={24} />,
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
        staggerChildren: 0.1,
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
          viewport={{ amount: 0.3 }}
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
          viewport={{ amount: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {tools.map((tool, index) => (
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
