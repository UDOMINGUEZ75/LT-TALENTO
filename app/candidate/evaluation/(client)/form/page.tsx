"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function EvaluationFormPage() {
  const router = useRouter();
  const [candidateId, setCandidateId] = useState<number | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("candidateId");
    if (!id) {
      alert("No se encontró el ID del candidato");
      router.push("/candidate/evaluation");
      return;
    }
    setCandidateId(Number(id));
  }, []);

  const menuItems = [
    { label: "Datos personales", path: "/candidate/evaluation/personal" },
    { label: "Experiencia", path: "/candidate/evaluation/experience" },
    { label: "Educación", path: "/candidate/evaluation/education" },
    { label: "Skills", path: "/candidate/evaluation/skills" },
    { label: "Idiomas", path: "/candidate/evaluation/languages" },
    { label: "Disponibilidad", path: "/candidate/evaluation/availability" },
    { label: "Sueldo sugerido", path: "/candidate/evaluation/salary" },
    { label: "Resumen final", path: "/candidate/evaluation/summary" },
  ];

  return (
    <div className="flex h-screen">
      {/* MENÚ LATERAL */}
      <aside className="w-64 bg-gray-100 p-4 border-r">
        <h2 className="text-xl font-bold mb-4">Evaluación</h2>

        <ul className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <button
                className="w-full text-left px-3 py-2 rounded hover:bg-gray-200"
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <button
            className="w-full px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => router.push("/candidate/evaluation/summary")}
          >
            Finalizar evaluación
          </button>
        </div>
      </aside>

      {/* CONTENIDO DINÁMICO */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">
          Completa tu información
        </h1>

        <p className="text-gray-600">
          Selecciona una sección del menú para continuar.
        </p>
      </main>
    </div>
  );
}