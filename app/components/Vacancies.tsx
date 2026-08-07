"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MapPin, DollarSign, Clock, ArrowRight } from "lucide-react";

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

  // Estados para los filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("Todas");

  useEffect(() => {
    async function loadVacancies() {
      try {
        const res = await fetch("/api/vacantes", { cache: "no-store" });
        const data = await res.json();

        if (res.ok) {
          const lista = Array.isArray(data)
            ? data
            : data.vacancies || data.jobs || data.data || [];
          setAllVacancies(lista);
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
    e: React.MouseEvent<HTMLDivElement | HTMLAnchorElement>,
    jobId: number
  ) => {
    const isLoggedIn = sessionStorage.getItem("candidateLoggedIn");

    if (!isLoggedIn) {
      e.preventDefault();
      localStorage.setItem("redirectAfterLogin", `/candidatos/postular/${jobId}`);
      router.push("/candidatos/acceso-vacante");
    } else {
      router.push(`/candidatos/postular/${jobId}`);
    }
  };

  if (loading) {
    return (
      <section id="vacantes" className="relative w-full pt-32 pb-24 bg-[#0A1A3A] text-white text-center px-4 sm:px-6 lg:px-8">
        <div className="text-center py-16 text-[#C9A86A] text-sm font-medium">
          Cargando oportunidades de desarrollo...
        </div>
      </section>
    );
  }

  return (
    <section id="vacantes" className="relative w-full pt-32 pb-24 bg-[#0A1A3A] text-white px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Resplandor ambiental de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#C9A86A]/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Encabezado limpio y proporcionado */}
        <div className="text-center mb-10 space-y-2">
          <span className="inline-block px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#0A1A3A] bg-[#C9A86A] rounded-full shadow-md border border-[#C9A86A]/40">
            Bolsa de Trabajo
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Oportunidades de Crecimiento
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm max-w-xl mx-auto font-light leading-relaxed px-2">
            Conectamos profesionales extraordinarios con organizaciones que impulsan su desarrollo.
          </p>
        </div>

        {/* Sección de Filtros Compacta */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-xl mb-12 grid grid-cols-1 md:grid-cols-2 gap-4 items-center text-gray-900 max-w-3xl mx-auto">
          <div>
            <label className="block text-[11px] font-bold text-[#0A1A3A] mb-1 uppercase tracking-wider">
              Buscar por Perfil o Área
            </label>
            <input
              type="text"
              placeholder="Ej. Ingeniería, Ventas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 text-xs focus:outline-none focus:border-[#C9A86A] transition"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#0A1A3A] mb-1 uppercase tracking-wider">
              Ubicación Estratégica
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 text-xs focus:outline-none focus:border-[#C9A86A] transition cursor-pointer"
            >
              {locations.map((loc, idx) => (
                <option key={idx} value={loc} className="bg-white text-gray-900">
                  {loc === "Todas" ? "Todas las ubicaciones" : loc}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Cuadrícula de Vacantes con Borde Brillante Dorado */}
        {filteredVacancies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredVacancies.map((v) => (
              <div
                key={v.id}
                onClick={(e) => handlePostularseClick(e, v.id)}
                className="group p-6 rounded-[28px] sm:rounded-[32px] bg-white text-gray-900 shadow-[0_0_30px_rgba(201,168,106,0.25)] border-2 border-[#C9A86A] hover:shadow-[0_0_40px_rgba(201,168,106,0.45)] flex flex-col justify-between w-full min-h-[360px] transition-all duration-300 cursor-pointer relative"
              >
                <div className="space-y-3">
                  {/* Título de la Vacante */}
                  <h3 className="text-lg font-extrabold text-[#0A1A3A] group-hover:text-[#8c6f33] transition-colors line-clamp-2 leading-snug">
                    {v.title}
                  </h3>

                  {/* Etiquetas de Ubicación, Salario y Tipo */}
                  <div className="space-y-2 text-xs text-gray-600 pt-1">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#0A1A3A]/5 text-[#0A1A3A] flex items-center justify-center shrink-0">
                        <MapPin size={13} />
                      </span>
                      <span className="truncate">{v.location || "Presencial"}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#C9A86A]/20 text-[#8c6f33] flex items-center justify-center shrink-0">
                        <DollarSign size={13} />
                      </span>
                      <span className="font-medium text-gray-800 truncate">{v.salary || "Competitivo"}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <Clock size={13} />
                      </span>
                      <span>Tiempo Completo</span>
                    </div>
                  </div>

                  {/* Descripción corta */}
                  <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed pt-1 font-light">
                    {v.description}
                  </p>
                </div>

                {/* Pie de tarjeta con botón circular interactivo */}
                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-gray-400 group-hover:text-[#0A1A3A] transition-colors">
                    Ver detalles y postularse
                  </span>
                  <div className="w-10 h-10 rounded-full border border-gray-200 group-hover:border-[#0A1A3A] group-hover:bg-[#0A1A3A] group-hover:text-white text-gray-700 flex items-center justify-center transition-all duration-200 shadow-sm shrink-0">
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-white/5 rounded-2xl border border-white/10 max-w-xl mx-auto shadow-md backdrop-blur-md">
            <p className="text-gray-300 text-xs font-light">
              No hay oportunidades activas que coincidan con la búsqueda en este momento.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}