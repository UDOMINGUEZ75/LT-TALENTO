"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PDFDocument } from "pdf-lib";     // ← PDF parser correcto
import JSZip from "jszip";                 // ← DOCX parser correcto

export default function CVUpload() {
  const params = useSearchParams();
  const router = useRouter();
  const userId = params.get("userId");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ⭐ PDF CORRECTO
  async function extractPdfText(file: File) {
    const buffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(buffer);

    let fullText = "";

    const pages = pdfDoc.getPages();
    for (const page of pages) {
      const text = await page.getTextContent();
      fullText += text.items.map((t: any) => t.str).join(" ") + "\n";
    }

    return fullText;
  }

  // ⭐ DOCX CORRECTO
  async function extractDocxText(file: File) {
    const buffer = await file.arrayBuffer();
    const zip = await JSZip.loadAsync(buffer);

    const xmlFile = zip.file("word/document.xml");
    if (!xmlFile) return "";

    const xml = await xmlFile.async("string");

    return xml.replace(/<[^>]+>/g, " ");
  }

  async function extractTxtText(file: File) {
    const buffer = await file.arrayBuffer();
    return new TextDecoder().decode(buffer);
  }

  async function handleUpload(e: any) {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const file = e.target.files?.[0];
      if (!file) {
        setError("Selecciona un archivo");
        return;
      }

      const name = file.name.toLowerCase();
      let text = "";

      if (name.endsWith(".pdf")) {
        text = await extractPdfText(file);
      } else if (name.endsWith(".docx")) {
        text = await extractDocxText(file);
      } else if (name.endsWith(".txt")) {
        text = await extractTxtText(file);
      } else {
        setError("Formato no soportado");
        return;
      }

      if (!text || text.trim().length < 10) {
        setError("El CV no contiene texto legible.");
        return;
      }

      const analyzeRes = await fetch("/api/analyze-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          userId: Number(userId),
          cvUrl: "local-file",
        }),
      });

      const analyzeData = await analyzeRes.json();
      if (!analyzeData.ok) {
        setError("Error analizando CV");
        return;
      }

      const saveRes = await fetch("/api/save-candidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(analyzeData.data),
      });

      const saveData = await saveRes.json();

      if (!saveData?.candidate) {
        setError("Error guardando candidato");
        return;
      }

      setSuccess("CV procesado correctamente");
      router.push(`/candidate/dashboard?userId=${userId}`);

    } catch (err) {
      console.error(err);
      setError("Error procesando CV");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mb-4">
      <input
        id="cvFile"
        type="file"
        accept=".pdf,.doc,.docx,.txt"
        className="hidden"
        onChange={handleUpload}
      />

      <label
        htmlFor="cvFile"
        className="inline-block px-4 py-2 bg-purple-600 text-white rounded cursor-pointer hover:bg-purple-700"
      >
        Cargar currículum
      </label>

      {loading && <p className="text-gray-600 mt-2">Procesando...</p>}
      {error && <p className="text-red-600 mt-2">{error}</p>}
      {success && <p className="text-green-600 mt-2">{success}</p>}
    </div>
  );
}
