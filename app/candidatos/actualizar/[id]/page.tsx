"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import CVUpload from "@/app/candidatos/completar/CVUpload";

export default function ActualizarDatos() {
  const routerParams = useParams();
  const id = routerParams?.id as string;

  interface Candidate {
    name?: string;
    personal?: {
      state?: string;
      city?: string;
      zone?: string;
      address?: string;
      phone?: string;
    };
    experience?: {
      company?: string;
      position?: string;
      years?: string | number;
      description?: string;
    };
    education?: {
      school?: string;
      degree?: string;
      graduationYear?: string | number;
    };
    availability?: {
      schedule?: string;
      travel?: boolean;
      relocate?: boolean;
    };
    preferences?: {
      area?: string;
      salary?: string | number;
      modality?: string;
    };
    translated?: string;
  }

  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);
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

  // 1. Cargar candidato al entrar y poblar el formulario
  useEffect(() => {
    if (!id) return;

    async function load() {
      try {
        const res = await fetch(`/api/candidatos/${id}`, {
          cache: "no-store",
        });
        if (res.ok) {
          const data = await res.json();
          const cand = data.candidate || data;
          setCandidate(cand);

          if (cand) {
            setForm((prev) => ({
              ...prev,
              state: cand.personal?.state || prev.state,
              city: cand.personal?.city || prev.city,
              zone: cand.personal?.zone || prev.zone,
              address: cand.personal?.address || prev.address,
              phone: cand.personal?.phone || prev.phone,
              
              company: cand.experience?.company || prev.company,
              position: cand.experience?.position || prev.position,
              years: cand.experience?.years !== undefined && cand.experience?.years !== null ? String(cand.experience.years) : prev.years,
              description: cand.experience?.description || prev.description,
              
              school: cand.education?.school || prev.school,
              degree: cand.education?.degree || prev.degree,
              graduationYear: cand.education?.graduationYear !== undefined && cand.education?.graduationYear !== null ? String(cand.education.graduationYear) : prev.graduationYear,
              
              schedule: cand.availability?.schedule || prev.schedule,
              travel: typeof cand.availability?.travel === "boolean" ? cand.availability.travel : prev.travel,
              relocate: typeof cand.availability?.relocate === "boolean" ? cand.availability.relocate : prev.relocate,
              
              area: cand.preferences?.area || prev.area,
              salary: cand.preferences?.salary !== undefined && cand.preferences?.salary !== null ? String(cand.preferences.salary) : prev.salary,
              modality: cand.preferences?.modality || prev.modality,
              
              translated: cand.translated || cand.experience?.description || prev.translated,
            }));
          }
        }
      } catch (err) {
        console.error("Error al cargar candidato:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  // 2. Fusión Inteligente al subir un nuevo CV (Smart Merge)
  const autoFill = (responseServer: any) => {
    if (!responseServer || typeof responseServer !== "object") return;

    const aiData = responseServer.extracted || {};
    const globalTranslated = responseServer.translated || aiData.translated || aiData.description || "";

    setForm((prev) => ({
      ...prev,
      state: aiData.state && String(aiData.state).trim() !== "" ? String(aiData.state).trim() : prev.state,
      city: aiData.city && String(aiData.city).trim() !== "" ? String(aiData.city).trim() : prev.city,
      zone: aiData.zone && String(aiData.zone).trim() !== "" ? String(aiData.zone).trim() : prev.zone,
      address: aiData.address && String(aiData.address).trim() !== "" ? String(aiData.address).trim() : prev.address,
      phone: aiData.phone && String(aiData.phone).trim() !== "" ? String(aiData.phone).trim() : prev.phone,
      
      company: aiData.company && String(aiData.company).trim() !== "" ? String(aiData.company).trim() : prev.company,
      position: aiData.position && String(aiData.position).trim() !== "" ? String(aiData.position).trim() : prev.position,
      years: aiData.years !== undefined && aiData.years !== null && String(aiData.years).trim() !== "" ? String(aiData.years).trim() : prev.years,
      
      description: globalTranslated !== "" ? globalTranslated : prev.description,
      
      school: aiData.school && String(aiData.school).trim() !== "" ? String(aiData.school).trim() : prev.school,
      degree: aiData.degree && String(aiData.degree).trim() !== "" ? String(aiData.degree).trim() : prev.degree,
      graduationYear: aiData.graduationYear && String(aiData.graduationYear).trim() !== "" ? String(aiData.graduationYear).trim() : prev.graduationYear,
      
      schedule: aiData.schedule && String(aiData.schedule).trim() !== "" ? String(aiData.schedule).trim() : prev.schedule,
      travel: typeof aiData.travel === "boolean" ? aiData.travel : prev.travel,
      relocate: typeof aiData.relocate === "boolean" ? aiData.relocate : prev.relocate,
      
      area: aiData.area && String(aiData.area).trim() !== "" ? String(aiData.area).trim() : prev.area,
      salary: aiData.salary && String(aiData.salary).trim() !== "" ? String(aiData.salary).trim() : prev.salary,
      modality: aiData.modality && String(aiData.modality).trim() !== "" ? String(aiData.modality).trim() : prev.modality,
      
      cvText: aiData.raw || prev.cvText,
      translated: globalTranslated !== "" ? globalTranslated : prev.translated,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    const { name, value, type } = target;
    const finalValue = type === "checkbox" ? (target as HTMLInputElement).checked : value;

    setForm((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`/api/candidatos/completar/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        cache: "no-store",
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Error al guardar información.");
        return;
      }
      setShowNextStep(true);
    } catch (err) {
      console.error("Error al guardar:", err);
      alert("Ocurrió un error al guardar los datos.");
    }
  };

  if (loading) return <p className="text-white p-10 text-center">Cargando perfil...</p>;

  return (
    <section className="w-full min-h-screen bg-[#0A1A3A] text-white pt-20 pb-24 px-6">
      <div className="max-w-4xl mx-auto bg-white text-[#0A1A3A] p-10 rounded-xl shadow-xl">

        <h1 className="text-3xl font-bold text-center text-[#C9A86A] mb-2">
          Actualización de Datos
        </h1>
        <p className="text-center text-gray-600 mb-10 font-medium">
          Perfil de {candidate?.name || "Candidato"}
        </p>

        <CVUpload candidateId={id} onAutoFill={autoFill} />

        {form.translated && (
          <div className="mt-6 p-4 bg-[#FFF9EF] border border-[#C9A86A] rounded-lg shadow">
            <h3 className="font-bold mb-2 text-[#0A1A3A]">Resumen Profesional (Actualizado con IA):</h3>
            <p className="text-sm whitespace-pre-wrap text-gray-800">{form.translated}</p>
          </div>
        )}

        {!showNextStep && (
          <div className="flex flex-col gap-10 mt-10">

            {/* INFORMACIÓN PERSONAL */}
            <div>
              <h2 className="text-xl font-bold mb-4 border-b pb-2 text-[#0A1A3A]">Información Personal</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm font-semibold mb-1">Estado</label>
                  <select name="state" value={form.state} onChange={handleChange} className="border p-3 rounded w-full bg-white text-gray-900">
                    <option value="">Seleccionar</option>
                    <option value="Chihuahua">Chihuahua</option>
                    <option value="Nuevo León">Nuevo León</option>
                    <option value="Coahuila">Coahuila</option>
                    <option value="Jalisco">Jalisco</option>
                    <option value="CDMX">CDMX</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">Ciudad</label>
                  <input name="city" value={form.city} onChange={handleChange} className="border p-3 rounded w-full bg-white text-gray-900" placeholder="Ej. Chihuahua" />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">Zona</label>
                  <input name="zone" value={form.zone} onChange={handleChange} className="border p-3 rounded w-full bg-white text-gray-900" placeholder="Ej. San Felipe" />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">Dirección</label>
                  <input name="address" value={form.address} onChange={handleChange} className="border p-3 rounded w-full bg-white text-gray-900" placeholder="Calle y número" />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">Teléfono</label>
                  <input name="phone" value={form.phone} onChange={handleChange} className="border p-3 rounded w-full bg-white text-gray-900" placeholder="Ej. 6141234567" />
                </div>

              </div>
            </div>

            {/* EXPERIENCIA LABORAL */}
            <div>
              <h2 className="text-xl font-bold mb-4 border-b pb-2 text-[#0A1A3A]">Experiencia Laboral</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm font-semibold mb-1">Empresa</label>
                  <input name="company" value={form.company} onChange={handleChange} className="border p-3 rounded w-full bg-white text-gray-900" placeholder="Última empresa" />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">Puesto</label>
                  <input name="position" value={form.position} onChange={handleChange} className="border p-3 rounded w-full bg-white text-gray-900" placeholder="Último puesto" />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">Años de experiencia</label>
                  <input name="years" value={form.years} onChange={handleChange} className="border p-3 rounded w-full bg-white text-gray-900" placeholder="Ej. 5" />
                </div>

                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-semibold mb-1">Descripción / Resumen Profesional</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="border p-3 rounded w-full bg-white text-gray-900"
                    rows={5}
                    placeholder="Resumen del perfil y trayectoria..."
                  />
                </div>

              </div>
            </div>

            {/* EDUCACIÓN */}
            <div>
              <h2 className="text-xl font-bold mb-4 border-b pb-2 text-[#0A1A3A]">Educación</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm font-semibold mb-1">Escuela / Universidad</label>
                  <input name="school" value={form.school} onChange={handleChange} className="border p-3 rounded w-full bg-white text-gray-900" placeholder="Ej. UACH / ITCH" />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">Grado Académico</label>
                  <select name="degree" value={form.degree} onChange={handleChange} className="border p-3 rounded w-full bg-white text-gray-900">
                    <option value="">Seleccionar</option>
                    <option value="Ingeniería">Ingeniería</option>
                    <option value="Licenciatura">Licenciatura</option>
                    <option value="Maestría">Maestría</option>
                    <option value="Doctorado">Doctorado</option>
                    <option value="Técnico Superior">Técnico Superior</option>
                    <option value="Ingeniería Industrial">Ingeniería Industrial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">Año de graduación</label>
                  <input name="graduationYear" value={form.graduationYear} onChange={handleChange} className="border p-3 rounded w-full bg-white text-gray-900" placeholder="Ej. 2020" />
                </div>

              </div>
            </div>

            {/* DISPONIBILIDAD */}
            <div>
              <h2 className="text-xl font-bold mb-4 border-b pb-2 text-[#0A1A3A]">Disponibilidad</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">

                <div>
                  <label className="block text-sm font-semibold mb-1">Horario</label>
                  <select name="schedule" value={form.schedule} onChange={handleChange} className="border p-3 rounded w-full bg-white text-gray-900">
                    <option value="">Seleccionar</option>
                    <option value="Tiempo completo">Tiempo completo</option>
                    <option value="Medio tiempo">Medio tiempo</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2 mt-4 md:mt-0">
                  <label className="flex items-center gap-2 font-medium cursor-pointer text-gray-900">
                    <input type="checkbox" name="travel" checked={form.travel} onChange={handleChange} className="w-4 h-4 accent-[#C9A86A]" />
                    Disponibilidad para viajar
                  </label>

                  <label className="flex items-center gap-2 font-medium cursor-pointer text-gray-900">
                    <input type="checkbox" name="relocate" checked={form.relocate} onChange={handleChange} className="w-4 h-4 accent-[#C9A86A]" />
                    Disponibilidad para reubicarse
                  </label>
                </div>

              </div>
            </div>

            {/* PREFERENCIAS */}
            <div>
              <h2 className="text-xl font-bold mb-4 border-b pb-2 text-[#0A1A3A]">Preferencias</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm font-semibold mb-1">Área deseada</label>
                  <select name="area" value={form.area} onChange={handleChange} className="border p-3 rounded w-full bg-white text-gray-900">
                    <option value="">Seleccionar</option>
                    <option value="Automotriz / Ingeniería">Automotriz / Ingeniería</option>
                    <option value="Ingeniería de Producto / Automotriz">Ingeniería de Producto / Automotriz</option>
                    <option value="Manufactura">Manufactura</option>
                    <option value="Calidad">Calidad</option>
                    <option value="Sistemas / TI">Sistemas / TI</option>
                    <option value="Recursos Humanos">Recursos Humanos</option>
                    <option value="Administración / Finanzas">Administración / Finanzas</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">Expectativa Salarial</label>
                  <input name="salary" value={form.salary} onChange={handleChange} className="border p-3 rounded w-full bg-white text-gray-900" placeholder="Ej. $25,000 libres" />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">Modalidad</label>
                  <select name="modality" value={form.modality} onChange={handleChange} className="border p-3 rounded w-full bg-white text-gray-900">
                    <option value="">Seleccionar</option>
                    <option value="Presencial">Presencial</option>
                    <option value="Híbrido">Híbrido</option>
                    <option value="Remoto">Remoto</option>
                  </select>
                </div>

              </div>
            </div>

            {/* BOTÓN PARA GUARDAR Y ACTUALIZAR DEFINITIVAMENTE */}
            <button
              onClick={handleSubmit}
              className="w-full py-4 bg-[#C9A86A] text-[#0A1A3A] font-bold text-lg rounded-md hover:bg-[#d8b97a] transition shadow-md cursor-pointer"
            >
              Guardar y actualizar información
            </button>

          </div>
        )}

        {/* PANTALLA DE ÉXITO */}
        {showNextStep && (
          <div className="mt-10 p-6 bg-[#FFF9EF] border border-[#C9A86A] rounded-lg text-[#0A1A3A]">
            <h3 className="text-2xl font-bold mb-2">¡Información actualizada con éxito! 🎉</h3>
            <p className="mb-6 text-gray-700">
              Los cambios se han guardado correctamente en la base de datos.
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  window.location.href = "/vacantes";
                }}
                className="px-6 py-3 bg-[#0A1A3A] text-white rounded-md font-semibold hover:bg-[#142850] transition text-center cursor-pointer"
              >
                Ver Vacantes
              </button>

              <Link
                href="/"
                className="px-6 py-3 bg-[#C9A86A] text-[#0A1A3A] rounded-md font-semibold hover:bg-[#d8b97a] transition text-center inline-block"
              >
                Ir al Inicio
              </Link>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}