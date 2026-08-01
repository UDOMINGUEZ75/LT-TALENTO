import { Briefcase, Users, CheckCircle } from "lucide-react";

export default function Services() {
  return (
    <section id="servicios" className="w-full py-24 bg-[#0A1A3A] text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* Título */}
        <h2 className="text-4xl md:text-5xl font-bold text-[#C9A86A]">
          Servicios
        </h2>

        {/* Descripción */}
        <p className="mt-6 text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed">
          Soluciones diseñadas para atraer, evaluar y seleccionar talento ejecutivo con claridad y rigor.
        </p>

        {/* Tarjetas */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Servicio 1 */}
          <div className="p-10 bg-white rounded-2xl border border-gray-200 shadow-xl hover:shadow-2xl transition text-left">
            <Briefcase className="text-[#C9A86A] mb-4" size={48} />
            <h3 className="text-2xl font-bold text-[#0A1A3A]">
              Búsqueda Ejecutiva
            </h3>
            <p className="mt-4 text-gray-600 font-light leading-relaxed">
              Identificamos líderes auténticos mediante análisis profundo, entrevistas estratégicas y lectura humana del talento.
            </p>
          </div>

          {/* Servicio 2 */}
          <div className="p-10 bg-white rounded-2xl border border-gray-200 shadow-xl hover:shadow-2xl transition text-left">
            <Users className="text-[#C9A86A] mb-4" size={48} />
            <h3 className="text-2xl font-bold text-[#0A1A3A]">
              Evaluación de Talento
            </h3>
            <p className="mt-4 text-gray-600 font-light leading-relaxed">
              Evaluamos motivaciones, valores, estilo de liderazgo y compatibilidad con tu cultura y contexto.
            </p>
          </div>

          {/* Servicio 3 */}
          <div className="p-10 bg-white rounded-2xl border border-gray-200 shadow-xl hover:shadow-2xl transition text-left">
            <CheckCircle className="text-[#C9A86A] mb-4" size={48} />
            <h3 className="text-2xl font-bold text-[#0A1A3A]">
              Acompañamiento en Decisiones
            </h3>
            <p className="mt-4 text-gray-600 font-light leading-relaxed">
              Presentamos evidencia clara y comparativa para tomar decisiones que importan con total confianza.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}