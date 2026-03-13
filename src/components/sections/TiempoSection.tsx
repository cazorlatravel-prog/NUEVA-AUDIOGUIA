"use client";

import { weatherForecast } from "@/data";
import { WeatherData } from "@/lib/types";

const WEATHER_EMOJIS: Record<WeatherData["condition"], string> = {
  soleado: "☀️",
  nublado: "☁️",
  lluvia: "🌧️",
  tormenta: "⛈️",
  nieve: "❄️",
  niebla: "🌫️",
  "parcialmente-nublado": "⛅",
};

const CONDITION_LABELS: Record<WeatherData["condition"], string> = {
  soleado: "Soleado",
  nublado: "Nublado",
  lluvia: "Lluvia",
  tormenta: "Tormenta",
  nieve: "Nieve",
  niebla: "Niebla",
  "parcialmente-nublado": "Parcialmente nublado",
};

function getDayName(dateStr: string): string {
  const date = new Date(dateStr);
  const days = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  return days[date.getDay()];
}

export default function TiempoSection() {
  const today = weatherForecast[0];
  const forecast = weatherForecast.slice(1);

  return (
    <div className="pb-20">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4 px-4">
        El Tiempo en Cazorla
      </h2>

      {/* Today's Weather Card */}
      {today && (
        <div className="mx-4 mb-6 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-6 text-white shadow-lg">
          <p className="text-sm font-medium opacity-80 mb-2">Hoy</p>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-7xl">
                {WEATHER_EMOJIS[today.condition]}
              </span>
            </div>
            <div className="text-right">
              <div className="flex items-baseline gap-2 justify-end">
                <span className="text-5xl font-bold">{today.tempMax}°</span>
                <span className="text-2xl opacity-70">{today.tempMin}°</span>
              </div>
              <p className="text-lg mt-1">
                {CONDITION_LABELS[today.condition]}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-white/20">
            <div className="text-center">
              <p className="text-xs opacity-70">Humedad</p>
              <p className="text-lg font-semibold">{today.humidity}%</p>
            </div>
            <div className="text-center">
              <p className="text-xs opacity-70">Viento</p>
              <p className="text-lg font-semibold">{today.windSpeed} km/h</p>
            </div>
            <div className="text-center">
              <p className="text-xs opacity-70">UV</p>
              <p className="text-lg font-semibold">{today.uvIndex}</p>
            </div>
          </div>
        </div>
      )}

      {/* 7-Day Forecast */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 px-4 mb-3">
          Próximos días
        </h3>
        <div className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
          {forecast.map((day) => (
            <div
              key={day.date}
              className="flex-shrink-0 bg-white rounded-xl shadow-sm border border-gray-100 p-3 min-w-[90px] text-center"
            >
              <p className="text-xs font-medium text-gray-500 mb-1">
                {getDayName(day.date)}
              </p>
              <span className="text-3xl block mb-1">
                {WEATHER_EMOJIS[day.condition]}
              </span>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-sm font-bold text-gray-900">
                  {day.tempMax}°
                </span>
                <span className="text-xs text-gray-400">{day.tempMin}°</span>
              </div>
              <p className="text-[10px] text-gray-500 mt-1 leading-tight">
                {CONDITION_LABELS[day.condition]}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Park Tips */}
      <div className="mx-4 bg-amber-50 border border-amber-200 rounded-2xl p-4">
        <h3 className="text-lg font-semibold text-amber-900 mb-3">
          🌲 Consejos para el Parque Natural
        </h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-2 text-sm text-amber-800">
            <span className="flex-shrink-0">🧴</span>
            <span>Protección solar todo el año (UV alto en montaña)</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-amber-800">
            <span className="flex-shrink-0">🧥</span>
            <span>
              Lleva ropa de abrigo aunque sea verano (noches frías)
            </span>
          </li>
          <li className="flex items-start gap-2 text-sm text-amber-800">
            <span className="flex-shrink-0">💧</span>
            <span>Lleva siempre agua suficiente</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-amber-800">
            <span className="flex-shrink-0">📱</span>
            <span>
              La cobertura móvil es limitada en zonas del parque
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
