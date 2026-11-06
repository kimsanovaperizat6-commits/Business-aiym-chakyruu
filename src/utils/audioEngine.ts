/**
 * Minimal Luxury Corporate Ambient Audio Engine
 * Specially composed for the AIYM BUSINESS–2026 International Women's Business Forum invitation website.
 * 
 * Musical Character:
 * - Style: Minimal luxury corporate ambient, soft felt piano, subtle strings, gentle electronic textures
 * - Mood: Refined, calm, welcoming, sophisticated, professional, and inspiring
 * - No vocals, no lyrics, no strong beats, no sudden transitions
 * - Smooth, seamless background flow for continuous website exploration
 */

class LuxuryAmbientAudioEngine {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  private loopTimer: any = null;
  private scheduledNodes: { stop: (time: number) => void }[] = [];
  private volume: number = 0.45; // Delicate, non-intrusive luxury background volume

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();

      // Transparent luxury compressor for silky, balanced dynamics
      this.compressor = this.ctx.createDynamicsCompressor();
      this.compressor.threshold.setValueAtTime(-28, this.ctx.currentTime);
      this.compressor.knee.setValueAtTime(15, this.ctx.currentTime);
      this.compressor.ratio.setValueAtTime(2.5, this.ctx.currentTime);
      this.compressor.attack.setValueAtTime(0.04, this.ctx.currentTime);
      this.compressor.release.setValueAtTime(0.35, this.ctx.currentTime);

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.analyser.smoothingTimeConstant = 0.85;

      this.masterGain.connect(this.compressor);
      this.compressor.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Soft Felt Piano Note
   * Gentle, warm, intimate acoustic touch with lowpass damping and soft attack.
   */
  private playSoftPiano(freq: number, startTime: number, duration: number = 3.6, velocity: number = 0.35) {
    if (!this.ctx || !this.masterGain) return;

    // Harmonic balance: rich fundamental with warm lower harmonics
    const harmonics = [
      { ratio: 1.0, type: 'triangle' as OscillatorType, weight: 0.75 },
      { ratio: 2.002, type: 'sine' as OscillatorType, weight: 0.18 },
      { ratio: 3.004, type: 'sine' as OscillatorType, weight: 0.06 }
    ];

    harmonics.forEach((h) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = h.type;
      osc.frequency.setValueAtTime(freq * h.ratio, startTime);

      // Warm felt acoustic damping
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1450, startTime);
      filter.frequency.exponentialRampToValueAtTime(320, startTime + duration);

      const peak = velocity * h.weight;
      // Soft, non-percussive attack for serene luxury feel
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(peak, startTime + 0.035);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.1);
      this.scheduledNodes.push(osc);
    });
  }

  /**
   * Subtle Silky Strings & Ambient Pad
   * Gentle, breathing stereo swells that provide depth and quiet prestige.
   */
  private playSubtlePad(notes: number[], startTime: number, duration: number, velocity: number = 0.22) {
    if (!this.ctx || !this.masterGain) return;

    notes.forEach((freq) => {
      if (!this.ctx || !this.masterGain) return;

      [-4, 4].forEach((detune) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        osc.detune.setValueAtTime(detune, startTime);

        // Very gentle, slow breathing LFO
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        lfo.frequency.setValueAtTime(3.0, startTime);
        lfoGain.gain.setValueAtTime(1.2, startTime);
        lfo.connect(osc.detune);
        lfo.start(startTime);
        lfo.stop(startTime + duration + 0.5);

        // Silk lowpass filtering
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(520, startTime);
        filter.frequency.linearRampToValueAtTime(850, startTime + duration * 0.5);
        filter.frequency.linearRampToValueAtTime(480, startTime + duration);

        // Long, graceful swelling envelope (no sudden changes)
        const peak = velocity * 0.055;
        gain.gain.setValueAtTime(0.0001, startTime);
        gain.gain.linearRampToValueAtTime(peak, startTime + 2.2);
        gain.gain.setValueAtTime(peak, startTime + duration - 2.2);
        gain.gain.linearRampToValueAtTime(0.0001, startTime + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc.start(startTime);
        osc.stop(startTime + duration + 0.2);
        this.scheduledNodes.push(osc);
      });
    });
  }

  /**
   * Delicate Electronic Shimmer Texture
   * Subtle modern sound design element evoking light, innovation and clarity.
   */
  private playDelicateShimmer(freq: number, startTime: number, duration: number = 4.0, velocity: number = 0.18) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(freq, startTime);
    filter.Q.setValueAtTime(3.0, startTime);

    const peak = velocity * 0.04;
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.linearRampToValueAtTime(peak, startTime + 1.2);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.1);
    this.scheduledNodes.push(osc);
  }

  /**
   * Warm Ambient Sub-Bass Foundation
   * Rounded, grounding tonal warmth (beatless, calm foundation without any drums).
   */
  private playSubWarmth(freq: number, startTime: number, duration: number = 5.0, velocity: number = 0.28) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    const peak = velocity * 0.12;
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.linearRampToValueAtTime(peak, startTime + 1.0);
    gain.gain.linearRampToValueAtTime(peak * 0.7, startTime + duration * 0.7);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.1);
    this.scheduledNodes.push(osc);
  }

  /**
   * Elegant, calm & sophisticated minimal corporate ambient cycle.
   * Tempo: 68 BPM (Slow, luxurious, welcoming)
   * 1 beat = 60 / 68 = ~0.8824s
   * 4 measures of 4 beats = 16 beats = ~14.118s (or 8 measures = ~28.235s)
   * Completely seamless loop.
   */
  private scheduleMovement() {
    if (!this.ctx || !this.isRunning) return;

    const now = this.ctx.currentTime + 0.05;
    const bpm = 68;
    const beat = 60 / bpm; // ~0.8824s
    const bar = beat * 4;  // ~3.5294s
    const totalDuration = bar * 8; // ~28.235s loop

    // Frequencies (Hz)
    const D2 = 73.42, G1 = 49.00, B1 = 61.74, A1 = 55.00, Fsharp1 = 46.25, E1 = 41.20;
    const D3 = 146.83, E3 = 164.81, Fsharp3 = 185.00, G3 = 196.00, A3 = 220.00, B3 = 246.94, Csharp4 = 277.18;
    const D4 = 293.66, E4 = 329.63, Fsharp4 = 369.99, G4 = 392.00, A4 = 440.00, B4 = 493.88, Csharp5 = 554.37, D5 = 587.33, E5 = 659.25, Fsharp5 = 739.99;
    const A5 = 880.00;

    // --- PHASE 1: Dmaj9 (Warmth, openness, executive clarity) ---
    const t1 = now;
    this.playSubWarmth(D2, t1, bar * 2, 0.3);
    this.playSubtlePad([D3, A3, Fsharp4, Csharp5], t1, bar * 2 + 1.0, 0.24);
    this.playDelicateShimmer(A5, t1 + beat * 1.5, 4.5, 0.16);

    // Thoughtful, spacious felt piano phrases (gentle touch, wide pauses)
    this.playSoftPiano(Fsharp4, t1 + beat * 0.5, 4.0, 0.32);
    this.playSoftPiano(A4, t1 + beat * 2.0, 3.8, 0.30);
    this.playSoftPiano(Csharp5, t1 + beat * 3.5, 3.8, 0.34);
    this.playSoftPiano(D5, t1 + beat * 5.0, 4.2, 0.36);
    this.playSoftPiano(A4, t1 + beat * 6.5, 3.5, 0.28);

    // --- PHASE 2: Gmaj7 (Empowerment, meaningful connection, welcoming harmony) ---
    const t2 = now + bar * 2;
    this.playSubWarmth(G1, t2, bar * 2, 0.3);
    this.playSubtlePad([G3, D4, Fsharp4, B4], t2, bar * 2 + 1.0, 0.25);
    this.playDelicateShimmer(D5 * 2, t2 + beat * 1.0, 4.5, 0.15);

    // Piano melody gently answers
    this.playSoftPiano(B4, t2 + beat * 0.5, 4.0, 0.32);
    this.playSoftPiano(D5, t2 + beat * 2.0, 3.8, 0.34);
    this.playSoftPiano(Fsharp5, t2 + beat * 3.5, 4.2, 0.38);
    this.playSoftPiano(E5, t2 + beat * 5.0, 3.8, 0.30);
    this.playSoftPiano(D5, t2 + beat * 6.5, 3.5, 0.28);

    // --- PHASE 3: Bm7 -> D/F# (Confidence, depth of experience, quiet leadership) ---
    const t3 = now + bar * 4;
    this.playSubWarmth(B1, t3, bar * 2, 0.28);
    this.playSubtlePad([Fsharp3, D4, A4, D5], t3, bar * 2 + 1.0, 0.24);
    this.playDelicateShimmer(Fsharp5, t3 + beat * 1.5, 4.5, 0.15);

    this.playSoftPiano(D4, t3 + beat * 0.5, 3.8, 0.28);
    this.playSoftPiano(Fsharp4, t3 + beat * 2.0, 3.8, 0.30);
    this.playSoftPiano(B4, t3 + beat * 3.5, 4.0, 0.35);
    this.playSoftPiano(A4, t3 + beat * 5.0, 3.8, 0.32);
    this.playSoftPiano(Fsharp4, t3 + beat * 6.5, 3.5, 0.28);

    // --- PHASE 4: Asus4 -> A (Smooth, serene resolution into next cycle) ---
    const t4 = now + bar * 6;
    this.playSubWarmth(A1, t4, bar * 2, 0.28);
    this.playSubtlePad([E3, A3, D4, E4], t4, bar * 2 + 1.0, 0.26);
    this.playDelicateShimmer(A5, t4 + beat * 1.0, 5.0, 0.18);

    this.playSoftPiano(E4, t4 + beat * 0.5, 3.8, 0.28);
    this.playSoftPiano(A4, t4 + beat * 2.0, 4.0, 0.32);
    this.playSoftPiano(Csharp5, t4 + beat * 3.5, 4.2, 0.35);
    this.playSoftPiano(E5, t4 + beat * 5.0, 4.5, 0.36);
    this.playSoftPiano(D5, t4 + beat * 6.5, 4.5, 0.32);

    // Schedule next cycle seamlessly with small anticipation
    this.loopTimer = setTimeout(() => {
      if (this.isRunning) {
        this.scheduleMovement();
      }
    }, totalDuration * 1000 - 200);
  }

  public start() {
    this.initContext();
    if (this.isRunning) return;
    this.isRunning = true;

    if (this.masterGain && this.ctx) {
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      // Gentle fade-in over 2.0s for tranquil luxury entry
      this.masterGain.gain.linearRampToValueAtTime(this.volume, this.ctx.currentTime + 2.0);
    }

    this.scheduleMovement();
  }

  public pause() {
    this.isRunning = false;
    if (this.loopTimer) {
      clearTimeout(this.loopTimer);
      this.loopTimer = null;
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      // Gentle fade-out over 1.2s
      this.masterGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);
    }
    this.scheduledNodes = [];
  }

  public toggle(): boolean {
    if (this.isRunning) {
      this.pause();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isRunning;
  }

  public setVolumeLevel(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx && this.isRunning) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public getVisualizerData(dataArray: Uint8Array) {
    if (this.analyser && this.isRunning) {
      this.analyser.getByteFrequencyData(dataArray as any);
    } else {
      dataArray.fill(0);
    }
  }
}

export const audioEngine = new LuxuryAmbientAudioEngine();
