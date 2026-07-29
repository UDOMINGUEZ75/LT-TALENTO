"use client";

import { useEffect, useState } from "react";
import CVUpload from "../CVUpload";

interface PageProps {
  params: {
    id: string;
  };
}

export default function CompletarRegistro({ params }: PageProps) {
  const { id } = params;

  interface Candidate {
    name: string;
  }

  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);
  const [analyzingAI, setAnalyzingAI] = useState(false);
  const [showNextStep, setShowNextStep] = useState(false);

  const [form, setForm] = useState({
    state: "",
    city: "",
    zone: "",
    address: "",
    phone: "",
    company: "",
    position: "",
    years: "",
    description: "",
    school: "",
    degree: "",
    graduationYear: "",
    schedule: "",
    travel: false,
    relocate: false,
    area: "",
    salary: "",
    modality: "",
    cvText: "",
    translated: "",
  });

  // Cargar candidato
  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/candidatos/${id}`, {
        cache: "no-store",
      });
      const data = await res.json();
      setCandidate(data.candidate);
      setLoading(false);
    }
    load();
  }, [id]);

  // AUTO-FILL DINÁMICO CON INTELIGENCIA ARTIFICIAL
  const autoFill = async (info: any) => {
    const rawText = info.raw || info.cvText || "";

    if (!rawText) {
      alert("No se extrajo texto del CV para analizar.");
      return;
    }

    setAnalyzingAI(true);

    try {
      // Llamada al endpoint del backend que conecta con OpenAI
      const res = await fetch("/api/cv/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: rawText }),
      });

      const result = await res.json();

      if (!res.ok || !result.ok) {
        throw new Error(result.error || "Error al procesar con IA");
      }

      const aiData = result.data;

      // Autorellenar inputs del formulario con los datos extraídos por la IA
      setForm((prev) => ({
        ...prev,
        state: aiData.state || prev.state,
        city: aiData.city || prev.city,
        zone: aiData.zone || prev.zone,
        address: aiData.address || prev.address,
        phone: aiData.phone || prev.phone,
        company: aiData.company || prev.company,
        position: aiData.position || prev.position,
        years: aiData.years ? String(aiData.years) : prev.years,
        description: aiData.summary || prev.description,
        school: aiData.school || prev.school,
        degree: aiData.degree || prev.degree,
        graduationYear: aiData.graduationYear ? String(aiData.graduationYear) : prev.graduationYear,
        schedule: aiData.schedule || prev.schedule,
        travel: typeof aiData.travel === "boolean" ? aiData.travel : prev.travel,
        relocate: typeof aiData.relocate === "boolean" ? aiData.relocate : prev.relocate,
        area: aiData.area || prev.area,
        salary: aiData.salary ? String(aiData.salary) : prev.salary,
        modality: aiData.modality || prev.modality,
        cvText: rawText,
        translated: aiData.summary || "",
      }));
    } catch (error) {
      console.error("Error al analizar CV con IA:", error);
      alert("No se pudo analizar el CV automáticamente con IA. Puedes llenar los campos manualmente.");
    } finally {
      setAnalyzingAI(false);
    }
  };

  // Manejo de inputs
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const target = e.target;
    const { name, value, type } = target;

    const finalValue =
      type === "checkbox"
        ? (target as HTMLInputElement).checked
        : value;

    setForm({
      ...form,
      [name]: finalValue,
    });
  };

  // Guardar
  const handleSubmit = async () => {
    const res = await fetch(`/api/candidatos/completar/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Error al guardar");
      return;
    }

    setShowNextStep(true);
  };

  if (loading) return <p className="text-white p-10">Cargando...</p>;

  return (
    <section className="w-full min-h-screen bg-[#0A1A3A] text-white pt-20 pb-24 px-6">
      <div className="max-w-4xl mx-auto bg-white text-[#0A1A3A] p-10 rounded-xl shadow-xl">

        <h1 className="text-3xl font-bold text-center text-[#C9A86A] mb-10">
          Completar Registro — {candidate?.name}
        </h1>

        {/* SUBIR CV */}
        <CVUpload candidateId={id} onAutoFill={autoFill} />

        {/* INDICADOR DE PROCESAMIENTO DE IA */}
        {analyzingAI && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-300 text-blue-800 rounded-lg flex items-center gap-3">
            <span className="animate-spin text-xl">🤖</span>
            <p className="font-semibold text-sm">
              La IA está analizando el CV para autocompletar tus campos y generar el resumen...
            </p>
          </div>
        )}

        {/* VISTA PREVIA DEL RESUMEN GENERADO POR IA */}
        {form.translated && !analyzingAI && (
          <div className="mt-6 p-4 bg-[#FFF9EF] border border-[#C9A86A] rounded-lg shadow">
            <h3 className="font-bold mb-2">Resumen generado con IA (Español):</h3>
            <p className="text-sm whitespace-pre-wrap">{form.translated}</p>
          </div>
        )}

        {/* FORMULARIO */}
        {!showNextStep && (
          <div className="flex flex-col gap-10 mt-10">

            {/* INFORMACIÓN PERSONAL */}
            <div>
              <h2 className="text-xl font-bold mb-4">Información Personal</h2>
              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label>Estado</label>
                  <select name="state" value={form.state} onChange={handleChange} className="border p-3 rounded w-full">
                    <option value="">Seleccionar</option>
                    <option value="Chihuahua">Chihuahua</option>
                    <option value="Nuevo León">Nuevo León</option>
                    <option value="Coahuila">Coahuila</option>
                  </select>
                </div>

                <div>
                  <label>Ciudad</label>
                  <input name="city" value={form.city} onChange={handleChange} className="border p-3 rounded w-full" />
                </div>

                <div>
                  <label>Zona</label>
                  <input name="zone" value={form.zone} onChange={handleChange} className="border p-3 rounded w-full" />
                </div>

                <div>
                  <label>Dirección</label>
                  <input name="address" value={form.address} onChange={handleChange} className="border p-3 rounded w-full" />
                </div>

                <div>
                  <label>Teléfono</label>
                  <input name="phone" value={form.phone} onChange={handleChange} className="border p-3 rounded w-full" />
                </div>

              </div>
            </div>

            {/* EXPERIENCIA */}
            <div>
              <h2 className="text-xl font-bold mb-4">Experiencia Laboral</h2>

              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label>Empresa</label>
                  <input name="company" value={form.company} onChange={handleChange} className="border p-3 rounded w-full" />
                </div>

                <div>
                  <label>Puesto</label>
                  <input name="position" value={form.position} onChange={handleChange} className="border p-3 rounded w-full" />
                </div>

                <div>
                  <label>Años de experiencia</label>
                  <input name="years" value={form.years} onChange={handleChange} className="border p-3 rounded w-full" />
                </div>

                <div className="col-span-2">
                  <label>Descripción / Resumen Profesional</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="border p-3 rounded w-full"
                    rows={5}
                  />
                </div>

              </div>
            </div>

            {/* EDUCACIÓN */}
            <div>
              <h2 className="text-xl font-bold mb-4">Educación</h2>
              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label>Escuela</label>
                  <input name="school" value={form.school} onChange={handleChange} className="border p-3 rounded w-full" />
                </div>

                <div>
                  <label>Grado</label>
                  <select name="degree" value={form.degree} onChange={handleChange} className="border p-3 rounded w-full">
                    <option value="">Seleccionar</option>
                    <option value="Ingeniería">Ingeniería</option>
                    <option value="Licenciatura">Licenciatura</option>
                    <option value="Maestría">Maestría</option>
                  </select>
                </div>

                <div>
                  <label>Año de graduación</label>
                  <input name="graduationYear" value={form.graduationYear} onChange={handleChange} className="border p-3 rounded w-full" />
                </div>

              </div>
            </div>

            {/* DISPONIBILIDAD */}
            <div>
              <h2 className="text-xl font-bold mb-4">Disponibilidad</h2>
              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label>Horario</label>
                  <select name="schedule" value={form.schedule} onChange={handleChange} className="border p-3 rounded w-full">
                    <option value="">Seleccionar</option>
                    <option value="Tiempo completo">Tiempo completo</option>
                    <option value="Medio tiempo">Medio tiempo</option>
                  </select>
                </div>

                <label className="flex items-center gap-2">
                  <input type="checkbox" name="travel" checked={form.travel} onChange={handleChange} />
                  Disponibilidad para viajar
                </label>

                <label className="flex items-center gap-2">
                  <input type="checkbox" name="relocate" checked={form.relocate} onChange={handleChange} />
                  Disponibilidad para reubicarse
                </label>

              </div>
            </div>

            {/* PREFERENCIAS */}
            <div>
              <h2 className="text-xl font-bold mb-4">Preferencias</h2>
              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label>Área deseada</label>
                  <select name="area" value={form.area} onChange={handleChange} className="border p-3 rounded w-full">
                    <option value="">Seleccionar</option>
                    <option value="Automotriz / Ingeniería">Automotriz / Ingeniería</option>
                    <option value="Manufactura">Manufactura</option>
                    <option value="Calidad">Calidad</option>
                  </select>
                </div>

                <div>
                  <label>Salario deseado</label>
                  <input name="salary" value={form.salary} onChange={handleChange} className="border p-3 rounded w-full" />
                </div>

                <div>
                  <label>Modalidad</label>
                  <select name="modality" value={form.modality} onChange={handleChange} className="border p-3 rounded w-full">
                    <option value="">Seleccionar</option>
                    <option value="Presencial">Presencial</option>
                    <option value="Híbrido">Híbrido</option>
                    <option value="Remoto">Remoto</option>
                  </select>
                </div>

              </div>
            </div>

            {/* BOTÓN */}
            <button
              onClick={handleSubmit}
              disabled={analyzingAI}
              className="w-full py-3 bg-[#C9A86A] text-[#0A1A3A] font-bold rounded-md hover:bg-[#d8b97a] transition disabled:opacity-50"
            >
              Guardar todo
            </button>

          </div>
        )}

        {/* PANEL DE OPCIONES DESPUÉS DE GUARDAR */}
        {showNextStep && (
          <div className="mt-10 p-6 bg-[#FFF9EF] border border-[#C9A86A] rounded-lg text-[#0A1A3A]">
            <h3 className="text-xl font-bold mb-4">Tu registro ha sido completado</h3>
            <p className="mb-4">
              Puedes volver en cualquier momento si deseas modificar tu información.
            </p>

            <div className="flex gap-4">
              <a
                href="/vacantes"
                className="px-6 py-3 bg-[#0A1A3A] text-white rounded-md font-semibold hover:bg-[#142850]"
              >
                Buscar vacantes
              </a>

              <a
                href="/"
                className="px-6 py-3 bg-[#C9A86A] text-[#0A1A3A] rounded-md font-semibold hover:bg-[#d8b97a]"
              >
                Salir
              </a>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}