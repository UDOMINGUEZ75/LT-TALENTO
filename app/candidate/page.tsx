"use client";
// MARCA ERRO
export const dynamic = "force-dynamic";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function CandidatePage() {
  const searchParams = useSearchParams();
  const userIdParam = searchParams.get("userId");
  const userId = userIdParam ? Number(userIdParam.trim()) : null;

  const [headline, setHeadline] = useState("");
  const [summary, setSummary] = useState("");
  const [yearsExp, setYearsExp] = useState("");
  const [seniority, setSeniority] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [skills, setSkills] = useState("");
  const [languages, setLanguages] = useState("");
  const [experience, setExperience] = useState("");
  const [education, setEducation] = useState("");
  const [preferences, setPreferences] = useState("");

  const [loadingAI, setLoadingAI] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleAIHelp = async () => {
    setLoadingAI(true);

    const res = await fetch("/api/ai-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        headline,
        summary,
        skills,
        experience,
        yearsExp,
        seniority,
      }),
    });

    const data = await res.json();

    if (data.headline) setHeadline(data.headline);
    if (data.summary) setSummary(data.summary);
    if (data.skills) setSkills(data.skills);
    if (data.experience) setExperience(data.experience);

    setLoadingAI(false);
  };

  const handleSave = async () => {
    setSaving(true);

    const res = await fetch("/api/candidate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        headline,
        summary,
        yearsExp,
        seniority,
        location,
        phone,
        skills,
        languages,
        experience,
        education,
        preferences,
      }),
    });

    if (res.ok) {
      alert("¡Perfil completado con éxito!");
      window.location.href = "/";
    } else {
      alert("Error guardando el perfil.");
    }

    setSaving(false);
  };

  return (
    <div className="min-h-screen w-full bg-[#1A4B84] flex justify-center items-start py-12 px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-10 space-y-10">

        <h1 className="text-3xl font-bold text-[#1A4B84]">
            Completa tu perfil profesional!
        </h1>

        <p className="text-sm text-gray-500">User ID: {userId}</p>

        {/* Perfil profesional */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#1A4B84]">Perfil profesional</h2>

          <input
            className="input"
            placeholder="Headline (ej. Ingeniero de software senior)"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
          />

          <textarea
            className="input"
            placeholder="Resumen profesional"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />

          <div className="flex gap-4">
            <input
              className="input flex-1"
              placeholder="Años de experiencia"
              value={yearsExp}
              onChange={(e) => setYearsExp(e.target.value)}
            />
            <input
              className="input flex-1"
              placeholder="Seniority (Junior, Mid, Senior, Lead)"
              value={seniority}
              onChange={(e) => setSeniority(e.target.value)}
            />
          </div>
        </section>

        {/* Contacto */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#1A4B84]">Contacto y ubicación</h2>

          <input
            className="input"
            placeholder="Teléfono"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            className="input"
            placeholder="Ciudad / País"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </section>

        {/* Skills */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#1A4B84]">Skills e idiomas</h2>

          <input
            className="input"
            placeholder="Skills (separadas por comas)"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />

          <input
            className="input"
            placeholder="Idiomas (separados por comas)"
            value={languages}
            onChange={(e) => setLanguages(e.target.value)}
          />
        </section>

        {/* Experiencia */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#1A4B84]">Experiencia</h2>

          <textarea
            className="input"
            placeholder="Describe tu experiencia y logros clave"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />
        </section>

        {/* Educación */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#1A4B84]">Educación</h2>

          <textarea
            className="input"
            placeholder="Carrera, institución, año de graducción"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
          />
        </section>

        {/* Preferencias */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#1A4B84]">Preferencias laborales</h2>

          <textarea
            className="input"
            placeholder="Tipo de empleo, modalidad, rango salarial, etc."
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
          />
        </section>

        {/* Botones */}
        <div className="flex gap-4">
          <button
            onClick={handleAIHelp}
            disabled={loadingAI}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg"
          >
            {loadingAI ? "Usando IA..." : "Mejorar con IA"}
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-[#1A4B84] text-white px-6 py-3 rounded-lg"
          >
            {saving ? "Guardando..." : "Guardar y salir"}
            // rebuild fix
          </button>
        </div>
      </div>
    </div>
  );
  // rebuild fix
}