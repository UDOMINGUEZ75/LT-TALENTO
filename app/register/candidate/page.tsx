"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/user/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();

      if (!data.user) {
        setError("No se pudo crear el usuario.");
        setLoading(false);
        return;
      }

      const userId = data.user.id;

      // ⭐ REDIRECCIÓN CORRECTA AL DASHBOARD
      router.push(`/candidate/dashboard?userId=${userId}`);
    } catch (err) {
      console.error(err);
      setError("Error al registrar. Intenta nuevamente.");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto py-16 px-6">
      <h1 className="text-3xl font-bold mb-6">Registro de candidato</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nombre completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-3 border rounded"
          required
        />

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 border rounded"
          required
        />

        {error && <p className="text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="p-3 bg-blue-600 text-white rounded"
        >
          {loading ? "Guardando..." : "Continuar"}
        </button>
      </form>
    </div>
  );
}
