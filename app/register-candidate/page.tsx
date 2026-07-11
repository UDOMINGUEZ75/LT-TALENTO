"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterCandidate() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);

    const data = {
      email: form.get("email"),
      name: form.get("name"),
      role: "candidate",
    };

    const res = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const user = await res.json();
    setLoading(false);

    if (res.ok && user.id) {
      router.push(`/candidate?userId=${user.id}`);
    } else {
      alert("Error registrando candidato");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* tu formulario */}
    </form>
  );
}
