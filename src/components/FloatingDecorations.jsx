import React from 'react';
import { motion } from 'framer-motion';

export default function FloatingDecorations() {
  const decorations = [
    { text: "🐾", x: "8%", y: "15%", duration: 18, delay: 0, size: "text-2xl" },
    { text: "🌸", x: "92%", y: "12%", duration: 22, delay: 1, size: "text-xl" },
    { text: "✨", x: "85%", y: "35%", duration: 15, delay: 2, size: "text-lg" },
    { text: "🐱", x: "4%", y: "45%", duration: 24, delay: 0.5, size: "text-2xl" },
    { text: "💕", x: "94%", y: "60%", duration: 20, delay: 3, size: "text-xl" },
    { text: "🐶", x: "7%", y: "75%", duration: 26, delay: 1.5, size: "text-2xl" },
    { text: "🐾", x: "88%", y: "85%", duration: 19, delay: 2.5, size: "text-2xl" },
    { text: "☁️", x: "12%", y: "92%", duration: 25, delay: 4, size: "text-3xl opacity-40" },
    { text: "✨", x: "50%", y: "5%", duration: 14, delay: 1, size: "text-base" },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Soft gradient ambient blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-pink-200/35 blur-3xl" />
      <div className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-200/30 blur-3xl" />
      <div className="absolute bottom-[-10%] left-[20%] w-[550px] h-[550px] rounded-full bg-amber-100/40 blur-3xl" />

      {decorations.map((item, idx) => (
        <motion.div
          key={idx}
          className={`absolute opacity-40 hover:opacity-80 transition-opacity ${item.size}`}
          style={{ left: item.x, top: item.y }}
          animate={{
            y: [0, -18, 0],
            rotate: [0, 8, -8, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut",
          }}
        >
          {item.text}
        </motion.div>
      ))}
    </div>
  );
}
