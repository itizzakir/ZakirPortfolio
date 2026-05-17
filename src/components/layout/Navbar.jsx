import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { Command, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems } from "../../constants/portfolio";
import { ThemeToggle } from "../effects/ThemeToggle";
import { BrandLogo } from "../shared/BrandLogo";
import { Button } from "../ui/button";

function scrollToHref(href) {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Navbar({ theme, onToggleTheme, onOpenCommand }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-white/10 bg-[#05070f]/70 py-3 backdrop-blur-xl" : "py-5"
      }`}
    >
      <nav className="container flex items-center justify-between">
        <button
          type="button"
          onClick={() => scrollToHref("#home")}
          className="group flex items-center gap-3"
          aria-label="Go to home"
        >
          <BrandLogo />
          <span className="hidden leading-tight sm:block">
            <span className="block font-display text-sm font-bold text-white">Md Zakir Hussain</span>
            <span className="block text-xs text-cyan-100/60">Full Stack Java Developer</span>
          </span>
        </button>

        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-xl lg:flex">
          {navItems.map((item) => (
            <button
              key={item.href}
              type="button"
              onClick={() => scrollToHref(item.href)}
              className="rounded-full px-4 py-2 text-sm font-medium text-white/68 transition hover:bg-white/8 hover:text-white"
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="hidden h-10 w-10 sm:inline-flex"
            aria-label="Open command palette"
            title="Command palette (Ctrl+K)"
            onClick={onOpenCommand}
          >
            <Command className="h-4 w-4" />
          </Button>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />

          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <Button variant="secondary" size="icon" className="h-10 w-10 lg:hidden" aria-label="Open navigation">
                <Menu className="h-4 w-4" />
              </Button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <AnimatePresence>
                {open ? (
                  <Dialog.Overlay asChild forceMount>
                    <motion.div
                      className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  </Dialog.Overlay>
                ) : null}
              </AnimatePresence>
              <AnimatePresence>
                {open ? (
                  <Dialog.Content asChild forceMount>
                    <motion.div
                      className="fixed right-4 top-4 z-[91] w-[calc(100%-2rem)] max-w-sm rounded-[8px] border border-white/12 bg-[#07101f]/95 p-4 shadow-neon backdrop-blur-2xl"
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 24 }}
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <Dialog.Title className="font-display text-lg font-bold text-white">Navigation</Dialog.Title>
                        <Dialog.Description className="sr-only">
                          Choose a portfolio section to jump to on this page.
                        </Dialog.Description>
                        <Dialog.Close asChild>
                          <Button variant="ghost" size="icon">
                            <X className="h-4 w-4" />
                          </Button>
                        </Dialog.Close>
                      </div>
                      <div className="grid gap-2">
                        {navItems.map((item) => (
                          <button
                            key={item.href}
                            type="button"
                            onClick={() => {
                              scrollToHref(item.href);
                              setOpen(false);
                            }}
                            className="rounded-[8px] border border-white/8 bg-white/5 px-4 py-3 text-left text-sm font-semibold text-white/80"
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  </Dialog.Content>
                ) : null}
              </AnimatePresence>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </nav>
    </header>
  );
}
