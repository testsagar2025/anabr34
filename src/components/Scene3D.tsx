import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sparkles, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Floating particle component
const FloatingParticle = ({ position, delay = 0 }: { position: [number, number, number]; delay?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + delay) * 0.3;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2 + delay;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[0.08, 0]} />
      <meshStandardMaterial color="#d4af37" emissive="#d4af37" emissiveIntensity={0.5} metalness={0.8} roughness={0.2} />
    </mesh>
  );
};

// Floating heart shape
const FloatingHeart = ({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const heartShape = useMemo(() => {
    const shape = new THREE.Shape();
    const x = 0, y = 0;
    shape.moveTo(x, y + 0.25);
    shape.bezierCurveTo(x, y + 0.25, x - 0.25, y, x - 0.25, y);
    shape.bezierCurveTo(x - 0.25, y - 0.25, x, y - 0.35, x, y - 0.5);
    shape.bezierCurveTo(x, y - 0.35, x + 0.25, y - 0.25, x + 0.25, y);
    shape.bezierCurveTo(x + 0.25, y, x, y + 0.25, x, y + 0.25);
    return shape;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale} rotation={[0, 0, Math.PI]}>
        <shapeGeometry args={[heartShape]} />
        <meshStandardMaterial 
          color="#8b1538" 
          emissive="#8b1538" 
          emissiveIntensity={0.3} 
          metalness={0.5} 
          roughness={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  );
};

// Decorative ring
const DecorativeRing = ({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <torusGeometry args={[0.3, 0.02, 16, 100]} />
      <meshStandardMaterial color="#d4af37" emissive="#d4af37" emissiveIntensity={0.4} metalness={0.9} roughness={0.1} />
    </mesh>
  );
};

// Scene content
const SceneContent = () => {
  return (
    <>
      {/* Ambient and directional lights */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#fff5e6" />
      <pointLight position={[-5, 5, 5]} intensity={0.5} color="#d4af37" />
      <pointLight position={[5, -5, 5]} intensity={0.3} color="#8b1538" />
      
      {/* Stars background */}
      <Stars radius={50} depth={50} count={1000} factor={3} saturation={0} fade speed={0.5} />
      
      {/* Golden sparkles */}
      <Sparkles count={80} scale={15} size={2} speed={0.3} color="#d4af37" />
      
      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <FloatingParticle
          key={i}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 5 - 2
          ]}
          delay={i * 0.5}
        />
      ))}
      
      {/* Floating hearts */}
      <FloatingHeart position={[-3, 2, -3]} scale={0.5} />
      <FloatingHeart position={[3, -1, -4]} scale={0.4} />
      <FloatingHeart position={[-2, -2, -2]} scale={0.3} />
      <FloatingHeart position={[2.5, 1.5, -3]} scale={0.35} />
      
      {/* Decorative rings */}
      <DecorativeRing position={[-4, 0, -5]} rotation={[Math.PI / 4, 0, 0]} />
      <DecorativeRing position={[4, 1, -4]} rotation={[0, Math.PI / 4, Math.PI / 6]} />
      <DecorativeRing position={[0, -3, -6]} rotation={[Math.PI / 3, Math.PI / 4, 0]} />
    </>
  );
};

const Scene3D = () => {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
};

export default Scene3D;
