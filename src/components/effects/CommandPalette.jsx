import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { Command, ExternalLink, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "../ui/button";

function runAction(action, onOpenChange) {
  if (action.external) {
    window.open(action.href, "_blank", "noopener,noreferrer");
  } else {
    const target = document.querySelector(action.href);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  onOpenChange(false);
}

export function CommandPalette({ actions, open, onOpenChange, onToggleTheme, onToggleAudio }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return actions;
    return actions.filter((action) => `${action.label} ${action.hint}`.toLowerCase().includes(normalized));
  }, [actions, query]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <AnimatePresence>
          {open ? (
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-[110] bg-black/70 backdrop-blur-xl"
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
                className="fixed left-1/2 top-20 z-[111] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 overflow-hidden rounded-[8px] border border-white/12 bg-[#07101f]/95 shadow-neon backdrop-blur-2xl"
                initial={{ opacity: 0, y: -18, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -18, scale: 0.96 }}
                transition={{ duration: 0.22 }}
              >
                <Dialog.Title className="sr-only">Command palette</Dialog.Title>
                <Dialog.Description className="sr-only">
                  Search portfolio actions, navigate sections, and toggle interface settings.
                </Dialog.Description>
                <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
                  <Search className="h-4 w-4 text-cyan-200" />
                  <input
                    autoFocus
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search actions..."
                    className="h-10 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/35"
                  />
                  <Dialog.Close asChild>
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <X className="h-4 w-4" />
                    </Button>
                  </Dialog.Close>
                </div>

                <div className="max-h-[55vh] overflow-y-auto p-3">
                  {filtered.map((action) => (
                    <button
                      key={action.label}
                      type="button"
                      onClick={() => runAction(action, onOpenChange)}
                      className="flex min-h-14 w-full items-center justify-between rounded-[8px] px-3 text-left text-sm text-white/85 transition hover:bg-white/8"
                    >
                      <span className="inline-flex items-center gap-3">
                        <Command className="h-4 w-4 text-cyan-200" />
                        <span>{action.label}</span>
                      </span>
                      <span className="inline-flex items-center gap-2 text-xs text-white/45">
                        {action.hint}
                        {action.external ? <ExternalLink className="h-3.5 w-3.5" /> : null}
                      </span>
                    </button>
                  ))}

                  <div className="mt-2 grid grid-cols-1 gap-2 border-t border-white/10 pt-3 sm:grid-cols-2">
                    <Button type="button" variant="secondary" onClick={onToggleTheme}>
                      Toggle theme
                    </Button>
                    <Button type="button" variant="secondary" onClick={onToggleAudio}>
                      Toggle ambient audio
                    </Button>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          ) : null}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
