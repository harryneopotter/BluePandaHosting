"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";

type Props = {
  activeKey: string | null;
  onClose: () => void;
  onMenuEnter?: () => void;
  onMenuLeave?: () => void;
  render: (key: string | null) => React.ReactNode;
};

export default function MegaMenuOverlay({ activeKey, onClose, onMenuEnter, onMenuLeave, render }: Props) {
  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {activeKey && (
        <motion.div
          className="fixed inset-0 z-[150] flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={onMenuEnter}
          onMouseLeave={onMenuLeave}
        >
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative z-[151] mx-auto mt-16 w-full max-w-6xl"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div id={`mega-${activeKey ?? ''}`} role="menu" aria-label={`${activeKey ?? 'menu'} mega menu`} className="mx-6 rounded-2xl border border-cyan-400/20 bg-gradient-to-b from-slate-900/95 to-slate-950/98 backdrop-blur-xl shadow-2xl">
              <div className="p-6">
                {render(activeKey)}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
