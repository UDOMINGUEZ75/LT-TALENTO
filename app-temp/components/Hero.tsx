"use client";

import HeroVisualIA from "./HeroVisualIA";

export default function Hero() {
  return (
    <section
      className="
        w-full min-h-screen flex items-center justify-center px-6
        bg-gradient-to-br from-[#0F2F52] to-[#1A4B84] text-white
        relative overflow-hidden
      "
    >
      {/* Animación IA detrás */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <HeroVisualIA />
      </div>

      {/* Contenido principal */}
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
          Reclutamiento ejecutivo impulsado por IA y conciencia humana.
        </h1>

        <p className="mt-6 text-lg md:text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
          Identificamos líderes auténticos mediante análisis profundo, entrevistas inteligentes
          y una metodología diseñada para decisiones que importan.
        </p>

        <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">
          <button
            className="
              px-6 py-3 bg-white text-[#1A4B84] rounded-lg font-semibold 
              hover:bg-gray-100 transition-all duration-300 shadow-md
            "
            onClick={() => (window.location.href = "/register")}
          >
            Iniciar evaluación
          </button>

          <button
            className="
              px-6 py-3 border border-white rounded-lg font-semibold 
              hover:bg-white hover:text-[#1A4B84] transition-all duration-300
            "
          >
            Agenda una llamada
          </button>
        </div>

        <span className="block mt-6 text-sm opacity-80 tracking-wide">
          Sin filtros básicos. Sin CVs genéricos. Solo talento real, leído con rigor.
        </span>
      </div>
    </section>
  );
}
