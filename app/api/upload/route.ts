export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import mammoth from "mammoth";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("CRITICAL ERROR: GEMINI_API_KEY no está definida.");
      return NextResponse.json(
        { ok: false, error: "Servicio de IA no configurado (Falta GEMINI_API_KEY en Vercel)." },
        { status: 500 }
      );
    }

    const form = await req.formData();
    const file = (form.get("file") || form.get("cv") || form.get("document")) as File | null;

    if (!file) {
      return NextResponse.json(
        { ok: false, error: "No se recibió ningún archivo en la petición." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    let text = "";

    const fileName = file.name.toLowerCase();

    // 1. Extraer texto según el formato
    if (fileName.endsWith(".docx")) {
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;
    } else if (fileName.endsWith(".pdf")) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const pdfParse = require("pdf-parse/lib/pdf-parse.js");
        const pdfData = await pdfParse(buffer);
        text = pdfData.text;
      } catch (pdfErr) {
        console.warn("Aviso al leer PDF:", pdfErr);
        text = buffer.toString("utf-8");
      }
    } else {
      text = buffer.toString("utf-8");
    }

    const cleanText = text.replace(/\s+/g, " ").trim();

    if (!cleanText || cleanText.length < 10) {
      return NextResponse.json(
        { ok: false, error: "El archivo subido no contiene suficiente texto legible." },
        { status: 400 }
      );
    }

    const promptText = `
Eres un reclutador experto de LT Talento. Analiza el siguiente CV y extrae los datos del candidato.

Devuelve ÚNICAMENTE un objeto JSON válido sin texto ni formato adicional con estas claves exactas:
{
  "state": "Estado de residencia en México si se menciona o infiere, o vacio",
  "city": "Ciudad o vacia",
  "zone": "Zona o colonia o vacia",
  "address": "Dirección o vacia",
  "phone": "Teléfono de contacto o vacio",
  "company": "Última empresa donde trabajó o vacia",
  "position": "Último puesto desempeñado o vacio",
  "years": "Número de años de experiencia total aproximado (solo número como string) o vacio",
  "school": "Última universidad o escuela o vacia",
  "degree": "Grado académico principal o vacio",
  "graduationYear": "Año de graduación o vacio",
  "schedule": "Tiempo completo / Medio tiempo o vacio",
  "travel": true,
  "relocate": false,
  "area": "Área profesional principal o vacia",
  "salary": "Expectativa salarial o vacia",
  "modality": "Presencial / Híbrido / Remoto o vacio",
  "description": "Resumen ejecutivo profesional completo de 3 a 5 líneas en ESPAÑOL.",
  "translated": "Mismo resumen profesional en ESPAÑOL."
}

Texto del CV:
"""
${cleanText}
"""
`;

    // Lista de modelos activos comprobados
    const candidateModels = [
      "gemini-3.6-flash",
      "gemini-3.5-flash",
      "gemini-2.0-flash"
    ];

    let aiData: any = null;
    let lastErrorMessage = "";

    for (const modelName of candidateModels) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent?key=${apiKey}`;
        const googleRes = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }],
            generationConfig: { responseMimeType: "application/json" }
          })
        });

        const data = await googleRes.json();

        if (googleRes.ok) {
          aiData = data;
          break;
        } else {
          lastErrorMessage = data?.error?.message || `Error con ${modelName}`;
        }
      } catch (err: any) {
        lastErrorMessage = err?.message || "Error en la petición";
      }
    }

    if (!aiData) {
      console.error("No se pudo conectar con Gemini:", lastErrorMessage);
      return NextResponse.json(
        { ok: false, error: `Error de Google AI: ${lastErrorMessage}` },
        { status: 500 }
      );
    }

    const rawCandidateText = aiData?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    
    // Extracción limpia de la cadena JSON
    const jsonMatch = rawCandidateText.match(/\{[\s\S]*\}/);
    const cleanJsonString = jsonMatch ? jsonMatch[0] : "{}";
    
    let aiResult: any = {};
    try {
      aiResult = JSON.parse(cleanJsonString);
    } catch (parseErr) {
      console.error("Error al parsear el JSON de Gemini:", parseErr);
      aiResult = {};
    }

    return NextResponse.json({
      ok: true,
      extracted: { ...aiResult, raw: cleanText },
      translated: aiResult.translated || aiResult.description || "",
    });

  } catch (err: any) {
    console.error("Error en /api/upload:", err);
    return NextResponse.json(
      { ok: false, error: err?.message || "Error interno al procesar el CV." },
      { status: 500 }
    );
  }
}