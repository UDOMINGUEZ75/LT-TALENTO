"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NuevoCandidato() {
  const router = useRouter();

  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const res = await fetch("/api/candidatos/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.nombre,
          email: form.correo,
          password: form.password,
        }),
        cache: "no-store"
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Error al registrar candidato");
        return;
      }

      const id = data.candidate.id;

      router.push(`/candidatos/completar/${id}`);

    } catch (error) {
      console.error(error);
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <section className="w-full min-h-screen bg-[#0A1A3A] text-white pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto bg-white text-[#0A1A3A] p-10 rounded-xl shadow-xl">

        <h1 className="text-3xl font-bold text-center text-[#C9A86A] mb-6">
          Nuevo Candidato
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          <div>
            <label className="font-semibold">Nombre completo</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              className="w-full mt-2 p-3 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="font-semibold">Correo electrónico</label>
            <input
              type="text"
              name="correo"
              value={form.correo}
              onChange={handleChange}
              className="w-full mt-2 p-3 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full mt-2 p-3 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="font-semibold">Confirmar password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full mt-2 p-3 border rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#C9A86A] text-[#0A1A3A] font-bold rounded-md hover:bg-[#d8b97a] transition"
          >
            Crear cuenta
          </button>

        </form>
      </div>
    </section>
  );
}
