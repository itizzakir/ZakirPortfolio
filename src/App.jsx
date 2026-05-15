import { useCallback, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { commandActions } from "./constants/portfolio";
import { useAmbientAudio } from "./hooks/useAmbientAudio";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";
import { useLenis } from "./hooks/useLenis";
import { useThemeMode } from "./hooks/useThemeMode";
import { CommandPalette } from "./components/effects/CommandPalette";
import { CustomCursor } from "./components/effects/CustomCursor";
import { NoiseOverlay } from "./components/effects/NoiseOverlay";
import { PageLoader } from "./components/effects/PageLoader";
import { ScrollProgress } from "./components/effects/ScrollProgress";
import { Spotlight } from "./components/effects/Spotlight";
import { FloatingDock } from "./components/layout/FloatingDock";
import { Footer } from "./components/layout/Footer";
import { Navbar } from "./components/layout/Navbar";
import { Seo } from "./components/seo/Seo";
import { ErrorBoundary } from "./components/shared/ErrorBoundary";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";

function App() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [easterEgg, setEasterEgg] = useState(false);
  const { theme, toggleTheme } = useThemeMode();
  const { audioEnabled, toggleAudio, stopAudio } = useAmbientAudio();

  useLenis();

  const openCommandPalette = useCallback(() => setCommandOpen(true), []);

  useKeyboardShortcuts({
    openCommandPalette,
    toggleTheme,
    toggleAudio,
  });

  useEffect(() => {
    const sequence = "zakir";
    let buffer = "";

    const onKeyDown = (event) => {
      buffer = `${buffer}${event.key.toLowerCase()}`.slice(-sequence.length);
      if (buffer === sequence) {
        setEasterEgg(true);
        setTimeout(() => setEasterEgg(false), 2600);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      stopAudio();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [stopAudio]);

  return (
    <>
      <Seo />
      <PageLoader />
      <NoiseOverlay />
      <ScrollProgress />
      <Spotlight />
      <CustomCursor />
      <ErrorBoundary>
        <Navbar theme={theme} onToggleTheme={toggleTheme} onOpenCommand={openCommandPalette} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <FloatingDock audioEnabled={audioEnabled} onToggleAudio={toggleAudio} />
        <CommandPalette
          actions={commandActions}
          open={commandOpen}
          onOpenChange={setCommandOpen}
          onToggleTheme={toggleTheme}
          onToggleAudio={toggleAudio}
        />
      </ErrorBoundary>
      {easterEgg ? (
        <div className="fixed right-4 top-24 z-[115] rounded-[8px] border border-cyan-300/30 bg-cyan-300/12 px-4 py-3 text-sm font-semibold text-cyan-50 shadow-neon backdrop-blur-xl">
          Hidden mode unlocked: build boldly.
        </div>
      ) : null}
    </>
  );
}

export default App;
