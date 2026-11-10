import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/audio';

export function AnimatedCat({ className = "w-36 h-36", onInteract }) {
  const [isBlushing, setIsBlushing] = useState(false);
  const [hearts, setHearts] = useState([]);

  const handleClick = (e) => {
    e.stopPropagation();
    sound.playPurr();
    setIsBlushing(true);
    setTimeout(() => setIsBlushing(false), 2000);

    const newHeart = { id: Date.now() + Math.random(), x: Math.random() * 40 - 20 };
    setHearts((prev) => [...prev, newHeart]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1500);

    if (onInteract) onInteract('cat');
  };

  return (
    <div
      onClick={handleClick}
      className={`relative cursor-pointer select-none group transition-transform ${className}`}
      title="Click to pet the kitty! 🐾"
    >
      {/* Floating hearts on click */}
      <AnimatePresence>
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            initial={{ opacity: 1, y: 0, x: h.x, scale: 0.6 }}
            animate={{ opacity: 0, y: -60, scale: 1.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute -top-4 left-1/2 -translate-x-1/2 pointer-events-none text-pink-500 text-lg z-20"
          >
            💖
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-md"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <defs>
          <linearGradient id="catBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF1F2" />
            <stop offset="100%" stopColor="#FED7E2" />
          </linearGradient>
          <linearGradient id="catEarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBB6CE" />
            <stop offset="100%" stopColor="#F687B3" />
          </linearGradient>
        </defs>

        {/* Tail wagging */}
        <motion.path
          d="M 140 145 Q 185 140 175 105 Q 165 85 155 100"
          fill="none"
          stroke="#FBB6CE"
          strokeWidth="12"
          strokeLinecap="round"
          animate={{
            d: [
              "M 140 145 Q 185 140 175 105 Q 165 85 155 100",
              "M 140 145 Q 195 125 180 85 Q 170 70 160 90",
              "M 140 145 Q 185 140 175 105 Q 165 85 155 100"
            ]
          }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        />

        {/* Body */}
        <ellipse cx="100" cy="140" rx="55" ry="45" fill="url(#catBodyGrad)" />

        {/* Left Ear */}
        <motion.polygon
          points="60,85 45,40 85,65"
          fill="url(#catBodyGrad)"
          stroke="#FBB6CE"
          strokeWidth="3"
          animate={{ rotate: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          style={{ transformOrigin: "60px 85px" }}
        />
        <polygon points="60,80 52,48 80,67" fill="url(#catEarGrad)" />

        {/* Right Ear */}
        <motion.polygon
          points="140,85 155,40 115,65"
          fill="url(#catBodyGrad)"
          stroke="#FBB6CE"
          strokeWidth="3"
          animate={{ rotate: [0, 3, 0] }}
          transition={{ repeat: Infinity, duration: 3, delay: 0.5, ease: "easeInOut" }}
          style={{ transformOrigin: "140px 85px" }}
        />
        <polygon points="140,80 148,48 120,67" fill="url(#catEarGrad)" />

        {/* Head */}
        <ellipse cx="100" cy="95" rx="50" ry="42" fill="url(#catBodyGrad)" stroke="#FBB6CE" strokeWidth="2" />

        {/* Calico Spot */}
        <path d="M 65 70 Q 80 65 78 82 Q 70 88 65 70 Z" fill="#F6AD55" opacity="0.65" />

        {/* Eyes (Happy Closed / Blinking) */}
        <motion.path
          d="M 75 92 Q 83 85 91 92"
          fill="none"
          stroke="#4A4050"
          strokeWidth="3.5"
          strokeLinecap="round"
          animate={{ scaleY: [1, 0.2, 1] }}
          transition={{ repeat: Infinity, duration: 4, times: [0, 0.05, 0.1] }}
          style={{ transformOrigin: "83px 92px" }}
        />
        <motion.path
          d="M 109 92 Q 117 85 125 92"
          fill="none"
          stroke="#4A4050"
          strokeWidth="3.5"
          strokeLinecap="round"
          animate={{ scaleY: [1, 0.2, 1] }}
          transition={{ repeat: Infinity, duration: 4, times: [0, 0.05, 0.1] }}
          style={{ transformOrigin: "117px 92px" }}
        />

        {/* Nose */}
        <polygon points="96,102 104,102 100,107" fill="#F687B3" />

        {/* Mouth */}
        <path d="M 100 107 Q 95 114 90 110" fill="none" stroke="#4A4050" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 100 107 Q 105 114 110 110" fill="none" stroke="#4A4050" strokeWidth="2.5" strokeLinecap="round" />

        {/* Whiskers */}
        <line x1="60" y1="99" x2="40" y2="96" stroke="#CBD5E0" strokeWidth="2" strokeLinecap="round" />
        <line x1="60" y1="104" x2="38" y2="106" stroke="#CBD5E0" strokeWidth="2" strokeLinecap="round" />
        <line x1="140" y1="99" x2="160" y2="96" stroke="#CBD5E0" strokeWidth="2" strokeLinecap="round" />
        <line x1="140" y1="104" x2="162" y2="106" stroke="#CBD5E0" strokeWidth="2" strokeLinecap="round" />

        {/* Blush cheeks */}
        <ellipse
          cx="70"
          cy="104"
          rx={isBlushing ? "10" : "7"}
          ry={isBlushing ? "6" : "4"}
          fill="#FEB2B2"
          opacity={isBlushing ? "0.9" : "0.5"}
          className="transition-all duration-300"
        />
        <ellipse
          cx="130"
          cy="104"
          rx={isBlushing ? "10" : "7"}
          ry={isBlushing ? "6" : "4"}
          fill="#FEB2B2"
          opacity={isBlushing ? "0.9" : "0.5"}
          className="transition-all duration-300"
        />

        {/* Front paws */}
        <ellipse cx="82" cy="168" rx="14" ry="10" fill="#FFF1F2" stroke="#FBB6CE" strokeWidth="2" />
        <ellipse cx="118" cy="168" rx="14" ry="10" fill="#FFF1F2" stroke="#FBB6CE" strokeWidth="2" />

        {/* Bell Collar */}
        <path d="M 76 128 Q 100 138 124 128" fill="none" stroke="#ED64A6" strokeWidth="5" strokeLinecap="round" />
        <circle cx="100" cy="135" r="5.5" fill="#F6E05E" stroke="#D69E2E" strokeWidth="1.5" />
      </motion.svg>
    </div>
  );
}

export function AnimatedDog({ className = "w-36 h-36", onInteract }) {
  const [isWaggingFast, setIsWaggingFast] = useState(false);
  const [hearts, setHearts] = useState([]);

  const handleClick = (e) => {
    e.stopPropagation();
    sound.playWoof();
    setIsWaggingFast(true);
    setTimeout(() => setIsWaggingFast(false), 2000);

    const newHeart = { id: Date.now() + Math.random(), x: Math.random() * 40 - 20 };
    setHearts((prev) => [...prev, newHeart]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1500);

    if (onInteract) onInteract('dog');
  };

  return (
    <div
      onClick={handleClick}
      className={`relative cursor-pointer select-none group transition-transform ${className}`}
      title="Click to pet the puppy! 🐾"
    >
      {/* Floating hearts on click */}
      <AnimatePresence>
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            initial={{ opacity: 1, y: 0, x: h.x, scale: 0.6 }}
            animate={{ opacity: 0, y: -60, scale: 1.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute -top-4 left-1/2 -translate-x-1/2 pointer-events-none text-rose-500 text-lg z-20"
          >
            🐾💖
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-md"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <defs>
          <linearGradient id="dogBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="100%" stopColor="#FDE68A" />
          </linearGradient>
          <linearGradient id="dogEarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>

        {/* Tail wagging */}
        <motion.path
          d="M 55 140 Q 20 120 30 90"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="11"
          strokeLinecap="round"
          animate={{
            rotate: isWaggingFast ? [-25, 25, -25] : [-8, 8, -8],
          }}
          transition={{
            repeat: Infinity,
            duration: isWaggingFast ? 0.2 : 0.8,
            ease: "easeInOut"
          }}
          style={{ transformOrigin: "55px 140px" }}
        />

        {/* Body */}
        <ellipse cx="105" cy="142" rx="55" ry="44" fill="url(#dogBodyGrad)" />

        {/* Left Floppy Ear */}
        <motion.path
          d="M 65 72 C 40 70 30 115 50 125 C 62 130 72 105 70 82 Z"
          fill="url(#dogEarGrad)"
          animate={{ rotate: isWaggingFast ? [-6, 6, -6] : [-2, 2, -2] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          style={{ transformOrigin: "65px 72px" }}
        />

        {/* Right Floppy Ear */}
        <motion.path
          d="M 145 72 C 170 70 180 115 160 125 C 148 130 138 105 140 82 Z"
          fill="url(#dogEarGrad)"
          animate={{ rotate: isWaggingFast ? [6, -6, 6] : [2, -2, 2] }}
          transition={{ repeat: Infinity, duration: 1.5, delay: 0.2, ease: "easeInOut" }}
          style={{ transformOrigin: "145px 72px" }}
        />

        {/* Head */}
        <ellipse cx="105" cy="95" rx="46" ry="40" fill="url(#dogBodyGrad)" stroke="#F59E0B" strokeWidth="1.5" />

        {/* Snout */}
        <ellipse cx="105" cy="108" rx="26" ry="20" fill="#FFFBEB" />

        {/* Happy Eyes */}
        <motion.circle
          cx="88"
          cy="90"
          r="5"
          fill="#374151"
          animate={{ scaleY: [1, 0.1, 1] }}
          transition={{ repeat: Infinity, duration: 3.5, times: [0, 0.05, 0.1] }}
          style={{ transformOrigin: "88px 90px" }}
        />
        <circle cx="86.5" cy="88.5" r="1.8" fill="#FFFFFF" />

        <motion.circle
          cx="122"
          cy="90"
          r="5"
          fill="#374151"
          animate={{ scaleY: [1, 0.1, 1] }}
          transition={{ repeat: Infinity, duration: 3.5, times: [0, 0.05, 0.1] }}
          style={{ transformOrigin: "122px 90px" }}
        />
        <circle cx="120.5" cy="88.5" r="1.8" fill="#FFFFFF" />

        {/* Eyebrow dots */}
        <circle cx="86" cy="80" r="2.2" fill="#D97706" opacity="0.8" />
        <circle cx="124" cy="80" r="2.2" fill="#D97706" opacity="0.8" />

        {/* Nose */}
        <ellipse cx="105" cy="103" rx="7" ry="5.5" fill="#1F2937" />
        <circle cx="103.5" cy="101.5" r="1.5" fill="#FFFFFF" opacity="0.8" />

        {/* Smiling Mouth */}
        <path d="M 105 108 L 105 114" stroke="#374151" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M 105 114 Q 97 122 92 116" fill="none" stroke="#374151" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M 105 114 Q 113 122 118 116" fill="none" stroke="#374151" strokeWidth="2.2" strokeLinecap="round" />

        {/* Cute Tongue */}
        <motion.path
          d="M 102 117 Q 105 127 108 117 Z"
          fill="#F87171"
          animate={{ scaleY: isWaggingFast ? [1, 1.3, 1] : [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 0.6 }}
          style={{ transformOrigin: "105px 117px" }}
        />

        {/* Rosy Cheeks */}
        <ellipse cx="78" cy="102" rx="7" ry="4" fill="#FCA5A5" opacity="0.6" />
        <ellipse cx="132" cy="102" rx="7" ry="4" fill="#FCA5A5" opacity="0.6" />

        {/* Paws */}
        <ellipse cx="88" cy="170" rx="14" ry="10" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />
        <ellipse cx="124" cy="170" rx="14" ry="10" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />

        {/* Red Bandana */}
        <path d="M 85 125 Q 105 142 125 125 L 105 146 Z" fill="#EF4444" />
        <circle cx="105" cy="133" r="1.5" fill="#FFFFFF" />
      </motion.svg>
    </div>
  );
}
