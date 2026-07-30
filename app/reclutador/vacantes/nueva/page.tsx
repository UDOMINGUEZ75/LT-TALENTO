"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

function NuevaVacanteForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const recruiterId = searchParams.get("id"); // Capturamos el ID del reclutador por URL

  const [form, setForm] = useState({
    title: "",
    description: "",
    salary: "",
    location: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!recruiterId) {
      setErrorMsg("No se encontró el ID del reclutador. Por favor, ingresa de nuevo desde tu dashboard.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/vacantes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          recruiterId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Error al publicar la vacante");
        return;
      }

      alert("¡Vacante publicada con éxito! 🎉");
      router.push(`/reclutador/dashboard?id=${recruiterId}`);
    } catch (err) {
      console.error("Error:", err);
      setErrorMsg("Error de red al publicar la vacante");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full min-h-screen bg-[#0A1A3A] text-white flex items-center justify-center px-6 py-12">
      <div className="max-w-lg w-full bg-white text-[#0A1A3A] p-8 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-black text-center text-[#C9A86A] mb-2">Publicar Nueva Vacante</h1>
        <p className="text-center text-gray-500 text-sm mb-6">Crea una oferta laboral detallada para atraer mejores candidatos</p>

        {errorMsg && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Título del Puesto</label>
            <input
              name="title"
              required
              value={form.title}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl bg-gray-50 text-gray-900 text-sm"
              placeholder="Ej. Desarrollador Frontend Senior"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Descripción y Requisitos</label>
            <textarea
              name="description"
              required
              rows={4}
              value={form.description}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl bg-gray-50 text-gray-900 text-sm"
              placeholder="Detalla las responsabilidades, tecnologías y experiencia requerida..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Sueldo / Rango Salarial</label>
            <input
              name="salary"
              value={form.salary}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl bg-gray-50 text-gray-900 text-sm"
              placeholder="Ej. $30,000 - $40,000 MXN mensuales"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Ubicación / Modalidad</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl bg-gray-50 text-gray-900 text-sm"
              placeholder="Ej. Remoto, Ciudad de México, etc."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#C9A86A] text-[#0A1A3A] font-bold rounded-xl hover:bg-[#d8b97a] transition shadow-md mt-6"
          >
            {loading ? "Publicando..." : "Publicar Vacante 📢"}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link href={recruiterId ? `/reclutador/dashboard?id=${recruiterId}` : "/"} className="text-xs text-gray-500 hover:underline">
            ← Volver al Dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function NuevaVacantePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A1A3A] text-white flex items-center justify-center">Cargando...</div>}>
      <NuevaVacanteForm />
    </Suspense>
  );
}