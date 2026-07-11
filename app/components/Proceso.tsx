export default function Proceso() {
  return (
    <section className="w-full py-20 bg-[#0F2F52] text-white px-6 border-t border-white/10">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
          Nuestro proceso impulsado por IA
        </h2>

        <p className="mt-6 text-lg md:text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
          Un flujo diseñado para decisiones críticas: claro, profundo y basado en datos reales.
        </p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Paso 1 */}
          <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-3">1. Blueprint del rol</h3>
            <p className="opacity-80">
              La empresa define el rol con precisión mediante IA interpretativa.
            </p>
          </div>

          {/* Paso 2 */}
          <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
            <div className="text-4xl mb-4">🧠</div>
            <h3 className="text-xl font-semibold mb-3">2. Lectura profunda</h3>
            <p className="opacity-80">
              La IA analiza patrones de liderazgo, comunicación y pensamiento crítico.
            </p>
          </div>

          {/* Paso 3 */}
          <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
            <div className="text-4xl mb-4">🎤</div>
            <h3 className="text-xl font-semibold mb-3">3. Entrevista inteligente</h3>
            <p className="opacity-80">
              Complementamos con entrevistas profundas que revelan autenticidad real.
            </p>
          </div>

          {/* Paso 4 */}
          <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-3">4. Reporte ejecutivo</h3>
            <p className="opacity-80">
              Entregamos un análisis claro para elegir líderes que transforman resultados.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
