"use client";

import React, { useEffect, useState, useRef } from 'react';
import { Crown, ChevronLeft, Bell, MoreVertical, ChevronDown } from 'lucide-react';
import * as THREE from 'three';

// Particle Background Component
const ParticleBackground = ({ className }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.5;
        this.twinkleSpeed = Math.random() * 0.02 + 0.01;
        this.twinkleOffset = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        this.opacity = (Math.sin(Date.now() * this.twinkleSpeed + this.twinkleOffset) + 1) * 0.25 + 0.5;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(52, 211, 153, ${this.opacity})`;
        ctx.fill();
      }
    }

    const createParticles = () => {
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 8000);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const drawConnections = () => {
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.1)';
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      drawConnections();
      animationFrameId = requestAnimationFrame(animate);
    };

    createParticles();
    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ WebkitBackdropFilter: 'blur(4px)', backdropFilter: 'blur(4px)' }}
    />
  );
};

// Main Leaderboard Component
const Leaderboard = () => {
  const [animate, setAnimate] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const mountRef = useRef(null);
  const sceneRef = useRef(null);

  const leaders = [
    { 
      id: 1, 
      username: 'THANOS', 
      rank: 1, 
      avatar: '/thanos.jpg',
      color: 'purple',
      certs: {
        professional: {
          count: 5,
          list: ['Solutions Architect Professional', 'DevOps Engineer Professional']
        },
        associate: {
          count: 4,
          list: ['Solutions Architect Associate']
        },
        cpc: {
          count: 1,
          list: ['Cloud Practitioner']
        }
      }
    },
    { 
      id: 2, 
      username: 'GAMORA', 
      rank: 2, 
      avatar: '/gamo.jpg',
      color: 'green',
      certs: {
        professional: {
          count: 1,
          list: ['Solutions Architect Professional']
        },
        associate: {
          count: 2,
          list: ['Solutions Architect Associate', 'Developer Associate']
        },
        cpc: {
          count: 0,
          list: []
        }
      }
    },
    { 
      id: 3, 
      username: 'INFINITY STONES', 
      rank: 3, 
      avatar: '/gaunt.jpg',
      color: 'orange',
      certs: {
        professional: {
          count: 4,
          list: []
        },
        associate: {
          count: 3,
          list: ['Solutions Architect Associate', 'Developer Associate', 'SysOps Administrator']
        },
        cpc: {
          count: 1,
          list: ['Cloud Practitioner']
        }
      }
    },
  ];

  const calculateScore = (certs) => {
    return (certs.professional.count * 3) + (certs.associate.count * 2) + (certs.cpc.count * 1);
  };

  const sortedLeaders = [...leaders].sort((a, b) => calculateScore(b.certs) - calculateScore(a.certs));
  const podiumOrder = [sortedLeaders[1], sortedLeaders[0], sortedLeaders[2]];
  useEffect(() => {
    setAnimate(true);
    
    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);
    
    camera.position.z = 5;

    // Create enhanced starry background
    // const createStarryBackground = () => {
    //   const particles = new THREE.Group();
    //   const starCount = 1000;
      
    //   for (let i = 0; i < starCount; i++) {
    //     const size = Math.random() * 0.03 + 0.01;
    //     const geometry = new THREE.SphereGeometry(size, 8, 8);
    //     const material = new THREE.MeshBasicMaterial({
    //       color: new THREE.Color(
    //         Math.random() * 0.2 + 0.8,
    //         Math.random() * 0.2 + 0.8,
    //         Math.random() * 0.2 + 0.8
    //       ),
    //       transparent: true,
    //       opacity: Math.random() * 0.8 + 0.2
    //     });
        
    //     const particle = new THREE.Mesh(geometry, material);
    //     particle.position.x = (Math.random() - 0.5) * 20;
    //     particle.position.y = (Math.random() - 0.5) * 20;
    //     particle.position.z = (Math.random() - 0.5) * 20;
        
    //     particle.userData = {
    //       speed: Math.random() * 0.01 - 0.005,
    //       rotationSpeed: Math.random() * 0.01 - 0.005,
    //       twinkleSpeed: Math.random() * 0.03 + 0.01,
    //       twinkleOffset: Math.random() * Math.PI * 2
    //     };
        
    //     particles.add(particle);
    //   }
    //   return particles;
    // };

    // const particles = createStarryBackground();
    // scene.add(particles);

    // Create podium platforms with avatars and scores
    const createPodiumWithAvatar = async (position, size, color, leader) => {
      const group = new THREE.Group();

      // Podium base
      const podiumGeometry = new THREE.CylinderGeometry(size, size, 0.2, 32);
      const podiumMaterial = new THREE.MeshPhongMaterial({
        color: color,
        transparent: true,
        opacity: 0.6,
        shininess: 100
      });
      const podium = new THREE.Mesh(podiumGeometry, podiumMaterial);
      group.add(podium);

      // Avatar display with fixed rotation
      const avatarTexture = await new Promise(resolve => {
        new THREE.TextureLoader().load(leader.avatar, resolve);
      });
      const avatarGeometry = new THREE.CircleGeometry(size * 0.8, 32);
      const avatarMaterial = new THREE.MeshBasicMaterial({
        map: avatarTexture,
        side: THREE.DoubleSide,
        transparent: true
      });
      const avatar = new THREE.Mesh(avatarGeometry, avatarMaterial);
      avatar.position.y = size * 2;
      avatar.rotation.y = Math.PI;

      // Score display with fixed orientation
      const score = calculateScore(leader.certs);
      const scoreCanvas = document.createElement('canvas');
      const scoreContext = scoreCanvas.getContext('2d');
      scoreCanvas.width = 256;
      scoreCanvas.height = 256;
      
      scoreContext.fillStyle = `rgba(${color.r * 255}, ${color.g * 255}, ${color.b * 255}, 0.2)`;
      scoreContext.beginPath();
      scoreContext.arc(128, 128, 120, 0, Math.PI * 2);
      scoreContext.fill();
      
      scoreContext.fillStyle = '#ffffff';
      scoreContext.font = 'bold 72px Arial';
      scoreContext.textAlign = 'center';
      scoreContext.textBaseline = 'middle';
      scoreContext.save();
      scoreContext.translate(128, 110);
      scoreContext.rotate(Math.PI);
      scoreContext.fillText(score.toString(), 0, 0);
      scoreContext.restore();
      
      scoreContext.font = 'bold 24px Arial';
      scoreContext.save();
      scoreContext.translate(128, 160);
      scoreContext.rotate(Math.PI);
      scoreContext.fillText('POINTS', 0, 0);
      scoreContext.restore();
      console.log("jh")

      const scoreTexture = new THREE.CanvasTexture(scoreCanvas);
      const scoreGeometry = new THREE.CircleGeometry(size * 0.5, 32);
      const scoreMaterial = new THREE.MeshBasicMaterial({
        map: scoreTexture,
        transparent: true,
        side: THREE.DoubleSide
      });
      
      const scoreDisplay = new THREE.Mesh(scoreGeometry, scoreMaterial);
      scoreDisplay.position.y = size * 3;
      scoreDisplay.rotation.y = Math.PI;
      // Username display with fixed rotation
      const nameCanvas = document.createElement('canvas');
      const nameContext = nameCanvas.getContext('2d');
      nameCanvas.width = 512;
      nameCanvas.height = 128;
      
      nameContext.fillStyle = '#ffffff';
      nameContext.font = 'bold 48px Arial';
      nameContext.textAlign = 'center';
      nameContext.textBaseline = 'middle';
      nameContext.save();
      nameContext.translate(256, 64);
      nameContext.rotate(Math.PI);
      nameContext.fillText(leader.username, 0, 0);
      nameContext.restore();

      const nameTexture = new THREE.CanvasTexture(nameCanvas);
      const nameGeometry = new THREE.PlaneGeometry(size * 2, size * 0.5);
      const nameMaterial = new THREE.MeshBasicMaterial({
        map: nameTexture,
        transparent: true,
        side: THREE.DoubleSide
      });
      const nameplate = new THREE.Mesh(nameGeometry, nameMaterial);
      nameplate.position.y = size * 1.2;
      nameplate.rotation.y = Math.PI;

      // Glow effects
      const glowGeometry = new THREE.CircleGeometry(size * 0.9, 32);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide
      });
      const avatarGlow = new THREE.Mesh(glowGeometry, glowMaterial);
      avatarGlow.position.copy(avatar.position);
      avatarGlow.position.z = -0.1;
      avatarGlow.rotation.y = Math.PI;

      const scoreGlow = avatarGlow.clone();
      scoreGlow.position.copy(scoreDisplay.position);
      scoreGlow.scale.set(0.7, 0.7, 0.7);
      scoreGlow.rotation.y = Math.PI;

      group.add(avatarGlow);
      group.add(scoreGlow);
      group.add(avatar);
      group.add(scoreDisplay);
      group.add(nameplate);
      
      group.position.copy(position);
      group.userData = {
        initialY: position.y,
        floatOffset: Math.random() * Math.PI * 2,
        floatSpeed: 0.002
      };

      return group;
    };

    // Add all podiums
    const addPodiums = async () => {
      const podiums = new THREE.Group();
      
      const positions = [
        new THREE.Vector3(-2, -1, 0),   // Second place
        new THREE.Vector3(0, -0.5, 0),   // First place
        new THREE.Vector3(2, -1.5, 0)    // Third place
      ];
      
      const colors = [0x34d399, 0x059669, 0x065f46];
      const sizes = [0.8, 1, 0.6];

      for (let i = 0; i < 3; i++) {
        const podium = await createPodiumWithAvatar(
          positions[i],
          sizes[i],
          new THREE.Color(colors[i]),
          podiumOrder[i]
        );
        podiums.add(podium);
      }
      
      scene.add(podiums);
      return podiums;
    };

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Spotlights
    const createSpotlight = (color, position) => {
      const spotlight = new THREE.SpotLight(color, 1);
      spotlight.position.copy(position);
      spotlight.position.y += 5;
      spotlight.angle = Math.PI / 6;
      spotlight.penumbra = 0.5;
      spotlight.decay = 1;
      spotlight.distance = 10;
      scene.add(spotlight);
      return spotlight;
    };

    const spotlights = [
      createSpotlight(0x34d399, new THREE.Vector3(-2, 0, 0)),
      createSpotlight(0x059669, new THREE.Vector3(0, 0, 0)),
      createSpotlight(0x065f46, new THREE.Vector3(2, 0, 0))
    ];

    // Animation loop
    let podiumsGroup;
    addPodiums().then(group => {
      podiumsGroup = group;
      
      const animate = () => {
        requestAnimationFrame(animate);

        // Animate THREE.js stars
        // particles.children.forEach((particle) => {
        //   particle.position.y += particle.userData.speed;
        //   particle.rotation.z += particle.userData.rotationSpeed;
          
        //   const twinkle = Math.sin(Date.now() * particle.userData.twinkleSpeed + particle.userData.twinkleOffset);
        //   particle.material.opacity = (twinkle + 1) * 0.4 + 0.2;
          
        //   if (particle.position.y > 10) particle.position.y = -10;
        //   if (particle.position.y < -10) particle.position.y = 10;
        // });
        
        // Animate podiums and content
        if (podiumsGroup) {
          podiumsGroup.rotation.y += 0.005;
          
          podiumsGroup.children.forEach(group => {
            // Float animation
            group.userData.floatOffset += group.userData.floatSpeed;
            const floatY = Math.sin(group.userData.floatOffset) * 0.1;
            group.position.y = group.userData.initialY + floatY;
            
            // Keep objects facing camera
            group.children.forEach(child => {
              if (child.geometry instanceof THREE.PlaneGeometry || 
                  child.geometry instanceof THREE.CircleGeometry) {
                child.rotation.y = Math.PI - podiumsGroup.rotation.y;
              }
            });
          });
        }
        
        // Animate spotlights
        spotlights.forEach((spotlight, index) => {
          spotlight.intensity = 1 + Math.sin(Date.now() * 0.002 + index) * 0.3;
        });
        
        renderer.render(scene, camera);
      };
      
      animate();
    });

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      sceneRef.current = null;
    };
  }, []);
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <ParticleBackground className="z-0" />
      <div ref={mountRef} className="absolute inset-0 z-10" />
      
      <div className={`relative z-20 p-6 text-white transition-all duration-1000 ${
        animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        {/* Header */}
        <div className="flex justify-between items-center mb-8 bg-green-900/20 backdrop-blur-md p-4 rounded-2xl border border-green-500/30">
          <div className="flex items-center gap-2">
            <ChevronLeft className="w-6 h-6 hover:text-green-400 transition-colors cursor-pointer" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              COSMIC CERTIFICATION CHAMPIONS
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 transition-colors"
            >
              <span>Details</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
            </button>
            <Bell className="w-6 h-6 hover:text-green-400 transition-colors cursor-pointer" />
            <MoreVertical className="w-6 h-6 hover:text-green-400 transition-colors cursor-pointer" />
          </div>
        </div>

        {/* Collapsible Details Section */}
        <div className={`transition-all duration-500 ease-in-out ${
          showDetails 
            ? 'opacity-100 max-h-[2000px]' 
            : 'opacity-0 max-h-0 overflow-hidden'
        }`}>
          {/* Points Breakdown */}
          <div className="bg-green-900/20 backdrop-blur-md rounded-3xl p-6 border border-green-500/30 mb-6">
            <h2 className="text-center font-bold text-xl mb-6 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              AWS Certification Points
            </h2>
            <div className="grid grid-cols-3 gap-4 text-center mb-6">
              <div className="bg-green-900/30 p-3 rounded-lg backdrop-blur-sm">
                <div className="font-bold">Professional/Specialty</div>
                <div className="text-green-400">3 pts</div>
              </div>
              <div className="bg-green-900/30 p-3 rounded-lg backdrop-blur-sm">
                <div className="font-bold">Associate</div>
                <div className="text-green-400">2 pts</div>
              </div>
              <div className="bg-green-900/30 p-3 rounded-lg backdrop-blur-sm">
                <div className="font-bold">Cloud Practitioner</div>
                <div className="text-green-400">1 pt</div>
              </div>
            </div>

            {/* Detailed Standings Table */}
            <div className="space-y-4">
              {sortedLeaders.map((leader, idx) => (
                <div 
                  key={leader.id} 
                  className="flex flex-col gap-4 bg-green-900/30 backdrop-blur-sm p-4 rounded-lg border border-green-500/20 hover:border-green-500/40 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-8 text-center font-bold text-xl">{idx + 1}</span>
                    <img
                      src={leader.avatar}
                      alt={leader.username}
                      className="w-16 h-16 rounded-full border-2 border-green-400/50"
                    />
                    <div className="flex-grow">
                      <span className="font-semibold text-lg">{leader.username}</span>
                      <div className="text-base text-green-400">
                        Pro: {leader.certs.professional.count} | 
                        Assoc: {leader.certs.associate.count} | 
                        CPC: {leader.certs.cpc.count}
                      </div>
                    </div>
                    <span className="font-bold text-xl">{calculateScore(leader.certs)} pts</span>
                  </div>
                  
                  {/* AWS Certifications Breakdown */}
                  <div className="ml-24 space-y-2">
                    {leader.certs.professional.count > 0 && (
                      <div className="bg-green-900/20 p-2 rounded">
                        <div className="text-green-400 font-semibold">Professional:</div>
                        <div className="ml-2 text-sm">{leader.certs.professional.list.join(', ')}</div>
                      </div>
                    )}
                    {leader.certs.associate.count > 0 && (
                      <div className="bg-green-900/20 p-2 rounded">
                        <div className="text-emerald-400 font-semibold">Associate:</div>
                        <div className="ml-2 text-sm">{leader.certs.associate.list.join(', ')}</div>
                      </div>
                    )}
                    {leader.certs.cpc.count > 0 && (
                      <div className="bg-green-900/20 p-2 rounded">
                        <div className="text-teal-400 font-semibold">Cloud Practitioner:</div>
                        <div className="ml-2 text-sm">{leader.certs.cpc.list.join(', ')}</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(30px, -30px) rotate(180deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Leaderboard;