"use client";

import { TabId } from "@/lib/types";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)] text-white pt-[env(safe-area-inset-top)]">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex flex-col">
          <span className="text-lg font-bold leading-tight tracking-wide">
            GUÍA CAZORLA
          </span>
          <span className="text-xs text-white/80">Parque Natural</span>
        </div>
        <span className="rounded-full bg-[var(--color-primary-light)] px-2.5 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wider">
          Oficial
        </span>
      </div>
    </header>
  );
}
