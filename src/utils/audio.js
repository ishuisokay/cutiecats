// Web Audio API Sound Synthesizer
// Zero external dependencies, pure browser audio for seamless offline & online experience

class SoundEffects {
  constructor() {
    this.ctx = null;
    this.bgmPlaying = false;
    this.bgmInterval = null;
    this.isMuted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.bgmPlaying) {
      this.stopBGM();
    }
    return this.isMuted;
  }

  // Soft cheerful pop / bubble sound
  playPop() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      // Audio not permitted or supported
    }
  }

  // Warm chime / harp sparkle
  playChime() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.08, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.4);
      });
    } catch {
      // Audio fallback
    }
  }

  // Gentle purr sound effect
  playPurr() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const mod = this.ctx.createOscillator();
      const modGain = this.ctx.createGain();
      const gain = this.ctx.createGain();

      const now = this.ctx.currentTime;
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(42, now); // low purr frequency

      mod.type = 'sine';
      mod.frequency.setValueAtTime(24, now); // purr rhythm vibration

      modGain.gain.setValueAtTime(15, now);
      mod.connect(modGain);
      modGain.connect(osc.frequency);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.09, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      mod.start(now);
      osc.start(now);
      mod.stop(now + 0.9);
      osc.stop(now + 0.9);
    } catch {
      // Audio fallback
    }
  }

  // Happy little puppy chirp / bark
  playWoof() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const now = this.ctx.currentTime;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(620, now + 0.06);
      osc.frequency.exponentialRampToValueAtTime(280, now + 0.18);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.18);
    } catch {
      // Audio fallback
    }
  }

  // Cozy ambient music generator (soothing pastel lofi chimes)
  startBGM() {
    if (this.bgmPlaying) return;
    this.init();
    if (!this.ctx) return;
    this.bgmPlaying = true;

    // Progression: Cmaj7 (C, E, G, B) -> Am7 (A, C, E, G) -> Fmaj7 (F, A, C, E) -> G6 (G, B, D, E)
    const chords = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [174.61, 220.00, 261.63, 329.63], // Fmaj7
      [196.00, 246.94, 293.66, 329.63]  // G6
    ];

    let chordIndex = 0;
    let step = 0;

    const playStep = () => {
      if (!this.bgmPlaying || this.isMuted) return;
      try {
        const currentChord = chords[chordIndex];
        const noteFreq = currentChord[step % currentChord.length];

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // Warm, soft electric piano / celesta tone
        osc.type = 'sine';
        osc.frequency.setValueAtTime(noteFreq * (step % 2 === 0 ? 1 : 2), now);

        gain.gain.setValueAtTime(0.035, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 1.2);

        step++;
        if (step >= 8) {
          step = 0;
          chordIndex = (chordIndex + 1) % chords.length;
        }
      } catch {
        // fail silently
      }
    };

    playStep();
    this.bgmInterval = setInterval(playStep, 600);
  }

  stopBGM() {
    this.bgmPlaying = false;
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }

  toggleBGM() {
    if (this.bgmPlaying) {
      this.stopBGM();
      return false;
    } else {
      this.startBGM();
      return true;
    }
  }
}

export const sound = new SoundEffects();
