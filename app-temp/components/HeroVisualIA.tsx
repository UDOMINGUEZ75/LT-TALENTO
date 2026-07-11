export default function HeroVisualIA() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 800 600"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Líneas */}
      <line x1="100" y1="150" x2="300" y2="100" stroke="#ffffff33" strokeWidth="2" />
      <line x1="300" y1="100" x2="500" y2="180" stroke="#ffffff33" strokeWidth="2" />
      <line x1="500" y1="180" x2="650" y2="120" stroke="#ffffff33" strokeWidth="2" />
      <line x1="200" y1="300" x2="400" y2="350" stroke="#ffffff33" strokeWidth="2" />
      <line x1="400" y1="350" x2="600" y2="280" stroke="#ffffff33" strokeWidth="2" />

      {/* Nodos */}
      <circle cx="100" cy="150" r="8" fill="#ffffff55" />
      <circle cx="300" cy="100" r="8" fill="#ffffff55" />
      <circle cx="500" cy="180" r="8" fill="#ffffff55" />
      <circle cx="650" cy="120" r="8" fill="#ffffff55" />
      <circle cx="200" cy="300" r="8" fill="#ffffff55" />
      <circle cx="400" cy="350" r="8" fill="#ffffff55" />
      <circle cx="600" cy="280" r="8" fill="#ffffff55" />
    </svg>
  );
}
