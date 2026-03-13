"use client";

import { useState } from "react";
import { services as initialServices } from "@/data";
import { Service } from "@/lib/types";

const serviceCategories: Service["category"][] = [
  "farmacia",
  "emergencia",
  "transporte",
  "salud",
  "administracion",
  "gasolinera",
  "cajero",
  "parking",
  "wifi",
  "oficina-turismo",
];

interface ServiceForm {
  name: string;
  category: Service["category"];
  address: string;
  phone: string;
  coordinatesLat: string;
  coordinatesLng: string;
  openingHours: string;
  notes: string;
  isEmergency: boolean;
}

const emptyForm: ServiceForm = {
  name: "",
  category: "farmacia",
  address: "",
  phone: "",
  coordinatesLat: "",
  coordinatesLng: "",
  openingHours: "",
  notes: "",
  isEmergency: false,
};

export default function ServiciosAdminPage() {
  const [items, setItems] = useState<Service[]>(initialServices);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ServiceForm>(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (service: Service) => {
    setEditingId(service.id);
    setForm({
      name: service.name,
      category: service.category,
      address: service.address,
      phone: service.phone || "",
      coordinatesLat: service.coordinates?.lat?.toString() || "",
      coordinatesLng: service.coordinates?.lng?.toString() || "",
      openingHours: service.openingHours || "",
      notes: service.notes || "",
      isEmergency: service.isEmergency,
    });
    setModalOpen(true);
  };

  const handleSave = () => {
    const hasCoords = form.coordinatesLat && form.coordinatesLng;
    const coordinates = hasCoords
      ? { lat: parseFloat(form.coordinatesLat), lng: parseFloat(form.coordinatesLng) }
      : undefined;

    if (editingId) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                name: form.name,
                category: form.category,
                address: form.address,
                phone: form.phone || undefined,
                coordinates,
                openingHours: form.openingHours || undefined,
                notes: form.notes || undefined,
                isEmergency: form.isEmergency,
              }
            : item
        )
      );
    } else {
      const newId = `serv-${Date.now()}`;
      const newService: Service = {
        id: newId,
        name: form.name,
        category: form.category,
        address: form.address,
        phone: form.phone || undefined,
        coordinates,
        openingHours: form.openingHours || undefined,
        notes: form.notes || undefined,
        isEmergency: form.isEmergency,
      };
      setItems((prev) => [...prev, newService]);
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
        <h1 className="text-2xl font-bold text-gray-800">Gestión de Servicios</h1>
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
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Teléfono</th>
              <th className="text-center px-4 py-3 font-semibold text-gray-600">Emergencia</th>
              <th className="text-right px-4 py-3 font-semibold text-gray-600">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((service) => (
              <tr key={service.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-800">{service.name}</td>
                <td className="px-4 py-3 text-gray-600 capitalize">
                  {service.category.replace("-", " ")}
                </td>
                <td className="px-4 py-3 text-gray-600">{service.phone || "-"}</td>
                <td className="px-4 py-3 text-center">
                  {service.isEmergency ? (
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                      Emergencia
                    </span>
                  ) : (
                    <span className="text-gray-400 text-sm">-</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button
                    onClick={() => openEdit(service)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(service.id)}
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
              ¿Estás seguro de que quieres eliminar este servicio? Esta acción no se puede deshacer.
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
                {editingId ? "Editar servicio" : "Nuevo servicio"}
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value as Service["category"] })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b6b3a] focus:border-transparent"
                >
                  {serviceCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1).replace("-", " ")}
                    </option>
                  ))}
                </select>
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b6b3a] focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Latitud (opcional)</label>
                  <input
                    type="text"
                    value={form.coordinatesLat}
                    onChange={(e) => setForm({ ...form, coordinatesLat: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b6b3a] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Longitud (opcional)</label>
                  <input
                    type="text"
                    value={form.coordinatesLng}
                    onChange={(e) => setForm({ ...form, coordinatesLng: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b6b3a] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Horario (opcional)</label>
                <input
                  type="text"
                  value={form.openingHours}
                  onChange={(e) => setForm({ ...form, openingHours: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b6b3a] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notas (opcional)</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={2}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b6b3a] focus:border-transparent"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isEmergency"
                  checked={form.isEmergency}
                  onChange={(e) => setForm({ ...form, isEmergency: e.target.checked })}
                  className="rounded border-gray-300 text-[#1b6b3a] focus:ring-[#1b6b3a]"
                />
                <label htmlFor="isEmergency" className="text-sm font-medium text-gray-700">
                  Es servicio de emergencia
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
