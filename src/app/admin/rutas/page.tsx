"use client";

import { useState } from "react";
import { trails as initialTrails } from "@/data";
import { Trail } from "@/lib/types";

const trailTypes: Trail["type"][] = ["senderismo", "bicicleta", "4x4", "caballo", "acuatica"];
const difficulties: Trail["difficulty"][] = ["facil", "media", "dificil", "experto"];
const seasons = ["primavera", "verano", "otoño", "invierno"];

const difficultyColors: Record<Trail["difficulty"], string> = {
  facil: "bg-green-100 text-green-800",
  media: "bg-yellow-100 text-yellow-800",
  dificil: "bg-orange-100 text-orange-800",
  experto: "bg-red-100 text-red-800",
};

interface TrailForm {
  name: string;
  type: Trail["type"];
  difficulty: Trail["difficulty"];
  distance: number;
  duration: number;
  elevationGain: number;
  description: string;
  shortDescription: string;
  startPoint: { lat: number; lng: number };
  endPoint: { lat: number; lng: number };
  highlights: string[];
  warnings: string[];
  permit: boolean;
  permitInfo: string;
  season: string[];
  tags: string[];
  featured: boolean;
}

const emptyForm: TrailForm = {
  name: "",
  type: "senderismo",
  difficulty: "facil",
  distance: 0,
  duration: 0,
  elevationGain: 0,
  description: "",
  shortDescription: "",
  startPoint: { lat: 0, lng: 0 },
  endPoint: { lat: 0, lng: 0 },
  highlights: [],
  warnings: [],
  permit: false,
  permitInfo: "",
  season: [],
  tags: [],
  featured: false,
};

export default function RutasAdminPage() {
  const [items, setItems] = useState<Trail[]>(initialTrails);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<TrailForm>(emptyForm);
  const [highlightsInput, setHighlightsInput] = useState("");
  const [warningsInput, setWarningsInput] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setHighlightsInput("");
    setWarningsInput("");
    setTagsInput("");
    setModalOpen(true);
  };

  const openEdit = (trail: Trail) => {
    setEditingId(trail.id);
    setForm({
      name: trail.name,
      type: trail.type,
      difficulty: trail.difficulty,
      distance: trail.distance,
      duration: trail.duration,
      elevationGain: trail.elevationGain,
      description: trail.description,
      shortDescription: trail.shortDescription,
      startPoint: { ...trail.startPoint },
      endPoint: { ...trail.endPoint },
      highlights: [...trail.highlights],
      warnings: trail.warnings ? [...trail.warnings] : [],
      permit: trail.permit,
      permitInfo: trail.permitInfo || "",
      season: [...trail.season],
      tags: [...trail.tags],
      featured: trail.featured,
    });
    setHighlightsInput(trail.highlights.join(", "));
    setWarningsInput(trail.warnings?.join(", ") || "");
    setTagsInput(trail.tags.join(", "));
    setModalOpen(true);
  };

  const handleSave = () => {
    const highlights = highlightsInput.split(",").map((t) => t.trim()).filter(Boolean);
    const warnings = warningsInput.split(",").map((t) => t.trim()).filter(Boolean);
    const tags = tagsInput.split(",").map((t) => t.trim()).filter(Boolean);

    if (editingId) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                ...form,
                highlights,
                warnings: warnings.length > 0 ? warnings : undefined,
                tags,
              }
            : item
        )
      );
    } else {
      const newId = `trail-${Date.now()}`;
      const slug = form.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      setItems((prev) => [
        ...prev,
        {
          ...form,
          id: newId,
          slug,
          images: [],
          waypoints: [],
          highlights,
          warnings: warnings.length > 0 ? warnings : undefined,
          tags,
        } as Trail,
      ]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    setDeleteConfirm(null);
  };

  const toggleSeason = (s: string) => {
    setForm((prev) => ({
      ...prev,
      season: prev.season.includes(s)
        ? prev.season.filter((x) => x !== s)
        : [...prev.season, s],
    }));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gestión de Rutas</h1>
        <button
          onClick={openCreate}
          className="bg-[#1b6b3a] hover:bg-[#155a2f] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          + Añadir nueva
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Nombre</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Tipo</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Dificultad</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Distancia</th>
              <th className="text-center px-4 py-3 font-semibold text-gray-600">Destacada</th>
              <th className="text-right px-4 py-3 font-semibold text-gray-600">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((trail) => (
              <tr key={trail.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-800">{trail.name}</td>
                <td className="px-4 py-3 text-gray-600 capitalize">{trail.type}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[trail.difficulty]}`}
                  >
                    {trail.difficulty.charAt(0).toUpperCase() + trail.difficulty.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600">{trail.distance} km</td>
                <td className="px-4 py-3 text-center">
                  {trail.featured ? (
                    <span className="text-yellow-500 text-lg">★</span>
                  ) : (
                    <span className="text-gray-300 text-lg">☆</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button
                    onClick={() => openEdit(trail)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(trail.id)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Confirmar eliminación
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              ¿Estás seguro de que quieres eliminar esta ruta? Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal form */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">
                {editingId ? "Editar ruta" : "Nueva ruta"}
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b6b3a] focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value as Trail["type"] })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b6b3a] focus:border-transparent"
                  >
                    {trailTypes.map((t) => (
                      <option key={t} value={t}>
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dificultad</label>
                  <select
                    value={form.difficulty}
                    onChange={(e) => setForm({ ...form, difficulty: e.target.value as Trail["difficulty"] })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b6b3a] focus:border-transparent"
                  >
                    {difficulties.map((d) => (
                      <option key={d} value={d}>
                        {d.charAt(0).toUpperCase() + d.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Distancia (km)</label>
                  <input
                    type="number"
                    step="any"
                    value={form.distance}
                    onChange={(e) => setForm({ ...form, distance: parseFloat(e.target.value) || 0 })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b6b3a] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duración (min)</label>
                  <input
                    type="number"
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: parseInt(e.target.value) || 0 })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b6b3a] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Desnivel (m)</label>
                  <input
                    type="number"
                    value={form.elevationGain}
                    onChange={(e) => setForm({ ...form, elevationGain: parseInt(e.target.value) || 0 })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b6b3a] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b6b3a] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción corta</label>
                <textarea
                  value={form.shortDescription}
                  onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                  rows={2}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b6b3a] focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Punto inicio - Lat</label>
                  <input
                    type="number"
                    step="any"
                    value={form.startPoint.lat}
                    onChange={(e) => setForm({ ...form, startPoint: { ...form.startPoint, lat: parseFloat(e.target.value) || 0 } })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b6b3a] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Punto inicio - Lng</label>
                  <input
                    type="number"
                    step="any"
                    value={form.startPoint.lng}
                    onChange={(e) => setForm({ ...form, startPoint: { ...form.startPoint, lng: parseFloat(e.target.value) || 0 } })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b6b3a] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Punto final - Lat</label>
                  <input
                    type="number"
                    step="any"
                    value={form.endPoint.lat}
                    onChange={(e) => setForm({ ...form, endPoint: { ...form.endPoint, lat: parseFloat(e.target.value) || 0 } })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b6b3a] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Punto final - Lng</label>
                  <input
                    type="number"
                    step="any"
                    value={form.endPoint.lng}
                    onChange={(e) => setForm({ ...form, endPoint: { ...form.endPoint, lng: parseFloat(e.target.value) || 0 } })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b6b3a] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Puntos destacados (separados por comas)
                </label>
                <input
                  type="text"
                  value={highlightsInput}
                  onChange={(e) => setHighlightsInput(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b6b3a] focus:border-transparent"
                  placeholder="Cerrada de Elías, Túneles, Laguna"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Avisos (separados por comas, opcional)
                </label>
                <input
                  type="text"
                  value={warningsInput}
                  onChange={(e) => setWarningsInput(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b6b3a] focus:border-transparent"
                  placeholder="Llevar agua, Fuerte pendiente"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="permit"
                  checked={form.permit}
                  onChange={(e) => setForm({ ...form, permit: e.target.checked })}
                  className="rounded border-gray-300 text-[#1b6b3a] focus:ring-[#1b6b3a]"
                />
                <label htmlFor="permit" className="text-sm font-medium text-gray-700">
                  Requiere permiso
                </label>
              </div>

              {form.permit && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Información del permiso
                  </label>
                  <input
                    type="text"
                    value={form.permitInfo}
                    onChange={(e) => setForm({ ...form, permitInfo: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b6b3a] focus:border-transparent"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Temporada</label>
                <div className="flex flex-wrap gap-3">
                  {seasons.map((s) => (
                    <label key={s} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={form.season.includes(s)}
                        onChange={() => toggleSeason(s)}
                        className="rounded border-gray-300 text-[#1b6b3a] focus:ring-[#1b6b3a]"
                      />
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags (separados por comas)
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b6b3a] focus:border-transparent"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="rounded border-gray-300 text-[#1b6b3a] focus:ring-[#1b6b3a]"
                />
                <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                  Destacada
                </label>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm bg-[#1b6b3a] hover:bg-[#155a2f] text-white rounded-lg font-medium transition-colors"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
