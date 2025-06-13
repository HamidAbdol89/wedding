import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Box, Sphere, Torus, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Component hoa hồng 3D
function Rose({ position, scale = 1, color = "#ff69b4" }) {
  const roseRef = useRef();
  
  useFrame((state) => {
    if (roseRef.current) {
      roseRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group ref={roseRef} position={position} scale={scale}>
      <Sphere args={[0.15, 8, 8]} position={[0, 0, 0]}>
        <meshStandardMaterial color={color} />
      </Sphere>
      <Sphere args={[0.12, 8, 8]} position={[0, 0.05, 0]}>
        <meshStandardMaterial color={color} transparent opacity={0.8} />
      </Sphere>
      <Sphere args={[0.08, 8, 8]} position={[0, 0.08, 0]}>
        <meshStandardMaterial color={color} transparent opacity={0.6} />
      </Sphere>
    </group>
  );
}

// Component lá cây
function Leaf({ position, rotation, scale = 1 }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <Box args={[0.02, 0.3, 0.15]}>
        <meshStandardMaterial color="#228b22" />
      </Box>
    </group>
  );
}

// Component trái tim 3D
function HeartComponent({ position, scale = 1, color = "#ff1493" }) {
  const heartRef = useRef();
  
  useFrame((state) => {
    if (heartRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      heartRef.current.scale.setScalar(scale * pulse);
    }
  });

  return (
    <group ref={heartRef} position={position}>
      <Sphere args={[0.1, 16, 16]} position={[-0.05, 0, 0]}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
      </Sphere>
      <Sphere args={[0.1, 16, 16]} position={[0.05, 0, 0]}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
      </Sphere>
      <Box args={[0.14, 0.14, 0.14]} position={[0, -0.07, 0]} rotation={[0, 0, Math.PI / 4]}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
      </Box>
    </group>
  );
}

// Hạt kim cương bay
function FloatingDiamond({ position }) {
  const diamondRef = useRef();
  
  useFrame((state) => {
    if (diamondRef.current) {
      diamondRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      diamondRef.current.rotation.y = state.clock.elapsedTime * 0.7;
      diamondRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.2;
    }
  });

  return (
    <group ref={diamondRef} position={position}>
      <Box args={[0.08, 0.08, 0.08]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <meshStandardMaterial 
          color="#ffffff" 
          metalness={0.9} 
          roughness={0.1} 
          emissive="#ffffff" 
          emissiveIntensity={0.3}
        />
      </Box>
    </group>
  );
}

// Component thiệp cưới chính
function WeddingCard3D() {
  const cardRef = useRef();
  const frameRef = useRef();
  
  useFrame((state) => {
    if (cardRef.current) {
      cardRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
      cardRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
    
    if (frameRef.current) {
      frameRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    }
  });

  // Tạo gradient background
  const backgroundMaterial = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const context = canvas.getContext('2d');
    
    const gradient = context.createLinearGradient(0, 0, 0, 512);
    gradient.addColorStop(0, '#ffeaa7');
    gradient.addColorStop(0.5, '#fab1a0');
    gradient.addColorStop(1, '#fd79a8');
    
    context.fillStyle = gradient;
    context.fillRect(0, 0, 512, 512);
    
    const texture = new THREE.CanvasTexture(canvas);
    return new THREE.MeshStandardMaterial({ 
      map: texture,
      metalness: 0.3,
      roughness: 0.4
    });
  }, []);

  return (
    <group>
      {/* Thiệp chính */}
      <group ref={cardRef}>
        {/* Background gradient */}
        <Box args={[5.2, 7.2, 0.12]} position={[0, 0, -0.05]}>
          <primitive object={backgroundMaterial} />
        </Box>
        
        {/* Viền vàng chính */}
        <Box args={[5, 7, 0.15]} position={[0, 0, 0]}>
          <meshStandardMaterial 
            color="#ffffff" 
            metalness={0.1} 
            roughness={0.2}
          />
        </Box>
        
        {/* Viền vàng ngoài */}
        <group ref={frameRef}>
          <Torus args={[3.8, 0.08, 8, 32]} position={[0, 0, 0.08]} rotation={[0, 0, 0]}>
            <meshStandardMaterial 
              color="#ffd700" 
              metalness={0.8} 
              roughness={0.2}
              emissive="#ffd700"
              emissiveIntensity={0.1}
            />
          </Torus>
        </group>
        
        {/* Viền vàng trong */}
        <Torus args={[3.2, 0.05, 8, 32]} position={[0, 0, 0.09]} rotation={[0, 0, 0]}>
          <meshStandardMaterial 
            color="#ffed4e" 
            metalness={0.9} 
            roughness={0.1}
          />
        </Torus>

        {/* Text chính */}
        <Text
          position={[0, 2.8, 0.12]}
          fontSize={0.55}
          color="#d4af37"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
          letterSpacing={0.05}
        >
          ♥ WEDDING INVITATION ♥
        </Text>
        
        <Text
          position={[0, 1.5, 0.12]}
          fontSize={1.1}
          color="#8b0000"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
          letterSpacing={0.02}
        >
          DUSÔ & HASIKIN
        </Text>
        
        <Text
          position={[0, 0.5, 0.12]}
          fontSize={0.4}
          color="#2d3436"
          anchorX="center"
          anchorY="middle"
          fontStyle="italic"
        >
          Together with their families
        </Text>
        
        <Text
          position={[0, 0, 0.12]}
          fontSize={0.35}
          color="#636e72"
          anchorX="center"
          anchorY="middle"
        >
          request the honor of your presence
        </Text>
        
        <Text
          position={[0, -0.8, 0.12]}
          fontSize={0.55}
          color="#8b0000"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          December 25, 2025
        </Text>
        
        <Text
          position={[0, -1.4, 0.12]}
          fontSize={0.4}
          color="#2d3436"
          anchorX="center"
          anchorY="middle"
        >
          6:00 PM
        </Text>
        
        <Text
          position={[0, -2, 0.12]}
          fontSize={0.38}
          color="#636e72"
          anchorX="center"
          anchorY="middle"
        >
          Grand Ballroom, Paradise Hotel
        </Text>
        
        <Text
          position={[0, -2.8, 0.12]}
          fontSize={0.3}
          color="#d4af37"
          anchorX="center"
          anchorY="middle"
          fontStyle="italic"
        >
          "Two hearts, one soul, forever as one"
        </Text>
      </group>

      {/* Hoa hồng trang trí */}
      <Rose position={[-2.2, 3, 0.15]} scale={0.8} color="#ff69b4" />
      <Rose position={[2.2, 3, 0.15]} scale={0.8} color="#ff1493" />
      <Rose position={[-2.2, -3, 0.15]} scale={0.7} color="#ffc0cb" />
      <Rose position={[2.2, -3, 0.15]} scale={0.7} color="#ff69b4" />
      
      {/* Lá cây */}
      <Leaf position={[-1.8, 2.8, 0.15]} rotation={[0, 0, 0.3]} scale={0.8} />
      <Leaf position={[1.8, 2.8, 0.15]} rotation={[0, 0, -0.3]} scale={0.8} />
      <Leaf position={[-1.8, -2.8, 0.15]} rotation={[0, 0, -0.3]} scale={0.8} />
      <Leaf position={[1.8, -2.8, 0.15]} rotation={[0, 0, 0.3]} scale={0.8} />
      
      {/* Trái tim nhỏ */}
      <HeartComponent position={[-1.5, 1.2, 0.15]} scale={0.6} color="#ff1493" />
      <HeartComponent position={[1.5, 1.2, 0.15]} scale={0.6} color="#ff69b4" />
      <HeartComponent position={[0, -3.2, 0.15]} scale={0.5} color="#ffc0cb" />
      
      {/* Kim cương bay */}
      <FloatingDiamond position={[-3, 1, 0.3]} />
      <FloatingDiamond position={[3, -1, 0.3]} />
      <FloatingDiamond position={[-1, 4, 0.3]} />
      <FloatingDiamond position={[1, -4, 0.3]} />
      <FloatingDiamond position={[0, 4.5, 0.3]} />
      
      {/* Ánh sáng */}
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffd700" />
      <pointLight position={[-10, -10, 10]} intensity={0.8} color="#ff69b4" />
      <spotLight
        position={[0, 0, 10]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        castShadow
        color="#ffffff"
        target-position={[0, 0, 0]}
      />
    </group>
  );
}

export default function WeddingInvitation() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <Environment preset="sunset" />
        <WeddingCard3D />
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
          maxDistance={20}
          minDistance={8}
        />
      </Canvas>
      
      {/* Overlay text */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'serif',
        textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
      }}>
        <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold' }}>💒 Thiệp Cưới 3D 💒</h1>
        <p style={{ margin: '5px 0', fontSize: '1rem', opacity: 0.9 }}>Kéo để xoay • Cuộn để zoom</p>
      </div>
    </div>
  );
}
