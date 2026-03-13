"use client";

import { useState } from "react";
import { activities } from "@/data";
import { Activity } from "@/lib/types";

const CATEGORY_FILTERS = [
  { key: "todas", label: "Todas" },
  { key: "aventura", label: "Aventura" },
  { key: "naturaleza", label: "Naturaleza" },
  { key: "cultural", label: "Cultural" },
  { key: "gastronomia", label: "Gastronomía" },
  { key: "familiar", label: "Familiar" },
  { key: "acuatica", label: "Acuática" },
] as const;

const CATEGORY_COLORS: Record<string, string> = {
  aventura: "bg-orange-500",
  naturaleza: "bg-green-600",
  cultural: "bg-purple-600",
  gastronomia: "bg-amber-600",
  familiar: "bg-blue-500",
  acuatica: "bg-cyan-600",
};

const CATEGORY_EMOJIS: Record<string, string> = {
  aventura: "🧗",
  naturaleza: "🌿",
  cultural: "🏛️",
  gastronomia: "🍷",
  familiar: "👨‍👩‍👧‍👦",
  acuatica: "🚣",
};

const CATEGORY_GRADIENTS: Record<string, string> = {
  aventura: "from-orange-400 to-red-500",
  naturaleza: "from-green-400 to-emerald-600",
  cultural: "from-purple-400 to-indigo-600",
  gastronomia: "from-amber-400 to-orange-600",
  familiar: "from-blue-400 to-sky-600",
  acuatica: "from-cyan-400 to-blue-600",
};

export default function ActividadesSection() {
  const [activeFilter, setActiveFilter] = useState<string>("todas");
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const filtered =
    activeFilter === "todas"
      ? activities
      : activities.filter((a) => a.category === activeFilter);

  return (
    <section className="pb-20">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Actividades y Experiencias
      </h2>

      {/* Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide">
        {CATEGORY_FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === f.key
                ? "bg-green-700 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((activity) => (
          <div
            key={activity.id}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
          >
            {/* Placeholder Image */}
            <div
              className={`relative h-44 bg-gradient-to-br ${
                CATEGORY_GRADIENTS[activity.category] || "from-gray-400 to-gray-600"
              } flex items-center justify-center`}
            >
              <span className="text-6xl">
                {CATEGORY_EMOJIS[activity.category] || "🎯"}
              </span>
              {/* Category Badge */}
              <span
                className={`absolute top-3 right-3 ${
                  CATEGORY_COLORS[activity.category] || "bg-gray-600"
                } text-white text-xs font-semibold px-3 py-1 rounded-full`}
              >
                {CATEGORY_FILTERS.find((f) => f.key === activity.category)?.label ||
                  activity.category}
              </span>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {activity.name}
              </h3>
              <p className="text-sm text-gray-500 mb-2">{activity.provider}</p>
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                {activity.shortDescription}
              </p>

              {/* Info Row */}
              <div className="flex flex-wrap gap-3 text-sm text-gray-700 mb-2">
                <span>💰 {activity.price}</span>
                <span className="text-gray-300">|</span>
                <span>⏱️ {activity.duration}</span>
              </div>

              {activity.minAge && (
                <p className="text-sm text-gray-600 mb-3">
                  👤 Desde {activity.minAge} años
                </p>
              )}

              {/* Buttons */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => setSelectedActivity(activity)}
                  className="flex-1 py-2 px-4 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Más info
                </button>
                <button
                  onClick={() => {
                    if (activity.bookingUrl) {
                      window.open(activity.bookingUrl, "_blank");
                    } else if (activity.phone) {
                      window.location.href = `tel:${activity.phone}`;
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
          <p>No se encontraron actividades en esta categoría.</p>
        </div>
      )}

      {/* Detail Modal */}
      {selectedActivity && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={() => setSelectedActivity(null)}
        >
          <div
            className="bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Image */}
            <div
              className={`relative h-48 bg-gradient-to-br ${
                CATEGORY_GRADIENTS[selectedActivity.category] ||
                "from-gray-400 to-gray-600"
              } flex items-center justify-center sm:rounded-t-2xl`}
            >
              <span className="text-7xl">
                {CATEGORY_EMOJIS[selectedActivity.category] || "🎯"}
              </span>
              <button
                onClick={() => setSelectedActivity(null)}
                className="absolute top-3 right-3 bg-black/30 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/50 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5">
              <span
                className={`inline-block ${
                  CATEGORY_COLORS[selectedActivity.category] || "bg-gray-600"
                } text-white text-xs font-semibold px-3 py-1 rounded-full mb-3`}
              >
                {CATEGORY_FILTERS.find(
                  (f) => f.key === selectedActivity.category
                )?.label || selectedActivity.category}
              </span>

              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {selectedActivity.name}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                {selectedActivity.provider}
              </p>

              {/* Full Description */}
              <p className="text-gray-700 text-sm leading-relaxed mb-5">
                {selectedActivity.description}
              </p>

              {/* Info Grid */}
              <div className="bg-gray-50 rounded-xl p-4 mb-5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">💰 Precio</span>
                  <span className="font-medium text-gray-900">
                    {selectedActivity.price}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">⏱️ Duración</span>
                  <span className="font-medium text-gray-900">
                    {selectedActivity.duration}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">📅 Horario</span>
                  <span className="font-medium text-gray-900">
                    {selectedActivity.schedule}
                  </span>
                </div>
                {selectedActivity.minAge && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">👤 Edad mínima</span>
                    <span className="font-medium text-gray-900">
                      {selectedActivity.minAge} años
                    </span>
                  </div>
                )}
                {selectedActivity.maxPeople && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">👥 Máx. personas</span>
                    <span className="font-medium text-gray-900">
                      {selectedActivity.maxPeople}
                    </span>
                  </div>
                )}
              </div>

              {/* Provider Contact */}
              <div className="border border-gray-200 rounded-xl p-4 mb-5">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">
                  Contacto del proveedor
                </h4>
                <div className="space-y-2">
                  {selectedActivity.phone && (
                    <a
                      href={`tel:${selectedActivity.phone}`}
                      className="flex items-center gap-2 text-sm text-green-700 hover:text-green-800"
                    >
                      📞 {selectedActivity.phone}
                    </a>
                  )}
                  {selectedActivity.email && (
                    <a
                      href={`mailto:${selectedActivity.email}`}
                      className="flex items-center gap-2 text-sm text-green-700 hover:text-green-800"
                    >
                      ✉️ {selectedActivity.email}
                    </a>
                  )}
                  {selectedActivity.website && (
                    <a
                      href={selectedActivity.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-green-700 hover:text-green-800"
                    >
                      🌐 Sitio web
                    </a>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedActivity(null)}
                  className="flex-1 py-3 px-4 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cerrar
                </button>
                <button
                  onClick={() => {
                    if (selectedActivity.bookingUrl) {
                      window.open(selectedActivity.bookingUrl, "_blank");
                    } else if (selectedActivity.phone) {
                      window.location.href = `tel:${selectedActivity.phone}`;
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
