"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type Candidate = {
  id: number;
  user: {
    id: number;
    name: string;
    email: string;
  };
};

export default function MenuPage() {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const params = useSearchParams();

  useEffect(() => {
    const rawUserId = params?.get("userId");

    // Validación fuerte
    if (!rawUserId || isNaN(Number(rawUserId))) {
      console.error("❌ userId inválido:", rawUserId);
      return;
    }

    const userId = Number(rawUserId);

    async function loadCandidate() {
      const res = await fetch(`/api/candidate?userId=${userId}`, {
        cache: "no-store",
      });

      const data = await res.json();
      setCandidate(data.candidate);
    }

    loadCandidate();
  }, [params]);

  if (!candidate) return <p className="p-6">Cargando...</p>;

  return (
    <div className="max-w-xl mx-auto py-16 px-6">
      <div className="mb-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-bold">{candidate.user.name}</h2>
        <p className="text-gray-700">{candidate.user.email}</p>
      </div>

      <p className="text-gray-700 mb-6">Menú de evaluación listo.</p>
    </div>
  );
}
