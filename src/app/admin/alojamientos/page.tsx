"use client";

import { useState } from "react";
import { accommodations as initialAccommodations } from "@/data";
import { Accommodation } from "@/lib/types";

const accommodationTypes: Accommodation["type"][] = [
  "hotel",
  "casa-rural",
  "apartamento",
  "camping",
  "hostal",
  "glamping",
];

interface AccommodationForm {
  name: string;
  type: Accommodation["type"];
  stars: number;
  description: string;
  shortDescription: string;
  address: string;
  coordinates: { lat: number; lng: number };
  phone: string;
  email: string;
  website: string;
  priceRange: string;
  amenities: string[];
  bookingUrl: string;
  petFriendly: boolean;
  accessible: boolean;
  featured: boolean;
}

const emptyForm: AccommodationForm = {
  name: "",
  type: "hotel",
  stars: 0,
  description: "",
  shortDescription: "",
  address: "",
  coordinates: { lat: 0, lng: 0 },
  phone: "",
  email: "",
  website: "",
  priceRange: "",
  amenities: [],
  bookingUrl: "",
  petFriendly: false,
  accessible: false,
  featured: false,
};

export default function AlojamientosAdminPage() {
  const [items, setItems] = useState<Accommodation[]>(initialAccommodations);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<AccommodationForm>(emptyForm);
  const [amenitiesInput, setAmenitiesInput] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setAmenitiesInput("");
    setModalOpen(true);
  };

  const openEdit = (acc: Accommodation) => {
    setEditingId(acc.id);
    setForm({
      name: acc.name,
      type: acc.type,
      stars: acc.stars || 0,
      description: acc.description,
      shortDescription: acc.shortDescription,
      address: acc.address,
      coordinates: { ...acc.coordinates },
      phone: acc.phone,
      email: acc.email || "",
      website: acc.website || "",
      priceRange: acc.priceRange,
      amenities: [...acc.amenities],
      bookingUrl: acc.bookingUrl || "",
      petFriendly: acc.petFriendly,
      accessible: acc.accessible,
      featured: acc.featured,
    });
    setAmenitiesInput(acc.amenities.join(", "));
    setModalOpen(true);
  };

  const handleSave = () => {
    const amenities = amenitiesInput.split(",").map((t) => t.trim()).filter(Boolean);

    if (editingId) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                ...form,
                stars: form.stars > 0 ? form.stars : undefined,
                email: form.email || undefined,
                website: form.website || undefined,
                bookingUrl: form.bookingUrl || undefined,
                amenities,
              }
            : item
        )
      );
    } else {
      const newId = `aloj-${Date.now()}`;
      const slug = form.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      const newAcc: Accommodation = {
        id: newId,
        slug,
        name: form.name,
        type: form.type,
        stars: form.stars > 0 ? form.stars : undefined,
        description: form.description,
        shortDescription: form.shortDescription,
        images: [],
        address: form.address,
        coordinates: form.coordinates,
        phone: form.phone,
        email: form.email || undefined,
        website: form.website || undefined,
        priceRange: form.priceRange,
        amenities,
        bookingUrl: form.bookingUrl || undefined,
        petFriendly: form.petFriendly,
        accessible: form.accessible,
        featured: form.featured,
      };
      setItems((prev) => [...prev, newAcc]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    setDeleteConfirm(null);
  };

  const renderStars = (count?: number) => {
    if (!count) return <span className="text-gray-400 text-sm">-</span>;
    return <span className="text-yellow-500">{"★".repeat(count)}{"☆".repeat(5 - count)}</span>;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gestión de Alojamientos</h1>
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
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Tipo</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Estrellas</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Precio</th>
              <th className="text-center px-4 py-3 font-semibold text-gray-600">Pet-friendly</th>
              <th className="text-center px-4 py-3 font-semibold text-gray-600">Accesible</th>
              <th className="text-right px-4 py-3 font-semibold text-gray-600">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((acc) => (
              <tr key={acc.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-800">{acc.name}</td>
                <td className="px-4 py-3 text-gray-600 capitalize">{acc.type.replace("-", " ")}</td>
                <td className="px-4 py-3">{renderStars(acc.stars)}</td>
                <td className="px-4 py-3 text-gray-600">{acc.priceRange}</td>
                <td className="px-4 py-3 text-center">
                  {acc.petFriendly ? (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">Sí</span>
                  ) : (
                    <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full font-medium">No</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  {acc.accessible ? (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">Sí</span>
                  ) : (
                    <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full font-medium">No</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button
                    onClick={() => openEdit(acc)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(acc.id)}
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
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Confirmar eliminación</h3>
            <p className="text-sm text-gray-600 mb-4">
              ¿Estás seguro de que quieres eliminar este alojamiento? Esta acción no se puede deshacer.
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
                {editingId ? "Editar alojamiento" : "Nuevo alojamiento"}
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
                    onChange={(e) => setForm({ ...form, type: e.target.value as Accommodation["type"] })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b6b3a] focus:border-transparent"
                  >
                    {accommodationTypes.map((t) => (
                      <option key={t} value={t}>
                        {t.charAt(0).toUpperCase() + t.slice(1).replace("-", " ")}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estrellas (1-5, opcional)</label>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    value={form.stars}
                    onChange={(e) => setForm({ ...form, stars: parseInt(e.target.value) || 0 })}
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
                <input
                  type="text"
                  value={form.shortDescription}
                  onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b6b3a] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b6b3a] focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Latitud</label>
                  <input
                    type="number"
                    step="any"
                    value={form.coordinates.lat}
                    onChange={(e) => setForm({ ...form, coordinates: { ...form.coordinates, lat: parseFloat(e.target.value) || 0 } })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b6b3a] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Longitud</label>
                  <input
                    type="number"
                    step="any"
                    value={form.coordinates.lng}
                    onChange={(e) => setForm({ ...form, coordinates: { ...form.coordinates, lng: parseFloat(e.target.value) || 0 } })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b6b3a] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b6b3a] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b6b3a] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Web</label>
                  <input
                    type="text"
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b6b3a] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rango de precios</label>
                <input
                  type="text"
                  value={form.priceRange}
                  onChange={(e) => setForm({ ...form, priceRange: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b6b3a] focus:border-transparent"
                  placeholder="80€ - 160€/noche"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Servicios (separados por comas)
                </label>
                <input
                  type="text"
                  value={amenitiesInput}
                  onChange={(e) => setAmenitiesInput(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b6b3a] focus:border-transparent"
                  placeholder="WiFi, Piscina, Restaurante"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL de reserva</label>
                <input
                  type="text"
                  value={form.bookingUrl}
                  onChange={(e) => setForm({ ...form, bookingUrl: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b6b3a] focus:border-transparent"
                />
              </div>

              <div className="flex flex-wrap gap-6">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.petFriendly}
                    onChange={(e) => setForm({ ...form, petFriendly: e.target.checked })}
                    className="rounded border-gray-300 text-[#1b6b3a] focus:ring-[#1b6b3a]"
                  />
                  <span className="font-medium text-gray-700">Pet-friendly</span>
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.accessible}
                    onChange={(e) => setForm({ ...form, accessible: e.target.checked })}
                    className="rounded border-gray-300 text-[#1b6b3a] focus:ring-[#1b6b3a]"
                  />
                  <span className="font-medium text-gray-700">Accesible</span>
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    className="rounded border-gray-300 text-[#1b6b3a] focus:ring-[#1b6b3a]"
                  />
                  <span className="font-medium text-gray-700">Destacado</span>
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
