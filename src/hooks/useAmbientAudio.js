import { useCallback, useEffect, useRef, useState } from "react";

export function useAmbientAudio() {
  const [enabled, setEnabled] = useState(false);
  const audioRef = useRef(null);
  const stopTimerRef = useRef(null);

  const stop = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.gain.gain.linearRampToValueAtTime(0, audioRef.current.context.currentTime + 0.2);
    if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
    stopTimerRef.current = setTimeout(() => {
      stopTimerRef.current = null;
      audioRef.current?.oscillators.forEach((oscillator) => oscillator.stop());
      audioRef.current?.context.close();
      audioRef.current = null;
    }, 260);
    setEnabled(false);
  }, []);

  // Tear down any pending fade-out timer and the audio graph on unmount so
  // nothing fires against a closed context under StrictMode re-mounts.
  useEffect(
    () => () => {
      if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
      audioRef.current?.oscillators.forEach((oscillator) => oscillator.stop());
      audioRef.current?.context.close();
      audioRef.current = null;
    },
    [],
  );

  const start = useCallback(() => {
    if (audioRef.current) {
      stop();
      return;
    }

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const context = new AudioContext();
    const gain = context.createGain();
    gain.gain.setValueAtTime(0, context.currentTime);
    gain.connect(context.destination);

    const frequencies = [110, 164.81, 220];
    const oscillators = frequencies.map((frequency, index) => {
      const oscillator = context.createOscillator();
      oscillator.frequency.value = frequency;
      oscillator.type = index === 0 ? "sine" : "triangle";
      const filter = context.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 420 + index * 120;
      oscillator.connect(filter).connect(gain);
      oscillator.start();
      return oscillator;
    });

    gain.gain.linearRampToValueAtTime(0.026, context.currentTime + 0.35);
    audioRef.current = { context, gain, oscillators };
    setEnabled(true);
  }, [stop]);

  const toggleAudio = useCallback(() => {
    if (enabled) stop();
    else start();
  }, [enabled, start, stop]);

  return { audioEnabled: enabled, toggleAudio, stopAudio: stop };
}
