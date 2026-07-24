"use client";

import { useState } from "react";

export default function RegistroInicio() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMensaje("");

    if (password.length < 6) {
      setMensaje("La contraseña debe tener al menos 6 caracteres.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setMensaje("Las contraseñas no coinciden.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, correo, password }),
      });

      const data = await res.json();

      if (!data.ok) {
        setMensaje(data.message || "Error interno en registro");
        setLoading(false);
        return;
      }

      window.location.href = `/registro/perfil?candidateId=${data.candidateId}`;
    } catch (error) {
      console.error(error);
      setMensaje("Error interno en registro");
    }

    setLoading(false);
  }

  return (
    <section className="max-w-xl mx-auto mt-20 p-8 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#1C4E80]">
        Iniciar Registro
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Nombre completo</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1C4E80]"
            placeholder="Ej. Juan Pérez"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Correo electrónico</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1C4E80]"
            placeholder="ejemplo@correo.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Contraseña</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1C4E80]"
              placeholder="Mínimo 6 caracteres"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 text-sm text-gray-600"
            >
              {showPassword ? "Ocultar" : "Ver"}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Confirmar contraseña</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1C4E80]"
              placeholder="Repite tu contraseña"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-2 text-sm text-gray-600"
            >
              {showConfirmPassword ? "Ocultar" : "Ver"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#1C4E80] text-white rounded-lg hover:bg-[#163B63] transition"
        >
          {loading ? "Registrando..." : "Continuar"}
        </button>

        <button
          type="button"
          onClick={() => (window.location.href = "/")}
          className="w-full py-3 mt-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
        >
          Volver al inicio
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Podrás volver más tarde para completar tu información.
        </p>

        {mensaje && (
          <p className="text-center text-red-600 font-medium mt-2">
            {mensaje}
          </p>
        )}
      </form>
    </section>
  );
}