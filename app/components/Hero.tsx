import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="
        relative w-full h-[500px] flex items-center justify-center
        text-white bg-[#0A1A3A]
      "
    >
      <div className="max-w-5xl mx-auto text-center px-6 md:px-8">

        {/* Título */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight">
          <span className="text-white">LT</span>
          <span className="text-[#C9A86A]">Talent Solutions</span>
        </h1>

        {/* Slogan Actualizado */}
        <p className="mt-4 text-lg sm:text-xl md:text-2xl text-white font-light max-w-2xl mx-auto leading-relaxed">
            CONECTAMOS TALENTO, IMPULSAMOS FUTUROS.
        </p>

        {/* Botones en dos columnas */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8 text-center">

          {/* Columna Candidatos */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-white mb-1">
              Candidatos
            </h3>

            <Link
              href="/candidatos/nuevo"
              className="
                px-8 py-3.5 bg-[#C9A86A] hover:bg-[#D4AF37]
                text-[#0A1A3A] font-medium rounded-lg shadow-lg
                transition-all duration-200 transform hover:-translate-y-1
              "
            >
              Nuevo candidato
            </Link>

            <Link
              href="/candidate/login"
              className="
                px-8 py-3.5 bg-white hover:bg-gray-200
                text-[#0A1A3A] font-medium rounded-lg shadow-lg
                transition-all duration-200
              "
            >
              Candidato registrado
            </Link>
          </div>

          {/* Columna Reclutadores */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-white mb-1">
              Reclutadores / Empresas
            </h3>

            <Link
              href="/reclutador/registro"
              className="
                px-8 py-3.5 bg-[#C9A86A] hover:bg-[#D4AF37]
                text-[#0A1A3A] font-medium rounded-lg shadow-lg
                transition-all duration-200 transform hover:-translate-y-1
              "
            >
              Nueva empresa / reclutador
            </Link>

            <Link
              href="/reclutador/actualizar/1"
              className="
                px-8 py-3.5 bg-white hover:bg-gray-200
                text-[#0A1A3A] font-medium rounded-lg shadow-lg
                transition-all duration-200
              "
            >
              Empresa / reclutador registrado
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}