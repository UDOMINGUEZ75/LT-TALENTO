export default function TalentMapPreview() {
  return (
    <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-900">
        Mapa de talento
      </h2>

      <p className="text-gray-600 mt-2">
        Un análisis visual de tus habilidades clave.
      </p>

      <div className="mt-4 space-y-2 text-gray-700">
        <p>• Innovación y mejora continua</p>
        <p>• Comunicación ejecutiva</p>
        <p>• Resolución de problemas complejos</p>
      </div>

      <button className="mt-6 bg-[#1A4A84] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#163d6d] transition">
        Ver mapa completo
      </button>
    </section>
  );
}
