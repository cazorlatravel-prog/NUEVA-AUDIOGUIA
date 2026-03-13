"use client";

import { useState } from "react";

interface AccommodationForm {
  name: string;
  type: string;
  stars: string;
  description: string;
  shortDescription: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  priceRange: string;
  amenities: string;
  petFriendly: boolean;
  accessible: boolean;
}

const emptyForm: AccommodationForm = {
  name: "",
  type: "hotel",
  stars: "3",
  description: "",
  shortDescription: "",
  address: "",
  phone: "",
  email: "",
  website: "",
  priceRange: "",
  amenities: "",
  petFriendly: false,
  accessible: false,
};

const mockAccommodations = [
  {
    id: "1",
    name: "Hotel Sierra de Cazorla",
    type: "hotel",
    stars: 4,
    priceRange: "80-150\u20AC/noche",
    status: "publicado" as const,
    views: 45,
    bookingClicks: 12,
  },
  {
    id: "2",
    name: "Apartamentos La Iruela",
    type: "apartamento",
    stars: 3,
    priceRange: "60-90\u20AC/noche",
    status: "pendiente" as const,
    views: 0,
    bookingClicks: 0,
  },
];

const typeLabels: Record<string, string> = {
  hotel: "Hotel",
  "casa-rural": "Casa Rural",
  apartamento: "Apartamento",
  camping: "Camping",
  hostal: "Hostal",
  glamping: "Glamping",
};

const statusConfig = {
  publicado: { label: "Publicado", classes: "bg-green-100 text-green-800" },
  pendiente: { label: "Pendiente", classes: "bg-yellow-100 text-yellow-800" },
  rechazado: { label: "Rechazado", classes: "bg-red-100 text-red-800" },
};

export default function AlojamientosPage() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<AccommodationForm>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState("");

  const handleOpen = (id?: string) => {
    if (id) {
      const acc = mockAccommodations.find((a) => a.id === id);
      if (acc) {
        setForm({
          name: acc.name,
          type: acc.type,
          stars: String(acc.stars),
          description: "",
          shortDescription: "",
          address: "",
          phone: "",
          email: "",
          website: "",
          priceRange: acc.priceRange,
          amenities: "",
          petFriendly: false,
          accessible: false,
        });
        setEditingId(id);
      }
    } else {
      setForm(emptyForm);
      setEditingId(null);
    }
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(false);
    setSuccessMsg("Enviado para revision del administrador");
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  const updateField = (field: keyof AccommodationForm, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mis Alojamientos</h1>
          <p className="text-gray-500 text-sm mt-1">Gestiona tus alojamientos publicados</p>
        </div>
        <button
          onClick={() => handleOpen()}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Anadir alojamiento
        </button>
      </div>

      {/* Success Toast */}
      {successMsg && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {successMsg}
        </div>
      )}

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockAccommodations.map((acc) => {
          const status = statusConfig[acc.status];
          return (
            <div key={acc.id} className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{acc.name}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {typeLabels[acc.type] || acc.type} {acc.stars ? `\u2022 ${"★".repeat(acc.stars)}` : ""}
                  </p>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${status.classes}`}>
                  {status.label}
                </span>
              </div>
              <p className="text-sm text-gray-600">{acc.priceRange}</p>
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-xs text-gray-400">
                  {acc.views} visualizaciones | {acc.bookingClicks} clics en reservar
                </span>
                <button
                  onClick={() => handleOpen(acc.id)}
                  className="text-sm text-green-600 hover:text-green-800 font-medium"
                >
                  Editar
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 px-4">
          <div className="fixed inset-0 bg-black/40" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingId ? "Editar alojamiento" : "Nuevo alojamiento"}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <input type="text" value={form.name} onChange={(e) => updateField("name", e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                  <select value={form.type} onChange={(e) => updateField("type", e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none bg-white">
                    {Object.entries(typeLabels).map(([val, label]) => (
                      <option key={val} value={val}>{label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estrellas</label>
                <select value={form.stars} onChange={(e) => updateField("stars", e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none bg-white">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <option key={s} value={s}>{s} {"★".repeat(s)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripcion</label>
                <textarea value={form.description} onChange={(e) => updateField("description", e.target.value)} rows={4} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none resize-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripcion corta</label>
                <input type="text" value={form.shortDescription} onChange={(e) => updateField("shortDescription", e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Direccion</label>
                  <input type="text" value={form.address} onChange={(e) => updateField("address", e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefono</label>
                  <input type="tel" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Web</label>
                  <input type="url" value={form.website} onChange={(e) => updateField("website", e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rango de precios</label>
                  <input type="text" value={form.priceRange} onChange={(e) => updateField("priceRange", e.target.value)} placeholder="Ej: 80-150\u20AC/noche" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Servicios (separados por coma)</label>
                  <input type="text" value={form.amenities} onChange={(e) => updateField("amenities", e.target.value)} placeholder="WiFi, Piscina, Parking..." className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
                </div>
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className={`w-10 h-5 rounded-full relative transition-colors ${form.petFriendly ? "bg-green-500" : "bg-gray-300"}`} onClick={() => updateField("petFriendly", !form.petFriendly)}>
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${form.petFriendly ? "translate-x-5" : "translate-x-0.5"}`} />
                  </div>
                  <span className="text-sm text-gray-700">Admite mascotas</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className={`w-10 h-5 rounded-full relative transition-colors ${form.accessible ? "bg-green-500" : "bg-gray-300"}`} onClick={() => updateField("accessible", !form.accessible)}>
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${form.accessible ? "translate-x-5" : "translate-x-0.5"}`} />
                  </div>
                  <span className="text-sm text-gray-700">Accesible</span>
                </label>
              </div>

              {/* Image Dropzone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Imagenes</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors cursor-pointer">
                  <svg className="w-10 h-10 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm text-gray-500">Arrastra tus fotos aqui</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG hasta 5MB</p>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 font-medium">
                  Cancelar
                </button>
                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
                  {editingId ? "Guardar cambios" : "Enviar para revision"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
