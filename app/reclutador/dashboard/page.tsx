"use client";

import { useEffect, useState } from "react";

export default function ReclutadorDashboard() {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchCandidates() {
      try {
        const res = await fetch("/api/reclutador/candidatos", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setCandidates(data.candidates || []);
        }
      } catch (err) {
        console.error("Error cargando candidatos:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCandidates();
  }, []);

  const filteredCandidates = candidates.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.preferences?.area?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#0A1A3A] text-white flex items-center justify-center">
        <p className="text-xl font-semibold animate-pulse">Cargando panel de reclutamiento...</p>
      </div>
    );
  }

  return (
    <section className="w-full min-h-screen bg-[#0A1A3A] text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 border-b border-[#C9A86A]/40 pb-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#C9A86A]">
              Panel Interno • LT Talento
            </span>
            <h1 className="text-3xl font-black mt-1">Dashboard de Reclutamiento</h1>
            <p className="text-gray-300 text-sm mt-1">
              Total de candidatos registrados: <strong className="text-[#C9A86A]">{candidates.length}</strong>
            </p>
          </div>

          <a
            href="/"
            className="px-5 py-2.5 bg-gray-800 text-white font-semibold text-sm rounded-xl hover:bg-gray-700 transition border border-gray-600"
          >
            ← Volver al Inicio
          </a>
        </div>

        {/* Buscador */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Buscar por nombre, correo o área de especialidad..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-96 px-4 py-3 rounded-xl bg-white text-[#0A1A3A] placeholder-gray-500 font-medium focus:outline-none focus:ring-2 focus:ring-[#C9A86A] shadow-md"
          />
        </div>

        {/* Tabla / Grid de Candidatos */}
        {filteredCandidates.length === 0 ? (
          <div className="bg-white text-[#0A1A3A] p-12 rounded-2xl text-center shadow-xl">
            <p className="text-lg font-bold text-gray-700">No se encontraron candidatos registrados.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCandidates.map((c) => (
              <div key={c.id} className="bg-white text-[#0A1A3A] p-6 rounded-2xl shadow-xl flex flex-col justify-between border-t-4 border-[#C9A86A]">
                <div>
                  <div className="flex justify-between items-start gap-2 mb-3">
                    <h3 className="text-lg font-bold text-[#0A1A3A]">{c.name}</h3>
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                      c.status === "Completado" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {c.status}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 mb-4 font-medium">{c.email}</p>

                  <div className="space-y-2 text-xs text-gray-700 mb-6 bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <p><strong>Ubicación:</strong> {c.personal?.city || "N/A"}, {c.personal?.state || "N/A"}</p>
                    <p><strong>Área:</strong> {c.preferences?.area || "No especificada"}</p>
                    <p><strong>Puesto:</strong> {c.experience?.position || "N/A"}</p>
                    <p><strong>Expectativa:</strong> ${c.preferences?.salary || "N/A"}</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-2 border-t border-gray-100">
                  <a
                    href={`/candidatos/brief/${c.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 bg-[#0A1A3A] text-white text-center text-xs font-bold rounded-lg hover:bg-[#142850] transition"
                  >
                    Ver Brief 📄
                  </a>
                  <a
                    href={`/candidatos/actualizar/${c.id}`}
                    className="px-4 py-2.5 bg-gray-100 text-gray-800 text-center text-xs font-bold rounded-lg hover:bg-gray-200 transition"
                  >
                    Editar ⚙️
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}