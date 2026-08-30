(function () {
  "use strict";

  const progression = [
    [45, 52, 57, 61, 64],
    [42, 49, 54, 57, 64],
    [38, 45, 50, 54, 57],
    [40, 47, 52, 56, 61],
  ];
  const chordLength = 8.5;

  function frequency(midi) {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  class AmbientMusic {
    constructor() {
      this.context = null;
      this.master = null;
      this.filter = null;
      this.playing = false;
      this.timer = null;
      this.step = 0;
    }

    build() {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return false;

      this.context = new AudioContext();
      this.master = this.context.createGain();
      this.master.gain.value = 0;

      this.filter = this.context.createBiquadFilter();
      this.filter.type = "lowpass";
      this.filter.frequency.value = 1050;
      this.filter.Q.value = 0.45;

      const compressor = this.context.createDynamicsCompressor();
      compressor.threshold.value = -24;
      compressor.knee.value = 24;
      compressor.ratio.value = 3;
      compressor.attack.value = 0.04;
      compressor.release.value = 0.5;

      this.filter.connect(this.master);
      this.master.connect(compressor);
      compressor.connect(this.context.destination);
      return true;
    }

    scheduleChord() {
      if (!this.context || !this.filter || !this.playing) return;

      const now = this.context.currentTime + 0.04;
      const notes = progression[this.step % progression.length];
      const duration = chordLength + 2.2;

      notes.forEach((midi, index) => {
        const oscillator = this.context.createOscillator();
        const voice = this.context.createGain();
        const level = index === 0 ? 0.055 : 0.026;

        oscillator.type = index % 2 === 0 ? "sine" : "triangle";
        oscillator.frequency.value = frequency(midi);
        oscillator.detune.value = (Math.random() - 0.5) * 4;

        voice.gain.setValueAtTime(0, now);
        voice.gain.linearRampToValueAtTime(level, now + 1.8);
        voice.gain.setValueAtTime(level, now + duration - 2.1);
        voice.gain.linearRampToValueAtTime(0, now + duration);

        oscillator.connect(voice);
        voice.connect(this.filter);
        oscillator.start(now);
        oscillator.stop(now + duration + 0.1);
      });

      this.step += 1;
    }

    async start() {
      if (this.playing) return true;
      if (!this.context && !this.build()) return false;

      if (this.context.state === "suspended") {
        await this.context.resume();
      }

      this.playing = true;
      const now = this.context.currentTime;
      this.master.gain.cancelScheduledValues(now);
      this.master.gain.setValueAtTime(this.master.gain.value, now);
      this.master.gain.linearRampToValueAtTime(0.58, now + 1.4);
      this.scheduleChord();
      this.timer = window.setInterval(() => this.scheduleChord(), chordLength * 1000);
      return true;
    }

    stop() {
      if (!this.playing || !this.context) return false;

      this.playing = false;
      window.clearInterval(this.timer);
      this.timer = null;

      const now = this.context.currentTime;
      this.master.gain.cancelScheduledValues(now);
      this.master.gain.setValueAtTime(this.master.gain.value, now);
      this.master.gain.linearRampToValueAtTime(0, now + 0.9);
      return false;
    }

    async toggle() {
      return this.playing ? this.stop() : this.start();
    }
  }

  window.AmbientMusic = new AmbientMusic();
})();
