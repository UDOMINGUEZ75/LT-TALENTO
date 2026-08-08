"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MapPin, DollarSign, ArrowRight, Search, SlidersHorizontal, X } from "lucide-react";

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

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("Todas");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadVacancies() {
      try {
        const res = await fetch("/api/vacantes", { cache: "no-store" });
        const data = await res.json();

        if (res.ok) {
          const listaVacantes = Array.isArray(data)
            ? data
            : data.vacancies || data.jobs || data.data || [];
          setAllVacancies(listaVacantes);
        } else {
          setAllVacancies([]);
        }
      } catch (err) {
        console.error("Error al obtener vacantes:", err);
        setAllVacancies([]);
      } finally {
        setLoading(false);
      }
    }
    loadVacancies();

    // Cerrar sugerencias al hacer clic fuera del buscador
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

  // Sugerencias inteligentes de autocompletado basadas en puestos o descripciones
  const searchSuggestions = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const normalizedQuery = normalizeText(searchTerm);
    const matches = allVacancies.filter((v) =>
      normalizeText(v.title || "").includes(normalizedQuery) ||
      normalizeText(v.description || "").includes(normalizedQuery)
    );
    return Array.from(new Set(matches.map((v) => v.title))).slice(0, 5);
  }, [searchTerm, allVacancies]);

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
    e: React.MouseEvent<HTMLAnchorElement>,
    jobId: number
  ) => {
    let isLoggedIn = false;
    try {
      isLoggedIn = !!sessionStorage.getItem("candidateLoggedIn");
    } catch (err) {}

    if (!isLoggedIn) {
      e.preventDefault();
      try {
        localStorage.setItem("redirectAfterLogin", `/candidatos/postular/${jobId}`);
      } catch (err) {}
      router.push("/candidatos/acceso-vacante");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-[#C9A86A] bg-[#0A1A3A] min-h-screen">
        <div className="w-10 h-10 border-4 border-[#C9A86A] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-xs font-bold uppercase tracking-widest">Cargando vacantes disponibles...</p>
      </div>
    );
  }

  return (
    <section className="pt-24 sm:pt-32 pb-20 bg-[#0A1A3A] text-white min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Cabecera Institucional Unificada */}
        <div className="text-center mb-10 space-y-2">
          <span className="inline-block px-4 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#0A1A3A] bg-[#C9A86A] rounded-full shadow-md">
            Bolsa de Trabajo Oficial
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Vacantes Disponibles
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm max-w-xl mx-auto font-light leading-relaxed">
            Explore nuestras oportunidades profesionales y postúlese de forma directa y segura.
          </p>
        </div>

        {/* Buscador y Filtros con Autocompletado */}
        <div className="bg-white p-4 sm:p-6 rounded-[28px] border border-gray-200 shadow-2xl mb-10 max-w-3xl mx-auto text-gray-900">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            
            {/* Input con Autocompletado */}
            <div className="relative" ref={searchContainerRef}>
              <label className="block text-[10px] font-extrabold text-[#0A1A3A] mb-1.5 uppercase tracking-wider">
                Buscar puesto
              </label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={16} />
                <input
                  type="text"
                  placeholder="Ej. Mantenimiento, Ventas..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  className="w-full pl-10 pr-9 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-xs sm:text-sm focus:outline-none focus:border-[#C9A86A] transition"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchTerm("");
                      setShowSuggestions(false);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Menú Desplegable de Sugerencias */}
              {showSuggestions && searchSuggestions.length > 0 && (
                <ul className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden text-xs sm:text-sm divide-y divide-gray-100">
                  {searchSuggestions.map((title, idx) => (
                    <li
                      key={idx}
                      onClick={() => {
                        setSearchTerm(title);
                        setShowSuggestions(false);
                      }}
                      className="px-4 py-2.5 hover:bg-[#FFF9EF] hover:text-[#8c6f33] cursor-pointer transition-colors flex items-center gap-2 font-medium text-gray-800"
                    >
                      <Search size={13} className="text-[#C9A86A] shrink-0" />
                      <span className="truncate">{title}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Selector de Ubicación */}
            <div>
              <label className="block text-[10px] font-extrabold text-[#0A1A3A] mb-1.5 uppercase tracking-wider">
                Ubicación
              </label>
              <div className="relative">
                <SlidersHorizontal className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full pl-10 pr-8 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-xs sm:text-sm focus:outline-none focus:border-[#C9A86A] transition cursor-pointer appearance-none"
                >
                  {locations.map((loc, idx) => (
                    <option key={idx} value={loc} className="bg-white text-gray-900">
                      {loc === "Todas" ? "Todas las ubicaciones" : loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

          </div>
        </div>

        {/* Tarjetas de Vacantes con Cabecera Azul Unificada */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredVacancies.map((v) => (
            <div
              key={v.id}
              className="bg-white rounded-[28px] shadow-2xl overflow-hidden border-2 border-[#C9A86A] flex flex-col justify-between text-gray-900 transition-transform hover:-translate-y-1 duration-200"
            >
              {/* Cabecera Azul Marino del Puesto */}
              <div className="bg-[#0A1A3A] px-6 py-6 text-center border-b border-[#C9A86A]/30 text-white">
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white line-clamp-2">
                  {v.title}
                </h3>
              </div>

              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 space-y-4">
                <div className="space-y-3">
                  {/* Etiquetas institucionales */}
                  <div className="flex flex-wrap gap-2 text-[11px] font-bold">
                    <span className="bg-gray-100 px-3 py-2 rounded-xl border border-gray-200 text-gray-700 flex items-center gap-1.5 shadow-xs">
                      <MapPin size={13} className="text-[#C9A86A]" />
                      <span className="text-[#8c6f33]">Ubicación:</span> {v.location || "Presencial"}
                    </span>
                    <span className="bg-[#C9A86A]/10 px-3 py-2 rounded-xl border border-[#C9A86A]/30 text-[#0A1A3A] flex items-center gap-1.5 shadow-xs">
                      <DollarSign size={13} className="text-[#C9A86A]" />
                      <span className="font-extrabold">Sueldo:</span> {v.salary || "Competitivo"}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-4 leading-relaxed font-light">
                    {v.description}
                  </p>
                </div>

                <Link
                  href={`/candidatos/postular/${v.id}`}
                  onClick={(e) => handlePostularseClick(e, v.id)}
                  className="w-full py-3.5 px-4 bg-[#C9A86A] hover:bg-[#b89555] text-[#0A1A3A] font-extrabold rounded-xl shadow-md transition-all text-xs sm:text-sm text-center flex items-center justify-center gap-2 uppercase tracking-wider"
                >
                  Postularme / Ver detalles <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredVacancies.length === 0 && (
          <div className="text-center py-16 bg-white/5 rounded-3xl border border-white/10 max-w-md mx-auto">
            <p className="text-gray-300 text-xs sm:text-sm font-light">
              No hay vacantes disponibles con los criterios de búsqueda.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}