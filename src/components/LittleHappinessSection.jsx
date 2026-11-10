import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Gift, RefreshCw, Smile, Star } from 'lucide-react';
import { COMPLIMENTS, SURPRISE_CARDS } from '../data/content';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

export default function LittleHappinessSection() {
  const [currentComplimentIndex, setCurrentComplimentIndex] = useState(0);
  const [flippedCards, setFlippedCards] = useState({});
  const [dispenserShaking, setDispenserShaking] = useState(false);

  // Dispense a new random compliment
  const handleDispenseSmile = () => {
    sound.playChime();
    setDispenserShaking(true);
    setTimeout(() => setDispenserShaking(false), 500);

    // Pick a different random compliment
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * COMPLIMENTS.length);
    } while (nextIndex === currentComplimentIndex && COMPLIMENTS.length > 1);

    setCurrentComplimentIndex(nextIndex);

    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#F472B6', '#C084FC', '#FDE047']
    });
  };

  // Flip surprise card
  const handleFlipCard = (id) => {
    sound.playPop();
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Shower screen with hearts & confetti
  const handleMegaConfetti = () => {
    sound.playChime();
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#F472B6', '#FBBF24', '#C084FC', '#FDA4AF']
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#F472B6', '#FBBF24', '#C084FC', '#FDA4AF']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <section id="happiness" className="py-20 px-4 max-w-6xl mx-auto scroll-mt-20">
      
      {/* Section Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/80 text-purple-800 text-xs sm:text-sm font-semibold mb-3 border border-purple-200">
          <Gift className="w-3.5 h-3.5" />
          <span>Little Happiness</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-stone-800 font-outfit mb-3">
          Little Pockets of Joy 🎁
        </h2>
        <p className="text-base sm:text-lg text-stone-600 max-w-xl mx-auto font-medium">
          Surprise cards to tap, gentle affirmations, and a sweet reminder of how special you are.
        </p>
      </div>

      {/* COMPLIMENT DISPENSER */}
      <div className="max-w-2xl mx-auto mb-16 bg-gradient-to-b from-white to-pink-50/80 rounded-3xl p-6 sm:p-10 border-2 border-pink-200 shadow-xl text-center relative overflow-hidden">
        
        {/* Top Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold mb-4">
          <Smile className="w-3.5 h-3.5" />
          <span>The Smile Dispenser 🍬</span>
        </div>

        {/* Jar / Candy animation icon */}
        <motion.div
          animate={dispenserShaking ? { rotate: [-10, 10, -10, 10, 0], scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.4 }}
          className="text-5xl sm:text-6xl mb-4 select-none"
        >
          🍯✨
        </motion.div>

        {/* Compliment Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentComplimentIndex}
            initial={{ opacity: 0, y: 15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.96 }}
            transition={{ duration: 0.35 }}
            className="p-6 sm:p-8 rounded-2xl bg-white border border-pink-100 shadow-sm mb-6 min-h-[120px] flex items-center justify-center"
          >
            <p className="text-base sm:text-lg md:text-xl text-stone-800 font-medium leading-relaxed font-quicksand">
              "{COMPLIMENTS[currentComplimentIndex]}"
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDispenseSmile}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-bold text-sm shadow-md shadow-pink-200 flex items-center gap-2 cursor-pointer transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Dispense Another Smile 🍬</span>
          </motion.button>

          <button
            onClick={handleMegaConfetti}
            className="px-5 py-3 rounded-full bg-white hover:bg-pink-50 text-pink-700 text-xs sm:text-sm font-semibold border border-pink-200 shadow-sm flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>Shower Confetti & Hearts 💕</span>
          </button>
        </div>

      </div>

      {/* CLICKABLE SURPRISE CARDS */}
      <div>
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-stone-800 font-outfit mb-1">
            Tap To Reveal Your Surprises 🔮
          </h3>
          <p className="text-xs sm:text-sm text-stone-500">
            Click on any card to flip it and uncover what’s inside!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SURPRISE_CARDS.map((card) => {
            const isFlipped = !!flippedCards[card.id];
            return (
              <div
                key={card.id}
                onClick={() => handleFlipCard(card.id)}
                className="cursor-pointer group h-72 [perspective:1000px] select-none"
              >
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="w-full h-full relative [transform-style:preserve-3d] shadow-md rounded-3xl"
                >
                  {/* FRONT OF CARD */}
                  <div className={`absolute inset-0 [backface-visibility:hidden] rounded-3xl p-6 bg-gradient-to-br ${card.color} border-2 border-white/80 shadow-md flex flex-col justify-between`}>
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-white/80 shadow-sm flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                        {card.icon}
                      </div>
                      <h4 className="text-lg font-bold text-stone-800 font-outfit mb-2">
                        {card.title}
                      </h4>
                      <p className="text-xs text-stone-600 font-medium leading-relaxed">
                        {card.frontText}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-stone-800/10 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-stone-700 bg-white/70 px-2.5 py-1 rounded-full shadow-xs">
                        {card.pill}
                      </span>
                      <span className="text-xs font-bold text-pink-600 group-hover:translate-x-1 transition-transform">
                        Tap to Flip ➔
                      </span>
                    </div>
                  </div>

                  {/* BACK OF CARD (REVEALED) */}
                  <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-3xl p-6 bg-white border-2 border-pink-200 shadow-xl flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xl">{card.icon}</span>
                        <span className="text-[10px] font-bold text-pink-600 bg-pink-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Unlocked ✨
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-stone-800 font-outfit mb-2">
                        {card.title}
                      </h4>
                      <p className="text-xs sm:text-xs text-stone-700 leading-relaxed whitespace-pre-line font-medium">
                        {card.backText}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-pink-100 flex items-center justify-between">
                      <span className="text-[11px] text-pink-500 font-bold">
                        Keep this in mind today 💖
                      </span>
                      <span className="text-[11px] text-stone-400">Tap to flip back</span>
                    </div>
                  </div>

                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
