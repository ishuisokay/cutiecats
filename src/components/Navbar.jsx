import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Music, Volume2, VolumeX, Menu, X, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

export default function Navbar({ loveCount, onSendLove }) {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMusic = () => {
    sound.playPop();
    const playing = sound.toggleBGM();
    setIsPlayingMusic(playing);
  };

  const toggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (muted) setIsPlayingMusic(false);
  };

  const handleNavClick = (id) => {
    sound.playPop();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: "Welcome", id: "welcome", icon: "🌸" },
    { label: "Apology", id: "apology", icon: "💌" },
    { label: "Pet Paradise", id: "paradise", icon: "🐾" },
    { label: "Little Happiness", id: "happiness", icon: "🎁" },
    { label: "Final Note", id: "letter", icon: "💖" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-8 py-3 transition-all duration-300">
      <div className="max-w-6xl mx-auto glass-panel rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-sm border border-pink-100/80">
        
        {/* Brand / Logo */}
        <a
          href="#welcome"
          onClick={(e) => { e.preventDefault(); handleNavClick('welcome'); }}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <span className="text-2xl group-hover:scale-110 transition-transform">🐾</span>
          <div className="flex flex-col">
            <span className="font-outfit font-bold text-sm sm:text-base text-stone-800 tracking-tight flex items-center gap-1">
              A Little World
              <span className="text-pink-500 font-handwriting text-lg sm:text-xl font-bold">Made For You</span>
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="px-3 py-1.5 rounded-full text-xs lg:text-sm font-medium text-stone-600 hover:text-pink-600 hover:bg-pink-100/60 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Send Love Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => {
              sound.playPop();
              onSendLove();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-full text-xs font-semibold shadow-sm hover:shadow-pink-300/40 hover:shadow-md transition-all cursor-pointer"
            title="Click to send love!"
          >
            <Heart className="w-3.5 h-3.5 fill-current animate-pulse text-white" />
            <span>{loveCount}</span>
          </motion.button>

          {/* Music Toggle */}
          <button
            onClick={toggleMusic}
            className={`p-2 rounded-full transition-all text-xs flex items-center gap-1.5 cursor-pointer border ${
              isPlayingMusic
                ? 'bg-purple-100 text-purple-700 border-purple-300 shadow-sm'
                : 'bg-white/80 text-stone-500 hover:text-purple-600 border-stone-200'
            }`}
            title={isPlayingMusic ? "Stop soothing melody" : "Play soothing pastel melody 🎵"}
          >
            <Music className={`w-3.5 h-3.5 ${isPlayingMusic ? 'animate-bounce' : ''}`} />
            <span className="hidden sm:inline text-[11px] font-medium">
              {isPlayingMusic ? 'Melody On' : 'Play Music'}
            </span>
          </button>

          {/* Mute Toggle */}
          <button
            onClick={toggleMute}
            className="p-2 rounded-full bg-white/80 hover:bg-pink-50 text-stone-500 hover:text-pink-600 border border-stone-200 text-xs transition-colors cursor-pointer"
            title={isMuted ? "Unmute sound effects" : "Mute sound effects"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-white/80 text-stone-600 hover:text-pink-600 border border-stone-200"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden max-w-sm mx-auto mt-2 glass-panel rounded-2xl p-3 border border-pink-100/90 shadow-lg"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className="px-4 py-2.5 rounded-xl text-left text-sm font-medium text-stone-700 hover:bg-pink-100/70 hover:text-pink-700 transition-colors flex items-center gap-2.5"
                >
                  <span className="text-base">{link.icon}</span>
                  <span>{link.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
