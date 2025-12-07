import React from "react";

export type LuminousCardProps = {
  children: React.ReactNode;
  className?: string;
};

export const luminousCardBase =
  "group relative overflow-hidden rounded-2xl border border-cyan-400/25 bg-slate-950/60 backdrop-blur-xl shadow-[0_10px_40px_-26px_rgba(56,189,248,0.45)]";
export const luminousCardHover =
  "transition-[transform,box-shadow,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_20px_70px_-30px_rgba(56,189,248,0.6)] focus-visible:-translate-y-1 focus-visible:shadow-[0_20px_70px_-30px_rgba(56,189,248,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60";
export const luminousCardClassName = `${luminousCardBase} ${luminousCardHover}`;

export function LuminousCard({ children, className = "" }: LuminousCardProps) {
  return (
    <div className={`${luminousCardClassName} ${className}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.18),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(236,72,153,0.16),transparent_30%)] opacity-70 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/12 via-slate-900/60 to-fuchsia-500/12"
      />
      <div aria-hidden className="absolute inset-px rounded-[18px] border border-white/5 opacity-60" />
      <div aria-hidden className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent opacity-80" />
      <div aria-hidden className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-cyan-400/30 via-transparent to-transparent opacity-60" />
      <div aria-hidden className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-transparent to-fuchsia-400/30 opacity-60" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default LuminousCard;
