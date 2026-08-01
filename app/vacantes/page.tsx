"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

function NuevaVacanteForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const recruiterId = searchParams.get("id");

  const [form, setForm] = useState({
    title: "",
    description: "",
    salary: "",
    location: "Chihuahua, MX",
  });

  const [flyerFile, setFlyerFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ESTA FUNCIÓN ES LA QUE FALTA EN TU CÓDIGO ACTUAL PARA LLAMAR A LA IA
  const handleFlyerChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFlyerFile(file);
    setAnalyzing(true);
    setErrorMsg("");

    try {
      const dataForm = new FormData();
      dataForm.append("flyer", file);

      const res = await fetch("/api/analizar-flyer", {
        method: "POST",
        body: dataForm,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Error al analizar la imagen");
      }

      setForm((prev) => ({
        ...prev,
        title: result.data.title || prev.title,
        salary: result.data.salary || prev.salary,
        description: result.data.description || prev.description,
      }));
    } catch (err) {
      console.error("Error al analizar flyer:", err);
      setErrorMsg("No se pudo analizar el flyer automáticamente. Puedes llenar los datos manualmente.");
    } finally {
      setAnalyzing(false);
    }
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
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("salary", form.salary);
      formData.append("location", form.location);
      formData.append("recruiterId", recruiterId);

      if (flyerFile) {
        formData.append("flyer", flyerFile);
      }

      const res = await fetch("/api/vacantes", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || data.message || "Error al publicar la vacante");
        setLoading(false);
        return;
      }

      alert("¡Vacante publicada con éxito! 🎉");
      router.push(`/reclutador/dashboard?id=${recruiterId}`);
    } catch (err) {
      console.error("Error:", err);
      setErrorMsg("Error de red al publicar la vacante");
      setLoading(false);
    }
  };

  return (
    <section className="w-full min-h-screen bg-[#0A1A3A] text-white flex items-center justify-center px-6 py-12">
      <div className="max-w-xl w-full bg-white text-[#0A1A3A] p-8 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-black text-center text-[#C9A86A] mb-2">Publicar Vacante con Azure AI</h1>
        <p className="text-center text-gray-500 text-sm mb-6">Sube tu flyer y la IA llenará los campos automáticamente</p>

        {errorMsg && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl">
            <label className="block text-sm font-bold text-[#0A1A3A] mb-1">
              Sube tu Flyer Oficial (Análisis Inteligente)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFlyerChange}
              className="w-full border p-2 rounded-lg bg-white text-gray-900 text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-[#0A1A3A] file:text-[#C9A86A] hover:file:bg-[#122b5c] cursor-pointer"
            />
            {analyzing && (
              <p className="text-xs text-[#C9A86A] font-semibold mt-2 animate-pulse">
                🤖 Analizando imagen con Azure OpenAI y estructurando vacante...
              </p>
            )}
            {flyerFile && !analyzing && (
              <p className="text-xs text-emerald-600 font-semibold mt-2">
                ✓ Flyer procesado: {flyerFile.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Título del Puesto</label>
            <input
              name="title"
              required
              value={form.title}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl bg-gray-50 text-gray-900 text-sm focus:outline-none focus:border-[#C9A86A]"
              placeholder="Se llenará automáticamente..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Descripción y Requisitos Estructurados</label>
            <textarea
              name="description"
              required
              rows={12}
              value={form.description}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl bg-gray-50 text-gray-900 text-xs font-mono focus:outline-none focus:border-[#C9A86A]"
              placeholder="El contenido aparecerá estructurado aquí..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold mb-1">Sueldo / Rango</label>
              <input
                name="salary"
                value={form.salary}
                onChange={handleChange}
                className="w-full border p-3 rounded-xl bg-gray-50 text-gray-900 text-sm focus:outline-none focus:border-[#C9A86A]"
                placeholder="Ej. De $18,000 a $25,000"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Ubicación</label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                className="w-full border p-3 rounded-xl bg-gray-50 text-gray-900 text-sm focus:outline-none focus:border-[#C9A86A]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || analyzing}
            className="w-full py-3.5 bg-[#C9A86A] text-[#0A1A3A] font-bold rounded-xl hover:bg-[#d8b97a] transition shadow-md mt-4 cursor-pointer disabled:opacity-50"
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