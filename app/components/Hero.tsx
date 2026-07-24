export default function Hero() {
  return (
    <section className="relative w-full h-[520px] flex items-center justify-center overflow-hidden">

      {/* Imagen difuminada */}
      <img
        src="/hero.jpg"
        alt="LTTalento"
        className="absolute inset-0 w-full h-full object-cover scale-105 blur-sm brightness-[0.65]"
      />

      {/* Overlay degradado */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20"></div>

      {/* Contenido */}
      <div className="relative z-10 text-center px-6 animate-fadeIn">
        <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-xl">
          LTTalento
        </h1>

        <p className="mt-4 text-xl md:text-2xl text-white drop-shadow-lg max-w-2xl mx-auto">
          Reclutamiento ejecutivo basado en conciencia, claridad y rigor.
        </p>

        {/* BOTONES CORPORATIVOS */}
        <div className="mt-10 flex flex-col md:flex-row flex-wrap gap-4 justify-center">

          {/* Iniciar Registro */}
          <a
            href="/registro/inicio"
            className="px-6 py-3 bg-[#1C4E80] text-white rounded-lg shadow-lg 
                      hover:bg-[#163B63] transition transform hover:scale-[1.03]"
          >
            Iniciar Registro
          </a>

          {/* Continuar Registro */}
          <a
            href="/registro/perfil"
            className="px-6 py-3 bg-[#2F3A4A] text-white rounded-lg shadow-lg 
                      hover:bg-[#232C38] transition transform hover:scale-[1.03]"
          >
            Continuar Registro
          </a>

          {/* Acceso Candidatos */}
          <a
            href="/candidatos/login"
            className="px-6 py-3 bg-[#3E7BFA] text-white rounded-lg shadow-lg 
                      hover:bg-[#2F63C7] transition transform hover:scale-[1.03]"
          >
            Acceso Candidatos
          </a>

          {/* Acceso Reclutadores */}
          <a
            href="/reclutadores/login"
            className="px-6 py-3 bg-[#0D1B2A] text-white rounded-lg shadow-lg 
                      hover:bg-[#09131E] transition transform hover:scale-[1.03]"
          >
            Acceso Reclutadores
          </a>

        </div>
      </div>
    </section>
  );
}
