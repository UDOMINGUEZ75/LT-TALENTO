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

      localStorage.setItem("recruiterId", String(data.recruiterId));
      router.push(`/reclutador/dashboard?id=${data.recruiterId}`);
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setErrorMsg("Error de conexión al servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-[#0A1A3A] text-white flex items-center justify-center px-4 sm:px-6 pt-24 pb-16 overflow-hidden">
      
      {/* Efecto de resplandor sutil al fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C9A86A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-md w-full bg-white text-gray-900 p-8 sm:p-10 rounded-3xl shadow-2xl border-t-8 border-[#C9A86A] transition-all">
        
        {/* Encabezado Corporativo Elevado */}
        <div className="text-center mb-8 space-y-2">
          <span className="inline-block px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-widest text-[#0A1A3A] bg-[#FFF9EF] border border-[#C9A86A]/40 rounded-full shadow-sm">
            Portal Organizacional
          </span>
          <h1 className="text-3xl font-black tracking-tight text-[#0A1A3A]">
            Acceso Reclutadores
          </h1>
          <p className="text-xs text-gray-500 font-light">
            LT Talent Solutions • Conectamos talento. Transformamos futuros.
          </p>
        </div>

        {/* Mensaje de Error */}
        {errorMsg && (
          <div className="mb-6 p-3.5 bg-red-50 border border-red-300 text-red-700 rounded-2xl text-center text-xs font-bold animate-pulse">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[11px] font-bold text-[#0A1A3A] mb-1.5 uppercase tracking-wider">
              Correo Electrónico
            </label>
            <input
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="border-2 border-gray-200 p-3.5 rounded-xl w-full bg-gray-50/80 text-gray-900 text-sm font-medium focus:border-[#C9A86A] focus:bg-white focus:ring-2 focus:ring-[#C9A86A]/20 focus:outline-none transition-all shadow-sm"
              placeholder="tu@empresa.com"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#0A1A3A] mb-1.5 uppercase tracking-wider">
              Contraseña
            </label>
            <input
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
              className="border-2 border-gray-200 p-3.5 rounded-xl w-full bg-gray-50/80 text-gray-900 text-sm font-medium focus:border-[#C9A86A] focus:bg-white focus:ring-2 focus:ring-[#C9A86A]/20 focus:outline-none transition-all shadow-sm"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#C9A86A] text-[#0A1A3A] font-black text-sm uppercase tracking-wider rounded-xl hover:bg-[#d8b97a] hover:shadow-lg hover:shadow-[#C9A86A]/30 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50 mt-4 border border-[#C9A86A]/40"
          >
            {loading ? "Verificando..." : "Ingresar a Mi Panel"}
          </button>
        </form>

        <div className="text-center mt-8 pt-4 border-t border-gray-100">
          <Link href="/" className="text-xs font-semibold text-gray-400 hover:text-[#0A1A3A] transition">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function LoginReclutadorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A1A3A] text-[#C9A86A] flex items-center justify-center font-bold">Cargando...</div>}>
      <LoginReclutadorForm />
    </Suspense>
  );
}