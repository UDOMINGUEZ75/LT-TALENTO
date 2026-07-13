const fs = require("fs");
const path = require("path");

const rootDir = "./"; // raíz del proyecto

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  let original = content;

  // Reemplazo seguro para strictNullChecks
  content = content.replace(
    /searchParams\.get\(/g,
    "searchParams?.get("
  );

  // Reemplazo para window.location.search (prohibido en Next.js 16)
  content = content.replace(
    /new URLSearchParams\(window.location.search\)/g,
    "useSearchParams()"
  );

  if (content !== original) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log("✔ Fixed:", filePath);
  }
}

function walk(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);

    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (file.endsWith(".tsx") || file.endsWith(".ts")) {
      processFile(fullPath);
    }
  }
}

walk(rootDir);

console.log("✨ Corrección completa. Todos los searchParams fueron actualizados.");
