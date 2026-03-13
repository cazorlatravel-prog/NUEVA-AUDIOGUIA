"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", icon: "📊", href: "/admin" },
  { label: "Puntos de Interés", icon: "👁️", href: "/admin/pois" },
  { label: "Rutas", icon: "🥾", href: "/admin/rutas" },
  { label: "Audioguías", icon: "🎧", href: "/admin/audioguias" },
  { label: "Actividades", icon: "🎯", href: "/admin/actividades" },
  { label: "Alojamientos", icon: "🏨", href: "/admin/alojamientos" },
  { label: "Eventos", icon: "🎪", href: "/admin/eventos" },
  { label: "Servicios", icon: "ℹ️", href: "/admin/servicios" },
  { label: "Empresas", icon: "🏢", href: "/admin/empresas" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const sidebar = (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-xl font-bold text-white">🏔️ GUÍA CAZORLA</h1>
        <p className="text-sm text-gray-400 mt-1">Admin</p>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
              isActive(item.href)
                ? "bg-[#1b6b3a] text-white font-semibold"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button className="flex items-center gap-3 px-4 py-2 w-full text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors">
          <span className="text-lg">🚪</span>
          <span>Cerrar sesión</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 bg-gray-900 fixed inset-y-0 left-0 z-30">
        {sidebar}
      </aside>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-gray-900 z-50 transform transition-transform lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebar}
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        {/* Top bar for mobile */}
        <header className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4 sticky top-0 z-20">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-700 hover:text-gray-900"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <span className="font-semibold text-gray-800">
            🏔️ GUÍA CAZORLA - Admin
          </span>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
