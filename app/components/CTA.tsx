export default function CTA() {
  return (
    <section
      id="contacto"
      className="w-full py-24 bg-[#1A4B84] text-white text-center"
    >
      <div className="max-w-4xl mx-auto px-6">

        <h2 className="text-3xl md:text-4xl font-bold">
          El siguiente líder clave de tu organización empieza aquí
        </h2>

        <p className="mt-6 text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
          Combinamos análisis profundo, lectura humana del talento y un modelo
          inteligente para ayudarte a elegir al líder correcto, no al más común.
        </p>

        <a
          href="https://wa.me/5216143981235"
          target="_blank"
          className="inline-block mt-10 bg-white text-[#1A4B84] font-semibold px-10 py-4 rounded-lg shadow-md hover:bg-gray-100 transition"
        >
          Agendar conversación por WhatsApp
        </a>

        <p className="mt-4 text-sm text-gray-300">
          Respondemos en menos de 1 hora.
        </p>

      </div>
    </section>
  );
}