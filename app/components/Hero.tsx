export default function Hero() {
  return (
    <section className="relative w-full h-[480px] flex items-center justify-center">
      {/* Imagen de fondo */}
      <img
        src="/hero.jpg"
        alt="LTTalento"
        className="absolute inset-0 w-full h-full object-cover opacity-90"
      />

      {/* Contenido */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
          LTTalento
        </h1>

        <p className="mt-4 text-xl md:text-2xl text-white drop-shadow-lg">
          Un modelo de reclutamiento ejecutivo basado en conciencia, claridad y rigor.
        </p>

        {/* BOTONES ADICIONALES */}
        <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
          <a
            href="/register"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
          >
            Iniciar Registro
          </a>

          <a
            href="/candidate/evaluation/menu"
            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition"
          >
            Continuar Evaluación
          </a>

          <a
            href="/"
            className="px-6 py-3 bg-gray-800 text-white rounded-lg shadow-lg hover:bg-gray-900 transition"
          >
            Volver al Inicio
          </a>
        </div>
      </div>
    </section>
  );
}
