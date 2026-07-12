"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function EvaluationStartPage() {
  const router = useRouter();

  useEffect(() => {
    const startEvaluation = async () => {
      const res = await fetch("/api/candidate/create", {
        method: "POST",
      });

      const data = await res.json();

      if (!data.ok) {
        alert("Error al iniciar evaluación");
        return;
      }

      localStorage.setItem("candidateId", data.candidate.id);

      router.push("/candidate/evaluation/personal");
    };

    startEvaluation();
  }, []);

  return (
    <div className="p-6">
      <p>Iniciando evaluación...</p>
    </div>
  );
}