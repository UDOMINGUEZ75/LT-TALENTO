"use client";

import { useRouter } from "next/navigation";

export default function EducationPage() {
  const router = useRouter();
  const params = useSearchParams();
  const userId = params.get("userId");

  return (
    <div className="max-w-xl mx-auto py-16 px-6">
      <h1 className="text-2xl font-bold mb-4">Educación</h1>

      <p className="mb-6">Registra tu formación académica.</p>

      <button
        className="p-3 bg-blue-600 text-white rounded"
        onClick={() => router.push(`/candidate/evaluation/skills?userId=${userId}`)}
      >
        Guardar y continuar
      </button>
    </div>
  );
}
