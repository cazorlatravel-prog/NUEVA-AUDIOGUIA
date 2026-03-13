"use client";

const stats = [
  { label: "Puntos de Interés", count: 8, icon: "👁️", color: "bg-blue-500" },
  { label: "Rutas", count: 6, icon: "🥾", color: "bg-green-600" },
  { label: "Alojamientos", count: 6, icon: "🏨", color: "bg-purple-500" },
  { label: "Eventos", count: 4, icon: "🎪", color: "bg-orange-500" },
];

const quickActions = [
  { label: "Añadir punto de interés", href: "/admin/pois", color: "bg-blue-500 hover:bg-blue-600" },
  { label: "Añadir ruta", href: "/admin/rutas", color: "bg-green-600 hover:bg-green-700" },
  { label: "Añadir evento", href: "/admin/eventos", color: "bg-orange-500 hover:bg-orange-600" },
  { label: "Añadir alojamiento", href: "/admin/alojamientos", color: "bg-purple-500 hover:bg-purple-600" },
];

const recentActivity = [
  { time: "Hace 2h", text: "Se actualizó 'Castillo de la Yedra'" },
  { time: "Hace 5h", text: "Nuevo evento: 'Mercado Medieval'" },
  { time: "Ayer", text: "Nueva ruta: 'Sendero del Río Borosa'" },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Panel de Administración
      </h1>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-lg shadow-sm p-5 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">{stat.icon}</span>
              <span
                className={`${stat.color} text-white text-2xl font-bold rounded-lg w-12 h-12 flex items-center justify-center`}
              >
                {stat.count}
              </span>
            </div>
            <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Acciones rápidas
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {quickActions.map((action) => (
          <a
            key={action.label}
            href={action.href}
            className={`${action.color} text-white rounded-lg shadow-sm p-4 text-center text-sm font-medium transition-colors`}
          >
            {action.label}
          </a>
        ))}
      </div>

      {/* Recent activity */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Actividad reciente
      </h2>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {recentActivity.map((item, index) => (
          <div
            key={index}
            className={`px-5 py-4 flex items-start gap-3 ${
              index !== recentActivity.length - 1
                ? "border-b border-gray-100"
                : ""
            }`}
          >
            <span className="text-xs text-gray-400 font-medium whitespace-nowrap mt-0.5 min-w-[60px]">
              {item.time}
            </span>
            <span className="text-sm text-gray-700">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
