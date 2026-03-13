"use client";

import { useState } from "react";
import { events } from "@/data";
import { Event } from "@/lib/types";

const CATEGORY_FILTERS = [
  { label: "Todos", value: "todos" },
  { label: "Fiesta", value: "fiesta" },
  { label: "Cultural", value: "cultural" },
  { label: "Deportivo", value: "deportivo" },
  { label: "Gastronómico", value: "gastronomico" },
  { label: "Mercado", value: "mercado" },
] as const;

function formatDateParts(dateStr: string) {
  const date = new Date(dateStr);
  const day = date.getDate();
  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  const month = months[date.getMonth()];
  return { day, month };
}

function getCategoryColor(category: Event["category"]): string {
  const colors: Record<Event["category"], string> = {
    fiesta: "bg-pink-100 text-pink-700",
    cultural: "bg-purple-100 text-purple-700",
    deportivo: "bg-green-100 text-green-700",
    gastronomico: "bg-orange-100 text-orange-700",
    religioso: "bg-yellow-100 text-yellow-700",
    mercado: "bg-blue-100 text-blue-700",
    otro: "bg-gray-100 text-gray-700",
  };
  return colors[category];
}

function getCategoryLabel(category: Event["category"]): string {
  const labels: Record<Event["category"], string> = {
    fiesta: "Fiesta",
    cultural: "Cultural",
    deportivo: "Deportivo",
    gastronomico: "Gastronómico",
    religioso: "Religioso",
    mercado: "Mercado",
    otro: "Otro",
  };
  return labels[category];
}

function generateICS(event: Event): void {
  const startDate = new Date(event.date);
  const endDate = event.endDate ? new Date(event.endDate) : new Date(startDate);

  const formatICSDate = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Cazorla Guia//ES",
    "BEGIN:VEVENT",
    `DTSTART:${formatICSDate(startDate)}`,
    `DTEND:${formatICSDate(endDate)}`,
    `SUMMARY:${event.name}`,
    `DESCRIPTION:${event.shortDescription.replace(/\n/g, "\\n")}`,
    `LOCATION:${event.location}`,
    `UID:${event.id}@cazorla-guia`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${event.slug || event.id}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function EventosSection() {
  const [activeFilter, setActiveFilter] = useState("todos");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const filteredEvents =
    activeFilter === "todos"
      ? events
      : events.filter((e) => e.category === activeFilter);

  return (
    <div className="pb-20">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4 px-4">
        Eventos y Fiestas
      </h2>

      {/* Filter Pills */}
      <div className="flex gap-2 overflow-x-auto px-4 pb-4 scrollbar-hide">
        {CATEGORY_FILTERS.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === filter.value
                ? "bg-emerald-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Timeline Event Cards */}
      <div className="px-4 space-y-4">
        {filteredEvents.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            No hay eventos en esta categoría.
          </p>
        )}

        {filteredEvents.map((event) => {
          const { day, month } = formatDateParts(event.date);
          return (
            <div
              key={event.id}
              className="flex gap-4 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Date Column */}
              <div className="flex flex-col items-center justify-center bg-emerald-50 px-4 py-4 min-w-[70px]">
                <span className="text-3xl font-bold text-emerald-700">
                  {day}
                </span>
                <span className="text-sm font-medium text-emerald-600 uppercase">
                  {month}
                </span>
              </div>

              {/* Content Column */}
              <div className="flex-1 py-3 pr-4">
                <div className="flex items-start justify-between mb-1">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${getCategoryColor(event.category)}`}
                  >
                    {getCategoryLabel(event.category)}
                  </span>
                </div>

                <h3 className="font-bold text-gray-900 mb-1">{event.name}</h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                  {event.shortDescription}
                </p>

                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mb-3">
                  <span>📍 {event.location}</span>
                  {event.time && <span>🕐 {event.time}</span>}
                  {event.price && <span>💰 {event.price}</span>}
                </div>

                <button
                  onClick={() => setSelectedEvent(event)}
                  className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  Ver más →
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between rounded-t-2xl">
              <h3 className="text-lg font-bold text-gray-900">
                {selectedEvent.name}
              </h3>
              <button
                onClick={() => setSelectedEvent(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 space-y-4">
              {/* Category & Date */}
              <div className="flex items-center gap-3">
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${getCategoryColor(selectedEvent.category)}`}
                >
                  {getCategoryLabel(selectedEvent.category)}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(selectedEvent.date).toLocaleDateString("es-ES", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>

              {selectedEvent.endDate && (
                <p className="text-sm text-gray-500">
                  Hasta:{" "}
                  {new Date(selectedEvent.endDate).toLocaleDateString("es-ES", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              )}

              {/* Description */}
              <p className="text-gray-700 leading-relaxed">
                {selectedEvent.description}
              </p>

              {/* Details */}
              <div className="space-y-2 bg-gray-50 rounded-lg p-4">
                <div className="flex items-start gap-2 text-sm">
                  <span>📍</span>
                  <span className="text-gray-700">{selectedEvent.location}</span>
                </div>
                {selectedEvent.time && (
                  <div className="flex items-start gap-2 text-sm">
                    <span>🕐</span>
                    <span className="text-gray-700">{selectedEvent.time}</span>
                  </div>
                )}
                {selectedEvent.price && (
                  <div className="flex items-start gap-2 text-sm">
                    <span>💰</span>
                    <span className="text-gray-700">{selectedEvent.price}</span>
                  </div>
                )}
                {selectedEvent.organizer && (
                  <div className="flex items-start gap-2 text-sm">
                    <span>🏢</span>
                    <span className="text-gray-700">
                      {selectedEvent.organizer}
                    </span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <button
                onClick={() => generateICS(selectedEvent)}
                className="w-full py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
              >
                📅 Añadir al calendario
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
