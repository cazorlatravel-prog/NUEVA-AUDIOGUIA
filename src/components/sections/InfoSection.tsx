"use client";

import { useState } from "react";
import { services } from "@/data";
import { Service } from "@/lib/types";

const categoryConfig: Record<string, { emoji: string; label: string; keys: string[] }> = {
  salud: { emoji: "🏥", label: "Salud", keys: ["farmacia", "salud"] },
  seguridad: { emoji: "🚔", label: "Seguridad", keys: ["emergencia"] },
  transporte: { emoji: "🚗", label: "Transporte", keys: ["transporte", "gasolinera", "parking"] },
  servicios: { emoji: "🏦", label: "Servicios", keys: ["cajero", "wifi", "administracion"] },
  turismo: { emoji: "ℹ️", label: "Oficinas de Turismo", keys: ["oficina-turismo"] },
};

export default function InfoSection() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ salud: true });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const getServicesForCategory = (keys: string[]): Service[] =>
    services.filter((s) => keys.includes(s.category));

  const phonesServices = services.filter((s) => s.phone);

  return (
    <section className="px-4 py-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--color-primary-dark)" }}>
        Información de Interés
      </h2>

      <a
        href="tel:112"
        className="block mb-6 rounded-xl p-4 text-center text-white font-bold text-lg"
        style={{ background: "var(--color-danger)" }}
      >
        🚨 EMERGENCIAS: 112
        <span className="block text-sm font-normal opacity-90">Toca para llamar</span>
      </a>

      <div className="space-y-3 mb-8">
        {Object.entries(categoryConfig).map(([key, config]) => {
          const items = getServicesForCategory(config.keys);
          if (items.length === 0) return null;
          const isOpen = openSections[key] || false;

          return (
            <div key={key} className="rounded-xl overflow-hidden bg-white shadow-sm">
              <button
                onClick={() => toggleSection(key)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{config.emoji}</span>
                  <span className="font-semibold text-lg">{config.label}</span>
                  <span className="text-xs bg-gray-200 text-gray-600 rounded-full px-2 py-0.5">
                    {items.length}
                  </span>
                </div>
                <span className={`text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}>
                  ▼
                </span>
              </button>

              {isOpen && (
                <div className="border-t divide-y">
                  {items.map((service) => (
                    <div key={service.id} className="p-4">
                      <h4 className="font-semibold">{service.name}</h4>
                      <p className="text-sm text-gray-500">{service.address}</p>
                      {service.phone && (
                        <a
                          href={`tel:${service.phone}`}
                          className="inline-flex items-center gap-1 mt-1 text-sm font-medium"
                          style={{ color: "var(--color-primary)" }}
                        >
                          📞 {service.phone}
                        </a>
                      )}
                      {service.openingHours && (
                        <p className="text-xs text-gray-400 mt-1">🕐 {service.openingHours}</p>
                      )}
                      {service.notes && (
                        <p className="text-xs text-gray-400 mt-1">{service.notes}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <h3 className="text-lg font-bold mb-3" style={{ color: "var(--color-primary-dark)" }}>
        📞 Teléfonos Útiles
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
        {phonesServices.map((s) => (
          <a
            key={s.id}
            href={`tel:${s.phone}`}
            className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm hover:shadow transition"
          >
            <span className="text-sm font-medium truncate">{s.name}</span>
            <span className="text-sm font-bold whitespace-nowrap ml-2" style={{ color: "var(--color-primary)" }}>
              {s.phone}
            </span>
          </a>
        ))}
      </div>

      <h3 className="text-lg font-bold mb-3" style={{ color: "var(--color-primary-dark)" }}>
        📋 Información Práctica
      </h3>
      <div className="space-y-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h4 className="font-semibold mb-1">📍 Cómo llegar a Cazorla</h4>
          <p className="text-sm text-gray-600">
            Cazorla se encuentra a 100 km de Jaén capital. Se accede por la A-315 desde Úbeda o por la A-319 desde Villanueva del Arzobispo. El aeropuerto más cercano es Granada (160 km).
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h4 className="font-semibold mb-1">🅿️ Aparcamientos</h4>
          <p className="text-sm text-gray-600">
            Aparcamiento gratuito en la zona baja del pueblo (Paseo del Santo Cristo). En temporada alta se habilitan aparcamientos adicionales con servicio de lanzadera al centro.
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h4 className="font-semibold mb-1">🏥 Farmacia de Guardia</h4>
          <p className="text-sm text-gray-600">
            Consulta la farmacia de guardia en el tablón de la puerta de cualquier farmacia de Cazorla o llama al 953 720 000 (Centro de Salud).
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h4 className="font-semibold mb-1">📱 Cobertura Móvil</h4>
          <p className="text-sm text-gray-600">
            La cobertura móvil es limitada en muchas zonas del Parque Natural. Descarga la audioguía y los mapas antes de adentrarte en rutas de montaña.
          </p>
        </div>
      </div>
    </section>
  );
}
