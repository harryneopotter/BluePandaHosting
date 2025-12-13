"use client";

import React from "react";
import { motion } from "framer-motion";

export type LuminousCardProps = Omit<React.ComponentProps<typeof motion.div>, "children"> & {
  children: React.ReactNode;
  className?: string;
};

export const luminousCardBase =
  "group relative overflow-hidden rounded-2xl border border-cyan-400/25 bg-slate-950/60 backdrop-blur-xl shadow-[0_10px_40px_-26px_rgba(56,189,248,0.45)] touch-manipulation";
export const luminousCardHover =
  "transition-[transform,box-shadow,opacity,filter] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:shadow-[0_25px_80px_-20px_rgba(56,189,248,0.55)] hover:brightness-[1.02] focus-visible:-translate-y-1.5 focus-visible:shadow-[0_25px_80px_-20px_rgba(56,189,248,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 active:translate-y-0 active:shadow-[0_5px_20px_-10px_rgba(56,189,248,0.4)] active:brightness-100";
export const luminousCardClassName = `${luminousCardBase} ${luminousCardHover}`;

export function LuminousCard({ children, className = "", ...rest }: LuminousCardProps) {
  return (
    <motion.div
      className={`${luminousCardClassName} ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.5, 
        ease: "easeOut",
        scale: { type: "spring", stiffness: 300, damping: 20 }
      }}
      whileTap={{ scale: 0.96 }}
      {...rest}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.22),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(236,72,153,0.2),transparent_30%)] opacity-80 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/12 via-slate-900/60 to-fuchsia-500/12"
      />
      <div aria-hidden className="absolute inset-px rounded-[18px] border border-white/5 opacity-70" />
      <div aria-hidden className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent opacity-80" />
      <div aria-hidden className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-cyan-400/30 via-transparent to-transparent opacity-60" />
      <div aria-hidden className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-transparent to-fuchsia-400/30 opacity-60" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition duration-200 ease-out group-active:opacity-90 group-active:ring-3 group-active:ring-cyan-200/80 group-active:ring-offset-2 group-active:ring-offset-slate-950/80"
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

export default LuminousCard;
