"use client";

import { useState } from "react";
import { TabId } from "@/lib/types";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import HomeSection from "@/components/sections/HomeSection";
import QueVerSection from "@/components/sections/QueVerSection";
import RutasSection from "@/components/sections/RutasSection";
import AudioguiaSection from "@/components/sections/AudioguiaSection";
import ActividadesSection from "@/components/sections/ActividadesSection";
import AlojamientosSection from "@/components/sections/AlojamientosSection";
import EventosSection from "@/components/sections/EventosSection";
import TiempoSection from "@/components/sections/TiempoSection";
import InfoSection from "@/components/sections/InfoSection";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("inicio");

  const handleNavigate = (tab: string) => {
    setActiveTab(tab as TabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      <main className="flex-1 pb-20">
        {activeTab === "inicio" && <HomeSection onNavigate={handleNavigate} />}
        {activeTab === "que-ver" && <QueVerSection />}
        {activeTab === "rutas" && <RutasSection />}
        {activeTab === "audioguia" && <AudioguiaSection />}
        {activeTab === "actividades" && <ActividadesSection />}
        {activeTab === "alojamientos" && <AlojamientosSection />}
        {activeTab === "eventos" && <EventosSection />}
        {activeTab === "tiempo" && <TiempoSection />}
        {activeTab === "info" && <InfoSection />}
      </main>
      <BottomNav activeTab={activeTab} onTabChange={handleNavigate} />
    </div>
  );
}
