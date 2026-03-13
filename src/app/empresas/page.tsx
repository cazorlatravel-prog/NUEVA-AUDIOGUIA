"use client";

const stats = [
  { label: "Alojamientos publicados", value: "2", color: "bg-green-50 text-green-700 border-green-200" },
  { label: "Actividad publicada", value: "1", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { label: "Ofertas activas", value: "3", color: "bg-amber-50 text-amber-700 border-amber-200" },
  { label: "Visualizaciones este mes", value: "1.234", color: "bg-purple-50 text-purple-700 border-purple-200" },
];

const publications = [
  { name: "Hotel Sierra de Cazorla", status: "Publicado", icon: "\u2705" },
  { name: "Apartamentos La Iruela", status: "Pendiente de aprobacion", icon: "\u23F3" },
];

const notifications = [
  { text: "El administrador ha aprobado tu alojamiento 'Hotel Sierra de Cazorla'", time: "Hace 2 horas" },
  { text: "Tienes una nueva valoracion (4.5\u2B50)", time: "Hace 1 dia" },
  { text: "Tu oferta 'Descuento 20% primavera' caduca en 3 dias", time: "Hace 1 dia" },
];

export default function EmpresasDashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
          Bienvenido, Hotel Sierra de Cazorla
        </h1>
        <p className="text-gray-500 mt-1">Resumen de tu actividad en la plataforma</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`rounded-xl border p-5 ${stat.color}`}
          >
            <p className="text-3xl font-bold">{stat.value}</p>
            <p className="text-sm mt-1 opacity-80">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Publications Status */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Estado de tus publicaciones</h2>
        <div className="space-y-3">
          {publications.map((pub) => (
            <div
              key={pub.name}
              className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg"
            >
              <span className="font-medium text-gray-800">{pub.name}</span>
              <span className="text-sm flex items-center gap-1.5">
                <span>{pub.icon}</span>
                <span className="text-gray-600">{pub.status}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Notificaciones</h2>
        <div className="space-y-3">
          {notifications.map((notif, i) => (
            <div
              key={i}
              className="flex items-start gap-3 py-3 px-4 bg-gray-50 rounded-lg"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-gray-800">{notif.text}</p>
                <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
