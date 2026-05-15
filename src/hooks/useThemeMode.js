import { useEffect, useState } from "react";

const themes = ["void", "spectrum"];

export function useThemeMode() {
  const [theme, setTheme] = useState(() => localStorage.getItem("portfolio-theme") || "void");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle("dark", theme === "void");
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => themes[(themes.indexOf(current) + 1) % themes.length]);
  };

  return { theme, toggleTheme };
}
