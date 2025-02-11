"use client";

import React, { useEffect, useState } from 'react';
import { Crown, ChevronLeft, Bell, MoreVertical } from 'lucide-react';

const Leaderboard = () => {
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    setAnimate(true);
  }, []);

  const leaders = [
    { 
      id: 1, 
      username: 'THANOS', 
      score: 15, 
      rank: 1, 
      avatar: '/thanos.jpg',
      color: 'purple',
      certs: {
        professional: {
          count: 2,
          list: ['Solutions Architect Professional', 'DevOps Engineer Professional']
        },
        associate: {
          count: 1,
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
      score: 12, 
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
      score: 10, 
      rank: 3, 
      avatar: '/gaunt.jpg',
      color: 'orange',
      certs: {
        professional: {
          count: 0,
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

  const calculateScore = (certs: { 
    professional: { count: number }; 
    associate: { count: number }; 
    cpc: { count: number }; 
  }) => {
    return (certs.professional.count * 3) + (certs.associate.count * 2) + (certs.cpc.count * 1);
  };

  // Sort leaders by score
  const sortedLeaders = [...leaders].sort((a, b) => calculateScore(b.certs) - calculateScore(a.certs));

  // Podium order: [1st, 2nd, 3rd] -> [2nd, 1st, 3rd]
  const podiumOrder = [sortedLeaders[1], sortedLeaders[0], sortedLeaders[2]];

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/40 via-emerald-800/30 to-teal-900/40" />
        
        {/* Floating orbs background */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full blur-3xl opacity-30 animate-float"
            style={{
              width: `${Math.random() * 600 + 300}px`,
              height: `${Math.random() * 600 + 300}px`,
              background: `radial-gradient(circle at center, 
                ${['#34d399', '#059669', '#065f46', '#064e3b'][Math.floor(Math.random() * 4)]}, 
                transparent)`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${15 + Math.random() * 25}s infinite ${Math.random() * 5}s`,
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          />
        ))}

        {/* Twinkling stars */}
        <div className="absolute inset-0">
          {[...Array(400)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 3 + 'px',
                height: Math.random() * 3 + 'px',
                backgroundColor: `rgba(${Math.random() * 255}, 255, ${Math.random() * 255}, ${Math.random()})`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `twinkle ${2 + Math.random() * 4}s infinite ${Math.random() * 2}s`,
                boxShadow: '0 0 8px rgba(255, 255, 255, 0.8)'
              }}
            />
          ))}
        </div>
      </div>

      <div className={`relative z-10 p-6 text-white transition-all duration-1000 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Header */}
        <div className="flex justify-between items-center mb-8 bg-green-900/20 backdrop-blur-md p-4 rounded-2xl border border-green-500/30">
          <div className="flex items-center gap-2">
            <ChevronLeft className="w-6 h-6 hover:text-green-400 transition-colors cursor-pointer" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              COSMIC CERTIFICATION CHAMPIONS
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Bell className="w-6 h-6 hover:text-green-400 transition-colors cursor-pointer" />
            <MoreVertical className="w-6 h-6 hover:text-green-400 transition-colors cursor-pointer" />
          </div>
        </div>

        {/* Podium Display */}
        <div className="flex justify-center items-end gap-8 mb-12">
          {podiumOrder.map((leader, index) => {
            const score = calculateScore(leader.certs);
            const isCenter = index === 1;
            return (
              <div 
                key={leader.id} 
                className={`flex flex-col items-center ${isCenter ? '-mt-8' : 'mb-4'}`}
              >
                <div className="relative">
                  <div className={`absolute inset-0 rounded-full blur-md ${
                    isCenter ? 'bg-green-400' : 
                    index === 0 ? 'bg-emerald-400' : 
                    'bg-teal-400'
                  } opacity-50 animate-pulse`} />
                  <img
                    src={leader.avatar}
                    alt={leader.username}
                    className={`${
                      isCenter ? 'w-44 h-44 border-green-400' : 
                      'w-32 h-32 border-emerald-400'
                    } rounded-full border-4 relative z-10`}
                  />
                  {isCenter && (
                    <Crown className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 text-green-400 animate-bounce" />
                  )}
                </div>
                <span className="mt-3 text-xl font-bold">{leader.username}</span>
                <span className="font-bold text-2xl">{score} pts</span>
              </div>
            );
          })}
        </div>

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

      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
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