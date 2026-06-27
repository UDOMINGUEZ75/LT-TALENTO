export default function Recommendations() {
  const jobs = [
    {
      title: "Gerente de Operaciones",
      company: "Grupo Industrial Norte",
      location: "Chihuahua, MX",
    },
    {
      title: "Líder de Proyectos",
      company: "Tecnologías del Desierto",
      location: "Remoto",
    },
    {
      title: "Coordinador de Calidad",
      company: "Automotriz del Centro",
      location: "Querétaro, MX",
    },
  ];

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">
        Recomendaciones para ti
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {jobs.map((job, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
              <p className="text-gray-600 mt-1">{job.company}</p>
              <p className="text-gray-500 text-sm mt-1">{job.location}</p>
            </div>

            <button className="mt-6 bg-[#1A4A84] text-white py-2 rounded-lg font-medium hover:bg-[#163d6d] transition">
              Ver más
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
