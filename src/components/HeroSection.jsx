import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, ChevronDown } from 'lucide-react';
import { AnimatedCat, AnimatedDog } from './CuteAnimalsSvg';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

export default function HeroSection({ onOpenSurprise }) {
  const handleOpenSurprise = () => {
    sound.playChime();

    // Trigger sweet pastel confetti burst
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#F472B6', '#C084FC', '#FDE047', '#FDA4AF', '#DDD6FE']
    });

    if (onOpenSurprise) {
      onOpenSurprise();
    } else {
      const el = document.getElementById('apology');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="welcome" className="min-h-[90vh] flex flex-col items-center justify-center px-4 pt-8 pb-16 relative">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center relative z-10">
        
        {/* Soft pill badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-pink-200/80 text-pink-700 text-xs sm:text-sm font-medium shadow-sm mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>A cozy sanctuary built with sincere thoughts</span>
          <Heart className="w-3 h-3 text-rose-400 fill-current animate-pulse" />
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-stone-800 tracking-tight font-outfit mb-3"
        >
          Hey, You! <span className="inline-block hover:scale-125 transition-transform duration-300">🐾</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xl sm:text-2xl md:text-3xl text-pink-600 font-handwriting font-bold mb-4"
        >
          Someone made a tiny world just for you.
        </motion.p>

        {/* Warm supporting text */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-sm sm:text-base md:text-lg text-stone-600 max-w-xl mx-auto leading-relaxed mb-8"
        >
          A quiet, gentle corner of the internet filled with purrs, wagging tails, warm words, and zero expectations. Take a deep breath and stay as long as you like.
        </motion.p>

        {/* Animated Cat & Dog Centerpiece */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative flex items-center justify-center gap-4 sm:gap-10 my-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-white/70 to-pink-50/50 border border-pink-100/90 shadow-xl backdrop-blur-md"
        >
          {/* Subtle floating heart between them */}
          <motion.div
            animate={{
              y: [0, -8, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="absolute top-3 text-pink-400 text-xl font-handwriting"
          >
            💕
          </motion.div>

          <div className="flex flex-col items-center">
            <AnimatedCat className="w-32 h-32 sm:w-44 sm:h-44" />
            <span className="text-xs font-semibold text-pink-600/80 mt-1 bg-pink-100/60 px-2.5 py-0.5 rounded-full">
              Mochi 🐱 (Tap me!)
            </span>
          </div>

          <div className="flex flex-col items-center">
            <AnimatedDog className="w-32 h-32 sm:w-44 sm:h-44" />
            <span className="text-xs font-semibold text-amber-700/80 mt-1 bg-amber-100/60 px-2.5 py-0.5 rounded-full">
              Biscuit 🐶 (Boop me!)
            </span>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-8 flex flex-col items-center gap-3"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 30px -10px rgba(244, 114, 182, 0.4)" }}
            whileTap={{ scale: 0.96 }}
            onClick={handleOpenSurprise}
            className="px-8 sm:px-10 py-4 bg-gradient-to-r from-pink-500 via-rose-400 to-purple-400 text-white rounded-full font-semibold text-base sm:text-lg shadow-lg shadow-pink-200/80 flex items-center gap-3 group cursor-pointer transition-all border border-white/40"
          >
            <span>Open Your Surprise</span>
            <span className="text-xl group-hover:rotate-12 transition-transform">💌</span>
          </motion.button>

          <span className="text-xs text-stone-400 font-medium flex items-center gap-1">
            Tap to open the letter and step inside <ChevronDown className="w-3.5 h-3.5 animate-bounce text-pink-400" />
          </span>
        </motion.div>

      </div>
    </section>
  );
}
