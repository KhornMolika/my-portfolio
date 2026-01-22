"use client";

import { useEffect, useRef } from "react";
import { MapPin } from "lucide-react";
import SocialLink from "@/components/SocialLink";
import ButtonCus from "@/components/hero-section/HeroButton";
import HeroAvatarTag from "./HeroAvatarTag";
import gsap from "gsap";

type SocialPlatform = "github" | "linkedin" | "twitter" | "mail";

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
    "twitter",
    "mail",
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial perspective with enhanced depth
      gsap.set(containerRef.current, {
        perspective: 1500,
        transformStyle: "preserve-3d",
      });

      // Create floating particles animation
      const particles = particlesRef.current?.children;
      if (particles) {
        Array.from(particles).forEach((particle, i) => {
          gsap.to(particle, {
            y: `random(-100, 100)`,
            x: `random(-100, 100)`,
            rotation: `random(0, 360)`,
            opacity: `random(0.1, 0.4)`,
            scale: `random(0.5, 1.5)`,
            duration: `random(3, 6)`,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.2,
          });
        });
      }

      // Enhanced master timeline with professional timing
      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        delay: 0.2,
      });

      // Avatar entrance - cinematic 3D flip with depth
      tl.fromTo(
        avatarRef.current,
        {
          opacity: 0,
          rotationY: -180,
          rotationX: 45,
          z: -400,
          scale: 0.3,
        },
        {
          opacity: 1,
          rotationY: 0,
          rotationX: 0,
          z: 0,
          scale: 1,
          duration: 1.6,
          ease: "expo.out",
        },
      );

      // Greeting text - smooth slide with rotation
      tl.fromTo(
        greetingRef.current,
        {
          opacity: 0,
          x: -150,
          rotationX: -60,
          rotationZ: -10,
          z: -200,
        },
        {
          opacity: 1,
          x: 0,
          rotationX: 0,
          rotationZ: 0,
          z: 0,
          duration: 1.2,
          ease: "expo.out",
        },
        "-=1",
      );

      // Name - premium multi-axis entrance
      tl.fromTo(
        nameRef.current,
        {
          opacity: 0,
          y: 100,
          rotationX: 60,
          rotationY: -30,
          rotationZ: 5,
          z: -250,
          scale: 0.6,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          rotationY: 0,
          rotationZ: 0,
          z: 0,
          scale: 1,
          duration: 1.4,
          ease: "elastic.out(1, 0.6)",
        },
        "-=0.8",
      );

      // Line - dynamic growth with shimmer
      tl.fromTo(
        lineRef.current,
        {
          scaleX: 0,
          opacity: 0,
          transformOrigin: "left center",
        },
        {
          scaleX: 1,
          opacity: 1,
          duration: 1.2,
          ease: "expo.inOut",
        },
        "-=0.8",
      );

      // Line shimmer effect
      gsap.fromTo(
        lineRef.current,
        { backgroundPosition: "0% 50%" },
        {
          backgroundPosition: "200% 50%",
          duration: 2,
          repeat: -1,
          ease: "linear",
        },
      );

      // Description - elegant fade with depth
      tl.fromTo(
        descRef.current,
        {
          opacity: 0,
          y: 50,
          z: -150,
          rotationX: 20,
        },
        {
          opacity: 1,
          y: 0,
          z: 0,
          rotationX: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.6",
      );

      // Buttons - dynamic stagger with 3D depth
      const buttons = buttonsRef.current?.children;
      if (buttons) {
        tl.fromTo(
          Array.from(buttons),
          {
            opacity: 0,
            y: 60,
            rotationX: 90,
            z: -200,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            z: 0,
            scale: 1,
            duration: 1,
            stagger: {
              each: 0.2,
              ease: "power2.out",
            },
            ease: "back.out(1.5)",
          },
          "-=0.7",
        );
      }

      // Social section - cascading entrance
      tl.fromTo(
        socialRef.current,
        {
          opacity: 0,
          x: -80,
          rotationY: -45,
          z: -100,
        },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          z: 0,
          duration: 0.9,
          ease: "power3.out",
        },
        "-=0.6",
      );

      // Stats - final elegant entrance
      tl.fromTo(
        statsRef.current,
        {
          opacity: 0,
          y: 40,
          z: -80,
        },
        {
          opacity: 1,
          y: 0,
          z: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.5",
      );

      // Continuous floating background animations
      if (floatingRef.current?.children) {
        gsap.to(floatingRef.current.children[0], {
          y: -40,
          x: 20,
          rotationZ: 180,
          scale: 1.2,
          duration: 10,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(floatingRef.current.children[1], {
          y: 40,
          x: -20,
          rotationZ: -180,
          scale: 0.9,
          duration: 12,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(floatingRef.current.children[2], {
          y: 25,
          x: 30,
          rotationZ: 90,
          scale: 1.1,
          duration: 9,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Name gradient shimmer - multi-directional
      gsap.to(nameRef.current, {
        backgroundPosition: "300% center",
        duration: 4,
        repeat: -1,
        ease: "linear",
      });

      // Pulse dot - breathing effect
      const dot = statsRef.current?.querySelector(".pulse-dot");
      if (dot) {
        gsap.to(dot, {
          scale: 1.5,
          opacity: 0.4,
          duration: 1.8,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });

        // Glow ring around dot
        gsap.to(dot, {
          boxShadow: "0 0 20px 4px rgba(52, 211, 153, 0.6)",
          duration: 1.8,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      }

      // MapPin - smooth 3D rotation with tilt
      const locationIcon = statsRef.current?.querySelector(".location-icon");
      if (locationIcon) {
        gsap.to(locationIcon, {
          rotationY: 360,
          rotationX: 15,
          duration: 5,
          repeat: -1,
          ease: "linear",
        });
      }

      // Advanced mouse parallax with smooth tracking
      let mouseX = 0;
      let mouseY = 0;
      let currentX = 0;
      let currentY = 0;

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        mouseX = (clientX - innerWidth / 2) / innerWidth;
        mouseY = (clientY - innerHeight / 2) / innerHeight;
      };

      // Smooth mouse tracking with lerp
      const updateParallax = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        gsap.to(containerRef.current, {
          rotationY: currentX * 12,
          rotationX: -currentY * 12,
          transformPerspective: 1500,
          duration: 0.8,
          ease: "power2.out",
        });

        // Multi-layer parallax
        if (floatingRef.current?.children) {
          gsap.to(floatingRef.current.children[0], {
            x: currentX * 60,
            y: currentY * 60,
            rotationZ: currentX * 20,
            duration: 1.2,
            ease: "power1.out",
          });

          gsap.to(floatingRef.current.children[1], {
            x: -currentX * 45,
            y: -currentY * 45,
            rotationZ: -currentX * 15,
            duration: 1,
            ease: "power1.out",
          });

          gsap.to(floatingRef.current.children[2], {
            x: currentX * 35,
            y: -currentY * 35,
            rotationZ: currentX * 10,
            duration: 0.9,
            ease: "power1.out",
          });
        }

        requestAnimationFrame(updateParallax);
      };

      window.addEventListener("mousemove", handleMouseMove);
      updateParallax();

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    });

    return () => ctx.revert();
  }, []);

  // Enhanced hover handlers with professional easing
  const handleAvatarHover = (isHovering: boolean) => {
    gsap.to(avatarRef.current, {
      z: isHovering ? 80 : 0,
      rotationY: isHovering ? 8 : 0,
      rotationX: isHovering ? -5 : 0,
      scale: isHovering ? 1.08 : 1,
      duration: 0.6,
      ease: "expo.out",
    });
  };

  const handleNameHover = (isHovering: boolean) => {
    gsap.to(nameRef.current, {
      z: isHovering ? 60 : 0,
      scale: isHovering ? 1.03 : 1,
      rotationY: isHovering ? 3 : 0,
      rotationX: isHovering ? -2 : 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.5)",
    });
  };

  const handleButtonHover = (
    element: HTMLElement,
    isHovering: boolean,
    direction: number,
  ) => {
    gsap.to(element, {
      z: isHovering ? 80 : 0,
      rotationX: isHovering ? -15 : 0,
      rotationY: isHovering ? direction * 12 : 0,
      scale: isHovering ? 1.08 : 1,
      duration: 0.5,
      ease: "expo.out",
    });
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Ephesis&family=Inter:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div style={{ perspective: "1500px", position: "relative" }}>
        <div
          ref={containerRef}
          className="space-y-8 sm:space-y-10 w-full text-center lg:text-left flex flex-col items-center lg:items-start relative"
          style={{
            fontFamily: "'Inter', sans-serif",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Enhanced 3D Floating Background */}
          <div
            ref={floatingRef}
            className="absolute inset-0 pointer-events-none overflow-hidden"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className="absolute -left-32 top-32 w-64 h-64  rounded-full blur-3xl"
              style={{ transformStyle: "preserve-3d" }}
            />
            <div
              className="absolute -right-32 bottom-32 w-80 h-80  to-transparent rounded-full blur-3xl"
              style={{ transformStyle: "preserve-3d" }}
            />
            <div
              className="absolute left-1/2 top-1/2 w-48 h-48 rounded-full blur-3xl"
              style={{ transformStyle: "preserve-3d" }}
            />
          </div>

          {/* Floating Particles */}
          <div
            ref={particlesRef}
            className="absolute inset-0 pointer-events-none overflow-hidden"
          >
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-gradient-to-r from-[#6F8F7A] to-[#C6A15B] rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: 0.2,
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
              style={{ transformStyle: "preserve-3d" }}
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
                backgroundSize: "300% 100%",
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
            style={{ transformStyle: "preserve-3d" }}
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
            <div className="h-px w-8 bg-gradient-to-r from-slate-600 to-transparent" />
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
                      duration: 0.4,
                      ease: "expo.out",
                    });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, {
                      z: 0,
                      scale: 1,
                      duration: 0.4,
                      ease: "expo.out",
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
            <div className="flex items-center gap-2">
              <div
                className="pulse-dot w-2 h-2 rounded-full bg-emerald-400"
                style={{ transformStyle: "preserve-3d" }}
              />
              <span className="text-sm text-slate-400 font-light">
                Available for freelance
              </span>
            </div>
            <div className="h-4 w-px bg-slate-700" />
            <div className="text-sm text-slate-400 font-light flex items-center gap-2">
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
