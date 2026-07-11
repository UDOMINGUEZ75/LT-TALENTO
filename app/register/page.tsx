"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Proceso from "../components/Proceso";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);

    const data = {
      email: form.get("email"),
      name: form.get("name"),
      role: form.get("role"),
    };

    const res = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const user = await res.json();
    setLoading(false);

    if (res.ok) {
      setDone(true);
      router.push(`/candidate?userId=${user.id}`);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Registro de Usuario</h1>

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

        <select name="role" className="w-full border p-2 rounded" required>
          <option value="">Selecciona un rol</option>
          <option value="candidate">Candidato</option>
          <option value="recruiter">Reclutador</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          {loading ? "Guardando..." : "Crear usuario"}
        </button>
      </form>

      {done && (
        <div className="mt-6 p-4 bg-green-100 border rounded">
          <p className="font-semibold">¡Usuario creado con éxito!</p>
        </div>
      )}
    </div>
  );
}
