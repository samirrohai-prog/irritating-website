// Synthesized Web Audio API sound generator - 100% self-contained, zero external audio assets

class SoundEffects {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private getContext(): AudioContext | null {
    if (this.isMuted) return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  getMuted(): boolean {
    return this.isMuted;
  }

  // 1. THE ULTIMATE VIRAL MEME SOUND: "MOYE MOYE" (Džanum - Teya Dora Melancholic Hook)
  playMoyeMoye() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Helper to play a melancholic flute/bell synth note with soft vibrato
    const playSynthNote = (freq: number, startOffset: number, noteDuration: number, volume = 0.16) => {
      const osc = ctx.createOscillator();
      const oscHarmonic = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + startOffset);

      // Add gentle melancholic vibrato
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(5.5, now + startOffset); // 5.5 Hz vibrato
      lfoGain.gain.setValueAtTime(2.5, now + startOffset); // vibrato depth
      lfo.connect(osc.frequency);
      lfo.start(now + startOffset);
      lfo.stop(now + startOffset + noteDuration);

      // Warm triangle harmonic
      oscHarmonic.type = 'triangle';
      oscHarmonic.frequency.setValueAtTime(freq * 2, now + startOffset);

      // Lowpass filter for warm emotional tone
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, now + startOffset);
      filter.frequency.exponentialRampToValueAtTime(600, now + startOffset + noteDuration);

      // Envelope
      gain.gain.setValueAtTime(0.001, now + startOffset);
      gain.gain.linearRampToValueAtTime(volume, now + startOffset + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + startOffset + noteDuration);

      osc.connect(filter);
      oscHarmonic.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + startOffset);
      oscHarmonic.start(now + startOffset);
      osc.stop(now + startOffset + noteDuration);
      oscHarmonic.stop(now + startOffset + noteDuration);
    };

    // Deep emotional minor bass pad (Am -> Em)
    const playBassPad = (freq: number, startOffset: number, duration: number) => {
      const bass = ctx.createOscillator();
      const bassGain = ctx.createGain();
      bass.type = 'sine';
      bass.frequency.setValueAtTime(freq, now + startOffset);

      bassGain.gain.setValueAtTime(0.001, now + startOffset);
      bassGain.gain.linearRampToValueAtTime(0.12, now + startOffset + 0.1);
      bassGain.gain.exponentialRampToValueAtTime(0.001, now + startOffset + duration);

      bass.connect(bassGain);
      bassGain.connect(ctx.destination);
      bass.start(now + startOffset);
      bass.stop(now + startOffset + duration);
    };

    // Pad chords in background
    playBassPad(110.0, 0, 1.4); // A2
    playBassPad(82.4, 1.4, 1.8); // E2

    // The iconic "MOYE MOYE" melody notes:
    // First Phrase: "Mo - ye Mo - ye"
    // E4 (329.63) -> G4 (392.00) -> A4 (440.00) -> G4 (392.00) -> E4 (329.63)
    playSynthNote(329.63, 0.00, 0.22); // E4
    playSynthNote(392.00, 0.22, 0.22); // G4
    playSynthNote(440.00, 0.44, 0.45); // A4 ("Mo-ye...")
    playSynthNote(392.00, 0.88, 0.22); // G4
    playSynthNote(329.63, 1.10, 0.70); // E4 ("...mo-ye")

    // Second Phrase: "Mo - ye Mo - ye..."
    // E4 -> G4 -> A4 -> B4 -> A4 (resolving mournfully)
    playSynthNote(329.63, 1.65, 0.20); // E4
    playSynthNote(392.00, 1.85, 0.20); // G4
    playSynthNote(440.00, 2.05, 0.40); // A4 ("Mo-ye...")
    playSynthNote(493.88, 2.45, 0.25); // B4
    playSynthNote(440.00, 2.70, 0.85); // A4 ("...mo-ye...")
  }

  // 2. VIRAL "DHOOM TANA" EKTA KAPOOR DRAMATIC 3-HIT THUNDER CRASH
  playDhoomTana() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // 3 dramatic crash hits with thunder (Hit 1: 0s, Hit 2: 0.25s, Hit 3: 0.5s)
    [0, 0.28, 0.56].forEach((offset) => {
      // Metallic gong/cymbal crash
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, now + offset);
      osc.frequency.exponentialRampToValueAtTime(80, now + offset + 0.35);

      gain.gain.setValueAtTime(0.22, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + offset);
      osc.stop(now + offset + 0.35);
    });
  }

  // 3. VIRAL "CHHIN TAPAK DAM DAM" Tacky Jingle
  playChhinTapak() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [
      { f: 523.25, t: 0.00, d: 0.12 }, // C5 (Chhin)
      { f: 659.25, t: 0.12, d: 0.12 }, // E5 (Ta)
      { f: 783.99, t: 0.24, d: 0.18 }, // G5 (pak)
      { f: 523.25, t: 0.42, d: 0.14 }, // C5 (Dam)
      { f: 659.25, t: 0.56, d: 0.25 }, // E5 (Dam!)
    ];

    notes.forEach((n) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n.f, now + n.t);

      gain.gain.setValueAtTime(0.18, now + n.t);
      gain.gain.exponentialRampToValueAtTime(0.001, now + n.t + n.d);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + n.t);
      osc.stop(now + n.t + n.d);
    });
  }

  // The iconic Indian meme dramatic "FAHHHHHHHH!" brassy sigh
  playFahhhhh() {
    // Forward to the supreme viral sound: Moye Moye!
    this.playMoyeMoye();
  }

  // UPI payment success / Cash register chime
  playChaChing() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(1046.50, now);
    osc1.frequency.setValueAtTime(1318.51, now + 0.08);
    osc1.frequency.setValueAtTime(1567.98, now + 0.16);
    osc1.frequency.setValueAtTime(2093.00, now + 0.24);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1567.98, now);
    osc2.frequency.setValueAtTime(2093.00, now + 0.16);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.5);
    osc2.stop(now + 0.5);
  }

  // Classic Indian Rickshaw / Horn sound "POOP POOP!"
  playRickshawHorn() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sawtooth';
    osc2.type = 'square';
    osc1.frequency.setValueAtTime(320, now);
    osc2.frequency.setValueAtTime(380, now);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.setValueAtTime(0, now + 0.1);
    gain.gain.setValueAtTime(0.15, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.35);
    osc2.stop(now + 0.35);
  }

  // Pressure Cooker Whistle ("Seetee")
  playPressureCooker() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1800, now);
    osc.frequency.linearRampToValueAtTime(2400, now + 0.15);
    osc.frequency.linearRampToValueAtTime(2100, now + 0.35);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.4);
  }

  // Error buzzer
  playBuzzer() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.setValueAtTime(110, now + 0.15);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  // Ding / notification
  playDing() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  // Wheel tick
  playTick() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(600, now);
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.04);
  }

  // Fly buzz sound
  playBuzz() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.linearRampToValueAtTime(260, now + 0.1);
    gain.gain.setValueAtTime(0.03, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  }
}

export const sounds = new SoundEffects();
