"use client";

import { useState } from "react";
import { trails } from "@/data";
import { Trail } from "@/lib/types";

const filterOptions = [
  { label: "Todas", value: "todas" },
  { label: "Senderismo", value: "senderismo" },
  { label: "Bicicleta", value: "bicicleta" },
  { label: "4x4", value: "4x4" },
  { label: "Caballo", value: "caballo" },
  { label: "Acuática", value: "acuatica" },
] as const;

const difficultyColors: Record<Trail["difficulty"], { stripe: string; badge: string; text: string }> = {
  facil: { stripe: "bg-green-500", badge: "bg-green-100 text-green-800", text: "Fácil" },
  media: { stripe: "bg-yellow-500", badge: "bg-yellow-100 text-yellow-800", text: "Media" },
  dificil: { stripe: "bg-orange-500", badge: "bg-orange-100 text-orange-800", text: "Difícil" },
  experto: { stripe: "bg-red-500", badge: "bg-red-100 text-red-800", text: "Experto" },
};

const typeEmojis: Record<Trail["type"], string> = {
  senderismo: "🥾",
  bicicleta: "🚴",
  "4x4": "🚙",
  caballo: "🐴",
  acuatica: "🚣",
};

export default function RutasSection() {
  const [activeFilter, setActiveFilter] = useState<string>("todas");
  const [selectedTrail, setSelectedTrail] = useState<Trail | null>(null);

  const filteredTrails =
    activeFilter === "todas"
      ? trails
      : trails.filter((t) => t.type === activeFilter);

  return (
    <div className="pb-24">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4 px-4 pt-4">
        Rutas y Senderos
      </h2>

      {/* Filter pills */}
      <div className="flex gap-2 overflow-x-auto px-4 pb-4 scrollbar-hide">
        {filterOptions.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === filter.value
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Trail list */}
      <div className="flex flex-col gap-4 px-4">
        {filteredTrails.map((trail) => {
          const dc = difficultyColors[trail.difficulty];
          const emoji = typeEmojis[trail.type];

          return (
            <div
              key={trail.id}
              className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
            >
              {/* Top: stripe + image placeholder */}
              <div className="flex">
                <div className={`w-2 ${dc.stripe} flex-shrink-0`} />
                <div className="flex-1">
                  {/* Image placeholder */}
                  <div className="h-40 bg-gradient-to-br from-green-200 to-emerald-400 flex items-center justify-center">
                    <span className="text-6xl">{emoji}</span>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    {/* Name + difficulty */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">
                        {trail.name}
                      </h3>
                      <span
                        className={`flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-semibold ${dc.badge}`}
                      >
                        {dc.text}
                      </span>
                    </div>

                    {/* Stats row */}
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-2">
                      <span>📏 {trail.distance} km</span>
                      <span className="text-gray-300">|</span>
                      <span>
                        ⏱️ {Math.floor(trail.duration / 60)}h{" "}
                        {trail.duration % 60}min
                      </span>
                      <span className="text-gray-300">|</span>
                      <span>⛰️ {trail.elevationGain}m desnivel</span>
                    </div>

                    {/* Short description */}
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {trail.shortDescription}
                    </p>

                    {/* Highlights */}
                    {trail.highlights.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {trail.highlights.map((h, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded-full"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Permit warning */}
                    {trail.permit && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2 text-sm text-yellow-800 mb-3">
                        ⚠️ Requiere permiso
                      </div>
                    )}

                    {/* Season tags */}
                    {trail.season.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {trail.season.map((s, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Button */}
                    <button
                      onClick={() => setSelectedTrail(trail)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg transition-colors"
                    >
                      Ver detalles
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {filteredTrails.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No se encontraron rutas con este filtro.
          </div>
        )}
      </div>

      {/* Detail modal */}
      {selectedTrail && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSelectedTrail(null)}
          />

          {/* Modal content */}
          <div className="relative bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl">
            {/* Close button */}
            <button
              onClick={() => setSelectedTrail(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur rounded-full text-gray-700 hover:bg-white"
            >
              ✕
            </button>

            {/* Image placeholder */}
            <div className="h-48 bg-gradient-to-br from-green-200 to-emerald-400 flex items-center justify-center">
              <span className="text-7xl">
                {typeEmojis[selectedTrail.type]}
              </span>
            </div>

            <div className="p-5">
              {/* Name + difficulty */}
              <div className="flex items-start justify-between gap-2 mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  {selectedTrail.name}
                </h2>
                <span
                  className={`flex-shrink-0 px-3 py-1 rounded-full text-sm font-semibold ${
                    difficultyColors[selectedTrail.difficulty].badge
                  }`}
                >
                  {difficultyColors[selectedTrail.difficulty].text}
                </span>
              </div>

              {/* Stats - bigger */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold text-green-700">
                    {selectedTrail.distance}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">km</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold text-green-700">
                    {Math.floor(selectedTrail.duration / 60)}h{" "}
                    {selectedTrail.duration % 60}m
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">duración</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold text-green-700">
                    {selectedTrail.elevationGain}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    m desnivel
                  </div>
                </div>
              </div>

              {/* Full description */}
              <p className="text-gray-700 leading-relaxed mb-5">
                {selectedTrail.description}
              </p>

              {/* Warnings */}
              {selectedTrail.warnings && selectedTrail.warnings.length > 0 && (
                <div className="mb-5">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Advertencias
                  </h4>
                  <ul className="space-y-1.5">
                    {selectedTrail.warnings.map((w, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-orange-800 bg-orange-50 rounded-lg px-3 py-2"
                      >
                        <span>⚠️</span>
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Permit info */}
              {selectedTrail.permit && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-5">
                  <h4 className="font-semibold text-yellow-900 mb-1">
                    ⚠️ Requiere permiso
                  </h4>
                  {selectedTrail.permitInfo && (
                    <p className="text-sm text-yellow-800">
                      {selectedTrail.permitInfo}
                    </p>
                  )}
                </div>
              )}

              {/* Highlights */}
              {selectedTrail.highlights.length > 0 && (
                <div className="mb-5">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Destacados
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTrail.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Season */}
              {selectedTrail.season.length > 0 && (
                <div className="mb-5">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Mejor época
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTrail.season.map((s, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex gap-3 mt-6">
                <a
                  href={`https://www.google.com/maps?q=${selectedTrail.startPoint.lat},${selectedTrail.startPoint.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg text-center transition-colors"
                >
                  📍 Punto de inicio en Maps
                </a>
                <button
                  onClick={() => setSelectedTrail(null)}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
