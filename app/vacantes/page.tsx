"use client";

import { useState } from "react";

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
  ];

  const titles = [...new Set(allVacancies.map(v => v.title))];
  const locations = [...new Set(allVacancies.map(v => v.location))];
  const types = [...new Set(allVacancies.map(v => v.type))];

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
    <section className="py-32 bg-[#0A1A3A] text-white min-h-screen">
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

        {/* LISTA DE VACANTES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVacancies.map((v) => (
            <div
              key={v.id}
              className="p-6 rounded-xl transition bg-white text-[#0A1A3A] shadow hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-1 text-[#C9A86A]">
                {v.title}
              </h3>

              <p>{v.location}</p>
              <p className="text-sm">{v.type}</p>

              <p className="mt-4">
                <strong className="text-[#C9A86A]">Sueldo:</strong>{" "}
                ${v.salaryMin.toLocaleString()} a ${v.salaryMax.toLocaleString()}
              </p>

              <p className="mt-3 text-sm leading-relaxed">
                {v.description}
              </p>

              <button
                className="
                  mt-5 w-full px-4 py-2
                  bg-[#C9A86A] hover:bg-[#D4AF37]
                  text-[#0A1A3A] font-semibold
                  rounded-lg transition
                "
              >
                Ver detalles
              </button>
            </div>
          ))}
        </div>

        {filteredVacancies.length === 0 && (
          <p className="mt-6 text-center text-[#C9A86A]">
            No se encontraron vacantes con los filtros seleccionados.
          </p>
        )}

        <div className="mt-12 text-center">
          <a
            href="/"
            className="px-6 py-3 bg-[#C9A86A] text-[#0A1A3A] rounded-md font-semibold hover:bg-[#d8b97a]"
          >
            Salir de Vacantes
          </a>
        </div>

      </div>
    </section>
  );
}
