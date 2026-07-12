"use client";

import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  return (
    <section className="w-full py-20 text-center">
      <h1 className="text-4xl font-bold mb-4">LTTalento</h1>
      <p className="text-lg mb-6">Impulsa tu carrera con oportunidades reales.</p>

      <h2 className="text-2xl font-semibold mb-6">Nuevo registro</h2>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => router.push("/register/candidate")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg"
        >
          Candidato
        </button>

        <button
          onClick={() => router.push("/register/recruiter")}
          className="px-6 py-3 bg-green-600 text-white rounded-lg"
        >
          Reclutador
        </button>

        <button
          onClick={() => router.push("/continue")}
          className="px-6 py-3 bg-gray-700 text-white rounded-lg"
        >
          Continuar registro
        </button>
      </div>
    </section>
  );
}
