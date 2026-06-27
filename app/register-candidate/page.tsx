"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterCandidate() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);

    const data = {
      email: form.get("email"),
      name: form.get("name"),
      role: "candidate", // fijo porque es registro de candidato
    };

    const res = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const user = await res.json();
    setLoading(false);

    if (res.ok) {
      // Redirigir al formulario de candidato
      router.push(`/candidate?userId=${user.id}`);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Registrar Candidato</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          placeholder="Correo"
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="name"
          placeholder="Nombre"
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          {loading ? "Creando usuario..." : "Continuar"}
        </button>
      </form>
    </div>
  );
}
