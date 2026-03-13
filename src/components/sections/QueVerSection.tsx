"use client";

import { useState } from "react";
import { pois } from "@/data";
import { PointOfInterest } from "@/lib/types";
import MapView from "@/components/MapView";

const categoryConfig: Record<string, { label: string; emoji: string; color: string }> = {
  monumento: { label: "Monumentos", emoji: "\u{1F3F0}", color: "bg-amber-100 text-amber-800" },
  naturaleza: { label: "Naturaleza", emoji: "\u{1F333}", color: "bg-green-100 text-green-800" },
  mirador: { label: "Miradores", emoji: "\u{1F304}", color: "bg-sky-100 text-sky-800" },
  pueblo: { label: "Pueblos", emoji: "\u{1F3D8}\uFE0F", color: "bg-orange-100 text-orange-800" },
  museo: { label: "Museos", emoji: "\u{1F3DB}\uFE0F", color: "bg-purple-100 text-purple-800" },
  religioso: { label: "Religioso", emoji: "\u26EA", color: "bg-rose-100 text-rose-800" },
  otro: { label: "Otro", emoji: "\u{1F4CD}", color: "bg-gray-100 text-gray-800" },
};

const filterOptions = [
  { key: "todos", label: "Todos" },
  { key: "monumento", label: "Monumentos" },
  { key: "naturaleza", label: "Naturaleza" },
  { key: "mirador", label: "Miradores" },
  { key: "pueblo", label: "Pueblos" },
  { key: "museo", label: "Museos" },
];

export default function QueVerSection() {
  const [activeFilter, setActiveFilter] = useState("todos");
  const [selectedPoi, setSelectedPoi] = useState<PointOfInterest | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  const filteredPois =
    activeFilter === "todos"
      ? pois
      : pois.filter((poi) => poi.category === activeFilter);

  const getCategoryInfo = (category: string) =>
    categoryConfig[category] ?? categoryConfig.otro;

  return (
    <div className="flex flex-col gap-6 px-4 pb-8 pt-4">
      {/* Section Title */}
      <div>
        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800">
          Qué Ver en Cazorla
        </h2>

        {/* Filter Pills + Map Toggle */}
        <div className="flex flex-wrap justify-center gap-2">
          {filterOptions.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                activeFilter === filter.key
                  ? "bg-[var(--color-primary)] text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {filter.label}
            </button>
          ))}
          <button
            onClick={() => setViewMode(viewMode === "list" ? "map" : "list")}
            className="rounded-full px-4 py-1.5 text-sm font-medium transition bg-blue-100 text-blue-700 hover:bg-blue-200"
          >
            {viewMode === "list" ? "🗺️ Ver mapa" : "📋 Ver lista"}
          </button>
        </div>
      </div>

      {/* Map View */}
      {viewMode === "map" && (
        <MapView
          center={{ lat: 37.92, lng: -2.94 }}
          zoom={11}
          height="500px"
          markers={filteredPois
            .filter((poi) => poi.coordinates)
            .map((poi) => {
              const emojiMap: Record<string, string> = {
                monumento: "\u{1F3F0}",
                naturaleza: "\u{1F33F}",
                mirador: "\u{1F441}\uFE0F",
                pueblo: "\u{1F3D8}\uFE0F",
                museo: "\u{1F3DB}\uFE0F",
                religioso: "\u26EA",
                otro: "\u{1F4CD}",
              };
              return {
                id: poi.id,
                position: poi.coordinates,
                title: poi.name,
                description: poi.shortDescription,
                emoji: emojiMap[poi.category] ?? "\u{1F4CD}",
                onClick: () => setSelectedPoi(poi),
              };
            })}
        />
      )}

      {/* POI Grid */}
      {viewMode === "list" && <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPois.map((poi) => {
          const catInfo = getCategoryInfo(poi.category);
          return (
            <div
              key={poi.id}
              className="flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition hover:shadow-lg"
            >
              {/* Image Placeholder */}
              <div className="relative flex h-48 items-center justify-center bg-gradient-to-br from-[var(--color-primary-light)] to-[var(--color-primary-dark)]">
                <span className="text-6xl">{catInfo.emoji}</span>
                <span
                  className={`absolute right-3 top-3 rounded-full px-2.5 py-0.5 text-xs font-semibold ${catInfo.color}`}
                >
                  {catInfo.label}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-2 p-4">
                <h3 className="text-lg font-bold text-gray-800">{poi.name}</h3>
                <p className="line-clamp-2 text-sm text-gray-600">
                  {poi.shortDescription}
                </p>

                {/* Tags */}
                {poi.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {poi.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => setSelectedPoi(poi)}
                  className="mt-auto self-start rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-dark)]"
                >
                  Ver más
                </button>
              </div>
            </div>
          );
        })}
      </div>}

      {filteredPois.length === 0 && (
        <p className="py-12 text-center text-gray-400">
          No se encontraron puntos de interés para esta categoría.
        </p>
      )}

      {/* Detail Modal */}
      {selectedPoi && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setSelectedPoi(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPoi(null)}
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-lg font-bold text-white transition hover:bg-black/60"
              aria-label="Cerrar"
            >
              ✕
            </button>

            {/* Modal Image Placeholder */}
            <div className="flex h-56 items-center justify-center bg-gradient-to-br from-[var(--color-primary-light)] to-[var(--color-primary-dark)]">
              <span className="text-8xl">
                {getCategoryInfo(selectedPoi.category).emoji}
              </span>
            </div>

            {/* Modal Content */}
            <div className="flex flex-col gap-4 p-6">
              <div>
                <span
                  className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${getCategoryInfo(selectedPoi.category).color}`}
                >
                  {getCategoryInfo(selectedPoi.category).label}
                </span>
                <h3 className="mt-2 text-2xl font-bold text-gray-800">
                  {selectedPoi.name}
                </h3>
              </div>

              <p className="text-sm leading-relaxed text-gray-600">
                {selectedPoi.description}
              </p>

              {/* Coordinates */}
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>📍</span>
                <span>
                  {selectedPoi.coordinates.lat.toFixed(5)},{" "}
                  {selectedPoi.coordinates.lng.toFixed(5)}
                </span>
              </div>

              {/* Opening Hours */}
              {selectedPoi.openingHours && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>🕐</span>
                  <span>{selectedPoi.openingHours}</span>
                </div>
              )}

              {/* Price */}
              {selectedPoi.price && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>💶</span>
                  <span>{selectedPoi.price}</span>
                </div>
              )}

              {/* Tags */}
              {selectedPoi.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {selectedPoi.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 pt-2">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${selectedPoi.coordinates.lat},${selectedPoi.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  🧭 Cómo llegar
                </a>

                {selectedPoi.audioUrl && (
                  <button className="flex items-center justify-center gap-2 rounded-lg bg-[var(--color-primary)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-dark)]">
                    🎧 Escuchar audioguía
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
