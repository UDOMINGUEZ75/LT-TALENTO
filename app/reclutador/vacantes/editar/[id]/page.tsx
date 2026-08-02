"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

function EditarVacanteForm() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const jobId = params?.id as string;
  const recruiterId = searchParams.get("id") || searchParams.get("recruiterId") || "1";

  const [form, setForm] = useState({
    title: "",
    salary: "",
    location: "Chihuahua, MX",
    description: "",
  });

  const [flyerFile, setFlyerFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Cargar datos reales desde la Base de Datos
  useEffect(() => {
    async function loadJobFromDB() {
      try {
        const res = await fetch(`/api/vacantes/${jobId}`, { cache: "no-store" });
        const data = await res.json();

        if (res.ok && (data.job || data.vacancy)) {
          const job = data.job || data.vacancy;
          setForm({
            title: job.title || "",
            salary: job.salary || "",
            location: job.location || "Chihuahua, MX",
            description: job.description || "",
          });
        } else {
          setErrorMsg(data.error || "No se encontraron los datos de esta vacante en la base de datos.");
        }
      } catch (err) {
        console.error("Error al obtener la vacante:", err);
        setErrorMsg("Error de conexión al cargar la información desde el servidor.");
      } finally {
        setLoading(false);
      }
    }

    if (jobId) {
      loadJobFromDB();
    }
  }, [jobId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Analiza el flyer con IA únicamente si el usuario elige subir uno nuevo
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
    } catch (err: any) {
      console.error("Error al analizar flyer:", err);
      setErrorMsg("No se pudo analizar el flyer automáticamente. Puedes ajustar los campos manualmente.");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSaving(true);

    try {
      const res = await fetch(`/api/vacantes/${jobId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Error al actualizar la vacante en la base de datos");
      }

      alert("¡Vacante actualizada con éxito en la base de datos! 🎉");
      router.push(`/reclutador/mis-vacantes?id=${recruiterId}`);
    } catch (err: any) {
      console.error("Error al guardar cambios:", err);
      setErrorMsg(err.message || "Ocurrió un error al intentar guardar en la base de datos.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A1A3A] text-[#C9A86A] flex items-center justify-center text-lg font-medium">
        Consultando base de datos...
      </div>
    );
  }

  return (
    <section className="w-full min-h-screen bg-[#0A1A3A] text-white flex items-center justify-center px-6 pt-28 pb-16">
      <div className="max-w-xl w-full bg-white text-[#0A1A3A] p-8 rounded-2xl shadow-2xl border border-gray-100">
        
        {/* Encabezado */}
        <div className="text-center mb-6">
          <span className="text-xs font-bold text-[#8c6f33] uppercase tracking-widest block mb-1">
            Edición de Oferta Laboral
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A1A3A]">
            Editar Puesto
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            Datos cargados de la base de datos. Modifíquelos manualmente o suba un flyer para sobrescribir con IA.
          </p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-xl mb-5 text-xs text-center font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Opción para re-analizar flyer */}
          <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl">
            <label className="block text-xs font-bold text-[#0A1A3A] uppercase tracking-wider mb-1">
              Reemplazar o Analizar Nuevo Flyer (Opcional - IA)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFlyerChange}
              className="w-full border p-2 rounded-lg bg-white text-gray-900 text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-[#0A1A3A] file:text-[#C9A86A] hover:file:bg-[#122b5c] cursor-pointer"
            />
            {analyzing && (
              <p className="text-xs text-[#C9A86A] font-semibold mt-2 animate-pulse">
                🤖 Analizando imagen y actualizando campos...
              </p>
            )}
            {flyerFile && !analyzing && (
              <p className="text-xs text-emerald-600 font-semibold mt-2">
                ✓ Flyer analizado correctamente: {flyerFile.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#0A1A3A] mb-1.5">
              Título del Puesto *
            </label>
            <input
              type="text"
              name="title"
              required
              value={form.title}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl bg-gray-50 text-gray-900 text-sm focus:outline-none focus:border-[#C9A86A] transition"
              placeholder="Ej. Auxiliar de Aduanas"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#0A1A3A] mb-1.5">
                Sueldo / Ofrecimiento
              </label>
              <input
                type="text"
                name="salary"
                value={form.salary}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-xl bg-gray-50 text-gray-900 text-sm focus:outline-none focus:border-[#C9A86A] transition"
                placeholder="Ej. De $18,000 a $25,000"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#0A1A3A] mb-1.5">
                Ubicación
              </label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-xl bg-gray-50 text-gray-900 text-sm focus:outline-none focus:border-[#C9A86A] transition"
                placeholder="Ej. Chihuahua, MX"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#0A1A3A] mb-1.5">
              Descripción y Requisitos *
            </label>
            <textarea
              name="description"
              required
              rows={10}
              value={form.description}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl bg-gray-50 text-gray-900 text-xs font-mono focus:outline-none focus:border-[#C9A86A] transition leading-relaxed"
              placeholder="Escriba aquí las actividades, requerimientos y beneficios del puesto..."
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={saving || analyzing}
              className="flex-1 py-3.5 bg-[#0A1A3A] text-[#C9A86A] border border-[#C9A86A]/30 font-bold rounded-xl hover:bg-[#122b5c] transition text-sm shadow-md disabled:opacity-50 cursor-pointer"
            >
              {saving ? "Guardando cambios..." : "Guardar Cambios"}
            </button>
            <Link
              href={`/reclutador/mis-vacantes?id=${recruiterId}`}
              className="px-6 py-3.5 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition text-sm text-center block"
            >
              Cancelar
            </Link>
          </div>
        </form>

        <div className="text-center mt-6">
          <Link
            href={`/reclutador/mis-vacantes?id=${recruiterId}`}
            className="text-xs text-gray-500 hover:underline font-medium"
          >
            ← Volver a Mis Vacantes
          </Link>
        </div>

      </div>
    </section>
  );
}

export default function EditarVacantePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A1A3A] text-white flex items-center justify-center">Cargando...</div>}>
      <EditarVacanteForm />
    </Suspense>
  );
}