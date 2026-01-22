"use client";

import { useEffect, useRef } from "react";
import { MapPin } from "lucide-react";
import SocialLink from "@/components/SocialLink";
import ButtonCus from "@/components/hero-section/HeroButton";
import HeroAvatarTag from "./HeroAvatarTag";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type SocialPlatform = "github" | "linkedin" | "facebook" | "telegram";

export default function HeroContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  const socialPlatforms: SocialPlatform[] = [
    "github",
    "linkedin",
    "facebook",
    "telegram",
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(containerRef.current, {
        perspective: 1200,
        transformStyle: "preserve-3d",
      });

      const particles = particlesRef.current?.children;
      if (particles) {
        Array.from(particles).forEach((particle) => {
          gsap.to(particle, {
            y: `random(-80, 80)`,
            x: `random(-80, 80)`,
            rotation: `random(0, 360)`,
            opacity: `random(0.2, 0.5)`,
            scale: `random(0.6, 1.2)`,
            duration: `random(4, 7)`,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "restart none restart reset",
        },
        defaults: { ease: "expo.out" },
      });

      tl.fromTo(
        avatarRef.current,
        { opacity: 0, rotationY: -180, z: -400, scale: 0.5 },
        { opacity: 1, rotationY: 0, z: 0, scale: 1, duration: 1.5 },
      )
        .fromTo(
          greetingRef.current,
          { opacity: 0, x: -100, z: -200 },
          { opacity: 1, x: 0, z: 0, duration: 1.2 },
          "-=1.1",
        )
        .fromTo(
          nameRef.current,
          { opacity: 0, y: 80, z: -200 },
          { opacity: 1, y: 0, z: 0, duration: 1.2 },
          "-=1",
        )
        // "Writing" animation for the name starts after it has moved into place
        .from(nameRef.current, {
          clipPath: "inset(0 100% 0 0)",
          duration: 1.5,
          ease: "power2.inOut",
        }, "-=0.2") // Starts slightly before the previous animation ends for a subtle overlap
        .fromTo(
          lineRef.current,
          { scaleX: 0, opacity: 0, transformOrigin: "left" },
          { scaleX: 1, opacity: 1, duration: 1, ease: "power3.inOut" },
          "-=0.5", // Starts as the name is almost fully "written"
        )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 40, z: -100 },
          { opacity: 1, y: 0, z: 0, duration: 1, ease: "power3.out" },
          "-=0.7",
        );

      if (buttonsRef.current?.children) {
        tl.fromTo(
          buttonsRef.current.children,
          { opacity: 0, y: 50, z: -150, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            z: 0,
            scale: 1,
            duration: 1,
            stagger: 0.15,
          },
          "-=0.7",
        );
      }

      tl.fromTo(
        socialRef.current,
        { opacity: 0, x: -60, z: -100 },
        { opacity: 1, x: 0, z: 0, duration: 0.9, ease: "power3.out" },
        "-=0.7",
      ).fromTo(
        statsRef.current,
        { opacity: 0, y: 30, z: -80 },
        { opacity: 1, y: 0, z: 0, duration: 0.8, ease: "power2.out" },
        "-=0.6",
      );

      // Scroll-based parallax for the container
      gsap.to(containerRef.current, {
        rotationY: -5,
        rotationX: 5,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Looping background animations
      if (floatingRef.current?.children) {
        gsap.to(floatingRef.current.children[0], {
          y: -30,
          x: 15,
          rotation: 120,
          duration: 12,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        gsap.to(floatingRef.current.children[1], {
          y: 30,
          x: -15,
          rotation: -120,
          duration: 14,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        gsap.to(floatingRef.current.children[2], {
          y: 20,
          x: 25,
          rotation: 60,
          duration: 11,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      gsap.to(nameRef.current, {
        backgroundPosition: "200% center",
        duration: 5,
        repeat: -1,
        ease: "linear",
      });

      const dot = statsRef.current?.querySelector(".pulse-dot");
      if (dot) {
        gsap.to(dot, {
          scale: 1.6,
          opacity: 0.3,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(dot, {
          boxShadow:
            "0 0 20px rgba(52, 211, 153, 0.8), 0 0 40px rgba(52, 211, 153, 0.4)",
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      const locationIcon = statsRef.current?.querySelector(".location-icon");
      if (locationIcon) {
        gsap.to(locationIcon, {
          y: -4,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const hoverConfig = {
    duration: 0.4,
    ease: "expo.out",
  };

  const handleAvatarHover = (isHovering: boolean) => {
    gsap.to(avatarRef.current, {
      z: isHovering ? 50 : 0,
      scale: isHovering ? 1.05 : 1,
      ...hoverConfig,
    });
  };

  const handleNameHover = (isHovering: boolean) => {
    gsap.to(nameRef.current, {
      z: isHovering ? 40 : 0,
      scale: isHovering ? 1.03 : 1,
      ...hoverConfig,
    });
  };

  const handleButtonHover = (
    element: HTMLElement,
    isHovering: boolean,
    direction: number,
  ) => {
    gsap.to(element, {
      z: isHovering ? 50 : 0,
      rotationY: isHovering ? direction * 8 : 0,
      scale: isHovering ? 1.05 : 1,
      ...hoverConfig,
    });
  };

  const handleAvailableHover = (element: HTMLElement, isHovering: boolean) => {
    gsap.to(element, {
      z: isHovering ? 40 : 0,
      scale: isHovering ? 1.05 : 1,
      duration: 0.4,
      ease: "expo.out",
    });
  };

  const handleLocationHover = (element: HTMLElement, isHovering: boolean) => {
    gsap.to(element, {
      z: isHovering ? 40 : 0,
      scale: isHovering ? 1.05 : 1,
      duration: 0.4,
      ease: "expo.out",
    });
    
    const locationIcon = element.querySelector(".location-icon");
    if (locationIcon) {
      gsap.to(locationIcon, {
        rotationY: isHovering ? 360 : 0,
        duration: 0.6,
        ease: "expo.out",
      });
    }
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Ephesis&family=Inter:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div style={{ perspective: "1200px", position: "relative" }}>
        <div
          ref={containerRef}
          className="space-y-8 sm:space-y-10 w-full text-center lg:text-left flex flex-col items-center lg:items-start relative"
          style={{
            fontFamily: "'Inter', sans-serif",
            transformStyle: "preserve-3d",
          }}
        >
          <div
            ref={floatingRef}
            className="absolute inset-0 pointer-events-none -z-10"
          >
            <div className="absolute -left-32 top-32 w-64 h-64 bg-linear-to-br from-[#6F8F7A]/15 via-[#C6A15B]/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute -right-32 bottom-32 w-80 h-80 bg-linear-to-br from-[#C6A15B]/15 via-[#6F8F7A]/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute left-1/2 top-1/2 w-48 h-48 bg-linear-to-br from-[#6F8F7A]/10 to-[#C6A15B]/5 rounded-full blur-3xl" />
          </div>

          <div
            ref={particlesRef}
            className="absolute inset-0 pointer-events-none -z-10"
          >
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-linear-to-r from-[#6F8F7A] to-[#C6A15B] rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>

          <div
            ref={avatarRef}
            onMouseEnter={() => handleAvatarHover(true)}
            onMouseLeave={() => handleAvatarHover(false)}
            style={{ transformStyle: "preserve-3d" }}
            className="relative"
          >
            <HeroAvatarTag
              avatarSrc="/images/pixel.png"
              text={'"BUILDING THE FUTURE"'}
              paddingX="px-8"
              paddingY="py-4"
              avatarSize={28}
              borderRadius="rounded-xl"
              avatarCircleBorder={false}
            />
          </div>

          <div className="space-y-2" style={{ transformStyle: "preserve-3d" }}>
            <h1
              ref={greetingRef}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl
                 font-light text-white leading-[1.15] tracking-tight"
            >
              Hi, I'm
            </h1>
            <h2
              ref={nameRef}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl
                 font-normal leading-[1.15] cursor-pointer relative"
              style={{
                fontFamily: "'Ephesis', cursive",
                transformStyle: "preserve-3d",
                background:
                  "linear-gradient(90deg, #6F8F7A 0%, #C6A15B 25%, #6F8F7A 50%, #C6A15B 75%, #6F8F7A 100%)",
                backgroundSize: "200% 100%",
                backgroundPosition: "0% center",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              onMouseEnter={() => handleNameHover(true)}
              onMouseLeave={() => handleNameHover(false)}
            >
              Khorn Molika
            </h2>
            <div
              ref={lineRef}
              className="h-0.5 rounded-full"
              style={{
                transformOrigin: "left",
                background:
                  "linear-gradient(90deg, #6F8F7A 0%, #C6A15B 50%, #6F8F7A 100%)",
                backgroundSize: "200% 100%",
              }}
            />
          </div>

          <p
            ref={descRef}
            className="text-sm sm:text-base md:text-md text-slate-300/90 leading-relaxed max-w-2xl font-light"
          >
            Full-stack web developer passionate about building responsive,
            performant applications. Experienced in React, TypeScript, and
            modern frameworks, with a commitment to writing clean, maintainable
            code and creating seamless user experiences.
          </p>

          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              onMouseEnter={(e) => handleButtonHover(e.currentTarget, true, -1)}
              onMouseLeave={(e) =>
                handleButtonHover(e.currentTarget, false, -1)
              }
              style={{ transformStyle: "preserve-3d" }}
            >
              <ButtonCus variant="primary" icon="download" iconPosition="right">
                Download Resume
              </ButtonCus>
            </div>
            <div
              onMouseEnter={(e) => handleButtonHover(e.currentTarget, true, 1)}
              onMouseLeave={(e) => handleButtonHover(e.currentTarget, false, 1)}
              style={{ transformStyle: "preserve-3d" }}
            >
              <ButtonCus variant="secondary" icon="arrow" iconPosition="right">
                View Projects
              </ButtonCus>
            </div>
          </div>

          <div
            ref={socialRef}
            className="flex items-center gap-4"
            style={{ transformStyle: "preserve-3d" }}
          >
            <span className="text-sm text-slate-400 font-light tracking-wider">
              CONNECT
            </span>
            <div className="h-px w-8 bg-linear-to-r from-slate-600 to-transparent" />
            <div
              className="flex gap-3"
              style={{ transformStyle: "preserve-3d" }}
            >
              {socialPlatforms.map((platform, index) => (
                <div
                  key={platform}
                  style={{ transformStyle: "preserve-3d" }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, {
                      z: 40,
                      scale: 1.1,
                      ...hoverConfig,
                    });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, {
                      z: 0,
                      scale: 1,
                      ...hoverConfig,
                    });
                  }}
                >
                  <SocialLink platform={platform} href="#" index={index} />
                </div>
              ))}
            </div>
          </div>

          <div
            ref={statsRef}
            className="flex flex-wrap gap-6 sm:gap-8 pt-4"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div 
              className="flex items-center gap-2 cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
              onMouseEnter={(e) => handleAvailableHover(e.currentTarget, true)}
              onMouseLeave={(e) => handleAvailableHover(e.currentTarget, false)}
            >
              <div className="pulse-dot w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-sm text-slate-400 font-light">
                Available for freelance
              </span>
            </div>
            <div className="h-4 w-px bg-slate-700" />
            <div 
              className="text-sm text-slate-400 font-light flex items-center gap-2 cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
              onMouseEnter={(e) => handleLocationHover(e.currentTarget, true)}
              onMouseLeave={(e) => handleLocationHover(e.currentTarget, false)}
            >
              <div
                className="location-icon"
                style={{ transformStyle: "preserve-3d" }}
              >
                <MapPin className="w-4 h-4 text-[#C6A15B]" />
              </div>
              Based in Phnom Penh
            </div>
          </div>
        </div>
      </div>
    </>
  );
}