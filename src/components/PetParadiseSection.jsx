import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Award, Utensils, Play, Moon, Coffee } from 'lucide-react';
import { PETS_DATA } from '../data/content';
import { AnimatedCat, AnimatedDog } from './CuteAnimalsSvg';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

export default function PetParadiseSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [petLikes, setPetLikes] = useState({});
  
  // Virtual Pet State
  const [activeBuddy, setActiveBuddy] = useState('dog'); // 'dog' or 'cat'
  const [buddyHappiness, setBuddyHappiness] = useState(60);
  const [buddyStatusText, setBuddyStatusText] = useState("Happy to meet you! 🐾");
  const [floatingActionIcon, setFloatingActionIcon] = useState(null);

  const categories = [
    { id: 'all', label: 'All Friends 🐾' },
    { id: 'cats', label: 'Cuddle Kitties 🐱' },
    { id: 'dogs', label: 'Happy Pups 🐶' },
    { id: 'sleepy', label: 'Sleepy Loaves 💤' },
  ];

  const filteredPets = selectedCategory === 'all'
    ? PETS_DATA
    : PETS_DATA.filter((p) => p.category === selectedCategory);

  const handleLikePet = (id) => {
    sound.playPop();
    setPetLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  // Virtual Pet Actions
  const handlePetBuddy = () => {
    if (activeBuddy === 'cat') {
      sound.playPurr();
      setBuddyStatusText("Purrrrr... That's the exact spot behind the ears! ✨");
    } else {
      sound.playWoof();
      setBuddyStatusText("Tail wagging at maximum speed! Best belly rubs ever! 🐾");
    }
    boostHappiness(15, "💖");
  };

  const handleFeedBuddy = () => {
    sound.playPop();
    const treat = activeBuddy === 'cat' ? "🐟 Salmon Treat" : "🦴 Crunchy Biscuit";
    setBuddyStatusText(`*Chomp chomp* Delicious ${treat}! Thank you! 😋`);
    boostHappiness(20, activeBuddy === 'cat' ? "🐟" : "🦴");
  };

  const handlePlayBuddy = () => {
    sound.playChime();
    const toy = activeBuddy === 'cat' ? "🧶 Yarn Ball" : "🎾 Tennis Ball";
    setBuddyStatusText(`Zoomies activated! Chasing the ${toy}! ⚡`);
    boostHappiness(20, activeBuddy === 'cat' ? "🧶" : "🎾");
  };

  const handleNapBuddy = () => {
    sound.playPurr();
    setBuddyStatusText("Curled into a warm cinnamon roll... Zzz... 💤");
    boostHappiness(10, "💤");
  };

  const boostHappiness = (amount, icon) => {
    setFloatingActionIcon(icon);
    setTimeout(() => setFloatingActionIcon(null), 1200);

    setBuddyHappiness((prev) => {
      const next = Math.min(100, prev + amount);
      if (next === 100 && prev < 100) {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F472B6', '#FBBF24', '#A78BFA', '#34D399']
        });
      }
      return next;
    });
  };

  return (
    <section id="paradise" className="py-20 px-4 max-w-6xl mx-auto scroll-mt-20">
      
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 text-amber-800 text-xs sm:text-sm font-semibold mb-3 border border-amber-200">
          <span>🐾</span>
          <span>Cat & Dog Paradise</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-stone-800 font-outfit mb-3">
          A Sanctuary of Paws & Purrs 🐱🐶
        </h2>
        <p className="text-base sm:text-lg text-stone-600 max-w-xl mx-auto font-medium">
          Because when human words fall short, furry friends bring pure, unconditional warmth.
        </p>
      </div>

      {/* VIRTUAL PET INTERACTION BOX */}
      <div className="mb-16 bg-gradient-to-r from-pink-50 via-purple-50 to-amber-50 rounded-3xl p-6 sm:p-8 border-2 border-pink-200 shadow-xl relative overflow-hidden">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 border-b border-pink-100/80 pb-4">
          <div>
            <h3 className="text-xl font-bold text-stone-800 font-outfit flex items-center gap-2">
              <span>Your Pocket Companion</span>
              <Sparkles className="w-4 h-4 text-pink-500" />
            </h3>
            <p className="text-xs sm:text-sm text-stone-500">
              Pick a furry buddy to care for and watch their happiness meter soar!
            </p>
          </div>

          {/* Buddy Selector Switch */}
          <div className="flex bg-white/80 p-1.5 rounded-full border border-pink-200 shadow-inner">
            <button
              onClick={() => {
                sound.playPop();
                setActiveBuddy('dog');
                setBuddyStatusText("Biscuit here! Ready for treats and head pats! 🐶");
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeBuddy === 'dog'
                  ? 'bg-amber-400 text-amber-950 shadow-sm'
                  : 'text-stone-600 hover:text-amber-700'
              }`}
            >
              <span>🐶 Biscuit (Pup)</span>
            </button>
            <button
              onClick={() => {
                sound.playPop();
                setActiveBuddy('cat');
                setBuddyStatusText("Mochi here! Ready to slow blink and loaf in your lap! 🐱");
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeBuddy === 'cat'
                  ? 'bg-pink-400 text-white shadow-sm'
                  : 'text-stone-600 hover:text-pink-700'
              }`}
            >
              <span>🐱 Mochi (Cat)</span>
            </button>
          </div>
        </div>

        {/* Companion Main Stage */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Avatar Canvas */}
          <div className="md:col-span-5 flex flex-col items-center justify-center relative">
            
            {/* Floating action icon effect */}
            <AnimatePresence>
              {floatingActionIcon && (
                <motion.div
                  initial={{ opacity: 1, y: 0, scale: 0.8 }}
                  animate={{ opacity: 0, y: -70, scale: 1.8 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute top-4 text-3xl z-20 pointer-events-none"
                >
                  {floatingActionIcon}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="w-48 h-48 sm:w-56 sm:h-56 bg-white/90 rounded-full flex items-center justify-center border-4 border-pink-100 shadow-lg relative p-4">
              {activeBuddy === 'dog' ? (
                <AnimatedDog className="w-full h-full" onInteract={handlePetBuddy} />
              ) : (
                <AnimatedCat className="w-full h-full" onInteract={handlePetBuddy} />
              )}
            </div>

            <span className="mt-3 text-xs font-semibold text-stone-500 bg-white/80 px-3 py-1 rounded-full border border-stone-200">
              Tap directly to pet! ✨
            </span>
          </div>

          {/* Stats & Actions */}
          <div className="md:col-span-7 flex flex-col justify-center">
            
            {/* Live Status Speech Bubble */}
            <motion.div
              key={buddyStatusText}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-4 rounded-2xl rounded-tl-none border border-pink-200 shadow-sm mb-5 relative"
            >
              <p className="text-sm sm:text-base font-semibold text-stone-800 font-outfit">
                {buddyStatusText}
              </p>
            </motion.div>

            {/* Happiness Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center text-xs font-bold text-stone-700 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
                  Happiness Level
                </span>
                <span className="text-pink-600 font-bold">{buddyHappiness}%</span>
              </div>
              <div className="w-full h-3.5 bg-white rounded-full overflow-hidden border border-pink-200 p-0.5 shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${buddyHappiness}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-pink-400 via-rose-400 to-amber-400 rounded-full"
                />
              </div>

              {buddyHappiness >= 100 && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs font-bold text-emerald-600 mt-1.5 flex items-center gap-1"
                >
                  <Award className="w-3.5 h-3.5" />
                  Max Happiness! You are officially crowned the Best Human Ever 🏅
                </motion.p>
              )}
            </div>

            {/* Interactive Action Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePetBuddy}
                className="p-3 bg-white hover:bg-pink-50 rounded-2xl border border-pink-200 text-stone-700 text-xs font-bold flex flex-col items-center gap-1 shadow-sm transition-colors cursor-pointer"
              >
                <span className="text-xl">🐾</span>
                <span>Pet Gently</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleFeedBuddy}
                className="p-3 bg-white hover:bg-amber-50 rounded-2xl border border-amber-200 text-stone-700 text-xs font-bold flex flex-col items-center gap-1 shadow-sm transition-colors cursor-pointer"
              >
                <span className="text-xl">{activeBuddy === 'cat' ? '🐟' : '🦴'}</span>
                <span>Feed Treat</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePlayBuddy}
                className="p-3 bg-white hover:bg-purple-50 rounded-2xl border border-purple-200 text-stone-700 text-xs font-bold flex flex-col items-center gap-1 shadow-sm transition-colors cursor-pointer"
              >
                <span className="text-xl">{activeBuddy === 'cat' ? '🧶' : '🎾'}</span>
                <span>Play Toy</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNapBuddy}
                className="p-3 bg-white hover:bg-indigo-50 rounded-2xl border border-indigo-200 text-stone-700 text-xs font-bold flex flex-col items-center gap-1 shadow-sm transition-colors cursor-pointer"
              >
                <span className="text-xl">💤</span>
                <span>Cozy Nap</span>
              </motion.button>
            </div>

          </div>
        </div>
      </div>

      {/* GALLERY SECTION */}
      <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-stone-800 font-outfit">
            The Cozy Furry Hall of Fame 📸
          </h3>
          <p className="text-xs sm:text-sm text-stone-500">
            Hover or tap any friend to send them a heart!
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                sound.playPop();
                setSelectedCategory(cat.id);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-pink-500 text-white shadow-md shadow-pink-200'
                  : 'bg-white/80 hover:bg-pink-50 text-stone-600 border border-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Pets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {filteredPets.map((pet) => {
            const likes = petLikes[pet.id] || 0;
            return (
              <motion.div
                key={pet.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                className="glass-panel glass-panel-hover rounded-3xl overflow-hidden border border-pink-100/90 flex flex-col justify-between group"
              >
                {/* Photo & Badge */}
                <div className="relative aspect-[4/3] overflow-hidden bg-pink-100">
                  <img
                    src={pet.image}
                    alt={pet.name}
                    loading="lazy"
                    onError={(e) => {
                      // Graceful fallback to styled pastel placeholder with emoji avatar
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Fallback container if network is slow/offline */}
                  <div
                    className={`hidden w-full h-full bg-gradient-to-br ${pet.fallbackBg} items-center justify-center flex-col p-4 text-center`}
                  >
                    <span className="text-5xl mb-2">{pet.avatar}</span>
                    <span className="text-sm font-bold text-stone-700">{pet.name}</span>
                    <span className="text-xs text-stone-500">{pet.breed}</span>
                  </div>

                  {/* Species Tag */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-stone-700 shadow-sm flex items-center gap-1">
                    <span>{pet.avatar}</span>
                    <span className="capitalize">{pet.species}</span>
                  </div>

                  {/* Like Button on Image */}
                  <button
                    onClick={() => handleLikePet(pet.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-rose-500 hover:bg-rose-50 hover:scale-110 active:scale-95 transition-all shadow-sm cursor-pointer"
                    title="Send a heart to this pet!"
                  >
                    <Heart className={`w-4 h-4 ${likes > 0 ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-baseline justify-between mb-1">
                      <h4 className="text-lg font-bold text-stone-800 font-outfit">
                        {pet.name}
                      </h4>
                      <span className="text-[11px] font-semibold text-stone-500">
                        {pet.breed}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-pink-600 mb-3">
                      {pet.tagline}
                    </p>

                    {/* Personality Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {pet.personality.map((trait, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-full bg-pink-50 text-[10px] font-medium text-pink-700 border border-pink-100"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>

                    {/* Pet Quote */}
                    <p className="text-xs text-stone-600 italic bg-stone-50/80 p-2.5 rounded-xl border-l-2 border-pink-300">
                      "{pet.quote}"
                    </p>
                  </div>

                  {/* Footer Card Action */}
                  <div className="mt-4 pt-3 border-t border-pink-50 flex items-center justify-between text-xs">
                    <span className="text-stone-400 font-medium">
                      {likes} {likes === 1 ? 'snuggle' : 'snuggles'} given
                    </span>
                    <button
                      onClick={() => handleLikePet(pet.id)}
                      className="px-2.5 py-1 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-700 font-bold transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
                    >
                      <span>Boop Nose</span>
                      <span>✨</span>
                    </button>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

    </section>
  );
}
