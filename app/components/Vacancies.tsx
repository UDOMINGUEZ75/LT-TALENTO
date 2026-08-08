/* STREAMING_CHUNK:Refactoring Vacancies component to handle long salary texts cleanly... */
"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { MapPin, DollarSign, Clock, ArrowRight, Search, SlidersHorizontal } from "lucide-react";

interface Job {
  id: number;
  title: string;
  location: string;
  type?: string;
  salary?: string;
  description: string;
}

export default function Vacancies() {
  const router = useRouter();
  const [allVacancies, setAllVacancies] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Estados para filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("Todas");

  useEffect(() => {
    setIsMounted(true);

    async function loadVacancies() {
      try {
        const res = await fetch("/api/vacantes", {
          cache: "no-store",
          headers: { Accept: "application/json" },
        });

        if (!res.ok) {
          setAllVacancies([]);
          return;
        }

        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await res.json();
          const lista = Array.isArray(data)
            ? data
            : data.vacancies || data.jobs || data.data || [];
          setAllVacancies(lista);
        } else {
          setAllVacancies([]);
        }
      } catch (err) {
        console.error("Error al cargar vacantes:", err);
        setAllVacancies([]);
      } finally {
        setLoading(false);
      }
    }

    loadVacancies();
  }, []);

  const locations = useMemo(() => {
    const locs = allVacancies.map((v) => v.location).filter(Boolean);
    return ["Todas", ...Array.from(new Set(locs))];
  }, [allVacancies]);

  const normalizeText = (text: string) => {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

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

      return matchesSearch && matchesLocation;
    });
  }, [allVacancies, searchTerm, selectedLocation]);

  const handlePostularseClick = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
    jobId: number
  ) => {
    e.preventDefault();
    let isLoggedIn = false;

    try {
      if (typeof window !== "undefined" && window.sessionStorage) {
        isLoggedIn = !!sessionStorage.getItem("candidateLoggedIn");
      }
    } catch (err) {
      console.warn("Storage no disponible:", err);
    }

    if (!isLoggedIn) {
      try {
        if (typeof window !== "undefined" && window.localStorage) {
          localStorage.setItem("redirectAfterLogin", `/candidatos/postular/${jobId}`);
        }
      } catch (err) {
        console.warn("Storage no disponible:", err);
      }
      router.push("/candidatos/acceso-vacante");
    } else {
      router.push(`/candidatos/postular/${jobId}`);
    }
  };

  if (loading || !isMounted) {
    return (
      <section id="vacantes" className="relative w-full pt-28 pb-20 bg-[#0A1A3A] text-white text-center px-4">
        <div className="py-16 text-[#C9A86A] text-xs sm:text-sm font-medium animate-pulse">
          Buscando mejores oportunidades...
        </div>
      </section>
    );
  }

  return (
    <section id="vacantes" className="relative w-full pt-24 sm:pt-32 pb-20 sm:pb-24 bg-[#0A1A3A] text-white px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Fondo sutil */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[400px] bg-[#C9A86A]/5 rounded-full blur-[90px] md:blur-[120px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Encabezado Adaptado */}
        <div className="text-center mb-6 sm:mb-10 space-y-2">
          <span className="inline-block px-3.5 py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#0A1A3A] bg-[#C9A86A] rounded-full shadow-md">
            Bolsa de Trabajo
          </span>
          <h2 className="text-2xl sm:text-5xl font-black text-white tracking-tight">
            Oportunidades Destacadas
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm max-w-xl mx-auto font-light leading-relaxed">
            Encuentra tu próximo paso profesional en empresas de alto impacto.
          </p>
        </div>

        {/* BUSCADOR ESTILO MOBILE APP / DESKTOP */}
        <div className="bg-white p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl border border-gray-200 shadow-xl mb-6 sm:mb-12 max-w-3xl mx-auto text-gray-900">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
            
            {/* Campo Búsqueda */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Puesto, habilidad o área..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-xs sm:text-sm focus:outline-none focus:border-[#C9A86A] transition"
              />
            </div>

            {/* Seleccionar Ubicación */}
            <div className="relative">
              <SlidersHorizontal className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full pl-10 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-xs sm:text-sm focus:outline-none focus:border-[#C9A86A] transition cursor-pointer appearance-none"
              >
                {locations.map((loc, idx) => (
                  <option key={idx} value={loc}>
                    {loc === "Todas" ? "Todas las ciudades" : loc}
                  </option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* LISTADO DE VACANTES: VISTA TARJETAS TIPO OCC EN MÓVIL / GRID EN DESKTOP */}
        {filteredVacancies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-8">
            {filteredVacancies.map((v) => (
              <div
                key={v.id}
                onClick={(e) => handlePostularseClick(e, v.id)}
                className="
                  group relative bg-white text-gray-900 
                  rounded-2xl sm:rounded-[32px] p-4 sm:p-6 
                  border border-[#C9A86A]/60 sm:border-2 sm:border-[#C9A86A] 
                  shadow-md sm:shadow-[0_0_30px_rgba(201,168,106,0.25)] 
                  hover:shadow-lg transition-all duration-200 
                  cursor-pointer flex flex-col justify-between
                "
              >
                <div>
                  {/* CORRECCIÓN DE SALARIO: Diseño vertical flexible que acomoda textos largos sin sobreponerse */}
                  <div className="flex flex-col gap-2 mb-3">
                    <h3 className="text-base sm:text-lg font-extrabold text-[#0A1A3A] group-hover:text-[#8c6f33] transition-colors leading-snug line-clamp-2">
                      {v.title}
                    </h3>
                    {/* Badge de salario mejorado para textos largos y múltiples líneas */}
                    <div className="w-full bg-[#FFF9EF] px-3 py-2 rounded-xl border border-[#C9A86A]/40">
                      <span className="block text-[11px] sm:text-xs font-semibold text-[#8c6f33] leading-relaxed break-words">
                        {v.salary || "Atractivo"}
                      </span>
                    </div>
                  </div>

                  {/* Chips de Ubicación y Jornada */}
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-gray-600 mb-3">
                    <span className="inline-flex items-center gap-1 bg-gray-100 px-2.5 py-0.5 rounded-md">
                      <MapPin size={12} className="text-[#0A1A3A]" />
                      {v.location || "Presencial"}
                    </span>
                    <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-md">
                      <Clock size={12} />
                      Tiempo Completo
                    </span>
                  </div>

                  {/* Descripción Breve */}
                  <p className="text-xs text-gray-500 line-clamp-2 sm:line-clamp-3 leading-relaxed font-light mb-4">
                    {v.description}
                  </p>
                </div>

                {/* Pie de tarjeta */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#0A1A3A] group-hover:text-[#8c6f33]">
                    Ver detalle de vacante
                  </span>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#0A1A3A] text-white flex items-center justify-center group-hover:bg-[#C9A86A] group-hover:text-[#0A1A3A] transition-colors shadow-sm shrink-0">
                    <ArrowRight size={14} className="sm:w-4 sm:h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-white/5 rounded-2xl border border-white/10 max-w-md mx-auto">
            <p className="text-gray-300 text-xs font-light">
              No hay vacantes disponibles que coincidan con los filtros.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}