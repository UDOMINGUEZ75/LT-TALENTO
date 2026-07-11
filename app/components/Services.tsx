import { Briefcase, Users, CheckCircle } from "lucide-react";

export default function Services() {
  return (
    <section id="servicios" className="w-full py-24 bg-[#F7FAFC]">
      <div className="max-w-6xl mx-auto px-6 text-center">

        <h2 className="text-3xl md:text-4xl font-bold text-[#1A4B84]">
          Servicios
        </h2>

        <p className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Soluciones diseñadas para atraer, evaluar y seleccionar talento ejecutivo con claridad y rigor.
        </p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Servicio 1 */}
          <div className="p-10 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
            <Briefcase className="mx-auto text-[#1A4B84]" size={48} />
            <h3 className="mt-6 text-xl font-semibold text-[#1A4B84]">
              Búsqueda Ejecutiva
            </h3>
            <p className="mt-3 text-gray-600">
              Identificamos líderes auténticos mediante análisis profundo, entrevistas estratégicas y lectura humana del talento.
            </p>
          </div>

          {/* Servicio 2 */}
          <div className="p-10 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
            <Users className="mx-auto text-[#1A4B84]" size={48} />
            <h3 className="mt-6 text-xl font-semibold text-[#1A4B84]">
              Evaluación de Talento
            </h3>
            <p className="mt-3 text-gray-600">
              Evaluamos motivaciones, valores, estilo de liderazgo y compatibilidad con tu cultura y contexto.
            </p>
          </div>

          {/* Servicio 3 */}
          <div className="p-10 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
            <CheckCircle className="mx-auto text-[#1A4B84]" size={48} />
            <h3 className="mt-6 text-xl font-semibold text-[#1A4B84]">
              Acompañamiento en Decisiones
            </h3>
            <p className="mt-3 text-gray-600">
              Presentamos evidencia clara y comparativa para tomar decisiones que importan con total confianza.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}