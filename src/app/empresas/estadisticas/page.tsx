"use client";

import { useState } from "react";

const periods = ["Última semana", "Último mes", "Últimos 3 meses"];

const statsCards = [
  { label: "Total visualizaciones", value: "1.234", icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" },
  { label: 'Clics en "Reservar"', value: "87", icon: "M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" },
  { label: "Clics en teléfono", value: "43", icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" },
  { label: "Tasa de conversión", value: "7,1%", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
];

const tableData = [
  { name: "Hotel Sierra de Cazorla", type: "Alojamiento", views: 890, bookingClicks: 62, phoneClicks: 31 },
  { name: "Apartamentos La Iruela", type: "Alojamiento", views: 234, bookingClicks: 15, phoneClicks: 8 },
  { name: "Ruta en kayak por el Guadalquivir", type: "Actividad", views: 110, bookingClicks: 10, phoneClicks: 4 },
];

const chartData = [
  { day: "Lun", value: 180 },
  { day: "Mar", value: 145 },
  { day: "Mié", value: 210 },
  { day: "Jue", value: 165 },
  { day: "Vie", value: 230 },
  { day: "Sáb", value: 195 },
  { day: "Dom", value: 120 },
];

export default function EstadisticasPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("Último mes");

  const maxValue = Math.max(...chartData.map((d) => d.value));

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Estadísticas</h1>
          <p className="text-gray-500 text-sm mt-1">Analiza el rendimiento de tus publicaciones</p>
        </div>
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          {periods.map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                selectedPeriod === period
                  ? "bg-white text-green-700 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={stat.icon} />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Visualizaciones últimos 7 días</h2>
        <div className="flex items-end justify-between gap-3 h-48">
          {chartData.map((bar) => (
            <div key={bar.day} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs text-gray-500 font-medium">{bar.value}</span>
              <div
                className="w-full bg-green-500 rounded-t-md transition-all duration-300 hover:bg-green-600 min-h-[4px]"
                style={{ height: `${(bar.value / maxValue) * 100}%` }}
              />
              <span className="text-xs text-gray-500">{bar.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Rendimiento por publicación</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">Nombre</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">Tipo</th>
                <th className="text-right text-xs font-medium text-gray-500 uppercase px-6 py-3">Visualizaciones</th>
                <th className="text-right text-xs font-medium text-gray-500 uppercase px-6 py-3">Clics Reservar</th>
                <th className="text-right text-xs font-medium text-gray-500 uppercase px-6 py-3">Clics Teléfono</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tableData.map((row) => (
                <tr key={row.name} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.name}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      row.type === "Alojamiento" ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-700"
                    }`}>
                      {row.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 text-right">{row.views.toLocaleString("es-ES")}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 text-right">{row.bookingClicks}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 text-right">{row.phoneClicks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
