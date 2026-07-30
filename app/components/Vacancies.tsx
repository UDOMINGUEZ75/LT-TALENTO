"use client";

import { useState } from "react";

export const dynamic = "force-dynamic";

export default function Vacancies() {
  const allVacancies = [
    {
      id: 1,
      title: "Coordinador de Instalación de Racks",
      location: "Chihuahua, CHIH",
      type: "Tiempo completo",
      salaryMin: 16000,
      salaryMax: 20000,
      description:
        "Coordina equipos técnicos, supervisa instalaciones industriales y asegura calidad y seguridad en proyectos de racks.",
    },
    {
      id: 2,
      title: "Auxiliar de Aduanas",
      location: "Chihuahua, CHIH",
      type: "Tiempo completo",
      salaryMin: 18000,
      salaryMax: 25000,
      description:
        "Revisión documental, logística, manejo de pedimentos, BL, certificados de origen y comunicación con agentes aduanales.",
    },
    {
      id: 3,
      title: "Jefe de Área de Pintura",
      location: "Chihuahua, Chihuahua",
      type: "Tiempo completo",
      salaryMin: 18000,
      salaryMax: 18000,
      description:
        "Supervisión de procesos de pintura electrostática, control de producción, indicadores y gestión de personal.",
    },
    {
      id: 4,
      title: "Técnico de Mantenimiento",
      location: "Chihuahua, CHIH",
      type: "Tiempo completo",
      salaryMin: 15000,
      salaryMax: 19000,
      description:
        "Carrera técnica en Mantenimiento Industrial, Electromecánica, Mecánica o Electricidad. Experiencia de 2-3 años. Soldadura MIG/TIG, electricidad industrial, sistemas neumáticos e hidráulicos. Horario: Lunes a Viernes de 7 a 17 hrs. Pago semanal sin semana de fondo.",
    },
  ];

  const titles = [...new Set(allVacancies.map((v) => v.title))];
  const locations = [...new Set(allVacancies.map((v) => v.location))];
  const types = [...new Set(allVacancies.map((v) => v.type))];

  const [titleFilter, setTitleFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const filteredVacancies = allVacancies.filter((v) => {
    const matchTitle = titleFilter === "" || v.title === titleFilter;
    const matchLocation = locationFilter === "" || v.location === locationFilter;
    const matchType = typeFilter === "" || v.type === typeFilter;
    return matchTitle && matchLocation && matchType;
  });

  return (
    <section className="py-16 bg-[#0A1A3A] text-white">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-3xl font-bold mb-8 text-[#C9A86A]">
          Vacantes disponibles
        </h2>

        {/* FILTROS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div>
            <label className="block text-[#C9A86A] mb-2 font-medium">
              Puesto
            </label>
            <select
              className="w-full p-3 border border-[#C9A86A] rounded-lg bg-white text-black"
              value={titleFilter}
              onChange={(e) => setTitleFilter(e.target.value)}
            >
              <option value="">Todos</option>
              {titles.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[#C9A86A] mb-2 font-medium">
              Ubicación
            </label>
            <select
              className="w-full p-3 border border-[#C9A86A] rounded-lg bg-white text-black"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="">Todas</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[#C9A86A] mb-2 font-medium">
              Tipo de trabajo
            </label>
            <select
              className="w-full p-3 border border-[#C9A86A] rounded-lg bg-white text-black"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="">Todos</option>
              {types.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

        </div>

        {/* LISTA DE VACANTES — TRANSPARENTE */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVacancies.map((v) => (
            <div
              key={v.id}
              className="p-6 rounded-xl transition bg-[#0f234d] border border-[#C9A86A]/20 shadow-lg flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold mb-1 text-[#C9A86A]">
                  {v.title}
                </h3>

                <p className="text-gray-300 font-medium">{v.location}</p>
                <p className="text-sm text-gray-400">{v.type}</p>

                <p className="mt-4">
                  <strong className="text-[#C9A86A]">Sueldo:</strong> ${v.salaryMin.toLocaleString()} a ${v.salaryMax.toLocaleString()} MXN
                </p>

                <p className="mt-3 text-sm leading-relaxed text-gray-200">
                  {v.description}
                </p>
              </div>

              <button
                onClick={() => alert(`Para postularte a "${v.title}", por favor envía tu CV por WhatsApp al 614 398 1235`)}
                className="
                  mt-5 w-full px-4 py-2.5
                  bg-[#C9A86A] hover:bg-[#D4AF37]
                  text-[#0A1A3A] font-semibold
                  rounded-lg transition shadow-md
                "
              >
                Postularme / Ver detalles
              </button>
            </div>
          ))}
        </div>

        {filteredVacancies.length === 0 && (
          <p className="mt-6 text-center text-[#C9A86A]">
            No se encontraron vacantes con los filtros seleccionados.
          </p>
        )}
      </div>
    </section>
  );
}