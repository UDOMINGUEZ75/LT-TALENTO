export default function AIProfilePreview() {
  return (
    <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-900">
        Perfil generado por IA
      </h2>

      <p className="text-gray-600 mt-2">
        Tu perfil ha sido analizado y la IA identificó tus principales fortalezas.
      </p>

      <ul className="mt-4 space-y-2 text-gray-700">
        <li>• Liderazgo estratégico</li>
        <li>• Gestión de equipos multidisciplinarios</li>
        <li>• Toma de decisiones basada en datos</li>
      </ul>

      <button className="mt-6 bg-[#1A4A84] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#163d6d] transition">
        Ver perfil completo
      </button>
    </section>
  );
}
