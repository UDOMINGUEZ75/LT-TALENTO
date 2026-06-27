export default function ProfilePreview() {
  return (
    <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Tu perfil
      </h2>

      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gray-300"></div>

        <div>
          <p className="text-lg font-bold text-gray-900">Javier Domínguez</p>
          <p className="text-gray-600">Gerente de Ingeniería</p>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-sm text-gray-600 mb-2">Completitud del perfil</p>

        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div className="bg-[#1A4A84] h-2 rounded-full" style={{ width: "70%" }}></div>
        </div>

        <button className="mt-4 bg-[#1A4A84] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#163d6d] transition">
          Completar perfil
        </button>
      </div>
    </section>
  );
}
