"use client";

import { useState } from "react";
import { accommodations } from "@/data";
import { Accommodation } from "@/lib/types";

const TYPE_OPTIONS = [
  { value: "todos", label: "Todos" },
  { value: "hotel", label: "Hotel" },
  { value: "casa-rural", label: "Casa Rural" },
  { value: "apartamento", label: "Apartamento" },
  { value: "camping", label: "Camping" },
  { value: "hostal", label: "Hostal" },
  { value: "glamping", label: "Glamping" },
] as const;

const TYPE_EMOJIS: Record<string, string> = {
  hotel: "🏨",
  "casa-rural": "🏡",
  apartamento: "🏢",
  camping: "⛺",
  hostal: "🛏️",
  glamping: "🏕️",
};

const TYPE_GRADIENTS: Record<string, string> = {
  hotel: "from-blue-400 to-indigo-600",
  "casa-rural": "from-amber-400 to-orange-600",
  apartamento: "from-slate-400 to-gray-600",
  camping: "from-green-400 to-emerald-600",
  hostal: "from-purple-400 to-violet-600",
  glamping: "from-rose-400 to-pink-600",
};

const TYPE_BADGE_COLORS: Record<string, string> = {
  hotel: "bg-blue-600",
  "casa-rural": "bg-amber-600",
  apartamento: "bg-slate-600",
  camping: "bg-green-600",
  hostal: "bg-purple-600",
  glamping: "bg-rose-600",
};

export default function AlojamientosSection() {
  const [typeFilter, setTypeFilter] = useState<string>("todos");
  const [petFriendly, setPetFriendly] = useState(false);
  const [accessible, setAccessible] = useState(false);
  const [selectedAccommodation, setSelectedAccommodation] =
    useState<Accommodation | null>(null);

  const filtered = accommodations.filter((a) => {
    if (typeFilter !== "todos" && a.type !== typeFilter) return false;
    if (petFriendly && !a.petFriendly) return false;
    if (accessible && !a.accessible) return false;
    return true;
  });

  return (
    <section className="pb-20">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Alojamiento</h2>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6 space-y-3">
        {/* Type Select */}
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          {TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Toggle Switches */}
        <div className="flex gap-4">
          <button
            onClick={() => setPetFriendly(!petFriendly)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              petFriendly
                ? "bg-green-100 text-green-800 border border-green-300"
                : "bg-gray-100 text-gray-600 border border-gray-200"
            }`}
          >
            🐕 Pet-friendly
          </button>
          <button
            onClick={() => setAccessible(!accessible)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              accessible
                ? "bg-green-100 text-green-800 border border-green-300"
                : "bg-gray-100 text-gray-600 border border-gray-200"
            }`}
          >
            ♿ Accesible
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((acc) => (
          <div
            key={acc.id}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
          >
            {/* Placeholder Image */}
            <div
              className={`relative h-48 bg-gradient-to-br ${
                TYPE_GRADIENTS[acc.type] || "from-gray-400 to-gray-600"
              } flex items-center justify-center`}
            >
              <span className="text-6xl">
                {TYPE_EMOJIS[acc.type] || "🏠"}
              </span>
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Type Badge + Stars */}
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`${
                    TYPE_BADGE_COLORS[acc.type] || "bg-gray-600"
                  } text-white text-xs font-semibold px-3 py-1 rounded-full`}
                >
                  {TYPE_OPTIONS.find((o) => o.value === acc.type)?.label ||
                    acc.type}
                </span>
                {acc.stars && (
                  <span className="text-sm">
                    {"⭐".repeat(acc.stars)}
                  </span>
                )}
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {acc.name}
              </h3>
              <p className="text-sm text-gray-500 mb-2">{acc.address}</p>
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                {acc.shortDescription}
              </p>

              {/* Price Range */}
              <p className="text-lg font-bold text-green-700 mb-3">
                {acc.priceRange}
              </p>

              {/* Amenities Pills */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {acc.amenities.slice(0, 4).map((amenity) => (
                  <span
                    key={amenity}
                    className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
                  >
                    {amenity}
                  </span>
                ))}
                {acc.amenities.length > 4 && (
                  <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full">
                    +{acc.amenities.length - 4} más
                  </span>
                )}
              </div>

              {/* Pet-friendly & Accessible Icons */}
              <div className="flex gap-3 mb-3">
                {acc.petFriendly && (
                  <span className="text-sm text-gray-600">🐕 Pet-friendly</span>
                )}
                {acc.accessible && (
                  <span className="text-sm text-gray-600">♿ Accesible</span>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedAccommodation(acc)}
                  className="flex-1 py-2 px-4 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Ver detalles
                </button>
                <button
                  onClick={() => {
                    if (acc.bookingUrl) {
                      window.open(acc.bookingUrl, "_blank");
                    } else if (acc.phone) {
                      window.location.href = `tel:${acc.phone}`;
                    }
                  }}
                  className="flex-1 py-2 px-4 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  Reservar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-4xl mb-3">🔍</p>
          <p>No se encontraron alojamientos con los filtros seleccionados.</p>
        </div>
      )}

      {/* Detail Modal */}
      {selectedAccommodation && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={() => setSelectedAccommodation(null)}
        >
          <div
            className="bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Image */}
            <div
              className={`relative h-48 bg-gradient-to-br ${
                TYPE_GRADIENTS[selectedAccommodation.type] ||
                "from-gray-400 to-gray-600"
              } flex items-center justify-center sm:rounded-t-2xl`}
            >
              <span className="text-7xl">
                {TYPE_EMOJIS[selectedAccommodation.type] || "🏠"}
              </span>
              <button
                onClick={() => setSelectedAccommodation(null)}
                className="absolute top-3 right-3 bg-black/30 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/50 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5">
              {/* Type Badge + Stars */}
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`${
                    TYPE_BADGE_COLORS[selectedAccommodation.type] || "bg-gray-600"
                  } text-white text-xs font-semibold px-3 py-1 rounded-full`}
                >
                  {TYPE_OPTIONS.find(
                    (o) => o.value === selectedAccommodation.type
                  )?.label || selectedAccommodation.type}
                </span>
                {selectedAccommodation.stars && (
                  <span className="text-sm">
                    {"⭐".repeat(selectedAccommodation.stars)}
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {selectedAccommodation.name}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                {selectedAccommodation.address}
              </p>

              {/* Price */}
              <p className="text-xl font-bold text-green-700 mb-4">
                {selectedAccommodation.priceRange}
              </p>

              {/* Full Description */}
              <p className="text-gray-700 text-sm leading-relaxed mb-5">
                {selectedAccommodation.description}
              </p>

              {/* All Amenities */}
              <div className="mb-5">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">
                  Servicios y comodidades
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedAccommodation.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pet-friendly & Accessible */}
              {(selectedAccommodation.petFriendly ||
                selectedAccommodation.accessible) && (
                <div className="flex gap-4 mb-5 bg-green-50 rounded-xl p-3">
                  {selectedAccommodation.petFriendly && (
                    <span className="text-sm text-green-800">
                      🐕 Pet-friendly
                    </span>
                  )}
                  {selectedAccommodation.accessible && (
                    <span className="text-sm text-green-800">
                      ♿ Accesible
                    </span>
                  )}
                </div>
              )}

              {/* Contact */}
              <div className="border border-gray-200 rounded-xl p-4 mb-5">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">
                  Contacto
                </h4>
                <div className="space-y-2">
                  {selectedAccommodation.phone && (
                    <a
                      href={`tel:${selectedAccommodation.phone}`}
                      className="flex items-center gap-2 text-sm text-green-700 hover:text-green-800"
                    >
                      📞 {selectedAccommodation.phone}
                    </a>
                  )}
                  {selectedAccommodation.email && (
                    <a
                      href={`mailto:${selectedAccommodation.email}`}
                      className="flex items-center gap-2 text-sm text-green-700 hover:text-green-800"
                    >
                      ✉️ {selectedAccommodation.email}
                    </a>
                  )}
                  {selectedAccommodation.website && (
                    <a
                      href={selectedAccommodation.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-green-700 hover:text-green-800"
                    >
                      🌐 Sitio web
                    </a>
                  )}
                </div>
              </div>

              {/* Address */}
              <div className="bg-gray-50 rounded-xl p-4 mb-5">
                <h4 className="text-sm font-semibold text-gray-900 mb-1">
                  Dirección
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  {selectedAccommodation.address}
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${selectedAccommodation.coordinates.lat},${selectedAccommodation.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-green-700 font-medium hover:text-green-800"
                >
                  📍 Cómo llegar
                </a>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedAccommodation(null)}
                  className="flex-1 py-3 px-4 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cerrar
                </button>
                <button
                  onClick={() => {
                    if (selectedAccommodation.bookingUrl) {
                      window.open(selectedAccommodation.bookingUrl, "_blank");
                    } else if (selectedAccommodation.phone) {
                      window.location.href = `tel:${selectedAccommodation.phone}`;
                    }
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition-colors"
                >
                  Reservar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
