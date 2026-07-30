"use client";

import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

function RegistroReclutadorForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (form.password !== form.confirmPassword) {
      setErrorMsg("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/reclutador/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          company: form.company,
          phone: form.phone,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Error al registrarse");
        return;
      }

      alert("¡Registro de reclutador exitoso!");
      // Redirige correctamente al dashboard pasando el ID por query string
      router.push(`/reclutador/dashboard?id=${data.recruiterId}`);
    } catch (err) {
      console.error("Error:", err);
      setErrorMsg("Error de red al registrarse");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full min-h-screen bg-[#0A1A3A] text-white flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full bg-white text-[#0A1A3A] p-8 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-black text-center text-[#C9A86A] mb-2">Registro de Reclutador</h1>
        <p className="text-center text-gray-500 text-sm mb-6">Crea tu cuenta corporativa para gestionar vacantes</p>

        {errorMsg && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Nombre Completo</label>
            <input
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl bg-gray-50 text-gray-900 text-sm"
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
              className="w-full border p-3 rounded-xl bg-gray-50 text-gray-900 text-sm"
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
              className="w-full border p-3 rounded-xl bg-gray-50 text-gray-900 text-sm"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Confirmar Contraseña</label>
            <input
              name="confirmPassword"
              type="password"
              required
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl bg-gray-50 text-gray-900 text-sm"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Empresa</label>
            <input
              name="company"
              value={form.company}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl bg-gray-50 text-gray-900 text-sm"
              placeholder="Nombre de la empresa"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Teléfono</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl bg-gray-50 text-gray-900 text-sm"
              placeholder="6141234567"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#C9A86A] text-[#0A1A3A] font-bold rounded-xl hover:bg-[#d8b97a] transition shadow-md mt-6"
          >
            {loading ? "Registrando..." : "Crear Cuenta de Reclutador 1 🚀"}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link href="/" className="text-xs text-gray-500 hover:underline">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function RegistroReclutadorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A1A3A] text-white flex items-center justify-center">Cargando...</div>}>
      <RegistroReclutadorForm />
    </Suspense>
  );
}