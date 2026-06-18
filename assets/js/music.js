/* =====================================================================
   Ambient music — fully generative via Web Audio API.
   No external files, no licensing, loops forever, stays calm.
   A slow four-chord pad progression with gentle filter movement,
   soft reverb, and a faint "air" layer. Starts only on user gesture.
   ===================================================================== */
(function () {
  "use strict";

  const NOTE = (n) => 440 * Math.pow(2, (n - 69) / 12); // MIDI -> Hz

  // Four warm, open voicings (MIDI numbers). Calm, slightly wistful.
  // Amaj9 -> F#m7 -> Dmaj7 -> E6/9  (transposed low)
  const PROG = [
    [45, 57, 61, 64, 71], // A2 A3 C#4 E4 B4
    [42, 54, 57, 64, 68], // F#2 ...
    [38, 50, 57, 62, 66], // D2 ...
    [40, 52, 59, 64, 68], // E2 ...
  ];

  const CHORD_LEN = 8.5;   // seconds per chord
  const FADE = 2.2;        // chord crossfade

  class Ambient {
    constructor() {
      this.ctx = null;
      this.master = null;
      this.playing = false;
      this.timer = null;
      this.step = 0;
    }

    _build() {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.ctx = ctx;

      // master chain: master -> soft limiter (compressor) -> destination
      const master = ctx.createGain();
      master.gain.value = 0;

      const comp = ctx.createDynamicsCompressor();
      comp.threshold.value = -18; comp.knee.value = 24; comp.ratio.value = 3;
      comp.attack.value = 0.02; comp.release.value = 0.3;

      master.connect(comp).connect(ctx.destination);
      this.master = master;

      // reverb (generated impulse) on a parallel send
      const conv = ctx.createConvolver();
      conv.buffer = this._impulse(3.6, 2.6);
      const wet = ctx.createGain(); wet.gain.value = 0.55;
      conv.connect(wet).connect(master);
      this.reverb = conv;

      // dry bus
      const dry = ctx.createGain(); dry.gain.value = 0.7;
      dry.connect(master);
      this.dry = dry;

      // faint "air" — filtered noise pad
      this._air();
    }

    _impulse(seconds, decay) {
      const ctx = this.ctx, rate = ctx.sampleRate;
      const len = Math.floor(rate * seconds);
      const buf = ctx.createBuffer(2, len, rate);
      for (let ch = 0; ch < 2; ch++) {
        const d = buf.getChannelData(ch);
        for (let i = 0; i < len; i++) {
          d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
        }
      }
      return buf;
    }

    _air() {
      const ctx = this.ctx;
      const len = ctx.sampleRate * 4;
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      const src = ctx.createBufferSource(); src.buffer = buf; src.loop = true;
      const bp = ctx.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 1200; bp.Q.value = 0.6;
      const g = ctx.createGain(); g.gain.value = 0.018;
      // slow swell
      const lfo = ctx.createOscillator(); lfo.frequency.value = 0.05;
      const lfoG = ctx.createGain(); lfoG.gain.value = 0.012;
      lfo.connect(lfoG).connect(g.gain);
      src.connect(bp).connect(g);
      g.connect(this.reverb); g.connect(this.dry);
      src.start(); lfo.start();
    }

    // one soft voice (detuned sine+triangle through a moving lowpass)
    _voice(freq, t, dur, gain) {
      const ctx = this.ctx;
      const vGain = ctx.createGain();
      vGain.gain.setValueAtTime(0, t);
      vGain.gain.linearRampToValueAtTime(gain, t + FADE);
      vGain.gain.setValueAtTime(gain, t + dur - FADE);
      vGain.gain.linearRampToValueAtTime(0, t + dur);

      const lp = ctx.createBiquadFilter();
      lp.type = "lowpass"; lp.frequency.value = 900; lp.Q.value = 0.5;
      // gentle filter drift
      const fl = ctx.createOscillator(); fl.frequency.value = 0.07 + Math.random() * 0.05;
      const flG = ctx.createGain(); flG.gain.value = 380;
      fl.connect(flG).connect(lp.frequency);
      fl.start(t); fl.stop(t + dur + 0.1);

      [[ "sine", 0 ], [ "triangle", 0.18 ], [ "sine", -3 ]].forEach(([type, detune], i) => {
        const o = ctx.createOscillator();
        o.type = type; o.frequency.value = freq; o.detune.value = detune * (i ? 1 : 0) + (Math.random() * 4 - 2);
        const og = ctx.createGain(); og.gain.value = i === 1 ? 0.35 : 0.6;
        o.connect(og).connect(lp);
        o.start(t); o.stop(t + dur + 0.1);
      });

      lp.connect(vGain);
      vGain.connect(this.dry); vGain.connect(this.reverb);
    }

    _scheduleChord() {
      const chord = PROG[this.step % PROG.length];
      const t = this.ctx.currentTime + 0.05;
      chord.forEach((m, i) => {
        // bass a touch louder, upper voices softer
        const g = i === 0 ? 0.16 : 0.085 - i * 0.006;
        this._voice(NOTE(m), t, CHORD_LEN + FADE, Math.max(0.04, g));
      });
      this.step++;
    }

    async start() {
      if (this.playing) return;
      if (!this.ctx) this._build();
      if (this.ctx.state === "suspended") await this.ctx.resume();
      this.playing = true;
      this.master.gain.cancelScheduledValues(this.ctx.currentTime);
      this.master.gain.setValueAtTime(this.master.gain.value, this.ctx.currentTime);
      this.master.gain.linearRampToValueAtTime(0.9, this.ctx.currentTime + 2.5);

      this._scheduleChord();
      this.timer = setInterval(() => this._scheduleChord(), CHORD_LEN * 1000);
    }

    stop() {
      if (!this.playing || !this.ctx) return;
      this.playing = false;
      clearInterval(this.timer);
      const now = this.ctx.currentTime;
      this.master.gain.cancelScheduledValues(now);
      this.master.gain.setValueAtTime(this.master.gain.value, now);
      this.master.gain.linearRampToValueAtTime(0, now + 1.4);
    }

    toggle() { this.playing ? this.stop() : this.start(); return this.playing; }
  }

  window.AmbientMusic = new Ambient();
})();
