export default function ExperienceBlock({ summary, skills }: any) {
  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h2 className="text-xl font-bold mb-2">Experiencia</h2>

      <p className="text-gray-700 mb-4">{summary}</p>

      <h3 className="font-semibold mb-2">Aptitudes</h3>
      <ul className="list-disc ml-6 text-gray-800">
        {skills.map((s: string, i: number) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    </div>
  );
}