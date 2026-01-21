"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import HeroContent from "./HeroContent";
import HeroAvatar from "./HeroAvatar";

export default function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });

  return (
    <section ref={ref} className="min-h-screen relative overflow-hidden flex items-center justify-center ">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className={`absolute top-20 left-10 w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-[#6F8F7A] rounded-full mix-blend-multiply filter blur-xl ${isInView ? 'animate-blob' : ''}`}></div>
        <div className={`absolute top-40 right-10 w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-[#C6A15B] rounded-full mix-blend-multiply filter blur-xl ${isInView ? 'animate-blob animation-delay-2000' : ''}`}></div>
        <div className={`absolute bottom-20 left-1/2 w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-[#6F8F7A] rounded-full mix-blend-multiply filter blur-xl ${isInView ? 'animate-blob animation-delay-4000' : ''}`}></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center justify-items-center">
          {/* Content */}
          <HeroContent />

          {/* Right part */}
          <HeroAvatar />
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}
