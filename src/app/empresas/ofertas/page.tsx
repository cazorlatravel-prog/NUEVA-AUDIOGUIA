"use client";

import { useState } from "react";

interface OfferForm {
  title: string;
  description: string;
  discountType: string;
  discountValue: string;
  startDate: string;
  endDate: string;
  relatedTo: string;
  terms: string;
}

const emptyForm: OfferForm = {
  title: "",
  description: "",
  discountType: "porcentaje",
  discountValue: "",
  startDate: "",
  endDate: "",
  relatedTo: "",
  terms: "",
};

const relatedOptions = [
  { id: "hotel-sierra", name: "Hotel Sierra de Cazorla", type: "Alojamiento" },
  { id: "apt-iruela", name: "Apartamentos La Iruela", type: "Alojamiento" },
  { id: "kayak", name: "Ruta en kayak por el Guadalquivir", type: "Actividad" },
];

const mockOffers = [
  {
    id: "1",
    title: "Descuento 20% primavera",
    description: "Disfruta de un 20% de descuento en todas las reservas durante la primavera.",
    discountType: "Porcentaje",
    discountValue: "20%",
    startDate: "2026-03-01",
    endDate: "2026-05-31",
    relatedTo: "Hotel Sierra de Cazorla",
    status: "activa" as const,
  },
  {
    id: "2",
    title: "2x1 en kayak",
    description: "Trae un acompañante gratis en nuestra ruta de kayak.",
    discountType: "2x1",
    discountValue: "2x1",
    startDate: "2026-06-01",
    endDate: "2026-08-31",
    relatedTo: "Ruta en kayak por el Guadalquivir",
    status: "programada" as const,
  },
  {
    id: "3",
    title: "Noche extra gratis",
    description: "Reserva 3 noches y la cuarta es gratis.",
    discountType: "Regalo",
    discountValue: "4ª noche gratis",
    startDate: "2025-11-01",
    endDate: "2025-12-31",
    relatedTo: "Hotel Sierra de Cazorla",
    status: "expirada" as const,
  },
];

const statusConfig = {
  activa: { label: "Activa", classes: "bg-green-100 text-green-800" },
  programada: { label: "Programada", classes: "bg-blue-100 text-blue-800" },
  expirada: { label: "Expirada", classes: "bg-gray-100 text-gray-500" },
};

const discountTypeLabels: Record<string, string> = {
  porcentaje: "Porcentaje",
  "precio-fijo": "Precio fijo",
  "2x1": "2x1",
  regalo: "Regalo",
};

export default function OfertasPage() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<OfferForm>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState("");

  const handleOpen = (id?: string) => {
    if (id) {
      const offer = mockOffers.find((o) => o.id === id);
      if (offer) {
        setForm({
          title: offer.title,
          description: offer.description,
          discountType: offer.discountType.toLowerCase(),
          discountValue: offer.discountValue,
          startDate: offer.startDate,
          endDate: offer.endDate,
          relatedTo: offer.relatedTo,
          terms: "",
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
    setSuccessMsg("Oferta guardada correctamente");
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  const updateField = (field: keyof OfferForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mis Ofertas</h1>
          <p className="text-gray-500 text-sm mt-1">Crea y gestiona ofertas especiales para tus servicios</p>
        </div>
        <button
          onClick={() => handleOpen()}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Crear oferta
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockOffers.map((offer) => {
          const status = statusConfig[offer.status];
          return (
            <div key={offer.id} className={`bg-white rounded-xl border border-gray-200 p-5 space-y-3 ${offer.status === "expirada" ? "opacity-60" : ""}`}>
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-gray-900">{offer.title}</h3>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 ml-2 ${status.classes}`}>
                  {status.label}
                </span>
              </div>
              <p className="text-sm text-gray-600">{offer.description}</p>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-green-50 text-green-700 text-sm font-semibold">
                  {offer.discountValue}
                </span>
                <span className="text-xs text-gray-400">{offer.discountType}</span>
              </div>
              <div className="text-xs text-gray-500">
                {formatDate(offer.startDate)} &mdash; {formatDate(offer.endDate)}
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-xs text-gray-400">{offer.relatedTo}</span>
                <button
                  onClick={() => handleOpen(offer.id)}
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
                {editingId ? "Editar oferta" : "Nueva oferta"}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título de la oferta</label>
                <input type="text" value={form.title} onChange={(e) => updateField("title", e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea value={form.description} onChange={(e) => updateField("description", e.target.value)} rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none resize-none" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de descuento</label>
                  <select value={form.discountType} onChange={(e) => updateField("discountType", e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none bg-white">
                    {Object.entries(discountTypeLabels).map(([val, label]) => (
                      <option key={val} value={val}>{label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Valor del descuento</label>
                  <input type="text" value={form.discountValue} onChange={(e) => updateField("discountValue", e.target.value)} placeholder='Ej: 20% o 15€' className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de inicio</label>
                  <input type="date" value={form.startDate} onChange={(e) => updateField("startDate", e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de fin</label>
                  <input type="date" value={form.endDate} onChange={(e) => updateField("endDate", e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Relacionado con</label>
                <select value={form.relatedTo} onChange={(e) => updateField("relatedTo", e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none bg-white">
                  <option value="">Seleccionar...</option>
                  {relatedOptions.map((opt) => (
                    <option key={opt.id} value={opt.name}>{opt.name} ({opt.type})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Condiciones (opcional)</label>
                <textarea value={form.terms} onChange={(e) => updateField("terms", e.target.value)} rows={2} placeholder="Ej: No combinable con otras ofertas. Sujeto a disponibilidad." className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none resize-none" />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 font-medium">
                  Cancelar
                </button>
                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
                  {editingId ? "Guardar cambios" : "Crear oferta"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
