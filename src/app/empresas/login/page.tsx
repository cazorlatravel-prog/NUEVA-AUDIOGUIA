"use client";

import { useState } from "react";
import Link from "next/link";

type Tab = "login" | "register";

const businessTypes = [
  "Alojamiento",
  "Actividades",
  "Restauración",
  "Servicios",
  "Otro",
];

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<Tab>("login");

  // Login form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginMsg, setLoginMsg] = useState("");

  // Register form
  const [regName, setRegName] = useState("");
  const [regCif, setRegCif] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regType, setRegType] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regPassword2, setRegPassword2] = useState("");
  const [regTerms, setRegTerms] = useState(false);
  const [regMsg, setRegMsg] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginMsg("Iniciando sesión...");
    setTimeout(() => setLoginMsg(""), 3000);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (regPassword !== regPassword2) {
      setRegMsg("Las contraseñas no coinciden");
      setTimeout(() => setRegMsg(""), 3000);
      return;
    }
    setRegMsg("Solicitud enviada. Recibirás un email cuando sea aprobada.");
    setTimeout(() => setRegMsg(""), 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-green-600 rounded-xl mb-4">
            <span className="text-white font-bold text-xl">GC</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">GUÍA CAZORLA</h1>
          <p className="text-gray-500 text-sm mt-1">Portal de Empresas</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-3 text-sm font-medium text-center transition-colors ${
                activeTab === "login"
                  ? "text-green-700 border-b-2 border-green-600 bg-green-50/50"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`flex-1 py-3 text-sm font-medium text-center transition-colors ${
                activeTab === "register"
                  ? "text-green-700 border-b-2 border-green-600 bg-green-50/50"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Registrarse
            </button>
          </div>

          {/* Login Form */}
          {activeTab === "login" && (
            <form onSubmit={handleLogin} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="tu@empresa.com"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  required
                />
              </div>

              {loginMsg && (
                <p className="text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg px-3 py-2">{loginMsg}</p>
              )}

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                Entrar
              </button>

              <div className="text-center">
                <button type="button" className="text-sm text-green-600 hover:text-green-800 font-medium">
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            </form>
          )}

          {/* Register Form */}
          {activeTab === "register" && (
            <form onSubmit={handleRegister} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la empresa</label>
                <input
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CIF/NIF</label>
                <input
                  type="text"
                  value={regCif}
                  onChange={(e) => setRegCif(e.target.value)}
                  placeholder="B12345678"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <input
                    type="tel"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de negocio</label>
                <select
                  value={regType}
                  onChange={(e) => setRegType(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none bg-white"
                  required
                >
                  <option value="">Seleccionar...</option>
                  {businessTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                <input
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Repetir contraseña</label>
                <input
                  type="password"
                  value={regPassword2}
                  onChange={(e) => setRegPassword2(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  required
                />
              </div>

              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={regTerms}
                  onChange={(e) => setRegTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  required
                />
                <span className="text-sm text-gray-600">
                  Acepto los{" "}
                  <button type="button" className="text-green-600 hover:text-green-800 underline">
                    términos y condiciones
                  </button>
                </span>
              </label>

              {regMsg && (
                <p className={`text-sm rounded-lg px-3 py-2 ${
                  regMsg.includes("no coinciden")
                    ? "text-red-600 bg-red-50 border border-red-200"
                    : "text-green-600 bg-green-50 border border-green-200"
                }`}>
                  {regMsg}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                Registrarse
              </button>

              <p className="text-xs text-gray-400 text-center leading-relaxed">
                Tu solicitud será revisada por el administrador. Recibirás un email cuando sea aprobada.
              </p>
            </form>
          )}
        </div>

        {/* Back link */}
        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
            &larr; Volver a la guía
          </Link>
        </div>
      </div>
    </div>
  );
}
