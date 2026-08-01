import { Search, ClipboardCheck, CheckCircle } from "lucide-react";

export default function Process() {
  return (
    <section id="proceso" className="w-full py-24 bg-[#0A1A3A] text-white px-6">
      <div className="max-w-6xl mx-auto text-center">

        {/* Título */}
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#C9A86A]">
          Nuestro Proceso
        </h2>

        {/* Descripción */}
        <p className="mt-6 text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed">
          Combinamos lectura humana profunda con un sistema inteligente impulsado por IA 
          que aprende, detecta patrones y eleva la claridad en cada decisión de talento.
        </p>

        <p className="mt-4 text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed">
          Un modelo diseñado para tomar decisiones con profundidad, precisión y evidencia.
        </p>

        {/* Pasos */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Paso 1 */}
          <div className="p-8 bg-white rounded-2xl border border-gray-200 shadow-xl hover:shadow-2xl transition text-left">
            <Search className="text-[#C9A86A] mb-4" size={40} />
            <div className="text-4xl font-extrabold text-[#C9A86A] mb-2">01</div>
            <h3 className="text-2xl font-bold text-[#0A1A3A]">
              Diagnóstico
            </h3>
            <p className="mt-3 text-gray-600 font-light leading-relaxed">
              Entendemos el contexto, la cultura, el reto y el tipo de liderazgo que realmente necesitas.
            </p>
          </div>

          {/* Paso 2 */}
          <div className="p-8 bg-white rounded-2xl border border-gray-200 shadow-xl hover:shadow-2xl transition text-left">
            <ClipboardCheck className="text-[#C9A86A] mb-4" size={40} />
            <div className="text-4xl font-extrabold text-[#C9A86A] mb-2">02</div>
            <h3 className="text-2xl font-bold text-[#0A1A3A]">
              Evaluación
            </h3>
            <p className="mt-3 text-gray-600 font-light leading-relaxed">
              Entrevistas profundas, análisis estratégico y lectura humana del talento.
            </p>
          </div>

          {/* Paso 3 */}
          <div className="p-8 bg-white rounded-2xl border border-gray-200 shadow-xl hover:shadow-2xl transition text-left">
            <CheckCircle className="text-[#C9A86A] mb-4" size={40} />
            <div className="text-4xl font-extrabold text-[#C9A86A] mb-2">03</div>
            <h3 className="text-2xl font-bold text-[#0A1A3A]">
              Decisión
            </h3>
            <p className="mt-3 text-gray-600 font-light leading-relaxed">
              Presentamos evidencia clara, comparativa y accionable para elegir al mejor candidato.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}