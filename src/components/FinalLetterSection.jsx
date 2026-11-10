import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Send, Coffee } from 'lucide-react';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

export default function FinalLetterSection({ onSendHug }) {
  const [hugSent, setHugSent] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState(null);

  const handleSendHug = () => {
    sound.playChime();
    setHugSent(true);

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#F472B6', '#FDA4AF', '#E879F9', '#FBBF24']
    });

    if (onSendHug) onSendHug();
  };

  const handleReaction = (reactionText) => {
    sound.playPop();
    setSelectedReaction(reactionText);
    confetti({
      particleCount: 30,
      spread: 45,
      origin: { y: 0.8 },
      colors: ['#F472B6', '#A78BFA', '#FDE047']
    });
  };

  return (
    <section id="letter" className="py-24 px-4 max-w-4xl mx-auto scroll-mt-20">
      
      {/* Container Letter Card */}
      <div className="bg-gradient-to-b from-[#FFFDF9] via-white to-pink-50/60 rounded-3xl p-8 sm:p-14 border-2 border-pink-200/90 shadow-2xl relative overflow-hidden">
        
        {/* Soft corner floral / paw prints watermark */}
        <div className="absolute -top-6 -right-6 text-7xl opacity-15 pointer-events-none select-none">
          🐾
        </div>
        <div className="absolute -bottom-6 -left-6 text-7xl opacity-15 pointer-events-none select-none">
          🌸
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100 text-pink-700 text-xs sm:text-sm font-semibold mb-3">
            <Heart className="w-3.5 h-3.5 fill-current text-rose-500" />
            <span>Final Friendship Note</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-stone-800 font-outfit mb-2">
            Before You Step Outside... 🌸
          </h2>
          <p className="text-xs sm:text-sm text-stone-400">
            A small token of genuine appreciation.
          </p>
        </div>

        {/* Letter Body */}
        <div className="space-y-5 text-stone-700 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          <p>
            Friendship isn’t about sending flawless, perfectly edited messages. It’s about being real, showing up, and knowing someone is in your corner even when life feels busy or overwhelming.
          </p>

          <p>
            When I was second-guessing myself and unsending messages, I was getting stuck in my own head instead of just appreciating the comfort of talking with you. I promise not to let that silly self-doubt stand between our friendship again.
          </p>

          <p>
            Thank you for being someone so easy to talk to, someone with so much warmth and patience, and someone who makes the ordinary parts of the week feel lighter.
          </p>

          {/* EXACT REQUIRED ENDING QUOTE */}
          <div className="my-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-pink-100/80 via-purple-100/50 to-pink-100/80 border-l-4 border-pink-500 shadow-sm text-center">
            <p className="font-handwriting text-2xl sm:text-3xl md:text-4xl text-pink-900 leading-snug font-bold">
              “I know words cannot fix everything,
              <br className="hidden sm:inline" />
              {' '}but I hope this little corner of the internet
              <br className="hidden sm:inline" />
              {' '}makes you smile.”
            </p>
            <span className="text-xs text-pink-600/70 font-semibold mt-3 block tracking-wide">
              — ALWAYS ROOTING FOR YOU 🐾
            </span>
          </div>

        </div>

        {/* Interactive "Did this make you smile?" Reaction Area */}
        <div className="mt-12 pt-8 border-t border-pink-100 text-center max-w-xl mx-auto">
          <h4 className="text-base sm:text-lg font-bold text-stone-800 font-outfit mb-3">
            Did this little world bring you a smile? 🌸
          </h4>

          {selectedReaction ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 rounded-2xl bg-pink-100/80 text-pink-800 text-sm font-semibold border border-pink-200"
            >
              <span>{selectedReaction}</span>
              <p className="text-xs text-stone-500 font-normal mt-1">
                Thank you so much. That genuinely means everything! ✨
              </p>
            </motion.div>
          ) : (
            <div className="flex flex-wrap gap-2.5 justify-center">
              <button
                onClick={() => handleReaction("Yes, a really big smile! 🥰")}
                className="px-4 py-2 rounded-full bg-white hover:bg-pink-50 text-stone-700 hover:text-pink-600 text-xs sm:text-sm font-semibold border border-pink-200 shadow-xs transition-all cursor-pointer"
              >
                Yes, a big smile! 🥰
              </button>
              <button
                onClick={() => handleReaction("It really warmed my heart 🐾")}
                className="px-4 py-2 rounded-full bg-white hover:bg-amber-50 text-stone-700 hover:text-amber-700 text-xs sm:text-sm font-semibold border border-amber-200 shadow-xs transition-all cursor-pointer"
              >
                It was really sweet 🐾
              </button>
              <button
                onClick={() => handleReaction("The cute pets made my day 🐱")}
                className="px-4 py-2 rounded-full bg-white hover:bg-purple-50 text-stone-700 hover:text-purple-700 text-xs sm:text-sm font-semibold border border-purple-200 shadow-xs transition-all cursor-pointer"
              >
                The cute pets helped 🐱
              </button>
            </div>
          )}

          {/* Virtual Hug Button */}
          <div className="mt-8 flex flex-col items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSendHug}
              className={`px-8 py-3.5 rounded-full font-bold text-sm sm:text-base flex items-center gap-2.5 cursor-pointer shadow-lg transition-all ${
                hugSent
                  ? 'bg-emerald-500 text-white shadow-emerald-200'
                  : 'bg-gradient-to-r from-pink-500 via-rose-400 to-purple-500 text-white shadow-pink-200'
              }`}
            >
              <Heart className={`w-5 h-5 ${hugSent ? 'fill-current' : 'animate-pulse'}`} />
              <span>{hugSent ? 'Virtual Hug Received! 🤗' : 'Send a Virtual Hug Back 🤗'}</span>
            </motion.button>
            <p className="text-xs text-stone-400 mt-2">
              {hugSent ? 'Your hug just traveled through the internet 💖' : 'Click whenever you feel like sending a quiet smile'}
            </p>
          </div>

        </div>

      </div>

      {/* Footer */}
      <footer className="mt-16 text-center text-xs text-stone-500 space-y-2">
        <p className="flex items-center justify-center gap-1.5 font-medium">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
          <span>, fluffy paws, and zero unsent messages.</span>
        </p>
        <p className="text-stone-400 text-[11px]">
          Always welcome back here whenever you need a peaceful breath. 🐾
        </p>
      </footer>

    </section>
  );
}
