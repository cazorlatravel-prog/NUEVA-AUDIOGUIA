"use client";

import { useState } from "react";
import { pois as initialPois } from "@/data";
import { PointOfInterest } from "@/lib/types";

const categories: PointOfInterest["category"][] = [
  "monumento",
  "naturaleza",
  "mirador",
  "pueblo",
  "museo",
  "religioso",
  "otro",
];

const emptyPoi: Omit<PointOfInterest, "id" | "slug" | "images"> = {
  name: "",
  category: "monumento",
  description: "",
  shortDescription: "",
  coordinates: { lat: 0, lng: 0 },
  audioUrl: "",
  openingHours: "",
  price: "",
  tags: [],
  featured: false,
};

export default function PoisAdminPage() {
  const [items, setItems] = useState<PointOfInterest[]>(initialPois);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyPoi);
  const [tagsInput, setTagsInput] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyPoi);
    setTagsInput("");
    setModalOpen(true);
  };

  const openEdit = (poi: PointOfInterest) => {
    setEditingId(poi.id);
    setForm({
      name: poi.name,
      category: poi.category,
      description: poi.description,
      shortDescription: poi.shortDescription,
      coordinates: { ...poi.coordinates },
      audioUrl: poi.audioUrl || "",
      openingHours: poi.openingHours || "",
      price: poi.price || "",
      tags: [...poi.tags],
      featured: poi.featured,
    });
    setTagsInput(poi.tags.join(", "));
    setModalOpen(true);
  };

  const handleSave = () => {
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    if (editingId) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? { ...item, ...form, tags }
            : item
        )
      );
    } else {
      const newId = `poi-${Date.now()}`;
      const slug = form.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
      setItems((prev) => [
        ...prev,
        {
          ...form,
          id: newId,
          slug,
          images: [],
          tags,
        } as PointOfInterest,
      ]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    setDeleteConfirm(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Gestión de Puntos de Interés
        </h1>
        <button
          onClick={openCreate}
          className="bg-[#1b6b3a] hover:bg-[#155a2f] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          + Añadir nuevo
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Nombre</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Categoría</th>
              <th className="text-center px-4 py-3 font-semibold text-gray-600">Destacado</th>
              <th className="text-right px-4 py-3 font-semibold text-gray-600">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((poi) => (
              <tr key={poi.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-800">{poi.name}</td>
                <td className="px-4 py-3 text-gray-600 capitalize">{poi.category}</td>
                <td className="px-4 py-3 text-center">
                  {poi.featured ? (
                    <span className="text-yellow-500 text-lg">★</span>
                  ) : (
                    <span className="text-gray-300 text-lg">☆</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button
                    onClick={() => openEdit(poi)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(poi.id)}
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
              ¿Estás seguro de que quieres eliminar este punto de interés? Esta
              acción no se puede deshacer.
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
                {editingId ? "Editar punto de interés" : "Nuevo punto de interés"}
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b6b3a] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoría
                </label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      category: e.target.value as PointOfInterest["category"],
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b6b3a] focus:border-transparent"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b6b3a] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción corta
                </label>
                <input
                  type="text"
                  value={form.shortDescription}
                  onChange={(e) =>
                    setForm({ ...form, shortDescription: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b6b3a] focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Latitud
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={form.coordinates.lat}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        coordinates: {
                          ...form.coordinates,
                          lat: parseFloat(e.target.value) || 0,
                        },
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b6b3a] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Longitud
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={form.coordinates.lng}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        coordinates: {
                          ...form.coordinates,
                          lng: parseFloat(e.target.value) || 0,
                        },
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b6b3a] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL del audio (opcional)
                </label>
                <input
                  type="text"
                  value={form.audioUrl}
                  onChange={(e) =>
                    setForm({ ...form, audioUrl: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b6b3a] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Horario de apertura (opcional)
                </label>
                <input
                  type="text"
                  value={form.openingHours}
                  onChange={(e) =>
                    setForm({ ...form, openingHours: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b6b3a] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Precio (opcional)
                </label>
                <input
                  type="text"
                  value={form.price}
                  onChange={(e) =>
                    setForm({ ...form, price: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b6b3a] focus:border-transparent"
                />
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
                  placeholder="medieval, museo, vistas"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={form.featured}
                  onChange={(e) =>
                    setForm({ ...form, featured: e.target.checked })
                  }
                  className="rounded border-gray-300 text-[#1b6b3a] focus:ring-[#1b6b3a]"
                />
                <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                  Destacado
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
