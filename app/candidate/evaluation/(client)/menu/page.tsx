"use client";

import { useEffect, useState } from "react";

// Tipo correcto para el candidato
type Candidate = {
  id: number;
  status: string;
  headline: string;
  summary: string;
  experience: any;
  education: any;
  user: {
    id: number;
    name: string;
    email: string;
  };
};

export default function MenuPage() {
  const [candidate, setCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    async function loadCandidate() {
      const res = await fetch(`/api/candidate?userId=1`, {
        cache: "no-store",
      });

      const data = await res.json();
      setCandidate(data.candidate as Candidate);
    }

    loadCandidate();
  }, []);

  if (!candidate) {
    return <p className="p-6">Cargando...</p>;
  }

  return (
    <div className="max-w-xl mx-auto py-16 px-6">
      {/* Información del candidato */}
      <div className="mb-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-bold">{candidate.user.name}</h2>
        <p className="text-gray-700">{candidate.user.email}</p>
      </div>

      <p className="text-gray-700 mb-6">
        Menú de evaluación listo.
      </p>
    </div>
  );
}
