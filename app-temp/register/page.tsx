"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");

  // Regex de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateEmail(value: string) {
    if (!emailRegex.test(value)) {
      setEmailError("Formato de correo inválido");
    } else {
      setEmailError("");
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);

    // 🔵 CORREGIDO: convertir todo a string para evitar null
    const data = {
      email: String(form.get("email") || ""),
      name: String(form.get("name") || ""),
      role: String(form.get("role") || ""),
    };

    const res = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(json.error || "Error desconocido");
      return;
    }

    setDone(true);

    // 🔵 Redirección por rol
    if (data.role === "CANDIDATE") {
      router.push(`/candidate?userId=${json.user.id}`);
    } else {
      router.push(`/recruiter?userId=${json.user.id}`);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Registro de Usuario</h1>

      {/* Error de API */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            name="email"
            placeholder="Correo"
            className={`w-full border p-2 rounded ${
              emailError ? "border-red-500" : ""
            }`}
            required
            onChange={(e) => validateEmail(e.target.value)}
          />

          {emailError && (
            <p className="text-red-600 text-sm mt-1">{emailError}</p>
          )}
        </div>

        <input
          name="name"
          placeholder="Nombre"
          className="w-full border p-2 rounded"
        />

        <select name="role" className="w-full border p-2 rounded" required>
          <option value="">Selecciona un rol</option>
          <option value="CANDIDATE">Candidato</option>
          <option value="RECRUITER">Reclutador</option>
        </select>

        <button
          type="submit"
          disabled={loading || emailError !== ""}
          className={`w-full text-white p-2 rounded ${
            loading || emailError
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600"
          }`}
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
