import { ReactNode } from "react";

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

// Función para obtener el candidato
async function getCandidate(): Promise<Candidate> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/candidate?userId=1`, {
    cache: "no-store",
  });

  const data = await res.json();
  return data.candidate as Candidate;
}

export default async function Page() {
  const candidate = await getCandidate();

  return (
    <div className="max-w-xl mx-auto py-16 px-6">
      <h1 className="text-3xl font-bold mb-4">
        Bienvenido, {candidate.user.name}
      </h1>

      <p className="text-gray-700 mb-6">
        Tu dashboard está listo.
      </p>
    </div>
  );
}
