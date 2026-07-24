"use client";

import { useEffect, useState } from "react";

export default function RegistroAnalisis() {
  const [candidateId, setCandidateId] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("candidateId");
    setCandidateId(id);

    async function analizar() {
      try {
        const res = await fetch(`/api/analyze?candidateId=${id}`, {
          method: "POST",
        });

        const data = await res.json();

        if (!data.ok) {
          setMensaje(data.message || "Error al analizar el CV.");
          setLoading(false);
          return;
        }

        // Redirigir al dashboard
        window.location.href = `/registro/dashboard?candidateId=${id}`;
      } catch (error) {
        console.error(error);
        setMensaje("Error interno al analizar el CV.");
      }

      setLoading(false);
    }

    analizar();
  }, []);

  return (
    <section className="max-w-xl mx-auto mt-20 p-8 bg-white rounded-xl shadow-lg text-center">
      <h1 className="text-3xl font-bold text-[#1C4E80] mb-6">
        Analizando tu CV...
      </h1>

      {loading && (
        <p className="text-lg font-medium text-gray-700">
          Esto puede tardar unos segundos.
        </p>
      )}

      {mensaje && (
        <p className="text-red-600 text-lg font-medium mt-4">{mensaje}</p>
      )}
    </section>
  );
}
