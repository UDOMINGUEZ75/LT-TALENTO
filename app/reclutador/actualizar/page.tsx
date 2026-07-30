"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ActualizarReclutador() {
  const params = useParams();
  const id = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!id) return;
    async function load() {
      try {
        const res = await fetch(`/api/reclutador/${id}`, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data.recruiter) {
            setForm({
              name: data.recruiter.name || "",
              email: data.recruiter.email || "",
              company: data.recruiter.company || "",
              phone: data.recruiter.phone || "",
            });
          }
        }
      } catch (err) {
        console.error("Error al cargar reclutador:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/reclutador/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Error al actualizar");
        return;
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      console.error("Error:", err);
      alert("Error al guardar cambios");
    }
  };

  if (loading) return <p className="text-white p-10 text-center">Cargando perfil...</p>;

  return (
    <section className="w-full min-h-screen bg-[#0A1A3A] text-white pt-20 pb-24 px-6">
      <div className="max-w-xl mx-auto bg-white text-[#0A1A3A] p-10 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-center text-[#C9A86A] mb-2">Actualizar Datos de Reclutador</h1>
        <p className="text-center text-gray-600 mb-8 font-medium">Gestiona tu información corporativa</p>

        {success && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-xl text-center font-semibold">
            ¡Cambios guardados con éxito! ✅
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
              className="border p-3 rounded-xl w-full bg-gray-50 text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Correo (No modificable)</label>
            <input
              type="email"
              disabled
              value={form.email}
              className="border p-3 rounded-xl w-full bg-gray-200 text-gray-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Empresa</label>
            <input
              name="company"
              value={form.company}
              onChange={handleChange}
              className="border p-3 rounded-xl w-full bg-gray-50 text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Teléfono</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="border p-3 rounded-xl w-full bg-gray-50 text-gray-900"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 py-4 bg-[#C9A86A] text-[#0A1A3A] font-bold text-lg rounded-xl hover:bg-[#d8b97a] transition shadow-md"
            >
              Guardar Cambios 💾
            </button>
            <a
              href="/reclutador/dashboard"
              className="px-6 py-4 bg-[#0A1A3A] text-white font-bold text-lg rounded-xl hover:bg-[#142850] transition text-center"
            >
              Ir al Dashboard →
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}