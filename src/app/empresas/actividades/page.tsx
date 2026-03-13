"use client";

import { useState } from "react";

interface ActivityForm {
  name: string;
  category: string;
  description: string;
  shortDescription: string;
  provider: string;
  phone: string;
  email: string;
  website: string;
  price: string;
  duration: string;
  schedule: string;
  minAge: string;
  maxPeople: string;
  bookingUrl: string;
  tags: string;
}

const emptyForm: ActivityForm = {
  name: "",
  category: "aventura",
  description: "",
  shortDescription: "",
  provider: "Hotel Sierra de Cazorla",
  phone: "",
  email: "",
  website: "",
  price: "",
  duration: "",
  schedule: "",
  minAge: "",
  maxPeople: "",
  bookingUrl: "",
  tags: "",
};

const mockActivities = [
  {
    id: "1",
    name: "Ruta en kayak por el Guadalquivir",
    category: "acuatica",
    price: "35€/persona",
    duration: "3 horas",
    status: "publicado" as const,
    views: 78,
    bookingClicks: 23,
  },
  {
    id: "2",
    name: "Senderismo guiado Cerrada de Elías",
    category: "naturaleza",
    price: "20€/persona",
    duration: "4 horas",
    status: "pendiente" as const,
    views: 0,
    bookingClicks: 0,
  },
];

const categoryLabels: Record<string, string> = {
  aventura: "Aventura",
  naturaleza: "Naturaleza",
  cultural: "Cultural",
  gastronomia: "Gastronomía",
  familiar: "Familiar",
  acuatica: "Acuática",
};

const statusConfig = {
  publicado: { label: "Publicado", classes: "bg-green-100 text-green-800" },
  pendiente: { label: "Pendiente", classes: "bg-yellow-100 text-yellow-800" },
  rechazado: { label: "Rechazado", classes: "bg-red-100 text-red-800" },
};

export default function ActividadesPage() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<ActivityForm>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState("");

  const handleOpen = (id?: string) => {
    if (id) {
      const act = mockActivities.find((a) => a.id === id);
      if (act) {
        setForm({
          ...emptyForm,
          name: act.name,
          category: act.category,
          price: act.price,
          duration: act.duration,
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
    setSuccessMsg("Enviado para revisión del administrador");
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  const updateField = (field: keyof ActivityForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mis Actividades</h1>
          <p className="text-gray-500 text-sm mt-1">Gestiona las actividades que ofreces</p>
        </div>
        <button
          onClick={() => handleOpen()}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Añadir actividad
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
        {mockActivities.map((act) => {
          const status = statusConfig[act.status];
          return (
            <div key={act.id} className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{act.name}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {categoryLabels[act.category] || act.category} &bull; {act.duration}
                  </p>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${status.classes}`}>
                  {status.label}
                </span>
              </div>
              <p className="text-sm text-gray-600 font-medium">{act.price}</p>
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-xs text-gray-400">
                  {act.views} visualizaciones | {act.bookingClicks} clics en reservar
                </span>
                <button
                  onClick={() => handleOpen(act.id)}
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
                {editingId ? "Editar actividad" : "Nueva actividad"}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                  <select value={form.category} onChange={(e) => updateField("category", e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none bg-white">
                    {Object.entries(categoryLabels).map(([val, label]) => (
                      <option key={val} value={val}>{label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea value={form.description} onChange={(e) => updateField("description", e.target.value)} rows={4} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none resize-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción corta</label>
                <input type="text" value={form.shortDescription} onChange={(e) => updateField("shortDescription", e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Empresa / Proveedor</label>
                  <input type="text" value={form.provider} onChange={(e) => updateField("provider", e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
                  <input type="text" value={form.price} onChange={(e) => updateField("price", e.target.value)} placeholder="Ej: 35€/persona" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duración</label>
                  <input type="text" value={form.duration} onChange={(e) => updateField("duration", e.target.value)} placeholder="Ej: 3 horas" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Horario</label>
                  <input type="text" value={form.schedule} onChange={(e) => updateField("schedule", e.target.value)} placeholder="Ej: 10:00 - 13:00" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Edad mínima</label>
                  <input type="number" value={form.minAge} onChange={(e) => updateField("minAge", e.target.value)} placeholder="Ej: 8" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Máximo de personas</label>
                  <input type="number" value={form.maxPeople} onChange={(e) => updateField("maxPeople", e.target.value)} placeholder="Ej: 15" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL de reserva</label>
                <input type="url" value={form.bookingUrl} onChange={(e) => updateField("bookingUrl", e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Etiquetas (separadas por coma)</label>
                <input type="text" value={form.tags} onChange={(e) => updateField("tags", e.target.value)} placeholder="Kayak, Río, Aventura..." className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
              </div>

              {/* Image Dropzone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Imágenes</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors cursor-pointer">
                  <svg className="w-10 h-10 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm text-gray-500">Arrastra tus fotos aquí</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG hasta 5MB</p>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 font-medium">
                  Cancelar
                </button>
                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
                  {editingId ? "Guardar cambios" : "Enviar para revisión"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
