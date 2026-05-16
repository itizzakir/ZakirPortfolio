import { MoonStar, Sun } from "lucide-react";
import { Button } from "../ui/button";

export function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === "dark";

  return (
    <Button
      type="button"
      variant="secondary"
      size="icon"
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-pressed={isDark}
      title={`Switch to ${isDark ? "light" : "dark"} mode (T)`}
      className="h-10 w-10"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
    </Button>
  );
}
