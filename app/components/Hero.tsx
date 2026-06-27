"use client";

import { useState } from "react";

export default function Hero() {
  const [modo, setModo] = useState("empleo");

  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [correo, setCorreo] = useState("");
  const [puesto, setPuesto] = useState("");

  const handleRegistrar = async () => {
    console.log("HANDLE REGISTRAR SE EJECUTÓ");

    if (!nombre || !apellidoPaterno || !apellidoMaterno || !correo || !puesto) {
      alert("Por favor completa todos los campos.");
      return;
    }

    const res = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: correo,
        name: `${nombre} ${apellidoPaterno} ${apellidoMaterno}`,
        role: "CANDIDATE",
      }),
    });

    const data = await res.json();

    console.log("RESPUESTA COMPLETA DEL BACKEND:", data);

    if (!res.ok) {
      alert("Error al registrar usuario.");
      return;
    }

    // Detectar automáticamente dónde viene el ID
    const userId =
      data?.id ??
      data?.user?.id ??
      data?.data?.id ??
      data?.result?.id ??
      null;

    console.log("USER ID DETECTADO:", userId);

    if (!userId) {
      alert("No se pudo obtener el ID del usuario.");
      return;
    }

    // Esperar 1.5 segundos para que puedas ver los logs
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Redirigir con el userId correcto
    window.location.href = `/candidate?userId=${userId}`;
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center px-6 bg-[#1A4B84] text-white">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Tu próximo paso profesional comienza aquí
        </h1>

        <button
          onClick={() => setModo("registro")}
          className="mt-10 px-6 py-3 bg-white text-[#1A4B84] rounded-lg"
        >
          Registrar candidato
        </button>

        {modo === "registro" && (
          <div className="mt-10 border border-gray-200 rounded-xl p-6 text-left">
            <h3 className="text-xl font-semibold mb-4">Crear perfil de candidato</h3>

            <input
              className="input"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <input
              className="input"
              placeholder="Apellido paterno"
              value={apellidoPaterno}
              onChange={(e) => setApellidoPaterno(e.target.value)}
            />
            <input
              className="input"
              placeholder="Apellido materno"
              value={apellidoMaterno}
              onChange={(e) => setApellidoMaterno(e.target.value)}
            />
            <input
              className="input"
              placeholder="Correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
            <input
              className="input"
              placeholder="Puesto actual"
              value={puesto}
              onChange={(e) => setPuesto(e.target.value)}
            />

            <button
              onClick={handleRegistrar}
              className="mt-6 bg-white text-[#1A4B84] px-8 py-3 rounded-lg"
            >
              Registrar candidato
            </button>
          </div>
        )}
      </div>
    </section>
  );
}