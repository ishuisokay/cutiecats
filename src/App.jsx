import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import FloatingDecorations from './components/FloatingDecorations';
import HeroSection from './components/HeroSection';
import ApologySection from './components/ApologySection';
import PetParadiseSection from './components/PetParadiseSection';
import LittleHappinessSection from './components/LittleHappinessSection';
import FinalLetterSection from './components/FinalLetterSection';
import { sound } from './utils/audio';
import confetti from 'canvas-confetti';

export default function App() {
  const [loveCount, setLoveCount] = useState(128);
  const [floatingHearts, setFloatingHearts] = useState([]);
  const [isLetterOpen, setIsLetterOpen] = useState(false);

  const handleSendLove = () => {
    sound.playPop();
    setLoveCount((prev) => prev + 1);

    const newHeart = {
      id: Date.now() + Math.random(),
      x: window.innerWidth > 640 ? Math.random() * 80 + 10 : Math.random() * 70 + 15,
      y: Math.random() * 40 + 30,
      emoji: ['💖', '🐾', '🌸', '✨', '🐶', '🐱'][Math.floor(Math.random() * 6)]
    };

    setFloatingHearts((prev) => [...prev, newHeart]);
    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1800);
  };

  const handleOpenSurprise = () => {
    setIsLetterOpen(true);
    const apologyEl = document.getElementById('apology');
    if (apologyEl) {
      apologyEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FFF9FB] text-stone-700 selection:bg-pink-200 selection:text-pink-900 overflow-x-hidden font-quicksand">
      
      {/* Ambient Floating Elements */}
      <FloatingDecorations />

      {/* Global Interactive Floating Heart Reactions */}
      <AnimatePresence>
        {floatingHearts.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 1, scale: 0.8, y: 0 }}
            animate={{ opacity: 0, scale: 1.6, y: -100 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ left: `${item.x}%`, top: `${item.y}%` }}
            className="fixed z-50 pointer-events-none text-2xl drop-shadow-sm select-none"
          >
            {item.emoji}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Glassmorphic Navbar */}
      <Navbar loveCount={loveCount} onSendLove={handleSendLove} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        
        {/* Section 1: Welcome Screen */}
        <HeroSection onOpenSurprise={handleOpenSurprise} />

        {/* Section 2: A Heartfelt Apology */}
        <ApologySection isOpenByDefault={isLetterOpen} />

        {/* Section 3: Cat & Dog Paradise */}
        <PetParadiseSection />

        {/* Section 4: Little Happiness */}
        <LittleHappinessSection />

        {/* Section 5: Final Letter */}
        <FinalLetterSection onSendHug={handleSendLove} />

      </main>

    </div>
  );
}
