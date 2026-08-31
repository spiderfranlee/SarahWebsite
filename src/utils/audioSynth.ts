// Gentle Web Audio API synthesizer for classical aria preview playback
let audioCtx: AudioContext | null = null;
let currentOscillators: OscillatorNode[] = [];
let intervalId: number | null = null;

export function playAriaAudio(trackName: string) {
  stopAriaAudio();

  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    audioCtx = new AudioContextClass();
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    // Melodic frequencies for classical arias (Mozart/Puccini inspired chords)
    const chords = [
      [261.63, 329.63, 392.0, 523.25], // C Major
      [220.0, 261.63, 329.63, 440.0],  // A Minor
      [174.61, 220.0, 261.63, 349.23], // F Major
      [196.0, 246.94, 293.66, 392.0]   // G Major
    ];

    let chordIndex = 0;

    const playChord = () => {
      if (!audioCtx) return;
      const now = audioCtx.currentTime;
      const notes = chords[chordIndex % chords.length];
      chordIndex++;

      notes.forEach((freq, i) => {
        if (!audioCtx) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        // Warm sine / triangle wave blending classical strings & harp tone
        osc.type = i === 3 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq, now + i * 0.15);

        // Soft attack and gentle long decay
        gain.gain.setValueAtTime(0.001, now + i * 0.15);
        gain.gain.exponentialRampToValueAtTime(0.04, now + i * 0.15 + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.15 + 2.5);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(now + i * 0.15);
        osc.stop(now + i * 0.15 + 2.6);
        currentOscillators.push(osc);
      });
    };

    playChord();
    intervalId = window.setInterval(playChord, 2600);
  } catch (err) {
    console.warn("Audio synthesis not available in this browser context:", err);
  }
}

export function stopAriaAudio() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  currentOscillators.forEach((osc) => {
    try {
      osc.stop();
      osc.disconnect();
    } catch {}
  });
  currentOscillators = [];
  if (audioCtx) {
    try {
      audioCtx.close();
    } catch {}
    audioCtx = null;
  }
}
