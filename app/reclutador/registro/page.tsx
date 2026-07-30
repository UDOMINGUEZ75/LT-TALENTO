"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegistroReclutador() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    company: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/reclutador/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Error al registrarse");
        return;
      }

      alert("¡Registro de reclutador exitoso!");
      router.push(`/reclutador/actualizar/${data.recruiterId}`);
    } catch (err) {
      console.error("Error:", err);
      alert("Error de red al registrarse");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full min-h-screen bg-[#0A1A3A] text-white flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full bg-white text-[#0A1A3A] p-8 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-black text-center text-[#C9A86A] mb-2">Registro de Reclutador</h1>
        <p className="text-center text-gray-500 text-sm mb-8">Únete a LT Talento para gestionar vacantes y candidatos</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Nombre Completo</label>
            <input
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl bg-gray-50 text-gray-900"
              placeholder="Ej. Ana Pérez"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Correo Electrónico</label>
            <input
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl bg-gray-50 text-gray-900"
              placeholder="ana@empresa.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Contraseña</label>
            <input
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl bg-gray-50 text-gray-900"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Empresa</label>
            <input
              name="company"
              value={form.company}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl bg-gray-50 text-gray-900"
              placeholder="Nombre de la empresa"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Teléfono</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl bg-gray-50 text-gray-900"
              placeholder="6141234567"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#C9A86A] text-[#0A1A3A] font-bold rounded-xl hover:bg-[#d8b97a] transition shadow-md mt-6"
          >
            {loading ? "Registrando..." : "Crear Cuenta de Reclutador 🚀"}
          </button>
        </form>
      </div>
    </section>
  );
}