"use client";

import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ChromaItem } from "./ChromaGrid";

interface ProjectCardProps {
  item: ChromaItem;
  itemVariants: any; // Add itemVariants prop
}

const ProjectCard: React.FC<ProjectCardProps> = ({ item, itemVariants }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 600, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 600, damping: 15 });

  // Constants for tilt effect
  const ROTATION_RANGE = 15; // Reduced for smoother effect
  const BOX_SHADOW_COLOR = "rgba(0, 0, 0, 0.3)"; // Shadow color

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [-ROTATION_RANGE, ROTATION_RANGE] // Output numbers
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [-ROTATION_RANGE, ROTATION_RANGE] // Output numbers
  );

  // New: Define translateZ motion values for inner content
  const imageTranslateZ = useTransform(
    mouseYSpring, // Based on vertical mouse position
    [-0.5, 0.5],
    [10, -10] // Move image 10px forward/backward
  );
  const footerTranslateZ = useTransform(
    mouseXSpring, // Based on horizontal mouse position
    [-0.5, 0.5],
    [5, -5] // Move footer 5px forward/backward
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const { width, height } = cardRef.current.getBoundingClientRect();

    const mouseX = e.clientX - cardRef.current.offsetLeft - width / 2;
    const mouseY = e.clientY - cardRef.current.offsetTop - height / 2;

    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  const handleCardClick = (url?: string) => {
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  const motionStyle = {
    rotateX,
    rotateY,
    transformStyle: "preserve-3d" as "preserve-3d", // Ensure correct type
  };

  const staticStyle = {
    '--card-border': item.borderColor || 'transparent',
    'background': 'var(--project-darkgreen)',
    'backdropFilter': 'blur(16px)',
    'WebkitBackdropFilter': 'blur(16px)',
    'borderColor': 'var(--card-border)',
    '--spotlight-color': 'rgba(255,255,255,0.3)'
  } as React.CSSProperties; // Assert as React.CSSProperties

  return (
    <motion.article
      ref={cardRef}
      variants={itemVariants} // Use itemVariants for entry animation
      whileHover={{ scale: 1.05, y: -8, boxShadow: `0 20px 30px ${BOX_SHADOW_COLOR}` }} // Faster, stronger hover
      transition={{ duration: 0.2, ease: "easeOut" }} // Smooth and fast transition
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => handleCardClick(item.url)}
      style={{ ...motionStyle, ...staticStyle }} // Combine styles
      className="group relative flex flex-col w-[300px] rounded-[20px] overflow-hidden border-2 transition-all duration-200 cursor-pointer"
    >
      {/* Shining effect - animated gradient */}
      <div className="absolute inset-0 pointer-events-none z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.4) 50%, transparent 75%)',
            backgroundSize: '200% 100%',
            animation: 'shine 1.5s ease-in-out infinite',
          }}
        />
      </div>

      {/* Spotlight effect */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-20 opacity-0 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)',
        }}
      />
      
      {/* Image section */}
      <motion.div // Changed to motion.div
        className="relative z-10 flex-1 p-[10px] box-border"
        style={{ z: imageTranslateZ, transformStyle: "preserve-3d" }} // Apply z instead of translateZ
      >
        <img src={item.image} alt={item.title} loading="lazy" className="w-full h-full object-cover rounded-[10px]" />
      </motion.div>
      
      {/* Footer section */}
      <motion.footer // Changed to motion.footer
        className="relative z-10 p-3 text-white font-sans grid grid-cols-[1fr_auto] gap-x-3 gap-y-1"
        style={{ z: footerTranslateZ, transformStyle: "preserve-3d" }} // Apply z instead of translateZ
      >
        <h3 className="m-0 text-[1.05rem] font-semibold">{item.title}</h3>
        {item.handle && <span className="text-[0.95rem] opacity-80 text-right">{item.handle}</span>}
        <p className="m-0 text-[0.85rem] opacity-85">{item.subtitle}</p>
        {item.location && <span className="text-[0.85rem] opacity-85 text-right">{item.location}</span>}
      </motion.footer>

      {/* Add keyframes inline for the shine animation */}
      <style jsx>{`
        @keyframes shine {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </motion.article>
  );
};

export default ProjectCard;