import { Float, Line, OrbitControls, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function GlobeMesh() {
  const globe = useRef(null);
  const ring = useRef(null);

  useFrame((state) => {
    if (globe.current) globe.current.rotation.y = state.clock.elapsedTime * 0.18;
    if (ring.current) ring.current.rotation.z = state.clock.elapsedTime * 0.12;
  });

  const arcs = useMemo(() => {
    return Array.from({ length: 8 }, (_, index) => {
      const radius = 1.32 + index * 0.03;
      const y = -0.65 + index * 0.18;
      const points = Array.from({ length: 72 }, (__, pointIndex) => {
        const angle = (pointIndex / 71) * Math.PI * 2;
        return new THREE.Vector3(Math.cos(angle) * radius, y + Math.sin(angle * 2 + index) * 0.08, Math.sin(angle) * radius);
      });
      return points;
    });
  }, []);

  return (
    <Float speed={1.2} floatIntensity={0.7} rotationIntensity={0.25}>
      <group>
        <mesh ref={globe}>
          <sphereGeometry args={[1.15, 48, 48]} />
          <meshStandardMaterial color="#06233a" emissive="#0891b2" emissiveIntensity={0.38} roughness={0.22} metalness={0.45} wireframe />
        </mesh>
        <mesh ref={ring} rotation={[Math.PI / 2.9, 0, 0]}>
          <torusGeometry args={[1.48, 0.01, 8, 110]} />
          <meshBasicMaterial color="#a78bfa" transparent opacity={0.7} />
        </mesh>
        {arcs.map((points, index) => (
          <Line key={index} points={points} color={index % 2 ? "#22d3ee" : "#f0abfc"} lineWidth={0.5} transparent opacity={0.3} />
        ))}
      </group>
    </Float>
  );
}

export default function EarthGlobe({ frameloop = "always", lowPower = false }) {
  return (
    <Canvas
      frameloop={frameloop}
      camera={{ position: [0, 0, 4.1], fov: 48 }}
      dpr={[1, lowPower ? 1.25 : 1.6]}
      gl={{ antialias: !lowPower, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.55} />
      <pointLight position={[3, 2, 3]} intensity={2} color="#22d3ee" />
      <pointLight position={[-3, -2, 2]} intensity={1.5} color="#a78bfa" />
      <Sparkles count={lowPower ? 22 : 40} scale={[3.5, 3.5, 3.5]} size={1.8} speed={0.35} color="#67e8f9" opacity={0.35} />
      <GlobeMesh />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={frameloop === "always"} autoRotateSpeed={0.45} />
    </Canvas>
  );
}
