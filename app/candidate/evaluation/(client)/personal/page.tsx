"use client";

import { useRouter } from "next/navigation";

export default function PersonalPage() {
  const router = useRouter();
  const params = new URLSearchParams(window.location.search);
  const userId = params.get("userId");

  return (
    <div className="max-w-xl mx-auto py-16 px-6">
      <h1 className="text-2xl font-bold mb-4">Datos personales</h1>

      <p className="mb-6">Completa tus datos personales.</p>

      <button
        className="p-3 bg-blue-600 text-white rounded"
        onClick={() =>
          router.push(`/candidate/evaluation/experience?userId=${userId}`)
        }
      >
        Guardar y continuar
      </button>
    </div>
  );
}
