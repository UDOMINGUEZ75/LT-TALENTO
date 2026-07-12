"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CandidateRegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit() {
    setError("");

    if (!name.trim()) {
      setError("Ingresa tu nombre.");
      return;
    }

    if (!email.trim()) {
      setError("Ingresa tu correo.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Ingresa un correo válido.");
      return;
    }

    const res = await fetch("/api/user/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });

    const data = await res.json();

    if (!data.ok) {
      setError("No se pudo registrar el usuario.");
      return;
    }

    // REDIRECCIÓN CORRECTA
    router.push(`/candidate/evaluation/menu?userId=${data.user.id}`);
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        Registro de Candidato
      </h1>

      <label>Nombre</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          width: "100%",
          padding: "0.5rem",
          marginBottom: "1rem",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      <label>Correo</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          padding: "0.5rem",
          marginBottom: "1rem",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      {error && (
        <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>
      )}

      <button
        onClick={handleSubmit}
        style={{
          width: "100%",
          padding: "1rem",
          background: "#0070f3",
          color: "white",
          borderRadius: "8px",
          marginTop: "1rem",
        }}
      >
        Continuar Registro
      </button>
    </div>
  );
}
