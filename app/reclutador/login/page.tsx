"use client";

import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

function LoginReclutadorForm() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/reclutador/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Credenciales incorrectas");
        return;
      }

      // Guardamos la sesión en el navegador para que la validación de seguridad la reconozca
      localStorage.setItem("recruiterId", data.recruiterId);

      // Redirige al panel de actualización con su ID correspondiente
      router.push(`/reclutador/actualizar/${data.recruiterId}`);
    } catch (err) {
      console.error("Error:", err);
      setErrorMsg("Error de red al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full min-h-screen bg-[#0A1A3A] text-white flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full bg-white text-[#0A1A3A] p-8 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-black text-center text-[#C9A86A] mb-2">Acceso Reclutadores</h1>
        <p className="text-center text-gray-500 text-sm mb-6">Ingresa tus datos para actualizar tu información</p>

        {errorMsg && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#C9A86A] text-[#0A1A3A] font-bold rounded-xl hover:bg-[#d8b97a] transition shadow-md mt-6"
          >
            {loading ? "Verificando..." : "Ingresar a Actualizar Datos ➔"}
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

export default function LoginReclutadorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A1A3A] text-white flex items-center justify-center">Cargando...</div>}>
      <LoginReclutadorForm />
    </Suspense>
  );
}