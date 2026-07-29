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
          <div className="p-10 bg-[#102544] rounded-xl border border-[#C9A86A] shadow-lg hover:shadow-xl transition">
            <Briefcase className="mx-auto text-[#C9A86A]" size={56} />
            <h3 className="mt-6 text-2xl font-semibold text-[#C9A86A]">
              Búsqueda Ejecutiva
            </h3>
            <p className="mt-4 text-gray-200">
              Identificamos líderes auténticos mediante análisis profundo, entrevistas estratégicas y lectura humana del talento.
            </p>
          </div>

          {/* Servicio 2 */}
          <div className="p-10 bg-[#102544] rounded-xl border border-[#C9A86A] shadow-lg hover:shadow-xl transition">
            <Users className="mx-auto text-[#C9A86A]" size={56} />
            <h3 className="mt-6 text-2xl font-semibold text-[#C9A86A]">
              Evaluación de Talento
            </h3>
            <p className="mt-4 text-gray-200">
              Evaluamos motivaciones, valores, estilo de liderazgo y compatibilidad con tu cultura y contexto.
            </p>
          </div>

          {/* Servicio 3 */}
          <div className="p-10 bg-[#102544] rounded-xl border border-[#C9A86A] shadow-lg hover:shadow-xl transition">
            <CheckCircle className="mx-auto text-[#C9A86A]" size={56} />
            <h3 className="mt-6 text-2xl font-semibold text-[#C9A86A]">
              Acompañamiento en Decisiones
            </h3>
            <p className="mt-4 text-gray-200">
              Presentamos evidencia clara y comparativa para tomar decisiones que importan con total confianza.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
