"use client";

interface HomeSectionProps {
  onNavigate: (tab: string) => void;
}

const quickAccessCards = [
  {
    emoji: "\u{1F441}\uFE0F",
    title: "Que Ver",
    description: "Monumentos, miradores y naturaleza",
    tab: "que-ver",
  },
  {
    emoji: "\u{1F97E}",
    title: "Rutas y Senderos",
    description: "Senderismo, bici y 4x4",
    tab: "rutas",
  },
  {
    emoji: "\u{1F3A7}",
    title: "Audioguia",
    description: "Escucha la historia de Cazorla",
    tab: "audioguia",
  },
  {
    emoji: "\u{1F3AF}",
    title: "Actividades",
    description: "Aventura, cultura y gastronomia",
    tab: "actividades",
  },
  {
    emoji: "\u{1F3E8}",
    title: "Alojamiento",
    description: "Hoteles, casas rurales y camping",
    tab: "alojamientos",
  },
  {
    emoji: "\u{1F3AA}",
    title: "Eventos",
    description: "Fiestas, mercados y cultura",
    tab: "eventos",
  },
];

const parkStats = [
  { value: "214.300 ha", label: "Superficie" },
  { value: "+1.300", label: "Especies vegetales" },
  { value: "209 km", label: "Senderos señalizados" },
  { value: "Desde 1986", label: "Patrimonio UNESCO" },
];

export default function HomeSection({ onNavigate }: HomeSectionProps) {
  return (
    <div className="flex flex-col gap-8 pb-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] px-6 py-16 text-center text-white">
        <h1 className="mb-3 text-4xl font-extrabold tracking-tight">
          Bienvenido a Cazorla
        </h1>
        <p className="mb-4 text-xl font-semibold text-white/90">
          Descubre el Parque Natural más grande de España
        </p>
        <p className="mx-auto mb-8 max-w-lg text-sm leading-relaxed text-white/80">
          Tu guía turística oficial con audioguías, rutas, actividades y toda la
          información que necesitas para disfrutar de la Sierra de Cazorla,
          Segura y Las Villas
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            onClick={() => onNavigate("que-ver")}
            className="w-full rounded-full bg-white px-8 py-3 font-semibold text-[var(--color-primary-dark)] shadow-lg transition hover:scale-105 hover:bg-white/90 sm:w-auto"
          >
            Explorar Qué Ver
          </button>
          <button
            onClick={() => onNavigate("rutas")}
            className="w-full rounded-full border-2 border-white px-8 py-3 font-semibold text-white transition hover:scale-105 hover:bg-white/10 sm:w-auto"
          >
            Ver Rutas
          </button>
        </div>
      </section>

      {/* Quick Access Grid */}
      <section className="px-4">
        <h2 className="mb-5 text-center text-2xl font-bold text-gray-800">
          Explora Cazorla
        </h2>
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 lg:grid-cols-3">
          {quickAccessCards.map((card) => (
            <button
              key={card.tab}
              onClick={() => onNavigate(card.tab)}
              className="flex flex-col items-center rounded-xl bg-white p-4 shadow-md transition hover:scale-105 hover:shadow-lg"
            >
              <span className="mb-2 text-4xl">{card.emoji}</span>
              <span className="text-sm font-bold text-gray-800">
                {card.title}
              </span>
              <span className="mt-1 text-center text-xs text-gray-500">
                {card.description}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Park Stats */}
      <section className="px-4">
        <h2 className="mb-5 text-center text-2xl font-bold text-gray-800">
          Datos del Parque
        </h2>
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
          {parkStats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center rounded-xl bg-[var(--color-primary)] p-5 text-center text-white shadow-md"
            >
              <span className="text-2xl font-extrabold leading-tight">
                {stat.value}
              </span>
              <span className="mt-1 text-xs font-medium text-white/80">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
