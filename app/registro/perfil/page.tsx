"use client";

import { useEffect, useState } from "react";

export default function RegistroPerfil() {
  const [loading, setLoading] = useState(true);
  const [candidateId, setCandidateId] = useState(null);
  const [form, setForm] = useState({
    state: "",
    city: "",
    zone: "",
    address: "",
    phone: "",
  });
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("candidateId");

    if (!id) {
      setMensaje("No se encontró el ID del candidato.");
      setLoading(false);
      return;
    }

    setCandidateId(id);
    setLoading(false);
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMensaje("");

    try {
      const res = await fetch("/api/candidate-personal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateId,
          ...form,
        }),
      });

      const data = await res.json();

      if (!data.ok) {
        setMensaje(data.message || "Error al guardar la información.");
        return;
      }

      window.location.href = `/registro/dashboard?candidateId=${candidateId}`;
    } catch (error) {
      console.error(error);
      setMensaje("Error interno al guardar.");
    }
  }

  if (loading) {
    return <div className="text-center mt-20 text-xl">Cargando...</div>;
  }

  return (
    <section className="max-w-xl mx-auto mt-20 p-8 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#1C4E80]">
        Información Personal
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 font-medium">Estado</label>
          <input
            name="state"
            value={form.state}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Ciudad</label>
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Zona</label>
          <input
            name="zone"
            value={form.zone}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Dirección</label>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Teléfono</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-[#1C4E80] text-white rounded-lg hover:bg-[#163B63]"
        >
          Guardar y continuar
        </button>

        {mensaje && (
          <p className="text-center text-red-600 font-medium mt-4">{mensaje}</p>
        )}
      </form>
    </section>
  );
}
