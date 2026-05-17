import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BrandLogo } from "../shared/BrandLogo";

export function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading ? (
        <motion.div
          className="fixed inset-0 z-[120] grid place-items-center bg-[#03050b]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.65, ease: "easeInOut" } }}
        >
          <motion.div
            className="relative grid h-44 w-44 place-items-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 rounded-full border border-cyan-300/20 bg-cyan-300/[0.025] shadow-neon-soft" />
            <motion.div
              className="absolute inset-3 rounded-full border-t border-violet-300/80"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-8 rounded-full border-b border-fuchsia-300/80"
              animate={{ rotate: -360 }}
              transition={{ duration: 1.7, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="relative z-10"
              animate={{ y: [0, -4, 0], scale: [1, 1.04, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <BrandLogo className="brand-logo--loader" />
            </motion.div>
            <div className="absolute -bottom-9 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/70">
              Initializing interface
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
