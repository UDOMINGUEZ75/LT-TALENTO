const fs = require("fs");
const path = require("path");

const rootDir = "./";

const ignoreDirs = [
  "node_modules",
  ".next",
  "dist",
  "public"
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let original = content;

  // Detecta si el archivo usa useSearchParams()
  const usesSearchParams = content.includes("useSearchParams(");

  if (!usesSearchParams) return;

  // Detecta si ya existe el import
  const hasImport = content.includes("useSearchParams");

  if (!hasImport) {
    // Inserta el import justo después de "use client" o al inicio del archivo
    if (content.startsWith('"use client"')) {
      content = content.replace(
        '"use client";',
        '"use client";\n\nimport { useSearchParams } from "next/navigation";'
      );
    } else {
      content =
        'import { useSearchParams } from "next/navigation";\n' + content;
    }

    fs.writeFileSync(filePath, content, "utf8");
    console.log("✔ Import agregado:", filePath);
  }
}

function walk(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    if (ignoreDirs.includes(file)) continue;

    const fullPath = path.join(dir, file);

    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (file.endsWith(".tsx") || file.endsWith(".ts")) {
      processFile(fullPath);
    }
  }
}

walk(rootDir);

console.log("✨ Importación corregida en todos los archivos necesarios.");
