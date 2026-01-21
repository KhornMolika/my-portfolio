// File: components/ElasticBand.tsx
"use client";

import * as THREE from "three";
import { useRef, useState, Suspense } from "react";
import { Canvas, extend, useThree, useFrame } from "@react-three/fiber";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

extend({ MeshLineGeometry, MeshLineMaterial });

interface ElasticBandProps {
  backgroundColor?: string;
  wireColor?: string;
  wireWidth?: number;
  wireOpacity?: number;
  cardColor?: string;
  cardOpacity?: number;
  frontImage?: string;
  backImage?: string;
  transparent?: boolean;
}

export default function ElasticBand({
  backgroundColor = "transparent",
  wireColor = "white",
  wireWidth = 1,
  wireOpacity = 0.25,
  cardColor = "white",
  cardOpacity = 0.25,
  frontImage,
  backImage,
}: ElasticBandProps) {
  return (
    <div style={{ width: "100%", height: "100%", minHeight: "400px", backgroundColor }}>
      <Canvas camera={{ position: [0, 0, 13], fov: 25 }}>
        <Suspense fallback={null}>
          <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
            <Band 
              wireColor={wireColor}
              wireWidth={wireWidth}
              wireOpacity={wireOpacity}
              cardColor={cardColor}
              cardOpacity={cardOpacity}
              frontImage={frontImage}
              backImage={backImage}
            />
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  );
}

function Band({ 
  wireColor, 
  wireWidth, 
  wireOpacity,
  cardColor,
  cardOpacity,
  frontImage,
  backImage 
}: {
  wireColor: string;
  wireWidth: number;
  wireOpacity: number;
  cardColor: string;
  cardOpacity: number;
  frontImage?: string;
  backImage?: string;
}) {
  const band = useRef<any>();
  const fixed = useRef<any>();
  const j1 = useRef<any>();
  const j2 = useRef<any>();
  const j3 = useRef<any>();
  const card = useRef<any>();

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const { width, height } = useThree((state) => state.size);
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  );
  const [dragged, drag] = useState<false | THREE.Vector3>(false);

  // Load textures if provided
  const frontTexture = frontImage ? useLoader(TextureLoader, frontImage) : null;
  const backTexture = backImage ? useLoader(TextureLoader, backImage) : null;

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.45, 0],
  ]);

  useFrame((state) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }
    if (fixed.current) {
      // Calculate catmull curve
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.translation());
      curve.points[2].copy(j1.current.translation());
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(32));
      // Tilt it back towards the screen
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  const handlePointerDown = (e: any) => {
    e.target.setPointerCapture(e.pointerId);
    drag(
      new THREE.Vector3()
        .copy(e.point)
        .sub(vec.copy(card.current.translation()))
    );
  };

  const handlePointerUp = (e: any) => {
    e.target.releasePointerCapture(e.pointerId);
    drag(false);
  };

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody
          ref={fixed}
          angularDamping={2}
          linearDamping={2}
          type="fixed"
        />
        <RigidBody
          position={[0.5, 0, 0]}
          ref={j1}
          angularDamping={2}
          linearDamping={2}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[1, 0, 0]}
          ref={j2}
          angularDamping={2}
          linearDamping={2}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[1.5, 0, 0]}
          ref={j3}
          angularDamping={2}
          linearDamping={2}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          angularDamping={2}
          linearDamping={2}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          {/* Front side */}
          <mesh
            position={[0, 0, 0.01]}
            onPointerUp={handlePointerUp}
            onPointerDown={handlePointerDown}
          >
            <planeGeometry args={[0.8 * 2, 1.125 * 2]} />
            <meshBasicMaterial
              transparent
              opacity={frontImage ? 1 : cardOpacity}
              color={frontImage ? "white" : cardColor}
              map={frontTexture}
              side={THREE.FrontSide}
            />
          </mesh>
          {/* Back side */}
          <mesh
            position={[0, 0, -0.01]}
            onPointerUp={handlePointerUp}
            onPointerDown={handlePointerDown}
          >
            <planeGeometry args={[0.8 * 2, 1.125 * 2]} />
            <meshBasicMaterial
              transparent
              opacity={backImage ? 1 : cardOpacity}
              color={backImage ? "white" : cardColor}
              map={backTexture}
              side={THREE.BackSide}
            />
          </mesh>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          transparent
          opacity={wireOpacity}
          color={wireColor}
          depthTest={false}
          resolution={[width, height]}
          lineWidth={wireWidth}
        />
      </mesh>
    </>
  );
}

export { ElasticBand };