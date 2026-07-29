"use client";

import { useState } from "react";

export default function VacantesLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    const res = await fetch("/api/vacantes/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Credenciales incorrectas");
      return;
    }

    window.location.href = "/vacantes";
  };

  return (
    <section className="pt-32 min-h-screen bg-[#0A1A3A] text-white px-6">
      <div className="max-w-md mx-auto bg-white text-[#0A1A3A] p-8 rounded-xl shadow-xl">

        <h2 className="text-2xl font-bold mb-6 text-[#C9A86A]">
          Acceso a Vacantes
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border border-[#C9A86A] rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="w-full p-3 mb-4 border border-[#C9A86A] rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-red-600 mb-4">{error}</p>
        )}

        <button
          onClick={handleLogin}
          className="w-full py-3 bg-[#C9A86A] text-[#0A1A3A] rounded-lg font-semibold hover:bg-[#d8b97a]"
        >
          Entrar
        </button>

      </div>
    </section>
  );
}
