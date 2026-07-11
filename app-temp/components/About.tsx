export default function About() {
  return (
    <section id="servicios" className="w-full py-24 bg-[#F7FAFC]">
      <div className="max-w-6xl mx-auto px-6 text-center">
        
        <h2 className="text-3xl md:text-4xl font-bold text-[#1A4B84]">
          ¿Qué es LTTalento?
        </h2>

        <p className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          LTTalento es un modelo de reclutamiento ejecutivo basado en 
          <span className="font-semibold text-[#1A4B84]"> conciencia, claridad y rigor</span>.  
          Combinamos análisis profundo, entrevistas estratégicas y una lectura humana del talento para 
          identificar líderes auténticos que generan impacto real.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">

          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-[#1A4B84]">Conciencia</h3>
            <p className="mt-3 text-gray-600">
              Leemos más allá del CV: entendemos motivaciones, valores y estilo de liderazgo.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-[#1A4B84]">Claridad</h3>
            <p className="mt-3 text-gray-600">
              Definimos con precisión el rol, el contexto y el tipo de talento que realmente necesitas.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-[#1A4B84]">Rigor</h3>
            <p className="mt-3 text-gray-600">
              Evaluamos con metodología, estructura y evidencia para tomar decisiones que importan.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}