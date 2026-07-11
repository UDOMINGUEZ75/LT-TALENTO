export default function ApplicationsPreview() {
  const applications = [
    {
      role: "Gerente de Operaciones",
      company: "Grupo Industrial Norte",
      status: "En revisión",
      updated: "Hace 2 días",
    },
    {
      role: "Líder de Proyectos",
      company: "Tecnologías del Desierto",
      status: "Entrevista programada",
      updated: "Ayer",
    },
    {
      role: "Coordinador de Calidad",
      company: "Automotriz del Centro",
      status: "Finalista",
      updated: "Hoy",
    },
  ];

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">
        Mis aplicaciones
      </h2>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-gray-600 text-sm">Puesto</th>
              <th className="p-4 text-gray-600 text-sm">Empresa</th>
              <th className="p-4 text-gray-600 text-sm">Estado</th>
              <th className="p-4 text-gray-600 text-sm">Actualización</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app, i) => (
              <tr key={i} className="border-b last:border-none">
                <td className="p-4 font-medium">{app.role}</td>
                <td className="p-4 text-gray-600">{app.company}</td>
                <td className="p-4">
                  <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700">
                    {app.status}
                  </span>
                </td>
                <td className="p-4 text-gray-500 text-sm">{app.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
