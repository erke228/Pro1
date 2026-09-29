"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, ContactShadows, OrbitControls } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

interface Product3DViewerProps {
  slug: string;
  color: string;
}

function NeuralLinkModel({ color }: { color: string }) {
  const coreRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.x = state.clock.getElapsedTime() * 0.5;
      coreRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <group>
      <mesh>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.6, 1]} />
        <meshStandardMaterial color="#fff" emissive={color} emissiveIntensity={2} wireframe />
      </mesh>
    </group>
  );
}

function DroneModel({ color }: { color: string }) {
  return (
    <group>
      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 0.4, 1]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Arms */}
      <mesh position={[0.8, 0.1, 0.8]} rotation={[0, Math.PI / 4, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 1]} />
        <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[-0.8, 0.1, 0.8]} rotation={[0, -Math.PI / 4, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 1]} />
        <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0.8, 0.1, -0.8]} rotation={[0, -Math.PI / 4, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 1]} />
        <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[-0.8, 0.1, -0.8]} rotation={[0, Math.PI / 4, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 1]} />
        <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Camera */}
      <mesh position={[1, -0.2, 0]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="#000" metalness={1} roughness={0} />
      </mesh>
      {/* Propeller guards */}
      {[
        [1.2, 0.2, 1.2], [-1.2, 0.2, 1.2],
        [1.2, 0.2, -1.2], [-1.2, 0.2, -1.2]
      ].map((pos, i) => (
        <mesh key={i} position={pos as any} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.4, 0.02, 16, 64]} />
          <meshStandardMaterial color={color} metalness={0.5} roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

function EarbudsModel({ color }: { color: string }) {
  // ... existing code ...
  return (
    <group>
      {/* Left Bud */}
      <group position={[-0.6, 0, 0]} rotation={[0, 0, 0.2]}>
        <mesh position={[0, 0.5, 0]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial color={color} metalness={0.6} roughness={0.1} />
        </mesh>
        <mesh position={[0, -0.2, 0]}>
          <capsuleGeometry args={[0.15, 0.8, 16, 16]} />
          <meshStandardMaterial color={color} metalness={0.6} roughness={0.1} />
        </mesh>
        {/* Neon accent */}
        <mesh position={[0.2, 0.5, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#fff" emissive={color} emissiveIntensity={2} />
        </mesh>
      </group>
      
      {/* Right Bud */}
      <group position={[0.6, 0, 0]} rotation={[0, 0, -0.2]}>
        <mesh position={[0, 0.5, 0]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial color={color} metalness={0.6} roughness={0.1} />
        </mesh>
        <mesh position={[0, -0.2, 0]}>
          <capsuleGeometry args={[0.15, 0.8, 16, 16]} />
          <meshStandardMaterial color={color} metalness={0.6} roughness={0.1} />
        </mesh>
        {/* Neon accent */}
        <mesh position={[-0.2, 0.5, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#fff" emissive={color} emissiveIntensity={2} />
        </mesh>
      </group>
    </group>
  );
}

function SmartRingModel({ color }: { color: string }) {
  return (
    <group rotation={[Math.PI / 3, 0, 0]}>
      <mesh>
        <torusGeometry args={[0.8, 0.3, 32, 100]} />
        <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh>
        <torusGeometry args={[0.82, 0.05, 16, 100]} />
        <meshStandardMaterial color="#fff" emissive={color} emissiveIntensity={3} />
      </mesh>
    </group>
  );
}

function HeadphonesModel({ color }: { color: string }) {
  return (
    <group>
      {/* Headband */}
      <mesh position={[0, 0.2, 0]}>
        <torusGeometry args={[0.8, 0.1, 16, 64, Math.PI]} />
        <meshStandardMaterial color="#222" metalness={0.5} roughness={0.8} />
      </mesh>
      {/* Left Cup */}
      <mesh position={[-0.8, 0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[-0.7, 0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.3, 0.3, 0.32, 32]} />
        <meshStandardMaterial color="#fff" emissive={color} emissiveIntensity={1} />
      </mesh>
      {/* Right Cup */}
      <mesh position={[0.8, 0.2, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.7, 0.2, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <cylinderGeometry args={[0.3, 0.3, 0.32, 32]} />
        <meshStandardMaterial color="#fff" emissive={color} emissiveIntensity={1} />
      </mesh>
    </group>
  );
}

function GimbalModel({ color }: { color: string }) {
  return (
    <group>
      {/* Base */}
      <mesh position={[0, -0.8, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 1, 32]} />
        <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Arm 1 */}
      <mesh position={[0.2, -0.2, 0]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.1, 0.1, 0.8, 16]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Joint */}
      <mesh position={[0.5, 0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.3, 32]} />
        <meshStandardMaterial color="#222" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Camera */}
      <mesh position={[0.5, 0.1, 0.3]}>
        <boxGeometry args={[0.4, 0.4, 0.5]} />
        <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.5, 0.1, 0.6]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 32]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#000" metalness={1} roughness={0} />
      </mesh>
    </group>
  );
}

function SleeveModel({ color }: { color: string }) {
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      {/* Arm / Sleeve */}
      <mesh>
        <cylinderGeometry args={[0.4, 0.3, 2, 32]} />
        <meshStandardMaterial color="#111" metalness={0.3} roughness={0.8} wireframe={false} />
      </mesh>
      {/* Glowing nodes */}
      {[-0.6, 0, 0.6].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <torusGeometry args={[0.41 - (i * 0.02), 0.02, 16, 64]} />
          <meshStandardMaterial color="#fff" emissive={color} emissiveIntensity={2} />
        </mesh>
      ))}
      <mesh>
        <cylinderGeometry args={[0.42, 0.32, 1.8, 16]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} wireframe={true} />
      </mesh>
    </group>
  );
}

function VRGloveModel({ color }: { color: string }) {
  return (
    <group>
      {/* Palm */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.8, 1, 0.2]} />
        <meshStandardMaterial color="#111" metalness={0.5} roughness={0.5} />
      </mesh>
      {/* Glowing core */}
      <mesh position={[0, -0.2, 0.11]}>
        <circleGeometry args={[0.15, 32]} />
        <meshStandardMaterial color="#fff" emissive={color} emissiveIntensity={2} />
      </mesh>
      {/* Fingers */}
      {[-0.3, -0.1, 0.1, 0.3].map((x, i) => (
        <group key={i} position={[x, 0.6, 0]}>
          <mesh position={[0, 0.3, 0]}>
            <capsuleGeometry args={[0.08, 0.4, 16, 16]} />
            <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      ))}
      {/* Thumb */}
      <group position={[-0.5, -0.2, 0]} rotation={[0, 0, Math.PI / 4]}>
        <mesh position={[0, 0.3, 0]}>
          <capsuleGeometry args={[0.08, 0.3, 16, 16]} />
          <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

export default function Product3DViewer({ slug, color }: Product3DViewerProps) {
  // ... existing code ...
  return (
    <div className="w-full h-full absolute inset-0 rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" castShadow />
        <pointLight position={[-10, -10, -10]} intensity={1} color={color} />
        
        <OrbitControls 
          enableZoom={true} 
          enablePan={false}
          minDistance={2}
          maxDistance={10}
          autoRotate={false}
        />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          {slug === 'neural-link-x1' && <NeuralLinkModel color={color} />}
          {slug === 'stealth-drone-pro' && <DroneModel color={color} />}
          {slug === 'cyber-buds-omega' && <EarbudsModel color={color} />}
          {slug === 'aurora-smart-ring' && <SmartRingModel color={color} />}
          {slug === 'chronos-elite' && <HeadphonesModel color={color} />}
          {slug === 'gimbal-mod-pro' && <GimbalModel color={color} />}
          {slug === 'cyber-armor-sleeve' && <SleeveModel color={color} />}
          {slug === 'haptic-vr-gloves' && <VRGloveModel color={color} />}
          
          {/* Fallback model if slug is unknown */}
          {!['neural-link-x1', 'stealth-drone-pro', 'cyber-buds-omega', 'aurora-smart-ring', 'chronos-elite', 'gimbal-mod-pro', 'cyber-armor-sleeve', 'haptic-vr-gloves'].includes(slug) && (
             <mesh>
               <boxGeometry args={[1, 1, 1]} />
               <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
             </mesh>
          )}
        </Float>

        <ContactShadows position={[0, -1.5, 0]} opacity={0.5} scale={10} blur={2} far={4} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
