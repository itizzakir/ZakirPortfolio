import { Float, Line, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function ShapeCluster() {
  const groupRef = useRef(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.35) * 0.07;
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.55} floatIntensity={1.5}>
        <mesh position={[-2.5, 0.8, -1.4]}>
          <icosahedronGeometry args={[0.82, 1]} />
          <MeshDistortMaterial color="#22d3ee" emissive="#0891b2" emissiveIntensity={0.7} roughness={0.18} metalness={0.55} distort={0.24} speed={1.4} transparent opacity={0.74} />
        </mesh>
      </Float>
      <Float speed={1.1} rotationIntensity={0.8} floatIntensity={1.2}>
        <mesh position={[2.35, -0.35, -1.1]}>
          <torusKnotGeometry args={[0.55, 0.18, 96, 14]} />
          <meshStandardMaterial color="#a78bfa" emissive="#7c3aed" emissiveIntensity={0.75} metalness={0.7} roughness={0.22} transparent opacity={0.8} />
        </mesh>
      </Float>
      <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.7}>
        <mesh position={[0.8, 1.65, -1.8]}>
          <octahedronGeometry args={[0.56, 0]} />
          <meshStandardMaterial color="#f0abfc" emissive="#c026d3" emissiveIntensity={0.55} metalness={0.45} roughness={0.18} transparent opacity={0.7} />
        </mesh>
      </Float>
    </group>
  );
}

function NeuralLines() {
  const lines = useMemo(() => {
    const points = Array.from({ length: 18 }, (_, index) => {
      const angle = (index / 18) * Math.PI * 2;
      return new THREE.Vector3(Math.cos(angle) * (2.2 + Math.sin(index) * 0.65), Math.sin(angle * 1.4) * 1.2, -2.2 + Math.sin(index * 0.7) * 0.35);
    });

    return points.map((point, index) => [point, points[(index + 5) % points.length]]);
  }, []);

  return (
    <group>
      {lines.map((line, index) => (
        <Line
          key={`${line[0].x}-${index}`}
          points={line}
          color={index % 2 ? "#22d3ee" : "#a78bfa"}
          lineWidth={0.75}
          transparent
          opacity={0.26}
        />
      ))}
    </group>
  );
}

export default function HeroScene({ frameloop = "always", lowPower = false }) {
  return (
    <Canvas
      frameloop={frameloop}
      camera={{ position: [0, 0, 5.6], fov: 58 }}
      dpr={[1, lowPower ? 1.25 : 1.75]}
      gl={{ antialias: !lowPower, alpha: true, premultipliedAlpha: false, powerPreference: "high-performance" }}
      onCreated={({ gl, scene }) => {
        scene.background = null;
        gl.setClearColor(0x000000, 0);
      }}
    >
      <ambientLight intensity={0.55} />
      <pointLight position={[2.8, 3.2, 3]} intensity={2.2} color="#22d3ee" />
      <pointLight position={[-3.2, -2.2, 2.6]} intensity={1.7} color="#8b5cf6" />
      <Sparkles count={lowPower ? 32 : 56} scale={[7.4, 4.2, 3]} size={2.3} speed={0.42} color="#67e8f9" opacity={0.42} />
      <NeuralLines />
      <ShapeCluster />
    </Canvas>
  );
}
