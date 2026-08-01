export default function CTA() {
  return (
    <section
      id="contacto"
      className="w-full py-24 bg-[#0A1A3A] text-white text-center"
    >
      <div className="max-w-4xl mx-auto px-6">

        {/* Título */}
        <h2 className="text-4xl md:text-5xl font-bold text-[#C9A86A] leading-tight">
          El siguiente líder clave de tu organización empieza aquí
        </h2>

        {/* Descripción */}
        <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
          Combinamos análisis profundo, lectura humana del talento y un modelo
          inteligente para ayudarte a elegir al líder correcto, no al más común.
        </p>

        {/* Botón */}
        <a
          href="https://wa.me/5216143981235"
          target="_blank"
          className="
            inline-block mt-10 
            bg-[#C9A86A] text-[#0A1A3A] 
            font-semibold text-lg
            px-12 py-4 rounded-lg 
            shadow-lg hover:bg-[#D4AF37] 
            transition transform hover:-translate-y-1
          "
        >
          Agendar conversación por WhatsApp
        </a>

        {/* Nota */}
        <p className="mt-4 text-sm text-gray-300">
          Respondemos en menos de 1 hora.
        </p>

      </div>
    </section>
  );
}