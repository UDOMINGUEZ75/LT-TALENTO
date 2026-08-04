"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import CVUpload from "@/app/candidatos/completar/CVUpload";

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

export default function CompletarDatos() {
  const routerParams = useParams();
  const id = routerParams?.id as string;

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

  // 2. Fusión Inteligente al subir un nuevo CV (Smart Merge)
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
              Actualización de Datos
              {candidate?.name && (
                <span className="text-xs bg-[#C9A86A] text-[#0A1A3A] px-3 py-1 rounded-full font-bold">
                  Perfil: {candidate.name}
                </span>
              )}
            </h1>
          </div>
          <p className="text-xs text-gray-300 font-light">
            LT Talent Solutions • Conectamos talento. Transformamos futuros.
          </p>
        </div>

        {/* Tarjeta Principal en 2 Columnas Aprovechando la Pantalla Completa */}
        <div className="bg-white text-gray-900 p-5 lg:p-6 rounded-2xl shadow-2xl border-t-4 border-[#C9A86A]">
          
          {!showNextStep ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

              {/* COLUMNA IZQUIERDA (SUBIR CV Y RESUMEN IA) - 4 cols */}
              <div className="lg:col-span-4 bg-gray-50 p-4 rounded-xl border border-gray-200 flex flex-col justify-between space-y-4">
                <div>
                  <h2 className="text-sm font-bold text-[#0A1A3A] mb-1 flex items-center gap-2">
                    <span className="text-[#C9A86A]">📄</span> Optimizar Perfil con CV (PDF)
                  </h2>
                  <p className="text-xs text-gray-500 mb-3 font-light leading-tight">
                    Sube tu CV para auto-completar y fusionar los datos automáticamente con IA.
                  </p>

                  <CVUpload candidateId={id} onAutoFill={autoFill} />

                  {form.translated && (
                    <div className="mt-4 p-3 bg-[#FFF9EF] border border-[#C9A86A]/40 rounded-xl max-h-[300px] overflow-y-auto">
                      <h3 className="font-bold text-xs uppercase tracking-wider text-[#8c6f33] mb-1">
                        Resumen Extraído con IA:
                      </h3>
                      <p className="text-xs leading-relaxed text-gray-800 font-normal whitespace-pre-wrap">
                        {form.translated}
                      </p>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full py-3 bg-[#0A1A3A] hover:bg-[#122b5c] text-[#C9A86A] font-bold text-sm rounded-xl transition shadow-lg border border-[#C9A86A]/30 cursor-pointer"
                >
                  Guardar y actualizar información
                </button>
              </div>

              {/* COLUMNA DERECHA (CAMPOS DEL FORMULARIO ESTRUCTURADOS) - 8 cols */}
              <div className="lg:col-span-8 space-y-4 text-xs">

                {/* 1. INFORMACIÓN PERSONAL */}
                <div className="bg-gray-50/60 p-3.5 rounded-xl border border-gray-200">
                  <h2 className="text-xs font-bold text-[#0A1A3A] mb-2 uppercase tracking-wider text-[#8c6f33]">
                    1. Información Personal
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Estado</label>
                      <select
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        className="border border-gray-300 p-2.5 rounded-lg w-full bg-white text-xs font-medium focus:border-[#C9A86A] focus:outline-none"
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
                      <label className="block text-xs font-bold text-gray-700 mb-1">Ciudad</label>
                      <input
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        className="border border-gray-300 p-2.5 rounded-lg w-full bg-white text-xs font-medium focus:border-[#C9A86A] focus:outline-none"
                        placeholder="Ej. Chihuahua"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Zona</label>
                      <input
                        name="zone"
                        value={form.zone}
                        onChange={handleChange}
                        className="border border-gray-300 p-2.5 rounded-lg w-full bg-white text-xs font-medium focus:border-[#C9A86A] focus:outline-none"
                        placeholder="Ej. San Felipe"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Dirección</label>
                      <input
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        className="border border-gray-300 p-2.5 rounded-lg w-full bg-white text-xs font-medium focus:border-[#C9A86A] focus:outline-none"
                        placeholder="Calle y número"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Teléfono</label>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="border border-gray-300 p-2.5 rounded-lg w-full bg-white text-xs font-medium focus:border-[#C9A86A] focus:outline-none"
                        placeholder="Ej. 6141234567"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. EXPERIENCIA Y EDUCACIÓN (PARALELO) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  
                  {/* Experiencia Laboral */}
                  <div className="bg-gray-50/60 p-3.5 rounded-xl border border-gray-200">
                    <h2 className="text-xs font-bold text-[#0A1A3A] mb-2 uppercase tracking-wider text-[#8c6f33]">
                      2. Experiencia Laboral
                    </h2>
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-0.5">Empresa</label>
                          <input
                            name="company"
                            value={form.company}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 rounded-lg w-full bg-white text-xs font-medium focus:border-[#C9A86A] focus:outline-none"
                            placeholder="Última empresa"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-0.5">Puesto</label>
                          <input
                            name="position"
                            value={form.position}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 rounded-lg w-full bg-white text-xs font-medium focus:border-[#C9A86A] focus:outline-none"
                            placeholder="Último puesto"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-0.5">Años de experiencia</label>
                        <input
                          name="years"
                          value={form.years}
                          onChange={handleChange}
                          className="border border-gray-300 p-2 rounded-lg w-full bg-white text-xs font-medium focus:border-[#C9A86A] focus:outline-none"
                          placeholder="Ej. 5"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-0.5">Descripción / Resumen Profesional</label>
                        <textarea
                          name="description"
                          value={form.description}
                          onChange={handleChange}
                          className="border border-gray-300 p-2 rounded-lg w-full bg-white text-xs font-normal focus:border-[#C9A86A] focus:outline-none leading-tight"
                          rows={3}
                          placeholder="Resumen del perfil y trayectoria..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Formación Académica & Disponibilidad */}
                  <div className="bg-gray-50/60 p-3.5 rounded-xl border border-gray-200 flex flex-col justify-between">
                    <div>
                      <h2 className="text-xs font-bold text-[#0A1A3A] mb-2 uppercase tracking-wider text-[#8c6f33]">
                        3. Educación
                      </h2>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-0.5">Escuela / Universidad</label>
                          <input
                            name="school"
                            value={form.school}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 rounded-lg w-full bg-white text-xs font-medium focus:border-[#C9A86A] focus:outline-none"
                            placeholder="Ej. UACH / ITCH"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-xs font-bold text-gray-700 mb-0.5">Grado Académico</label>
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
                              <option value="Doctorado">Doctorado</option>
                              <option value="Técnico Superior">Técnico Superior</option>
                              <option value="Ingeniería Industrial">Ingeniería Industrial</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-700 mb-0.5">Año de graduación</label>
                            <input
                              name="graduationYear"
                              value={form.graduationYear}
                              onChange={handleChange}
                              className="border border-gray-300 p-2 rounded-lg w-full bg-white text-xs font-medium focus:border-[#C9A86A] focus:outline-none"
                              placeholder="Ej. 2020"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-200 mt-2">
                      <h2 className="text-[11px] font-bold text-[#0A1A3A] mb-1 uppercase tracking-wider text-[#8c6f33]">
                        Disponibilidad
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <select
                            name="schedule"
                            value={form.schedule}
                            onChange={handleChange}
                            className="border border-gray-300 p-1.5 rounded-lg w-full bg-white text-xs font-medium focus:border-[#C9A86A] focus:outline-none"
                          >
                            <option value="">Horario...</option>
                            <option value="Tiempo completo">Tiempo completo</option>
                            <option value="Medio tiempo">Medio tiempo</option>
                          </select>
                        </div>
                        <div className="flex flex-col justify-center gap-1 text-[11px] font-semibold text-gray-800">
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="checkbox"
                              name="travel"
                              checked={form.travel}
                              onChange={handleChange}
                              className="w-3.5 h-3.5 accent-[#C9A86A]"
                            />
                            Viajar
                          </label>
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="checkbox"
                              name="relocate"
                              checked={form.relocate}
                              onChange={handleChange}
                              className="w-3.5 h-3.5 accent-[#C9A86A]"
                            />
                            Reubicarse
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* 3. PREFERENCIAS LABORALES */}
                <div className="bg-gray-50/60 p-3.5 rounded-xl border border-gray-200">
                  <h2 className="text-xs font-bold text-[#0A1A3A] mb-2 uppercase tracking-wider text-[#8c6f33]">
                    4. Preferencias
                  </h2>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Área deseada</label>
                      <select
                        name="area"
                        value={form.area}
                        onChange={handleChange}
                        className="border border-gray-300 p-2.5 rounded-lg w-full bg-white text-xs font-medium focus:border-[#C9A86A] focus:outline-none"
                      >
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
                      <label className="block text-xs font-bold text-gray-700 mb-1">Expectativa Salarial</label>
                      <input
                        name="salary"
                        value={form.salary}
                        onChange={handleChange}
                        className="border border-gray-300 p-2.5 rounded-lg w-full bg-white text-xs font-medium focus:border-[#C9A86A] focus:outline-none"
                        placeholder="Ej. $25,000 libres"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Modalidad</label>
                      <select
                        name="modality"
                        value={form.modality}
                        onChange={handleChange}
                        className="border border-gray-300 p-2.5 rounded-lg w-full bg-white text-xs font-medium focus:border-[#C9A86A] focus:outline-none"
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
            /* PANTALLA DE ÉXITO */
            <div className="p-8 bg-[#FFF9EF] border border-[#C9A86A] rounded-2xl text-[#0A1A3A] text-center">
              <h3 className="text-2xl font-bold mb-2">¡Información actualizada con éxito! 🎉</h3>
              <p className="mb-6 text-sm text-gray-700 font-light">
                Los cambios se han guardado correctamente en la base de datos de LT Talent Solutions.
              </p>

              <div className="flex justify-center gap-4">
                <Link
                  href="/vacantes"
                  className="px-6 py-3 bg-[#0A1A3A] text-white rounded-xl text-xs font-bold hover:bg-[#142850] transition shadow inline-block"
                >
                  Ver Vacantes
                </Link>

                <Link
                  href="/"
                  className="px-6 py-3 bg-[#C9A86A] text-[#0A1A3A] rounded-xl text-xs font-bold hover:bg-[#d8b97a] transition shadow inline-block"
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