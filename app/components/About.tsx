export default function About() {
  return (
    <section id="servicios" className="w-full py-24 bg-[#0A1A3A]">
      <div className="max-w-6xl mx-auto px-6 text-center">
        
        {/* Título */}
        <h2 className="text-4xl md:text-5xl font-bold text-[#C9A86A]">
          ¿Qué es LTTalento?
        </h2>

        {/* Descripción */}
        <p className="mt-6 text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed">
          LTTalento es un modelo de reclutamiento ejecutivo basado en 
          <span className="font-semibold text-[#C9A86A]"> conciencia, claridad y rigor</span>.  
          Combinamos análisis profundo, entrevistas estratégicas y una lectura humana del talento para 
          identificar líderes auténticos que generan impacto real.
        </p>

        {/* Tarjetas con fondo blanco */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">

          <div className="p-8 bg-white rounded-2xl border border-gray-200 shadow-xl text-left">
            <h3 className="text-2xl font-bold text-[#0A1A3A]">Conciencia</h3>
            <p className="mt-4 text-gray-600 font-light leading-relaxed">
              Leemos más allá del CV: entendemos motivaciones, valores y estilo de liderazgo.
            </p>
          </div>

          <div className="p-8 bg-white rounded-2xl border border-gray-200 shadow-xl text-left">
            <h3 className="text-2xl font-bold text-[#0A1A3A]">Claridad</h3>
            <p className="mt-4 text-gray-600 font-light leading-relaxed">
              Definimos con precisión el rol, el contexto y el tipo de talento que realmente necesitas.
            </p>
          </div>

          <div className="p-8 bg-white rounded-2xl border border-gray-200 shadow-xl text-left">
            <h3 className="text-2xl font-bold text-[#0A1A3A]">Rigor</h3>
            <p className="mt-4 text-gray-600 font-light leading-relaxed">
              Evaluamos con metodología, estructura y evidencia para tomar decisiones que importan.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}