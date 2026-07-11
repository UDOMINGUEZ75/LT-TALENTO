import { Target, Eye, ShieldCheck, Users } from "lucide-react";

export default function PorQue() {
  return (
    <section id="porque" className="w-full py-24 bg-[#F7FAFC]">
      <div className="max-w-6xl mx-auto px-6 text-center">

        <h2 className="text-3xl md:text-4xl font-bold text-[#1A4B84]">
          ¿Por qué LTTalento?
        </h2>

        <p className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Un enfoque que combina claridad, rigor y lectura humana para tomar decisiones que transforman equipos.
        </p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Pilar 1 */}
          <div className="p-8 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <Target className="mx-auto text-[#1A4B84]" size={48} />
            <h3 className="mt-4 text-xl font-semibold text-[#1A4B84]">
              Claridad y Rigor
            </h3>
            <p className="mt-3 text-gray-600">
              Procesos precisos, estructurados y basados en evidencia para minimizar riesgos.
            </p>
          </div>

          {/* Pilar 2 */}
          <div className="p-8 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <Eye className="mx-auto text-[#1A4B84]" size={48} />
            <h3 className="mt-4 text-xl font-semibold text-[#1A4B84]">
              Lectura Humana
            </h3>
            <p className="mt-3 text-gray-600">
              Más allá del CV: entendemos motivaciones, valores y estilo de liderazgo.
            </p>
          </div>

          {/* Pilar 3 */}
          <div className="p-8 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <Users className="mx-auto text-[#1A4B84]" size={48} />
            <h3 className="mt-4 text-xl font-semibold text-[#1A4B84]">
              Alineación Cultural
            </h3>
            <p className="mt-3 text-gray-600">
              Buscamos compatibilidad real con tu cultura, contexto y visión.
            </p>
          </div>

          {/* Pilar 4 */}
          <div className="p-8 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <ShieldCheck className="mx-auto text-[#1A4B84]" size={48} />
            <h3 className="mt-4 text-xl font-semibold text-[#1A4B84]">
              Acompañamiento Estratégico
            </h3>
            <p className="mt-3 text-gray-600">
              No solo entregamos candidatos: te acompañamos en decisiones críticas.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}