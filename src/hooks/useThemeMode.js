import { useCallback, useEffect, useState } from "react";

const storageKey = "portfolio-theme";
const themes = ["dark", "light"];
const themeColors = {
  dark: "#05070f",
  light: "#f6f9ff",
};

function normalizeTheme(value) {
  if (value === "void") return "dark";
  if (value === "spectrum") return "light";
  return themes.includes(value) ? value : "dark";
}

export function useThemeMode() {
  const [theme, setTheme] = useState(() => normalizeTheme(localStorage.getItem(storageKey)));

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", themeColors[theme]);
    localStorage.setItem(storageKey, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (normalizeTheme(current) === "dark" ? "light" : "dark"));
  }, []);

  return { theme, toggleTheme };
}
