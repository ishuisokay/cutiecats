import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MailOpen, Heart, Sparkles, Check, Smile, HelpCircle } from 'lucide-react';
import { sound } from '../utils/audio';
import { APOLOGY_INSIGHTS } from '../data/content';
import confetti from 'canvas-confetti';

export default function ApologySection({ isOpenByDefault = false }) {
  const [isOpen, setIsOpen] = useState(isOpenByDefault);
  const [pinkyPromised, setPinkyPromised] = useState(false);

  const toggleLetter = () => {
    sound.playChime();
    setIsOpen(!isOpen);
  };

  const handlePinkyPromise = () => {
    sound.playChime();
    setPinkyPromised(true);
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#F472B6', '#E879F9', '#FBBF24']
    });
  };

  return (
    <section id="apology" className="py-20 px-4 max-w-4xl mx-auto scroll-mt-20">
      <div className="text-center mb-10">
        
        {/* Section Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100/80 text-pink-700 text-xs sm:text-sm font-semibold mb-3 border border-pink-200">
          <Mail className="w-3.5 h-3.5" />
          <span>A Heartfelt Apology</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-stone-800 font-outfit mb-3">
          A Letter I Won't Delete. 💌
        </h2>
        <p className="text-base sm:text-lg text-stone-600 max-w-lg mx-auto font-medium">
          A few honest words about why I kept unsending messages, and why I'm truly sorry.
        </p>
      </div>

      {/* Interactive Envelope / Letter Container */}
      <div className="relative max-w-2xl mx-auto">
        
        {/* Envelope Top Bar / Toggle */}
        <div className="flex justify-center mb-6">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={toggleLetter}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-full font-semibold text-sm transition-all cursor-pointer shadow-md ${
              isOpen
                ? 'bg-rose-100 text-rose-700 border border-rose-300'
                : 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-pink-200/80'
            }`}
          >
            {isOpen ? (
              <>
                <MailOpen className="w-4 h-4" />
                <span>Fold Letter Back Into Envelope</span>
              </>
            ) : (
              <>
                <Mail className="w-4 h-4 animate-bounce" />
                <span>Click To Unfold My Letter ✉️</span>
              </>
            )}
          </motion.button>
        </div>

        {/* The Letter Body */}
        <AnimatePresence>
          {isOpen ? (
            <motion.div
              key="letter-open"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-pink-100 relative overflow-hidden"
              style={{
                backgroundImage: 'radial-gradient(#FDE2E4 0.75px, transparent 0.75px)',
                backgroundSize: '24px 24px',
              }}
            >
              {/* Decorative Stamps & Tape */}
              <div className="absolute top-4 right-6 flex items-center gap-2 select-none opacity-85">
                <div className="w-12 h-14 border-2 border-dashed border-pink-300 bg-pink-50 rounded-md flex flex-col items-center justify-center p-1 rotate-3 shadow-sm">
                  <span className="text-lg">🐱</span>
                  <span className="text-[8px] font-bold text-pink-600 uppercase tracking-widest">Love</span>
                </div>
                <div className="w-12 h-14 border-2 border-dashed border-amber-300 bg-amber-50 rounded-md flex flex-col items-center justify-center p-1 -rotate-6 shadow-sm">
                  <span className="text-lg">🐶</span>
                  <span className="text-[8px] font-bold text-amber-600 uppercase tracking-widest">Sincere</span>
                </div>
              </div>

              {/* Letter Header */}
              <div className="mb-6 pt-2">
                <span className="font-handwriting text-2xl sm:text-3xl text-pink-600 font-bold">
                  Dear Friend,
                </span>
                <p className="text-xs text-stone-400 mt-1">Written with sincerity and zero filter 🐾</p>
              </div>

              {/* Letter Text */}
              <div className="space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed">
                <p>
                  I’m writing this because I wanted to say a proper, genuine apology for something I’ve done repeatedly: <strong>unsending my messages</strong>.
                </p>

                <p>
                  If I'm being completely honest, it never came from a place of playing games or trying to be secretive. It came from chronic <em>overthinking</em>. I would type something out, hit send, and then immediately spiral into second-guessing myself — worrying if what I said sounded foolish, annoying, awkward, or like I was bothering you. And in that moment of sudden self-consciousness, I would hit unsend.
                </p>

                <p>
                  I took some time to step back and realize how that feels from your perspective. Seeing a notification pop up, only to open the chat and find a blank “message unsent” or deleted bubble, is genuinely confusing and unfair. It leaves you wondering what was said, whether something was wrong, or worse, wondering if you did something wrong — which you <span className="underline decoration-pink-300 font-semibold">never</span> did.
                </p>

                <p>
                  You are someone who brings so much kindness, patience, and warmth to every conversation. The last thing you deserve is the mental friction of phantom notifications or feeling like talking to me is a guessing game.
                </p>

                <p className="bg-pink-50/70 p-4 rounded-2xl border-l-4 border-pink-400 text-stone-800 font-medium">
                  So here is my sincere promise: I am done hitting unsend out of self-doubt. If I say something a little awkward or goofy, I will let it stand, laugh about it, and trust that our friendship doesn't require me to edit myself into thin air.
                </p>

                <p>
                  Thank you for your infinite patience with me. I appreciate you more than my overthinking ever lets me say out loud.
                </p>
              </div>

              {/* Letter Sign-off */}
              <div className="mt-8 pt-4 border-t border-pink-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-stone-400">With genuine affection & a quiet promise,</p>
                  <p className="font-handwriting text-2xl text-pink-600 font-bold mt-0.5">
                    Your Friend 🐾
                  </p>
                </div>

                {/* Pinky Promise Seal Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePinkyPromise}
                  className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer transition-all ${
                    pinkyPromised
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-pink-100 hover:bg-pink-200 text-pink-700 border border-pink-300 shadow-sm'
                  }`}
                >
                  {pinkyPromised ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Pinky Promise Sealed Forever! 🤞</span>
                    </>
                  ) : (
                    <>
                      <span>🤞</span>
                      <span>Click to Seal the Pinky Promise</span>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          ) : (
            /* Envelope Closed State Preview */
            <motion.div
              key="envelope-preview"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              onClick={toggleLetter}
              className="bg-gradient-to-b from-white to-pink-50/70 p-8 sm:p-12 rounded-3xl border-2 border-pink-200 shadow-xl text-center cursor-pointer group hover:border-pink-300 transition-all"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-pink-100 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform shadow-inner mb-4">
                💌
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-stone-800 mb-2 font-outfit">
                An Envelope Waiting For You
              </h3>
              <p className="text-sm text-stone-500 max-w-sm mx-auto mb-6">
                Sealed with honesty, gentle self-reflection, and care. Tap anywhere to open it.
              </p>
              <span className="inline-flex items-center gap-2 text-xs font-bold text-pink-600 bg-white px-4 py-2 rounded-full border border-pink-200 shadow-sm group-hover:bg-pink-50">
                <Sparkles className="w-3.5 h-3.5" />
                Tap to read the apology
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Perspective Breakdown Cards: "In My Head" vs "What You Experienced" */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          {APOLOGY_INSIGHTS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="p-5 rounded-2xl glass-panel border border-pink-100 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="text-3xl mb-3">{item.icon}</div>
                <h4 className="text-base font-bold text-stone-800 font-outfit">{item.title}</h4>
                <span className="text-xs font-semibold text-pink-500 uppercase tracking-wider block mb-2">
                  {item.subtitle}
                </span>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
