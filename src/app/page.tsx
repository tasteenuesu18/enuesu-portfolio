"use client";

import { Hero } from "@/components/sections/Hero";
import { Profile } from "@/components/sections/Profile";
import { Works } from "@/components/sections/Works";
import { Scene } from "@/components/canvas/Scene";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-transparent text-white">
      {/* 3D Immersive Background (Global) */}
      <div className="fixed inset-0 z-0 cursor-grab active:cursor-grabbing pointer-events-auto">
        <Scene />
      </div>

      {/* Content Layer - Allows clicks to pass through to 3D scene where empty */}
      <div className="relative z-10 w-full pointer-events-none">
        <Hero />
        <Profile />
        <Works />

        {/* Footer */}
        <footer className="py-6 text-center text-gray-400 font-mono text-xs relative z-10 pointer-events-auto">
          <p>&copy; 2026 enuesu</p>
        </footer>
      </div>
    </main>
  );
}
