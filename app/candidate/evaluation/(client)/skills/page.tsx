"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function SkillsPage() {
  const router = useRouter();
  const params = useSearchParams();

  const userId = params?.get("userId") ?? "";

  return (
    <div className="max-w-xl mx-auto py-16 px-6">
      <h1 className="text-2xl font-bold mb-4">Habilidades</h1>

      <p className="mb-6">Agrega tus habilidades principales.</p>

      <button
        className="p-3 bg-green-600 text-white rounded"
        onClick={() =>
          router.push(`/candidate/evaluation/summary?userId=${userId}`)
        }
      >
        Guardar y finalizar
      </button>
    </div>
  );
}
