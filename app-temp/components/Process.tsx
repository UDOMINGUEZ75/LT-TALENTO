import { Search, ClipboardCheck, CheckCircle } from "lucide-react";

export default function Process() {
  return (
    <section id="proceso" className="w-full py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">

        <h2 className="text-3xl md:text-4xl font-bold text-[#1A4B84]">
          Nuestro Proceso
        </h2>

        <p className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Combinamos lectura humana profunda con un sistema inteligente impulsado por IA 
          que aprende, detecta patrones y eleva la claridad en cada decisión de talento.
        </p>

        <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Un modelo diseñado para tomar decisiones con profundidad, precisión y evidencia.
        </p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Paso 1 */}
          <div className="p-8 bg-[#F7FAFC] rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <Search className="mx-auto text-[#1A4B84]" size={48} />
            <div className="text-5xl font-bold text-[#1A4B84] mt-4">1</div>
            <h3 className="mt-4 text-xl font-semibold text-[#1A4B84]">
              Diagnóstico
            </h3>
            <p className="mt-3 text-gray-600">
              Entendemos el contexto, la cultura, el reto y el tipo de liderazgo que realmente necesitas.
            </p>
          </div>

          {/* Paso 2 */}
          <div className="p-8 bg-[#F7FAFC] rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <ClipboardCheck className="mx-auto text-[#1A4B84]" size={48} />
            <div className="text-5xl font-bold text-[#1A4B84] mt-4">2</div>
            <h3 className="mt-4 text-xl font-semibold text-[#1A4B84]">
              Evaluación
            </h3>
            <p className="mt-3 text-gray-600">
              Entrevistas profundas, análisis estratégico y lectura humana del talento.
            </p>
          </div>

          {/* Paso 3 */}
          <div className="p-8 bg-[#F7FAFC] rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <CheckCircle className="mx-auto text-[#1A4B84]" size={48} />
            <div className="text-5xl font-bold text-[#1A4B84] mt-4">3</div>
            <h3 className="mt-4 text-xl font-semibold text-[#1A4B84]">
              Decisión
            </h3>
            <p className="mt-3 text-gray-600">
              Presentamos evidencia clara, comparativa y accionable para elegir al mejor candidato.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}