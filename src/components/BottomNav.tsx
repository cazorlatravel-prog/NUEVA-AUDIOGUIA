"use client";

import { TabId } from "@/lib/types";

interface BottomNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const tabs: { id: TabId; icon: string; label: string }[] = [
  { id: "inicio", icon: "🏠", label: "Inicio" },
  { id: "que-ver", icon: "👁️", label: "Qué Ver" },
  { id: "rutas", icon: "🥾", label: "Rutas" },
  { id: "audioguia", icon: "🎧", label: "Audio" },
  { id: "actividades", icon: "🎯", label: "Actividades" },
  { id: "alojamientos", icon: "🏨", label: "Alojamiento" },
  { id: "eventos", icon: "🎪", label: "Eventos" },
  { id: "tiempo", icon: "⛅", label: "Tiempo" },
  { id: "info", icon: "ℹ️", label: "Info" },
];

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--color-primary)] pb-[env(safe-area-inset-bottom)]">
      <div className="flex overflow-x-auto scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center min-w-[4.5rem] flex-shrink-0 flex-1 py-2 px-1 transition-colors ${
              activeTab === tab.id
                ? "bg-[var(--color-primary-light)]"
                : "hover:bg-[var(--color-primary-light)]/50"
            }`}
          >
            <span className="text-xl leading-none">{tab.icon}</span>
            <span className="text-[0.625rem] text-white mt-1 whitespace-nowrap">
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}
