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
}

const ProjectCard: React.FC<ProjectCardProps> = ({ item }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["17.5deg", "-17.5deg"]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-17.5deg", "17.5deg"]
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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => handleCardClick(item.url)}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative flex flex-col w-[300px] rounded-[20px] overflow-hidden border-2 transition-all duration-300 cursor-pointer"
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-4 grid place-content-center rounded-xl bg-white shadow-lg"
      >
        <img
          src={item.image}
          alt={item.title}
          className="rounded-xl"
        />
      </div>
    </motion.article>
  );
};

export default ProjectCard;
