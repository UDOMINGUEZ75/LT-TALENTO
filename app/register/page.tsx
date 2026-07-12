"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  async function handleContinue() {
    if (!name || !email) {
      setError("Por favor llena todos los campos.");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();

      if (!data.ok) {
        setError(data.error || "Error desconocido.");
        return;
      }

      // Redirige al menú con el userId correcto
      router.push(`/candidate/evaluation/menu?userId=${data.user.id}`);
    } catch (err) {
      console.error("Error en registro:", err);
      setError("Error en el servidor.");
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Continuar Registro</h1>

      {error && <p className="text-red-600">{error}</p>}

      <div>
        <label className="block mb-1">Nombre</label>
        <input
          className="border p-2 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1">Correo</label>
        <input
          className="border p-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <button
        onClick={handleContinue}
        className="w-full py-3 bg-blue-600 text-white rounded-lg mt-4"
      >
        Continuar
      </button>
    </div>
  );
}
