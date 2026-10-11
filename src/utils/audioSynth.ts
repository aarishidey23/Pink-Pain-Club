/**
 * Web Audio API synthesizer for Pink Noise, Warm Rain, and 432Hz Healing Frequencies.
 * Completely self-contained, no external audio file dependencies.
 */

class AmbientAudioEngine {
  private ctx: AudioContext | null = null;
  private noiseNode: AudioNode | null = null;
  private toneNode: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private rainInterval: number | null = null;
  private isPlaying: boolean = false;
  private currentMode: 'pink-noise' | 'warm-rain' | '432hz' = 'pink-noise';

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public play(mode: 'pink-noise' | 'warm-rain' | '432hz' = 'pink-noise', volume: number = 0.25) {
    this.stop();
    this.initContext();
    if (!this.ctx) return;

    this.currentMode = mode;
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(volume, this.ctx.currentTime);
    this.gainNode.connect(this.ctx.destination);

    if (mode === 'pink-noise') {
      this.playPinkNoise();
    } else if (mode === 'warm-rain') {
      this.playWarmRain();
    } else if (mode === '432hz') {
      this.play432HzTone();
    }

    this.isPlaying = true;
  }

  private playPinkNoise() {
    if (!this.ctx || !this.gainNode) return;
    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.08;
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Soft low-pass filter to make it cozy and warm like deep pink noise
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(650, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(this.gainNode);
    whiteNoise.start();
    this.noiseNode = whiteNoise;
  }

  private playWarmRain() {
    if (!this.ctx || !this.gainNode) return;
    // Gentle pink bed
    this.playPinkNoise();

    // Random soft droplets
    const triggerDrop = () => {
      if (!this.ctx || !this.gainNode || !this.isPlaying) return;
      try {
        const osc = this.ctx.createOscillator();
        const dropGain = this.ctx.createGain();
        const dropFilter = this.ctx.createBiquadFilter();

        const freq = 400 + Math.random() * 600;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.5, this.ctx.currentTime + 0.08);

        dropFilter.type = 'bandpass';
        dropFilter.frequency.value = 800;

        dropGain.gain.setValueAtTime(0.04 + Math.random() * 0.05, this.ctx.currentTime);
        dropGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);

        osc.connect(dropFilter);
        dropFilter.connect(dropGain);
        dropGain.connect(this.gainNode);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.12);
      } catch {
        // Safe catch
      }
    };

    this.rainInterval = window.setInterval(triggerDrop, 180);
  }

  private play432HzTone() {
    if (!this.ctx || !this.gainNode) return;
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(432, this.ctx.currentTime);

    // Warm second harmonic for depth
    const subOsc = this.ctx.createOscillator();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(216, this.ctx.currentTime);

    const subGain = this.ctx.createGain();
    subGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    subOsc.connect(subGain);
    subGain.connect(this.gainNode);

    osc.connect(this.gainNode);
    osc.start();
    subOsc.start();
    this.toneNode = osc;
  }

  public setVolume(volume: number) {
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(Math.max(0, Math.min(1, volume)), this.ctx.currentTime);
    }
  }

  public stop() {
    if (this.rainInterval) {
      clearInterval(this.rainInterval);
      this.rainInterval = null;
    }
    if (this.noiseNode) {
      try {
        (this.noiseNode as AudioBufferSourceNode).stop();
      } catch {
        // Ignore if already stopped
      }
      this.noiseNode = null;
    }
    if (this.toneNode) {
      try {
        this.toneNode.stop();
      } catch {
        // Ignore
      }
      this.toneNode = null;
    }
    this.isPlaying = false;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getCurrentMode(): string {
    return this.currentMode;
  }
}

export const ambientSound = new AmbientAudioEngine();
