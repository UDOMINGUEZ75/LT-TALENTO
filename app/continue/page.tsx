"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ContinuePage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  async function handleContinue() {
    setError("");

    if (!email) {
      setError("Ingresa tu correo para continuar.");
      return;
    }

    const res = await fetch(`/api/user/find?email=${email}`);
    const data = await res.json();

    if (!data.ok || !data.user) {
      setError("No existe un registro con ese correo.");
      return;
    }

    router.push(`/candidate/dashboard?userId=${data.user.id}`);
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        Continuar Registro
      </h1>

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
        onClick={handleContinue}
        style={{
          width: "100%",
          padding: "1rem",
          background: "#444",
          color: "white",
          borderRadius: "8px",
          marginTop: "1rem",
        }}
      >
        Continuar
      </button>
    </div>
  );
}
