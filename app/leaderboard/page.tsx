"use client";

import React from 'react';
import { Crown, ChevronLeft, Bell, MoreVertical, Award } from 'lucide-react';

const Leaderboard = () => {
  const leaders = [
    { 
      id: 1, 
      username: 'THANOS', 
      score: 15, 
      rank: 1, 
      avatar: '/api/placeholder/48/48',
      certs: {
        professional: 0,
        associate: 0,
        cpc: 0
      }
    },
    { 
      id: 2, 
      username: 'GAMORA', 
      score: 12, 
      rank: 2, 
      avatar: '/api/placeholder/48/48',
      certs: {
        professional: 0,
        associate: 0,
        cpc: 0
      }
    },
    { 
      id: 3, 
      username: 'INFINITY STONES', 
      score: 10, 
      rank: 3, 
      avatar: '/api/placeholder/48/48',
      certs: {
        professional: 0,
        associate: 0,
        cpc: 0
      }
    },
  ];

  const calculateScore = (certs: { professional: number; associate: number; cpc: number; }) => {
    return (certs.professional * 3) + (certs.associate * 2) + (certs.cpc * 1);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 animate-twinkle">
          {[...Array(200)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random(),
                animation: `twinkle ${1 + Math.random() * 3}s infinite ${Math.random() * 3}s`
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 via-blue-900/30 to-purple-900/30 animate-pulse" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 p-6 text-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <ChevronLeft className="w-6 h-6" />
            <h1 className="text-xl font-semibold">AWS CERTIFICATION LEADERS</h1>
          </div>
          <div className="flex items-center gap-4">
            <Bell className="w-6 h-6" />
            <MoreVertical className="w-6 h-6" />
          </div>
        </div>

        {/* Top 3 Leaders - Center Layout */}
        <div className="flex justify-center items-end gap-8 mb-12">
          {/* Second Place */}
          <div className="flex flex-col items-center mb-4">
            <div className="relative">
              <img
                src={leaders[1].avatar}
                alt={leaders[1].username}
                className="w-32 h-32 rounded-full border-4 border-silver"
              />
              <div className="absolute -bottom-2 -right-2 bg-gray-300 rounded-full p-2">
                <Award className="w-8 h-8" />
              </div>
            </div>
            <span className="mt-3 text-lg">{leaders[1].username}</span>
            <span className="font-bold text-xl">{calculateScore(leaders[1].certs)} pts</span>
          </div>

          {/* First Place */}
          <div className="flex flex-col items-center -mt-8">
            <div className="relative">
              <img
                src={leaders[0].avatar}
                alt={leaders[0].username}
                className="w-44 h-44 rounded-full border-6 border-yellow-400"
              />
              <Crown className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 text-yellow-400" />
            </div>
            <span className="mt-3 text-xl">{leaders[0].username}</span>
            <span className="font-bold text-2xl">{calculateScore(leaders[0].certs)} pts</span>
          </div>

          {/* Third Place */}
          <div className="flex flex-col items-center mb-4">
            <div className="relative">
              <img
                src={leaders[2].avatar}
                alt={leaders[2].username}
                className="w-32 h-32 rounded-full border-4 border-amber-600"
              />
              <div className="absolute -bottom-2 -right-2 bg-amber-600 rounded-full p-2">
                <Award className="w-8 h-8 text-white" />
              </div>
            </div>
            <span className="mt-3 text-lg">{leaders[2].username}</span>
            <span className="font-bold text-xl">{calculateScore(leaders[2].certs)} pts</span>
          </div>
        </div>

        {/* Certification Breakdown */}
        <div className="bg-black/50 backdrop-blur-sm rounded-t-3xl p-6">
          <h2 className="text-center font-semibold mb-4">Certification Points</h2>
          <div className="grid grid-cols-3 gap-4 text-center mb-6">
            <div className="bg-green-900/50 p-3 rounded-lg backdrop-blur-sm">
              <div className="font-bold">Professional/Specialty</div>
              <div className="text-green-400">3 pts</div>
            </div>
            <div className="bg-green-900/50 p-3 rounded-lg backdrop-blur-sm">
              <div className="font-bold">Associate</div>
              <div className="text-green-400">2 pts</div>
            </div>
            <div className="bg-green-900/50 p-3 rounded-lg backdrop-blur-sm">
              <div className="font-bold">CPC</div>
              <div className="text-green-400">1 pt</div>
            </div>
          </div>

          {/* Detailed Standings */}
          {leaders.map((leader) => (
            <div key={leader.id} className="flex items-center gap-4 mb-4 bg-black/30 backdrop-blur-sm p-4 rounded-lg">
              <span className="w-8 text-center font-bold text-xl">{leader.rank}</span>
              <img
                src={leader.avatar}
                alt={leader.username}
                className="w-20 h-20 rounded-full"
              />
              <div className="flex-grow">
                <span className="font-semibold text-lg">{leader.username}</span>
                <div className="text-base text-green-400">
                  Pro: {leader.certs.professional} | 
                  Assoc: {leader.certs.associate} | 
                  CPC: {leader.certs.cpc}
                </div>
              </div>
              <span className="font-bold text-xl">{calculateScore(leader.certs)} pts</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        .animate-twinkle {
          animation: pulse 20s infinite;
        }
      `}</style>
    </div>
  );
};

export default Leaderboard;