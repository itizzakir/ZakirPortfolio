import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { personal } from "../../constants/portfolio";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-10">
      <div className="absolute left-0 top-0 h-px w-full bg-neon-line opacity-70" aria-hidden="true" />
      <div className="container flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
        <p className="text-sm text-white/60">Designed & Developed by Md Zakir Hussain</p>
        <div className="flex items-center gap-3">
          {[
            { href: personal.github, label: "GitHub", icon: FaGithub },
            { href: personal.linkedin, label: "LinkedIn", icon: FaLinkedin },
            { href: `mailto:${personal.email}`, label: "Email", icon: Mail },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-cyan-200/50 hover:text-cyan-100 hover:shadow-neon-soft"
                aria-label={item.label}
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
