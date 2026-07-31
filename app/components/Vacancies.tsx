"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Job {
  id: number;
  title: string;
  location: string;
  type?: string;
  salary?: string;
  description: string;
}

export default function VacantesPublicas() {
  const router = useRouter();
  const [allVacancies, setAllVacancies] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  
  // Estados para los filtros avanzados
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("Todas");
  const [selectedType, setSelectedType] = useState("Todos");
  const [selectedSalary, setSelectedSalary] = useState("Todos");

  useEffect(() => {
    async function loadVacancies() {
      try {
        const res = await fetch("/api/vacantes", { cache: "no-store" });
        const data = await res.json();
        if (res.ok && data.vacancies) {
          setAllVacancies(data.vacancies);
        } else {
          setErrorMsg("No se pudieron cargar las vacantes.");
        }
      } catch (err) {
        console.error("Error al obtener vacantes:", err);
        setErrorMsg("Error de conexión con la base de datos.");
      } finally {
        setLoading(false);
      }
    }
    loadVacancies();
  }, []);

  // Extraer ubicaciones únicas para el filtro dinámico
  const locations = useMemo(() => {
    const locs = allVacancies.map((v) => v.location).filter(Boolean);
    return ["Todas", ...Array.from(new Set(locs))];
  }, [allVacancies]);

  // Función auxiliar para normalizar textos (eliminar acentos y pasar a minúsculas)
  const normalizeText = (text: string) => {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  // Filtrar vacantes ignorando mayúsculas y acentos
  const filteredVacancies = useMemo(() => {
    const normalizedSearch = normalizeText(searchTerm);

    return allVacancies.filter((v) => {
      const titleNormalized = normalizeText(v.title || "");
      const descNormalized = normalizeText(v.description || "");

      const matchesSearch =
        titleNormalized.includes(normalizedSearch) ||
        descNormalized.includes(normalizedSearch);
      
      const matchesLocation =
        selectedLocation === "Todas" || v.location === selectedLocation;

      const matchesType =
        selectedType === "Todos" || v.type === selectedType;

      const matchesSalary =
        selectedSalary === "Todos" || 
        (selectedSalary === "Competitivo" && (!v.salary || v.salary.toLowerCase().includes("competitivo"))) ||
        (selectedSalary !== "Competitivo" && v.salary?.toLowerCase().includes(selectedSalary.toLowerCase()));

      return matchesSearch && matchesLocation && matchesType && matchesSalary;
    });
  }, [allVacancies, searchTerm, selectedLocation, selectedType, selectedSalary]);

  const handlePostularseClick = (e: React.MouseEvent<HTMLAnchorElement>, jobId: number) => {
    const isLoggedIn = sessionStorage.getItem("candidateLoggedIn");
    
    if (!isLoggedIn) {
      e.preventDefault();
      localStorage.setItem("redirectAfterLogin", `/candidatos/postular/${jobId}`);
      router.push("/candidatos/acceso-vacante"); 
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-[#C9A86A] text-lg font-medium">Cargando vacantes disponibles...</div>;
  }

  if (errorMsg) {
    return <div className="text-center py-20 text-red-400 font-medium">{errorMsg}</div>;
  }

  return (
    <section className="py-16 bg-[#0A1A3A] text-white">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Título Centrado y Estilizado */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#C9A86A] tracking-tight mb-3">
            Vacantes Disponibles
          </h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto">
            Explore nuestras oportunidades profesionales y postúlese de forma directa y segura.
          </p>
        </div>

        {/* Sección de Filtros Múltiples Profesionales */}
        <div className="bg-[#0f234d] p-6 rounded-3xl border border-[#C9A86A]/30 shadow-2xl mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
          
          {/* 1. Buscador por texto (Sin discriminar mayúsculas ni acentos) */}
          <div>
            <label className="block text-xs font-semibold text-[#C9A86A] mb-1.5 uppercase tracking-wider">Buscar puesto</label>
            <input
              type="text"
              placeholder="Ej. Mantenimiento, Ventas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-[#08142c] border border-gray-700/80 rounded-xl text-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#C9A86A] transition"
            />
          </div>

          {/* 2. Filtro por Ubicación */}
          <div>
            <label className="block text-xs font-semibold text-[#C9A86A] mb-1.5 uppercase tracking-wider">Ubicación</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-4 py-3 bg-[#08142c] border border-gray-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-[#C9A86A] transition cursor-pointer"
            >
              {locations.map((loc, idx) => (
                <option key={idx} value={loc} className="bg-[#08142c] text-white">
                  {loc === "Todas" ? "Todas las ubicaciones" : loc}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Filtro por Tipo de Contrato */}
          <div>
            <label className="block text-xs font-semibold text-[#C9A86A] mb-1.5 uppercase tracking-wider">Tipo de empleo</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-3 bg-[#08142c] border border-gray-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-[#C9A86A] transition cursor-pointer"
            >
              <option value="Todos">Todos los tipos</option>
              <option value="Tiempo completo">Tiempo completo</option>
              <option value="Medio tiempo">Medio tiempo</option>
              <option value="Temporal">Temporal / Proyecto</option>
            </select>
          </div>

          {/* 4. Filtro por Compensación */}
          <div>
            <label className="block text-xs font-semibold text-[#C9A86A] mb-1.5 uppercase tracking-wider">Compensación</label>
            <select
              value={selectedSalary}
              onChange={(e) => setSelectedSalary(e.target.value)}
              className="w-full px-4 py-3 bg-[#08142c] border border-gray-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-[#C9A86A] transition cursor-pointer"
            >
              <option value="Todos">Cualquier sueldo</option>
              <option value="Competitivo">Sueldo competitivo</option>
            </select>
          </div>

        </div>

        {/* Cuadrícula de Vacantes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVacancies.map((v) => (
            <div
              key={v.id}
              className="p-8 rounded-2xl bg-[#0f234d] border border-[#C9A86A]/30 shadow-2xl flex flex-col justify-between w-full min-h-[420px] transition-transform hover:-translate-y-1 duration-200"
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-[#C9A86A]">{v.title}</h3>
                
                {/* Etiquetas sin iconos */}
                <div className="text-xs font-semibold flex flex-wrap gap-2 pt-1">
                  <span className="bg-[#162e5d] px-3 py-1.5 rounded-lg border border-[#C9A86A]/20 text-gray-200">
                    <span className="text-[#C9A86A] font-medium mr-1">Ubicación:</span> {v.location || "Presencial"}
                  </span>
                  <span className="bg-[#162e5d] px-3 py-1.5 rounded-lg border border-[#C9A86A]/20 text-gray-200">
                    <span className="text-[#C9A86A] font-medium mr-1">Sueldo:</span> {v.salary || "Competitivo"}
                  </span>
                </div>

                <p className="text-sm text-gray-300 line-clamp-4 leading-relaxed pt-2">
                  {v.description}
                </p>
              </div>

              <Link
                href={`/candidatos/postular/${v.id}`}
                onClick={(e) => handlePostularseClick(e, v.id)}
                className="w-full py-3.5 bg-[#C9A86A] text-[#0A1A3A] font-bold rounded-xl hover:bg-[#d8b97a] transition text-sm shadow-lg mt-6 text-center block"
              >
                Postularme / Ver detalles
              </Link>
            </div>
          ))}
        </div>

        {filteredVacancies.length === 0 && (
          <div className="text-center py-16 bg-[#0f234d]/50 rounded-2xl border border-gray-800">
            <p className="text-gray-400 text-base">No se encontraron vacantes con los filtros seleccionados.</p>
          </div>
        )}

      </div>
    </section>
  );
}