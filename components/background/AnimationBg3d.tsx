"use client";

import { JSX, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Renderer, Program, Mesh, Color, Triangle } from "ogl";

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v){
  const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
      -0.577350269189626, 0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(
      permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
      0.5 - vec3(
          dot(x0, x0),
          dot(x12.xy, x12.xy),
          dot(x12.zw, x12.zw)
      ), 
      0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop {
  vec3 color;
  float position;
};

#define COLOR_RAMP(colors, factor, finalColor) {              \
  int index = 0;                                            \
  for (int i = 0; i < 2; i++) {                               \
     ColorStop currentColor = colors[i];                    \
     bool isInBetween = currentColor.position <= factor;    \
     index = int(mix(float(index), float(i), float(isInBetween))); \
  }                                                         \
  ColorStop currentColor = colors[index];                   \
  ColorStop nextColor = colors[index + 1];                  \
  float range = nextColor.position - currentColor.position; \
  float lerpFactor = (factor - currentColor.position) / range; \
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  
  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);
  
  vec3 rampColor;
  COLOR_RAMP(colors, uv.x, rampColor);
  
  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (uv.y * 2.0 - height + 0.2);
  float intensity = 0.6 * height;
  
  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);
  
  vec3 auroraColor = intensity * rampColor;
  
  fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
}
`;

interface AuroraProps {
  colorStops?: string[];
  amplitude?: number;
  blend?: number;
}

interface ParticleSystem {
  mesh: THREE.Points;
  speed: number;
}

interface Shape {
  mesh: THREE.Mesh;
  speedX: number;
  speedY: number;
  floatOffset: number;
}

function Aurora({ colorStops = ["#0F2E26", "#6F8F7A", "#C6A15B"], amplitude = 1.5, blend = 0.7 }: AuroraProps): JSX.Element {
  const ctnDom = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctn = ctnDom.current;
    if (!ctn) return;

    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: true,
      antialias: true,
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.canvas.style.backgroundColor = "transparent";

    let program: Program | undefined;

    function resize(): void {
      if (!ctn) return;
      const width = ctn.offsetWidth;
      const height = ctn.offsetHeight;
      renderer.setSize(width, height);
      if (program) {
        program.uniforms.uResolution.value = [width, height];
      }
    }
    window.addEventListener("resize", resize);

    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) {
      delete geometry.attributes.uv;
    }

    const colorStopsArray = colorStops.map((hex: string) => {
      const c = new Color(hex);
      return [c.r, c.g, c.b];
    });

    program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: amplitude },
        uColorStops: { value: colorStopsArray },
        uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },
        uBlend: { value: blend },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    ctn.appendChild(gl.canvas);

    let animateId = 0;
    const update = (t: number): void => {
      animateId = requestAnimationFrame(update);
      const time = t * 0.01;
      if (program) {
        program.uniforms.uTime.value = time * 0.3;
        renderer.render({ scene: mesh });
      }
    };
    animateId = requestAnimationFrame(update);

    resize();

    return () => {
      cancelAnimationFrame(animateId);
      window.removeEventListener("resize", resize);
      if (ctn && gl.canvas.parentNode === ctn) {
        ctn.removeChild(gl.canvas);
      }
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [colorStops, amplitude, blend]);

  return <div ref={ctnDom} className="w-full h-full absolute inset-0" />;
}

export default function AnimationBg3d(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.015);
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 8;

    // Enhanced multi-layer particle system with variety
    const particleSystems: ParticleSystem[] = [];
    
    for (let layer = 0; layer < 5; layer++) {
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 1200;
      const positions = new Float32Array(particlesCount * 3);
      const colors = new Float32Array(particlesCount * 3);
      const sizes = new Float32Array(particlesCount);

      for (let i = 0; i < particlesCount * 3; i += 3) {
        const radius = 30 + layer * 8;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        positions[i] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i + 2] = radius * Math.cos(phi) - layer * 5;

        const colorOptions: THREE.Color[] = [
          new THREE.Color(0x0F2E26),
          new THREE.Color(0x6F8F7A),
          new THREE.Color(0xC6A15B),
          new THREE.Color(0x8B7355),
          new THREE.Color(0x5a9b6d)
        ];
        const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
        
        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;
        
        sizes[i / 3] = Math.random() * 0.15 + 0.05;
      }

      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.12,
        vertexColors: true,
        transparent: true,
        opacity: 0.6 - layer * 0.08,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
        depthWrite: false
      });

      const particles = new THREE.Points(particlesGeometry, particlesMaterial);
      particleSystems.push({ mesh: particles, speed: 0.03 + layer * 0.015 });
      scene.add(particles);
    }

    // Advanced geometric shapes with more variety
    const shapes: Shape[] = [];
    const geometries: THREE.BufferGeometry[] = [
      new THREE.TorusGeometry(0.8, 0.25, 20, 100),
      new THREE.OctahedronGeometry(1, 0),
      new THREE.IcosahedronGeometry(0.9, 1),
      new THREE.TorusKnotGeometry(0.6, 0.2, 100, 16),
      new THREE.DodecahedronGeometry(0.8),
      new THREE.TetrahedronGeometry(1.2),
    ];

    geometries.forEach((geometry: THREE.BufferGeometry, i: number) => {
      const colors: number[] = [0x6F8F7A, 0xC6A15B, 0x8B7355, 0x5a9b6d, 0x0F2E26, 0xA08967];
      const material = new THREE.MeshStandardMaterial({
        color: colors[i],
        wireframe: true,
        transparent: true,
        opacity: 0.3,
        emissive: colors[i],
        emissiveIntensity: 0.6,
        metalness: 0.9,
        roughness: 0.1
      });
      const mesh = new THREE.Mesh(geometry, material);
      
      const angle = (i / geometries.length) * Math.PI * 2;
      const radius = 12;
      mesh.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius * 0.5,
        (Math.random() - 0.5) * 8
      );
      
      shapes.push({ 
        mesh, 
        speedX: 0.004 + Math.random() * 0.004, 
        speedY: 0.003 + Math.random() * 0.004,
        floatOffset: Math.random() * Math.PI * 2
      });
      scene.add(mesh);
    });

    // Dynamic lighting system
    const ambientLight = new THREE.AmbientLight(0x0F2E26, 0.5);
    scene.add(ambientLight);

    const pointLights: THREE.PointLight[] = [];
    const lightColors = [0x6F8F7A, 0xC6A15B, 0x8B7355, 0x5a9b6d, 0xA08967];
    
    for (let i = 0; i < 5; i++) {
      const light = new THREE.PointLight(lightColors[i], 3, 25);
      const angle = (i / 5) * Math.PI * 2;
      light.position.set(
        Math.cos(angle) * 10,
        Math.sin(angle) * 10,
        5
      );
      pointLights.push(light);
      scene.add(light);
    }

    // Animated grid/mesh background
    const gridGeometry = new THREE.PlaneGeometry(50, 50, 30, 30);
    const gridMaterial = new THREE.MeshStandardMaterial({
      color: 0x0F2E26,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
      emissive: 0x6F8F7A,
      emissiveIntensity: 0.3
    });
    const grid = new THREE.Mesh(gridGeometry, gridMaterial);
    grid.rotation.x = -Math.PI / 3;
    grid.position.z = -10;
    scene.add(grid);

    // Animation loop
    let time = 0;
    const animate = (): void => {
      requestAnimationFrame(animate);
      time += 0.008;

      // Animate particle systems with wave motion
      particleSystems.forEach((system: ParticleSystem, index: number) => {
        system.mesh.rotation.y = time * system.speed;
        system.mesh.rotation.x = Math.sin(time * 0.3 + index) * 0.15;
        system.mesh.rotation.z = Math.cos(time * 0.2 + index) * 0.1;
      });

      // Animate shapes with complex motion
      shapes.forEach((shape: Shape, i: number) => {
        shape.mesh.rotation.x += shape.speedX;
        shape.mesh.rotation.y += shape.speedY;
        shape.mesh.rotation.z += shape.speedX * 0.5;
        
        // Orbital motion
        const orbitSpeed = 0.2;
        const orbitRadius = 12;
        const angle = time * orbitSpeed + (i / shapes.length) * Math.PI * 2;
        shape.mesh.position.x = Math.cos(angle) * orbitRadius;
        shape.mesh.position.y = Math.sin(angle) * orbitRadius * 0.5 + Math.sin(time + shape.floatOffset) * 2;
        
        // Scale pulsing
        const scale = 1 + Math.sin(time * 2 + i) * 0.15;
        shape.mesh.scale.set(scale, scale, scale);
      });

      // Animate point lights in circular patterns
      pointLights.forEach((light: THREE.PointLight, i: number) => {
        const angle = time * 0.3 + (i / pointLights.length) * Math.PI * 2;
        const radius = 12 + Math.sin(time + i) * 3;
        light.position.x = Math.cos(angle) * radius;
        light.position.y = Math.sin(angle) * radius;
        light.position.z = Math.sin(time * 0.5 + i) * 8;
        
        // Pulsing intensity
        light.intensity = 2.5 + Math.sin(time * 2 + i) * 1.5;
      });

      // Animate grid
      const gridPositions = grid.geometry.attributes.position;
      for (let i = 0; i < gridPositions.count; i++) {
        const x = gridPositions.getX(i);
        const y = gridPositions.getY(i);
        const wave = Math.sin(x * 0.3 + time) * Math.cos(y * 0.3 + time) * 0.5;
        gridPositions.setZ(i, wave);
      }
      gridPositions.needsUpdate = true;
      grid.rotation.z = time * 0.05;

      // Gentle camera movement
      camera.position.x = Math.sin(time * 0.1) * 2;
      camera.position.y = Math.cos(time * 0.15) * 1;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = (): void => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-[#0a0f0d]">
      {/* Radial gradient overlay with dark green */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#0F2E26]/30 to-[#0a0f0d]/90"></div>
      
      {/* Dark vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f0d]/50 via-transparent to-[#0a0f0d]/70"></div>

      {/* 3D Canvas */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />

      {/* Enhanced grain texture */}
      <div className="absolute inset-0 opacity-[0.025] mix-blend-overlay pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>

      {/* Subtle color accent overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#6F8F7A]/5 via-transparent to-[#C6A15B]/5 mix-blend-screen pointer-events-none"></div>
      
      {/* Elegant golden glow spots */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#C6A15B]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-[#6F8F7A]/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <style jsx>{`
        .bg-gradient-radial {
          background: radial-gradient(circle at 50% 50%, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
}