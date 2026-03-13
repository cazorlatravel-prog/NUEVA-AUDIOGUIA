import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Guía Cazorla - Guía Turística Oficial del Parque Natural",
  description:
    "Descubre Cazorla y el Parque Natural de las Sierras de Cazorla, Segura y Las Villas. Rutas, audioguías, alojamientos, actividades, eventos y toda la información turística que necesitas.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1b6b3a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
