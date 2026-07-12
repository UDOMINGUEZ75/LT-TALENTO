"use client";

import { useState } from "react";

export default function Vacancies() {
  const allVacancies = [
    {
      id: 1,
      title: "Supervisor de Producción",
      location: "Chihuahua, CHIH",
      type: "Tiempo completo",
    },
    {
      id: 2,
      title: "Ingeniero de Calidad",
      location: "Planta Automotriz",
      type: "Presencial",
    },
    {
      id: 3,
      title: "Analista de Logística",
      location: "Híbrido",
      type: "Tiempo completo",
    },
    {
      id: 4,
      title: "Técnico de Mantenimiento",
      location: "Turno nocturno",
      type: "Presencial",
    },
  ];

  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const filteredVacancies = allVacancies.filter((v) => {
    return (
      (locationFilter === "" || v.location.includes(locationFilter)) &&
      (typeFilter === "" || v.type.includes(typeFilter))
    );
  });

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* TÍTULO */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Vacantes disponibles
        </h2>

        {/* FILTROS */}
        <div className="bg-white p-6 rounded-xl shadow mb-10">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Filtrar vacantes
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* FILTRO UBICACIÓN */}
            <div>
              <label className="block text-gray-700 mb-2">Ubicación</label>
              <select
                className="w-full p-3 border rounded-lg"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                <option value="">Todas</option>
                <option value="Chihuahua">Chihuahua</option>
                <option value="Planta Automotriz">Planta Automotriz</option>
                <option value="Híbrido">Híbrido</option>
              </select>
            </div>

            {/* FILTRO TIPO */}
            <div>
              <label className="block text-gray-700 mb-2">Tipo de trabajo</label>
              <select
                className="w-full p-3 border rounded-lg"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="">Todos</option>
                <option value="Tiempo completo">Tiempo completo</option>
                <option value="Presencial">Presencial</option>
                <option value="Híbrido">Híbrido</option>
                <option value="Turno nocturno">Turno nocturno</option>
              </select>
            </div>

          </div>
        </div>

        {/* LISTADO DE VACANTES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVacancies.map((v) => (
            <div
              key={v.id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-gray-900">
                {v.title}
              </h3>
              <p className="text-gray-600">{v.location}</p>
              <p className="text-gray-600 text-sm mb-4">{v.type}</p>

              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Ver detalles
              </button>
            </div>
          ))}
        </div>

        {/* SI NO HAY RESULTADOS */}
        {filteredVacancies.length === 0 && (
          <p className="text-gray-600 mt-6">
            No se encontraron vacantes con los filtros seleccionados.
          </p>
        )}
      </div>
    </section>
  );
}
