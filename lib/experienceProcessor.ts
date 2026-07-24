export function summarize(text: string) {
  const clean = text.replace(/\s+/g, " ").trim();

  if (clean.length <= 500) return clean;

  const sentences = clean.split(".");
  let summary = "";

  for (const s of sentences) {
    if (summary.length + s.length < 480) {
      summary += s.trim() + ". ";
    } else break;
  }

  return summary.trim();
}

export function extractSkills(text: string) {
  const dictionary = [
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "PostgreSQL",
    "MySQL",
    "MongoDB",
    "APIs REST",
    "SQL",
    "NoSQL",
    "CI/CD",
    "Vercel",
    "AWS",
    "Scrum",
    "Agile",
    "Git",
    "Docker",
    "Kubernetes",
    "TypeScript",
    "JavaScript",
  ];

  const skills: string[] = [];

  dictionary.forEach((skill) => {
    if (text.toLowerCase().includes(skill.toLowerCase())) {
      skills.push(skill);
    }
  });

  return skills;
}