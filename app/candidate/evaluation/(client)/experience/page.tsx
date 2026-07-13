"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function ExperiencePage() {
  const router = useRouter();
  const params = useSearchParams();

  // strictNullChecks fix
  const userId = params?.get("userId") ?? "";

  return (
    <div className="max-w-xl mx-auto py-16 px-6">
      <h1 className="text-2xl font-bold mb-4">Experiencia laboral</h1>

      <p className="mb-6">Completa tu experiencia laboral.</p>

      <button
        className="p-3 bg-blue-600 text-white rounded"
        onClick={() =>
          router.push(`/candidate/evaluation/education?userId=${userId}`)
        }
      >
        Guardar y continuar
      </button>
    </div>
  );
}
