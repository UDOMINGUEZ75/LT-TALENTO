"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Acceso() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("/api/acceso", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      cache: "no-store"
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Credenciales incorrectas");
      return;
    }

    router.push(`/candidatos/perfil/${data.id}`);
  };

  return (
    <section className="min-h-screen bg-[#0A1A3A] text-white flex items-center justify-center px-6">
      <div className="bg-white text-[#0A1A3A] p-10 rounded-xl shadow-xl w-full max-w-md">

        <h1 className="text-2xl font-bold text-center mb-6 text-[#C9A86A]">
          Acceso de Candidato
        </h1>

        <label className="block mb-2 font-medium">Correo electrónico</label>
        <input
          type="email"
          className="border p-3 rounded w-full mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block mb-2 font-medium">Contraseña</label>
        <input
          type="password"
          className="border p-3 rounded w-full mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full py-3 bg-[#C9A86A] text-[#0A1A3A] font-bold rounded-md hover:bg-[#d8b97a]"
        >
          Entrar
        </button>
      </div>
    </section>
  );
}