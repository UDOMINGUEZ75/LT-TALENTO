import { BriefcaseIcon, CalendarDaysIcon, SparklesIcon } from "@heroicons/react/24/outline";

export default function StatusCards() {
  const cards = [
    {
      title: "Aplicaciones activas",
      value: 3,
      icon: BriefcaseIcon,
    },
    {
      title: "Entrevistas programadas",
      value: 1,
      icon: CalendarDaysIcon,
    },
    {
      title: "Recomendaciones nuevas",
      value: 5,
      icon: SparklesIcon,
    },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, i) => (
        <div
          key={i}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4"
        >
          <card.icon className="w-10 h-10 text-[#1A4A84]" />
          <div>
            <p className="text-gray-600 text-sm">{card.title}</p>
            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
