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
              years:
                cand.experience?.years !== undefined &&
                cand.experience?.years !== null
                  ? String(cand.experience.years)
                  : prev.years,
              description: cand.experience?.description || prev.description,

              school: cand.education?.school || prev.school,
              degree: cand.education?.degree || prev.degree,
              graduationYear:
                cand.education?.graduationYear !== undefined &&
                cand.education?.graduationYear !== null
                  ? String(cand.education.graduationYear)
                  : prev.graduationYear,

              schedule: cand.availability?.schedule || prev.schedule,
              travel:
                typeof cand.availability?.travel === "boolean"
                  ? cand.availability.travel
                  : prev.travel,
              relocate:
                typeof cand.availability?.relocate === "boolean"
                  ? cand.availability.relocate
                  : prev.relocate,

              area: cand.preferences?.area || prev.area,
              salary:
                cand.preferences?.salary !== undefined &&
                cand.preferences?.salary !== null
                  ? String(cand.preferences.salary)
                  : prev.salary,
              modality: cand.preferences?.modality || prev.modality,

              translated:
                cand.translated ||
                cand.experience?.description ||
                prev.translated,
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

  const autoFill = (responseServer: any) => {
    if (!responseServer || typeof responseServer !== "object") return;

    const aiData = responseServer.extracted || {};
    const globalTranslated =
      responseServer.translated || aiData.translated || aiData.description || "";

    setForm((prev) => ({
      ...prev,
      state:
        aiData.state && String(aiData.state).trim() !== ""
          ? String(aiData.state).trim()
          : prev.state,
      city:
        aiData.city && String(aiData.city).trim() !== ""
          ? String(aiData.city).trim()
          : prev.city,
      zone:
        aiData.zone && String(aiData.zone).trim() !== ""
          ? String(aiData.zone).trim()
          : prev.zone,
      address:
        aiData.address && String(aiData.address).trim() !== ""
          ? String(aiData.address).trim()
          : prev.address,
      phone:
        aiData.phone && String(aiData.phone).trim() !== ""
          ? String(aiData.phone).trim()
          : prev.phone,

      company:
        aiData.company && String(aiData.company).trim() !== ""
          ? String(aiData.company).trim()
          : prev.company,
      position:
        aiData.position && String(aiData.position).trim() !== ""
          ? String(aiData.position).trim()
          : prev.position,
      years:
        aiData.years !== undefined &&
        aiData.years !== null &&
        String(aiData.years).trim() !== ""
          ? String(aiData.years).trim()
          : prev.years,

      description:
        globalTranslated !== "" ? globalTranslated : prev.description,

      school:
        aiData.school && String(aiData.school).trim() !== ""
          ? String(aiData.school).trim()
          : prev.school,
      degree:
        aiData.degree && String(aiData.degree).trim() !== ""
          ? String(aiData.degree).trim()
          : prev.degree,
      graduationYear:
        aiData.graduationYear && String(aiData.graduationYear).trim() !== ""
          ? String(aiData.graduationYear).trim()
          : prev.graduationYear,

      schedule:
        aiData.schedule && String(aiData.schedule).trim() !== ""
          ? String(aiData.schedule).trim()
          : prev.schedule,
      travel:
        typeof aiData.travel === "boolean" ? aiData.travel : prev.travel,
      relocate:
        typeof aiData.relocate === "boolean" ? aiData.relocate : prev.relocate,

      area:
        aiData.area && String(aiData.area).trim() !== ""
          ? String(aiData.area).trim()
          : prev.area,
      salary:
        aiData.salary && String(aiData.salary).trim() !== ""
          ? String(aiData.salary).trim()
          : prev.salary,
      modality:
        aiData.modality && String(aiData.modality).trim() !== ""
          ? String(aiData.modality).trim()
          : prev.modality,

      cvText: aiData.raw || prev.cvText,
      translated:
        globalTranslated !== "" ? globalTranslated : prev.translated,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const target = e.target;
    const { name, value, type } = target;
    const finalValue =
      type === "checkbox" ? (target as HTMLInputElement).checked : value;

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

  if (loading)
    return (
      <div className="min-h-screen bg-[#0A1A3A] flex items-center justify-center text-[#C9A86A] text-lg font-bold">
        Cargando perfil profesional...
      </div>
    );

  return (
    <section className="w-full min-h-screen bg-[#0A1A3A] text-white pt-20 pb-8 px-4 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Encabezado Delgado y Compacto */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 border-b border-white/10 pb-3 gap-2">
          <div>
            <h1 className="text-xl md:text-2xl font-black text-white flex items-center gap-3">
              Actualización de Perfil 
              {candidate?.name && (
                <span className="text-xs bg-[#C9A86A] text-[#0A1A3A] px-3 py-1 rounded-full font-bold">
                  {candidate.name}
                </span>
              )}
            </h1>
          </div>
          <p className="text-xs text-gray-300 font-light">
            LT Talent Solutions • Conectamos talento. Transformamos futuros.
          </p>
        </div>

        {/* Tarjeta Principal de Ancho Completo (2 Columnas) */}
        <div className="bg-white text-gray-900 p-5 lg:p-6 rounded-2xl shadow-2xl border-t-4 border-[#C9A86A]">
          
          {!showNextStep ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

              {/* COLUMNA IZQUIERDA (CV & IA) - 4 Columnas */}
              <div className="lg:col-span-4 bg-gray-50 p-4 rounded-xl border border-gray-200 flex flex-col justify-between space-y-4">
                <div>
                  <h2 className="text-sm font-bold text-[#0A1A3A] mb-1">
                    Optimizar con CV (PDF)
                  </h2>
                  <p className="text-[11px] text-gray-500 mb-3 font-light leading-tight">
                    Sube tu CV para auto-completar los datos automáticamente con IA.
                  </p>

                  <CVUpload candidateId={id} onAutoFill={autoFill} />

                  {form.translated && (
                    <div className="mt-4 p-3 bg-[#FFF9EF] border border-[#C9A86A]/40 rounded-xl max-h-[320px] overflow-y-auto">
                      <h3 className="font-bold text-[10px] uppercase tracking-wider text-[#8c6f33] mb-1">
                        Resumen Extraído con IA:
                      </h3>
                      <p className="text-xs leading-relaxed text-gray-800 font-light whitespace-pre-wrap">
                        {form.translated}
                      </p>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full py-3 bg-[#0A1A3A] hover:bg-[#122b5c] text-[#C9A86A] font-bold text-sm rounded-xl transition shadow-lg border border-[#C9A86A]/30 cursor-pointer"
                >
                  Guardar y Actualizar
                </button>
              </div>

              {/* COLUMNA DERECHA (CAMPOS DEL FORMULARIO) - 8 Columnas */}
              <div className="lg:col-span-8 space-y-4 text-xs">

                {/* 1. INFORMACIÓN PERSONAL Y UBICACIÓN */}
                <div className="bg-gray-50/50 p-3.5 rounded-xl border border-gray-200">
                  <h2 className="text-xs font-bold text-[#0A1A3A] mb-2 uppercase tracking-wider text-[#8c6f33]">
                    1. Información Personal
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-1">Estado</label>
                      <select
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-lg w-full bg-white text-xs font-medium focus:border-[#C9A86A] focus:outline-none"
                      >
                        <option value="">Seleccionar</option>
                        <option value="Chihuahua">Chihuahua</option>
                        <option value="Nuevo León">Nuevo León</option>
                        <option value="Coahuila">Coahuila</option>
                        <option value="Jalisco">Jalisco</option>
                        <option value="CDMX">CDMX</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-1">Ciudad</label>
                      <input
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-lg w-full bg-white text-xs font-medium focus:border-[#C9A86A] focus:outline-none"
                        placeholder="Ej. Chihuahua"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-1">Zona</label>
                      <input
                        name="zone"
                        value={form.zone}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-lg w-full bg-white text-xs font-medium focus:border-[#C9A86A] focus:outline-none"
                        placeholder="Ej. Norte"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-1">Dirección</label>
                      <input
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-lg w-full bg-white text-xs font-medium focus:border-[#C9A86A] focus:outline-none"
                        placeholder="Calle y número"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-1">Teléfono</label>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-lg w-full bg-white text-xs font-medium focus:border-[#C9A86A] focus:outline-none"
                        placeholder="6141234567"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. EXPERIENCIA Y EDUCACIÓN (EN PARALELO) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Experiencia */}
                  <div className="bg-gray-50/50 p-3.5 rounded-xl border border-gray-200">
                    <h2 className="text-xs font-bold text-[#0A1A3A] mb-2 uppercase tracking-wider text-[#8c6f33]">
                      2. Experiencia Laboral
                    </h2>
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] font-semibold text-gray-700 mb-0.5">Empresa</label>
                          <input
                            name="company"
                            value={form.company}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 rounded-lg w-full bg-white text-xs font-medium focus:border-[#C9A86A] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-gray-700 mb-0.5">Puesto</label>
                          <input
                            name="position"
                            value={form.position}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 rounded-lg w-full bg-white text-xs font-medium focus:border-[#C9A86A] focus:outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-700 mb-0.5">Años Exp.</label>
                        <input
                          name="years"
                          value={form.years}
                          onChange={handleChange}
                          className="border border-gray-300 p-2 rounded-lg w-full bg-white text-xs font-medium focus:border-[#C9A86A] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-700 mb-0.5">Resumen Trayectoria</label>
                        <textarea
                          name="description"
                          value={form.description}
                          onChange={handleChange}
                          className="border border-gray-300 p-2 rounded-lg w-full bg-white text-xs font-normal focus:border-[#C9A86A] focus:outline-none leading-tight"
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Educación y Disponibilidad */}
                  <div className="bg-gray-50/50 p-3.5 rounded-xl border border-gray-200 flex flex-col justify-between">
                    <div>
                      <h2 className="text-xs font-bold text-[#0A1A3A] mb-2 uppercase tracking-wider text-[#8c6f33]">
                        3. Formación Académica
                      </h2>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-[11px] font-semibold text-gray-700 mb-0.5">Universidad / Escuela</label>
                          <input
                            name="school"
                            value={form.school}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 rounded-lg w-full bg-white text-xs font-medium focus:border-[#C9A86A] focus:outline-none"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[11px] font-semibold text-gray-700 mb-0.5">Grado</label>
                            <select
                              name="degree"
                              value={form.degree}
                              onChange={handleChange}
                              className="border border-gray-300 p-2 rounded-lg w-full bg-white text-xs font-medium focus:border-[#C9A86A] focus:outline-none"
                            >
                              <option value="">Seleccionar</option>
                              <option value="Ingeniería">Ingeniería</option>
                              <option value="Licenciatura">Licenciatura</option>
                              <option value="Maestría">Maestría</option>
                              <option value="Técnico Superior">Técnico Superior</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-gray-700 mb-0.5">Año Grad.</label>
                            <input
                              name="graduationYear"
                              value={form.graduationYear}
                              onChange={handleChange}
                              className="border border-gray-300 p-2 rounded-lg w-full bg-white text-xs font-medium focus:border-[#C9A86A] focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-200 mt-2">
                      <div className="flex gap-4 text-[11px] font-semibold text-gray-800">
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="checkbox"
                            name="travel"
                            checked={form.travel}
                            onChange={handleChange}
                            className="w-3.5 h-3.5 accent-[#0A1A3A]"
                          />
                          Viajar
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="checkbox"
                            name="relocate"
                            checked={form.relocate}
                            onChange={handleChange}
                            className="w-3.5 h-3.5 accent-[#0A1A3A]"
                          />
                          Reubicarse
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. PREFERENCIAS */}
                <div className="bg-gray-50/50 p-3.5 rounded-xl border border-gray-200">
                  <h2 className="text-xs font-bold text-[#0A1A3A] mb-2 uppercase tracking-wider text-[#8c6f33]">
                    4. Preferencias Laborales
                  </h2>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-1">Área Deseada</label>
                      <select
                        name="area"
                        value={form.area}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-lg w-full bg-white text-xs font-medium focus:border-[#C9A86A] focus:outline-none"
                      >
                        <option value="">Seleccionar</option>
                        <option value="Automotriz / Ingeniería">Automotriz / Ingeniería</option>
                        <option value="Manufactura">Manufactura</option>
                        <option value="Calidad">Calidad</option>
                        <option value="Sistemas / TI">Sistemas / TI</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-1">Sueldo Esperado</label>
                      <input
                        name="salary"
                        value={form.salary}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-lg w-full bg-white text-xs font-medium focus:border-[#C9A86A] focus:outline-none"
                        placeholder="Ej. $25,000"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-700 mb-1">Modalidad</label>
                      <select
                        name="modality"
                        value={form.modality}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-lg w-full bg-white text-xs font-medium focus:border-[#C9A86A] focus:outline-none"
                      >
                        <option value="">Seleccionar</option>
                        <option value="Presencial">Presencial</option>
                        <option value="Híbrido">Híbrido</option>
                        <option value="Remoto">Remoto</option>
                      </select>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          ) : (
            /* PANTALLA DE ÉXITO LIMPICIMA SIN ÍCONOS NI EMOJIS */
            <div className="py-12 px-6 bg-[#FFF9EF] border-2 border-[#C9A86A] rounded-2xl text-[#0A1A3A] text-center shadow-lg my-4 space-y-4">
              <div className="inline-block px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#0A1A3A] bg-[#C9A86A] rounded-full shadow-sm">
                LT Talent Solutions • Perfil Profesional
              </div>

              <h3 className="text-3xl sm:text-4xl font-black text-[#0A1A3A]">
                ¡Información actualizada con éxito!
              </h3>
              
              <p className="text-sm sm:text-base text-gray-700 font-light max-w-xl mx-auto leading-relaxed">
                Tu perfil profesional ha sido guardado correctamente en nuestra base de datos.
              </p>

              <div className="flex flex-wrap justify-center items-center gap-4 pt-6">
                <Link
                  href={`/candidatos/dashboard?id=${id}`}
                  className="px-6 py-3.5 bg-[#0A1A3A] text-[#C9A86A] border border-[#C9A86A]/40 font-bold rounded-xl text-xs sm:text-sm hover:bg-[#122b5c] transition shadow-lg"
                >
                  Ir a Mi Dashboard
                </Link>

                <Link
                  href="/vacantes"
                  className="px-6 py-3.5 bg-[#0A1A3A] text-white font-bold rounded-xl text-xs sm:text-sm hover:bg-[#142850] transition shadow-lg"
                >
                  Ver Oportunidades
                </Link>

                <Link
                  href="/"
                  className="px-6 py-3.5 bg-[#C9A86A] text-[#0A1A3A] font-bold rounded-xl text-xs sm:text-sm hover:bg-[#d8b97a] transition shadow-lg"
                >
                  Ir al Inicio
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}