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

  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 10 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 10 });

  // Constants for tilt effect
  const ROTATION_RANGE = 25; // Max rotation in degrees
  const BOX_SHADOW_COLOR = "rgba(0, 0, 0, 0.3)"; // Shadow color

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [`-${ROTATION_RANGE}deg`, `${ROTATION_RANGE}deg`]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [`-${ROTATION_RANGE}deg`, `${ROTATION_RANGE}deg`]
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

  return (
    <motion.article
      ref={cardRef}
      variants={itemVariants} // Use itemVariants for entry animation
      whileHover={{ scale: 1.02, y: -5, boxShadow: `0 10px 15px ${BOX_SHADOW_COLOR}` }} // Enhanced hover
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => handleCardClick(item.url)}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        // Apply gold border and dark green background
        '--card-border': item.borderColor || 'transparent',
        'background': 'var(--project-darkgreen)',
        'backdropFilter': 'blur(16px)',
        'WebkitBackdropFilter': 'blur(16px)',
        'borderColor': 'var(--card-border)',
        '--spotlight-color': 'rgba(255,255,255,0.3)'
      } as React.CSSProperties}
      className="group relative flex flex-col w-[300px] rounded-[20px] overflow-hidden border-2 transition-all duration-300 cursor-pointer"
    >
      {/* Spotlight effect */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-20 opacity-0 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)',
        }}
      />
      
      {/* Image section */}
      <div className="relative z-10 flex-1 p-[10px] box-border">
        <img src={item.image} alt={item.title} loading="lazy" className="w-full h-full object-cover rounded-[10px]" />
      </div>
      
      {/* Footer section */}
      <footer className="relative z-10 p-3 text-white font-sans grid grid-cols-[1fr_auto] gap-x-3 gap-y-1">
        <h3 className="m-0 text-[1.05rem] font-semibold">{item.title}</h3>
        {item.handle && <span className="text-[0.95rem] opacity-80 text-right">{item.handle}</span>}
        <p className="m-0 text-[0.85rem] opacity-85">{item.subtitle}</p>
        {item.location && <span className="text-[0.85rem] opacity-85 text-right">{item.location}</span>}
      </footer>
    </motion.article>
  );
};

export default ProjectCard;