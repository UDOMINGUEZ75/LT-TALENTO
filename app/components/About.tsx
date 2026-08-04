export default function About() {
  return (
    <section id="nosotros" className="w-full py-24 bg-[#0A1A3A] text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        
        {/* Tagline de Marca */}
        <span className="inline-block px-4 py-1.5 mb-3 text-xs font-bold uppercase tracking-widest text-[#0A1A3A] bg-[#C9A86A] rounded-full shadow-md">
          Nuestra Filosofía
        </span>

        {/* Título Principal */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          ¿Quiénes Somos en <span className="text-[#C9A86A]">LT Talent Solutions</span>?
        </h2>

        {/* Manifiesto de Marca */}
        <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed font-light">
          Creemos que detrás de cada empresa exitosa hay <span className="font-semibold text-[#C9A86A]">personas extraordinarias</span>. 
          Por eso conectamos el talento adecuado con las oportunidades correctas, construyendo relaciones que impulsan el crecimiento, fortalecen a las organizaciones y transforman futuros.
        </p>

        {/* Tarjetas de Pilares Fundamentales */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Pilar 1: Personas en el Centro */}
          <div className="p-8 bg-white rounded-2xl border-t-4 border-[#C9A86A] shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 text-left flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-[#8c6f33] uppercase tracking-widest block mb-1">
                Conexión Humana
              </span>
              <h3 className="text-2xl font-bold text-[#0A1A3A]">
                Personas en el Centro
              </h3>
              <p className="mt-4 text-gray-600 font-light leading-relaxed text-sm">
                Leemos más allá de un currículum: identificamos el potencial, los valores y el liderazgo que encajan de manera natural con la cultura de tu empresa.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100 text-xs font-semibold text-[#8c6f33]">
              ✓ Criterio ético y cercano
            </div>
          </div>

          {/* Pilar 2: Socios Estratégicos */}
          <div className="p-8 bg-white rounded-2xl border-t-4 border-[#0A1A3A] shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 text-left flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-[#8c6f33] uppercase tracking-widest block mb-1">
                Acompañamiento Cercano
              </span>
              <h3 className="text-2xl font-bold text-[#0A1A3A]">
                Socios Estratégicos
              </h3>
              <p className="mt-4 text-gray-600 font-light leading-relaxed text-sm">
                Actuamos con claridad, agilidad y transparencia para entender los retos reales del negocio y responder con soluciones de valor a largo plazo.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100 text-xs font-semibold text-[#0A1A3A]">
              ✓ Respuestas con confianza
            </div>
          </div>

          {/* Pilar 3: Relaciones de Valor */}
          <div className="p-8 bg-white rounded-2xl border-t-4 border-[#C9A86A] shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 text-left flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-[#8c6f33] uppercase tracking-widest block mb-1">
                Éxito Sostenible
              </span>
              <h3 className="text-2xl font-bold text-[#0A1A3A]">
                Impacto Real
              </h3>
              <p className="mt-4 text-gray-600 font-light leading-relaxed text-sm">
                Más que realizar contrataciones temporales, creamos conexiones que generan resultados sostenibles y transforman el desarrollo de profesionales y empresas.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100 text-xs font-semibold text-[#8c6f33]">
              ✓ Resultados duraderos
            </div>
          </div>

        </div>

        {/* Lema de Cierre */}
        <p className="mt-12 text-base text-[#C9A86A] font-semibold tracking-wide">
          "Conectamos talento. Transformamos futuros."
        </p>

      </div>
    </section>
  );
}