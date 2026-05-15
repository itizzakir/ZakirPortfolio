import { MoonStar, Palette } from "lucide-react";
import { Button } from "../ui/button";

export function ThemeToggle({ theme, onToggle }) {
  return (
    <Button
      type="button"
      variant="secondary"
      size="icon"
      onClick={onToggle}
      aria-label="Toggle visual theme"
      title="Toggle visual theme (T)"
      className="h-10 w-10"
    >
      {theme === "void" ? <Palette className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
    </Button>
  );
}
