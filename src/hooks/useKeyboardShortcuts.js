import { useEffect } from "react";

export function useKeyboardShortcuts({ openCommandPalette, toggleTheme, toggleAudio }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      const key = event.key.toLowerCase();

      if ((event.ctrlKey || event.metaKey) && key === "k") {
        event.preventDefault();
        openCommandPalette();
      }

      if (!event.ctrlKey && !event.metaKey && !event.altKey && key === "t") {
        toggleTheme();
      }

      if (!event.ctrlKey && !event.metaKey && !event.altKey && key === "m") {
        toggleAudio();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openCommandPalette, toggleAudio, toggleTheme]);
}
