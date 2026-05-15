import { Mail, Music2, Phone, RadioTower } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { personal } from "../../constants/portfolio";
import { Button } from "../ui/button";

const dockItems = [
  { label: "GitHub", href: personal.github, icon: FaGithub },
  { label: "LinkedIn", href: personal.linkedin, icon: FaLinkedin },
  { label: "Email", href: `mailto:${personal.email}`, icon: Mail },
  { label: "Phone", href: `tel:${personal.phone.replaceAll("-", "")}`, icon: Phone },
];

export function FloatingDock({ audioEnabled, onToggleAudio }) {
  return (
    <div className="fixed bottom-5 left-1/2 z-50 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-white/12 bg-[#07101f]/72 px-2 py-2 shadow-neon-soft backdrop-blur-xl md:flex">
      {dockItems.map((item) => {
        const Icon = item.icon;
        return (
          <Button key={item.label} asChild variant="ghost" size="icon" className="h-10 w-10">
            <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" aria-label={item.label} title={item.label}>
              <Icon className="h-4 w-4" />
            </a>
          </Button>
        );
      })}
      <div className="mx-1 h-6 w-px bg-white/10" aria-hidden="true" />
      <Button
        type="button"
        onClick={onToggleAudio}
        variant={audioEnabled ? "default" : "ghost"}
        size="icon"
        className="h-10 w-10"
        aria-label="Toggle background ambience"
        title="Toggle background ambience (M)"
      >
        {audioEnabled ? <RadioTower className="h-4 w-4" /> : <Music2 className="h-4 w-4" />}
      </Button>
    </div>
  );
}
