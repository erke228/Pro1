"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function Pedestal() {
  return (
    <group position={[0, -1, 0]}>
      {/* Base cylinder */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <cylinderGeometry args={[2.5, 2.8, 0.5, 64]} />
        <meshStandardMaterial color="#08090C" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Glowing ring Cyan */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[2.55, 2.55, 0.1, 64]} />
        <meshBasicMaterial color="#06B6D4" />
      </mesh>
      
      {/* Glowing ring Purple */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[2.45, 2.45, 0.05, 64]} />
        <meshBasicMaterial color="#8B5CF6" />
      </mesh>

      {/* Top surface */}
      <mesh position={[0, 0.26, 0]} receiveShadow>
        <cylinderGeometry args={[2.4, 2.4, 0.02, 64]} />
        <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

function FloatingDevice() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.2 + 0.5;
    }
  });

  return (
    <group ref={meshRef}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
        <mesh castShadow position={[0, 1.5, 0]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[1.5, 1.8, 0.3]} />
          <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Watch band mock */}
        <mesh castShadow position={[0, 1.5, -0.2]}>
           <torusGeometry args={[1, 0.2, 16, 64]} />
           <meshStandardMaterial color="#111" metalness={0.5} roughness={0.5} />
        </mesh>
      </Float>
    </group>
  );
}

export default function HeroDeviceCanvas() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 10, 5]} intensity={2} color="#ffffff" castShadow />
        
        {/* Neon Lights */}
        <pointLight position={[-3, 1, 3]} color="#8B5CF6" intensity={10} distance={10} />
        <pointLight position={[3, -1, 3]} color="#06B6D4" intensity={10} distance={10} />
        
        <FloatingDevice />
        <Pedestal />
        
        <ContactShadows position={[0, -1, 0]} opacity={0.7} scale={20} blur={2.5} far={4} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
