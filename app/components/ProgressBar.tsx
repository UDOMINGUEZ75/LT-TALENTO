"use client";

import { useCandidate } from "@/app/context/CandidateContext";

export default function ProgressBar() {
  const { candidate } = useCandidate();

  const sections = [
    candidate.personal,
    candidate.expSummary,
    candidate.education,
    candidate.skills,
    candidate.languages,
    candidate.documents,
    candidate.preferences,
    candidate.availability,
  ];

  const completed = sections.filter(section => {
    if (Array.isArray(section)) return section.length > 0;
    return Object.keys(section).length > 0;
  }).length;

  const percent = Math.round((completed / sections.length) * 100);

  return (
    <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
      <div
        className="bg-[#1A4B84] h-full transition-all duration-300"
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
}