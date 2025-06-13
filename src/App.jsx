import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Box } from '@react-three/drei';
import { Heart, Calendar, MapPin, Users, Music, Mail, Phone } from 'lucide-react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

const weddingImages = [
  '13.png','4.jpg',  '9.jpg', '10.JPG',  '11.JPG', '12.jpg','8.jpg',
  '1.jpg', '2.jpg', '3.jpg', '5.JPG', '6.JPG', '7.JPG',
  
];

// 3D Wedding Portal - Thiết kế chuyên nghiệp đặc sắc
function Wedding3DPortal() {
  const portalRef = useRef();
  const ringsRef = useRef();
  const particlesRef = useRef();
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Tạo particles vàng bay xung quanh
  const particles = Array.from({ length: isMobile ? 30 : 50 }, (_, i) => ({
    id: i,
    position: [
      (Math.random() - 0.5) * 12,
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 6
    ],
    speed: Math.random() * 0.008 + 0.002,
    size: Math.random() * 0.03 + 0.01
  }));

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (portalRef.current) {
      // Portal quay nhẹ và floating
      portalRef.current.rotation.z = time * 0.1;
      portalRef.current.position.y = Math.sin(time * 0.8) * 0.2;
    }
    
    if (ringsRef.current) {
      // Nhẫn cưới xoay quanh nhau
      ringsRef.current.children[0].rotation.x = time * 0.5;
      ringsRef.current.children[0].rotation.y = time * 0.3;
      ringsRef.current.children[1].rotation.x = -time * 0.4;
      ringsRef.current.children[1].rotation.z = time * 0.6;
    }
    
    if (particlesRef.current) {
      // Particles bay xung quanh
      particlesRef.current.children.forEach((particle, i) => {
        const data = particles[i];
        particle.position.x += Math.sin(time + i) * 0.002;
        particle.position.y += data.speed;
        particle.position.z += Math.cos(time + i) * 0.002;
        
        if (particle.position.y > 4) particle.position.y = -4;
        
        // Sparkle effect
        particle.scale.setScalar(data.size * (1 + Math.sin(time * 3 + i) * 0.3));
      });
    }
  });

  const scale = isMobile ? 0.7 : 1;

  return (
    <group>
      {/* Background Portal Ring */}
      <group ref={portalRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[4 * scale, 0.1 * scale, 16, 64]} />
          <meshBasicMaterial 
            color="#ffd700" 
            transparent 
            opacity={0.3}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[3.5 * scale, 0.05 * scale, 12, 48]} />
          <meshBasicMaterial 
            color="#ffffff" 
            transparent 
            opacity={0.6}
          />
        </mesh>
      </group>
      
      {/* Golden Particles */}
      <group ref={particlesRef}>
        {particles.map((particle) => (
          <mesh key={particle.id} position={particle.position}>
            <sphereGeometry args={[particle.size, 8, 8]} />
            <meshBasicMaterial 
              color="#ffd700" 
              transparent 
              opacity={0.8}
            />
          </mesh>
        ))}
      </group>
      
      {/* Wedding Rings Animation */}
      <group ref={ringsRef}>
        <mesh position={[-0.5 * scale, 2 * scale, 1]}>
          <torusGeometry args={[0.3 * scale, 0.06 * scale, 8, 24]} />
          <meshBasicMaterial color="#ffd700" />
        </mesh>
        <mesh position={[0.5 * scale, 2 * scale, 1]}>
          <torusGeometry args={[0.25 * scale, 0.05 * scale, 8, 24]} />
          <meshBasicMaterial color="#e6e6fa" />
        </mesh>
      </group>
      
      {/* Main Title với gradient effect */}
      <group position={[0, 0.8 * scale, 0]}>
        <Text
          fontSize={1.4 * scale}
          color="#ff6b9d"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
          letterSpacing={0.1}
        >
          DUSÔ
        </Text>
        
        {/* Heart connector */}
        <mesh position={[0, -0.3 * scale, 0.1]}>
          <sphereGeometry args={[0.08 * scale, 16, 16]} />
          <meshBasicMaterial color="#ff1493" />
        </mesh>
        <Text
          position={[0, -0.3 * scale, 0]}
          fontSize={0.4 * scale}
          color="#ff1493"
          anchorX="center"
          anchorY="middle"
        >
          ♥
        </Text>
        
        <Text
          position={[0, -0.8 * scale, 0]}
          fontSize={1.4 * scale}
          color="#ff6b9d"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
          letterSpacing={0.1}
        >
          HASIKIN
        </Text>
      </group>
      
      {/* Wedding Details với glass morphism */}
      <group position={[0, -2.2 * scale, 0]}>
        {/* Glass panel background */}
        <mesh>
          <planeGeometry args={[5 * scale, 1.8 * scale]} />
          <meshBasicMaterial 
            color="#ffffff" 
            transparent 
            opacity={0.1}
          />
        </mesh>
        
        <Text
          position={[0, 0.4 * scale, 0.01]}
          fontSize={0.45 * scale}
          color="#ffd700"
          anchorX="center"
          anchorY="middle"
          fontWeight="600"
        >
          December 25, 2025
        </Text>
        
        <Text
          position={[0, 0 * scale, 0.01]}
          fontSize={0.32 * scale}
          color="#e6e6fa"
          anchorX="center"
          anchorY="middle"
        >
          7:00 PM
        </Text>
        
        <Text
          position={[0, -0.4 * scale, 0.01]}
          fontSize={0.35 * scale}
          color="#e6e6fa"
          anchorX="center"
          anchorY="middle"
          fontWeight="500"
        >
          Paradise Hotel
        </Text>
      </group>
      
      {/* Decorative Elements */}
      <group>
        {/* Corner decorations */}
        {[-2, 2].map((x, i) => (
          <group key={i} position={[x * scale, 3 * scale, -0.5]}>
            <mesh>
              <cylinderGeometry args={[0.02 * scale, 0.02 * scale, 1 * scale]} />
              <meshBasicMaterial color="#ffd700" transparent opacity={0.6} />
            </mesh>
            <mesh position={[0, 0.5 * scale, 0]}>
              <sphereGeometry args={[0.05 * scale, 8, 8]} />
              <meshBasicMaterial color="#ff69b4" />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}// Heart Shape Geometry đơn giản
function createHeartShape() {
  const heartShape = new THREE.Shape();
  heartShape.moveTo(0, 0);
  heartShape.bezierCurveTo(0, -0.3, -0.6, -0.3, -0.6, 0);
  heartShape.bezierCurveTo(-0.6, 0.3, 0, 0.6, 0, 1);
  heartShape.bezierCurveTo(0, 0.6, 0.6, 0.3, 0.6, 0);
  heartShape.bezierCurveTo(0.6, -0.3, 0, -0.3, 0, 0);
  return heartShape;
}

// Floating Hearts 3D Component tối ưu cho mobile
function FloatingHearts() {
  const heartsRef = useRef();
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const heartCount = isMobile ? 8 : 15;
  const hearts = Array.from({ length: heartCount }, (_, i) => ({
    id: i,
    position: [
      (Math.random() - 0.5) * (isMobile ? 10 : 15),
      (Math.random() - 0.5) * (isMobile ? 8 : 15),
      (Math.random() - 0.5) * (isMobile ? 8 : 15)
    ],
    scale: Math.random() * 0.2 + 0.15,
    speed: Math.random() * 0.012 + 0.006
  }));

  useFrame((state) => {
    if (heartsRef.current) {
      heartsRef.current.children.forEach((heart, i) => {
        const heartData = hearts[i];
        
        // Chuyển động đơn giản
        heart.position.y += heartData.speed;
        heart.rotation.z += 0.005;
        
        // Reset vị trí
        const maxY = isMobile ? 6 : 8;
        if (heart.position.y > maxY) heart.position.y = -maxY;
      });
    }
  });

  const heartGeometry = new THREE.ExtrudeGeometry(createHeartShape(), {
    depth: 0.08,
    bevelEnabled: false
  });

  return (
    <group ref={heartsRef}>
      {hearts.map((heart) => (
        <mesh 
          key={heart.id} 
          position={heart.position} 
          scale={[heart.scale, heart.scale, heart.scale]}
          geometry={heartGeometry}
        >
          <meshBasicMaterial color="#ff6b9d" transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  );
}
// Main Wedding Invitation Component
export default function WeddingInvitation() {
  const [currentSection, setCurrentSection] = useState('invitation');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

const [fullscreenOpen, setFullscreenOpen] = useState(false);
const [isUserInteracting, setIsUserInteracting] = useState(false);


    const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '1',
    message: ''
  });
// Xử lý play/pause âm thanh
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play().catch(error => {
        console.error("Autoplay was prevented:", error);
        // Hiển thị thông báo cho người dùng nếu cần
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);
 

  const sections = {
    invitation: 'Thiệp Mời',
    details: 'Chi Tiết',
    gallery: 'Album Ảnh',
    rsvp: 'Xác Nhận'
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


 // THAY THẾ useEffect TỰ ĐỘNG CHUYỂN ẢNH CŨ BẰNG CÁI NÀY:
useEffect(() => {
  // Chỉ tự động chuyển khi không có tương tác và không mở fullscreen
  if (!isUserInteracting && !fullscreenOpen) {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % weddingImages.length);
    }, 4000); // Tăng thời gian lên 4s để ít bị làm phiền
    return () => clearInterval(interval);
  }
}, [isUserInteracting, fullscreenOpen]);

// FUNCTION navigateImage VỚI XỬ LÝ TƯƠNG TÁC:
const navigateImage = (direction) => {
  setIsUserInteracting(true); // Đánh dấu user đang tương tác
  if (direction === 'next') {
    setCurrentImageIndex((prev) => (prev + 1) % weddingImages.length);
  } else {
    setCurrentImageIndex((prev) => (prev === 0 ? weddingImages.length - 1 : prev - 1));
  }
};


  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Tạo nội dung email
    const subject = encodeURIComponent('Xác nhận tham dự lễ cưới DUSÔ & HASIKIN');
    const body = encodeURIComponent(`
Xin chào,

Tôi xác nhận tham dự lễ cưới với thông tin sau:

Họ tên: ${formData.name}
Số điện thoại: ${formData.phone}
Số người tham dự: ${formData.guests}
Lời chúc: ${formData.message}

Trân trọng,
${formData.name}
    `);
    
    // Mở Gmail với thông tin đã điền sẵn
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=wedding.yusohkin@gmail.com&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank');
  };

 return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 overflow-hidden">
      {/* Navigation - Mobile Optimized */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-rose-200 shadow-sm">
        <div className="max-w-full mx-auto px-2 py-2">
          <div className="flex justify-center space-x-2 sm:space-x-4 overflow-x-auto">
            {Object.entries(sections).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setCurrentSection(key)}
                className={`px-3 py-2 text-sm sm:text-base rounded-full transition-all duration-300 whitespace-nowrap ${
                  currentSection === key
                    ? 'bg-rose-500 text-white shadow-lg'
                    : 'text-rose-600 hover:bg-rose-100'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-16">
        {currentSection === 'invitation' && (
          <div className="relative">
            {/* 3D Scene - Mobile Responsive */}
            <div className="h-screen">
              <Canvas camera={{ position: [0, 0, 8], fov: 65 }}>
                <ambientLight intensity={0.7} />
                <pointLight position={[8, 8, 8]} intensity={0.8} />
                <pointLight position={[-8, -8, -8]} intensity={0.4} color="#ff69b4" />
                <Wedding3DPortal/>
                <FloatingHearts />
                Wedding3DPortal
                <OrbitControls 
                  enableZoom={false}
                  enablePan={false}
                  maxPolarAngle={Math.PI / 2}
                  minPolarAngle={Math.PI / 2}
                  autoRotate={true}
                  autoRotateSpeed={0.5}
                />
              </Canvas>
            </div>

            {/* Overlay Text - Mobile Responsive */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4">
              <div className="text-center space-y-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-8 border border-white/20 max-w-sm sm:max-w-md">
                <h1 className="text-4xl sm:text-6xl font-serif text-rose-600 mb-2 sm:mb-4 animate-pulse">
                  DUSÔ & HASIKIN
                </h1>
                <p className="text-sm sm:text-xl text-rose-800 mb-4 sm:mb-6 leading-relaxed">
                  Trân trọng kính mời bạn tham dự lễ cưới của chúng tôi
                </p>
                <div className="flex items-center justify-center space-x-2 text-rose-700">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-lg">25 Tháng 12, 2025</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentSection === 'details' && (
          <div className="max-w-4xl mx-auto px-4 py-8 sm:py-16 space-y-8 sm:space-y-12">
            <h2 className="text-2xl sm:text-4xl font-serif text-center text-rose-600 mb-8 sm:mb-12">
              Chi Tiết Lễ Cưới
            </h2>
            
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-rose-200 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                  <div className="bg-rose-500 p-2 sm:p-3 rounded-full">
                    <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-rose-700">Lễ Vu Quy</h3>
                </div>
                <div className="space-y-3 sm:space-y-4 text-gray-700">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Thứ 7, 25 Tháng 12, 2025</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base">Nhà Trai - 123 Đường ABC, Quận XYZ</span>
                  </div>
                  <p className="text-xs sm:text-sm bg-rose-50 p-3 sm:p-4 rounded-lg">
                    Thời gian: 8:00 AM - 12:00 PM
                  </p>
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-rose-200 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                  <div className="bg-purple-500 p-2 sm:p-3 rounded-full">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-purple-700">Tiệc Cưới</h3>
                </div>
                <div className="space-y-3 sm:space-y-4 text-gray-700">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Thứ 7, 25 Tháng 12, 2025</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base">Grand Ballroom, Paradise Hotel</span>
                  </div>
                  <p className="text-xs sm:text-sm bg-purple-50 p-3 sm:p-4 rounded-lg">
                    Thời gian: 6:00 PM - 10:00 PM
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center bg-gradient-to-r from-rose-500 to-purple-500 text-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl">
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Lời Cảm Ơn</h3>
              <p className="text-sm sm:text-lg leading-relaxed">
                Sự hiện diện của bạn sẽ làm cho ngày đặc biệt của chúng tôi trở nên hoàn hảo hơn. 
                Chúng tôi rất mong được chia sẻ niềm hạnh phúc này cùng với bạn!
              </p>
            </div>
          </div>
        )}

        {currentSection === 'gallery' && (
          <div className="max-w-7xl mx-auto px-4 py-8 sm:py-16">
            <h2 className="text-3xl sm:text-5xl font-serif text-center bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 bg-clip-text text-transparent mb-8 sm:mb-12 tracking-wide">
              Album Ảnh Cưới
            </h2>
            
            {/* Main Gallery Container */}
            <div className="relative">
              {/* Full-screen Image Display - Optimized */}
              <div className="relative w-full h-[60vh] sm:h-[75vh] bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 rounded-xl overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                        transition: { 
                          duration: 0.7,  // Tăng thời gian cho mượt hơn
                          ease: [0.33, 1, 0.68, 1]  // Easing function tối ưu
                        }
                      }}
                      exit={{ 
                        opacity: 0, 
                        scale: 0.98,
                        transition: { 
                          duration: 0.7 
                        }
                      }}
                      style={{
                        willChange: 'transform, opacity',
                        transformStyle: 'preserve-3d',
                        height: '100%',
                        width: '100%',
                        backfaceVisibility: 'hidden'  // Chống răng cưa
                      }}
                    >
                      <img
                        src={`/images/${weddingImages[currentImageIndex]}`}
                        alt={`Ảnh cưới ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover object-center rounded-xl cursor-zoom-in"
                        loading="eager"
                        decoding="sync"
                        style={{
                          transform: 'translateZ(0)',  // GPU acceleration
                          backfaceVisibility: 'hidden',
                          imageRendering: 'high-quality',
                          contentVisibility: 'auto'  // Tối ưu render
                        }}
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml,...';
                        }}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
                
                {/* Navigation Controls (Giữ nguyên) */}
                <div className="absolute inset-0 flex items-center justify-between px-4 sm:px-6 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateImage('prev');
                    }}
                    className="pointer-events-auto group bg-white/20 backdrop-blur-xl border border-white/30 hover:bg-white/30 p-3 sm:p-4 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95"
                    style={{ willChange: 'transform' }}  // Tối ưu animation
                  >
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white group-hover:text-gray-800 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateImage('next');
                    }}
                    className="pointer-events-auto group bg-white/20 backdrop-blur-xl border border-white/30 hover:bg-white/30 p-3 sm:p-4 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95"
                    style={{ willChange: 'transform' }}
                  >
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white group-hover:text-gray-800 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Counter & Fullscreen Button */}
                <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-3">
                  <motion.div 
                    className="bg-black/30 backdrop-blur-xl text-white px-4 py-2 rounded-2xl text-sm font-medium border border-white/20"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    key={currentImageIndex}
                  >
                    {currentImageIndex + 1} / {weddingImages.length}
                  </motion.div>
                  <button
                    onClick={() => setFullscreenOpen(true)}
                    className="bg-white/20 backdrop-blur-xl border border-white/30 hover:bg-white/30 p-2 rounded-xl transition-all duration-300 transform hover:scale-110"
                    style={{ willChange: 'transform' }}
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </button>
                </div>

                {/* Progress Bar với Animation */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-black/10">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-rose-500 to-pink-500"
                    initial={{ width: 0 }}
                    animate={{ 
                      width: `${((currentImageIndex + 1) / weddingImages.length) * 100}%`,
                      transition: { duration: 0.7, ease: [0.33, 1, 0.68, 1] }
                    }}
                    key={currentImageIndex}
                  />
                </div>
              </div>

              {/* Enhanced Thumbnail Grid - Optimized */}
              <div className="mt-8 sm:mt-12">
                <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3 sm:gap-4">
                  {weddingImages.map((image, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative aspect-square rounded-2xl overflow-hidden ${
                        index === currentImageIndex ? 'ring-3 ring-rose-500' : ''
                      }`}
                      style={{ willChange: 'transform' }}
                    >
                      <img
                        src={`/images/${image}`}
                        alt={`Thumbnail ${index + 1}`}
                        className={`w-full h-full object-cover transition-opacity duration-300 ${
                          index === currentImageIndex ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                        }`}
                        loading="lazy"
                        decoding="async"
                        style={{
                          contentVisibility: 'auto',
                          transform: 'translateZ(0)'
                        }}
                        onError={(e) => {
                          e.target.src = `data:image/svg+xml,...`;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {index === currentImageIndex && (
                        <motion.div 
                          className="absolute top-2 right-2 w-3 h-3 bg-rose-500 rounded-full border-2 border-white shadow-lg"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Fullscreen Modal - Optimized */}
              {fullscreenOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
                  onClick={() => setFullscreenOpen(false)}
                >
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <button
                      onClick={() => setFullscreenOpen(false)}
                      className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-xl border border-white/30 hover:bg-white/30 p-3 rounded-2xl transition-all duration-300"
                    >
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={`fullscreen-${currentImageIndex}`}
                        src={`/images/${weddingImages[currentImageIndex]}`}
                        alt={`Wedding photo ${currentImageIndex + 1}`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="max-w-full max-h-full object-contain rounded-3xl shadow-2xl"
                        style={{
                          transform: 'translateZ(0)',
                          imageRendering: 'high-quality'
                        }}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </AnimatePresence>

                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-0 hover:opacity-100 transition-opacity duration-500 group">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateImage('prev');
                        }}
                        className="bg-black/30 backdrop-blur-sm border border-white/20 hover:bg-black/50 p-2 rounded-xl transition-all duration-300 transform hover:scale-110"
                      >
                        <svg className="w-5 h-5 text-white/80 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                    </div>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 hover:opacity-100 transition-opacity duration-500 group">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateImage('next');
                        }}
                        className="bg-black/30 backdrop-blur-sm border border-white/20 hover:bg-black/50 p-2 rounded-xl transition-all duration-300 transform hover:scale-110"
                      >
                        <svg className="w-5 h-5 text-white/80 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/40 backdrop-blur-xl text-white px-6 py-3 rounded-2xl font-medium border border-white/20">
                      {currentImageIndex + 1} / {weddingImages.length}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}
        {currentSection === 'rsvp' && (
          <div className="max-w-2xl mx-auto px-4 py-8 sm:py-16">
            <h2 className="text-2xl sm:text-4xl font-serif text-center text-rose-600 mb-8 sm:mb-12">
              Xác Nhận Tham Dự
            </h2>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-rose-200">
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Họ và Tên *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="Nhập họ và tên của bạn"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số Điện Thoại
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="Nhập số điện thoại"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số Người Tham Dự
                  </label>
                  <select 
                    name="guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    <option value="1">1 người</option>
                    <option value="2">2 người</option>
                    <option value="3">3 người</option>
                    <option value="4">4 người</option>
                    <option value="5+">Hơn 4 người</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lời Chúc
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none"
                    placeholder="Gửi lời chúc đến cô dâu chú rể..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-rose-500 to-purple-500 text-white py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Gửi qua Gmail</span>
                  </div>
                </button>
              </div>
              
              <div className="mt-6 sm:mt-8 text-center">
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Hoặc liên hệ trực tiếp:</p>
                <div className="space-y-2">
                  <a 
                    href="tel:0123456789"
                    className="flex items-center justify-center space-x-2 text-rose-600 font-semibold text-sm sm:text-base hover:bg-rose-50 py-2 rounded-lg transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Chú Rể: 0123-456-789</span>
                  </a>
                  <a 
                    href="tel:0987654321"
                    className="flex items-center justify-center space-x-2 text-purple-600 font-semibold text-sm sm:text-base hover:bg-purple-50 py-2 rounded-lg transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Cô Dâu: 0987-654-321</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
  <audio 
        ref={audioRef} 
        src="/wedding.mp3" 
        loop 
        preload="auto"
      />
      {/* Floating Action Button - Music - Mobile Optimized */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className={`fixed bottom-6 right-6 p-3 sm:p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 ${
          isPlaying 
            ? 'bg-rose-500 text-white animate-pulse' 
            : 'bg-white text-rose-500 hover:bg-rose-50'
        }`}
      >
        <Music className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Decorative Elements - Mobile Responsive */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-4 w-12 h-12 sm:w-20 sm:h-20 bg-rose-200 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-20 right-6 w-10 h-10 sm:w-16 sm:h-16 bg-purple-200 rounded-full opacity-20 animate-bounce delay-75"></div>
        <div className="absolute bottom-32 left-8 w-14 h-14 sm:w-24 sm:h-24 bg-pink-200 rounded-full opacity-20 animate-bounce delay-150"></div>
        <div className="absolute bottom-20 right-4 w-8 h-8 sm:w-12 sm:h-12 bg-rose-300 rounded-full opacity-20 animate-bounce delay-300"></div>
      </div>
    </div>
  );
}