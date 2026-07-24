"use client";

import { useState, useEffect } from "react";

export default function RegistroCV() {
  const [candidateId, setCandidateId] = useState(null);
  const [file, setFile] = useState(null);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("candidateId");
    setCandidateId(id);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setMensaje("");

    if (!file) {
      setMensaje("Debes seleccionar un archivo.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("candidateId", candidateId);

    try {
      const res = await fetch("/api/cv/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!data.ok) {
        setMensaje(data.message || "Error al subir el CV.");
        return;
      }

      window.location.href = `/registro/analisis?candidateId=${candidateId}`;
    } catch (error) {
      console.error(error);
      setMensaje("Error interno al subir el CV.");
    }
  }

  return (
    <section className="max-w-xl mx-auto mt-20 p-8 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-center text-[#1C4E80] mb-6">
        Subir Curriculum
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 font-medium">Selecciona tu CV (PDF o DOCX)</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border px-4 py-2 rounded-lg"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-[#1C4E80] text-white rounded-lg hover:bg-[#163B63]"
        >
          Subir y continuar
        </button>

        {mensaje && (
          <p className="text-center text-red-600 font-medium mt-4">{mensaje}</p>
        )}
      </form>
    </section>
  );
}
