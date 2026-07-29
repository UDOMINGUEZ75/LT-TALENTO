export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import mammoth from "mammoth";
import { AzureOpenAI } from "openai";
import { uploadCVToBlob } from "@/lib/azure-storage";

// ---------- 1. Extraer texto de PDF ----------
async function extractPdfText(buffer: Buffer): Promise<string> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const pdfParse = require("pdf-parse/lib/pdf-parse.js");
    const pdfData = await pdfParse(buffer);
    return pdfData.text || "";
  } catch (error) {
    console.warn("Aviso al extraer texto del PDF:", error);
    return buffer.toString("utf-8");
  }
}

// ---------- 2. Extraer texto de DOCX ----------
async function extractDocxText(buffer: Buffer): Promise<string> {
  try {
    const result = await mammoth.extractRawText({ buffer });
    return result.value || "";
  } catch (error) {
    console.error("Error al extraer DOCX:", error);
    return "";
  }
}

// ---------- 3. Ruta de la API ----------
export async function POST(req: NextRequest) {
  try {
    // Lectura de variables de entorno para Azure OpenAI
    const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
    const apiKey = process.env.AZURE_OPENAI_KEY;
    const deploymentName = process.env.AZURE_OPENAI_DEPLOYMENT_NAME || "gpt-5.4-mini";

    if (!endpoint || !apiKey) {
      console.error("CRITICAL ERROR: Variables de entorno de Azure OpenAI no configuradas.");
      return NextResponse.json(
        { ok: false, error: "Faltan credenciales de Azure OpenAI en variables de entorno." },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const file = (formData.get("file") || formData.get("cv") || formData.get("document")) as File | null;

    if (!file) {
      return NextResponse.json(
        { ok: false, error: "No se envió ningún archivo." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    let text = "";

    const fileName = file.name.toLowerCase();

    // 1. Extraer texto según extensión
    if (fileName.endsWith(".pdf")) {
      text = await extractPdfText(buffer);
    } else if (fileName.endsWith(".docx")) {
      text = await extractDocxText(buffer);
    } else {
      text = buffer.toString("utf-8");
    }

    const cleanText = text.replace(/\s+/g, " ").trim();

    if (!cleanText || cleanText.length < 10) {
      return NextResponse.json(
        { ok: false, error: "El archivo no contiene suficiente texto legible." },
        { status: 400 }
      );
    }

    // 2. Subir archivo original a Azure Blob Storage (stcvslttalento)
    let cvUrl = "";
    try {
      cvUrl = await uploadCVToBlob(buffer, file.name, file.type);
    } catch (storageErr) {
      console.warn("Aviso: No se pudo subir el archivo a Azure Blob Storage:", storageErr);
    }

    // 3. Configurar cliente Azure OpenAI
    const openai = new AzureOpenAI({
      endpoint,
      apiKey,
      apiVersion: "2024-06-01",
      deployment: deploymentName,
    });

    const promptText = `
Eres un reclutador experto de LT Talento. Analiza el siguiente CV y extrae los datos del candidato.

Devuelve ÚNICAMENTE un objeto JSON válido con este formato exacto (sin texto adicional):
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

    // 4. Inferencia con Azure OpenAI
    const response = await openai.chat.completions.create({
      model: deploymentName,
      messages: [{ role: "user", content: promptText }],
      response_format: { type: "json_object" },
      temperature: 0.2,
    });

    const rawCandidateText = response.choices[0]?.message?.content || "{}";

    // 5. Extracción e inspección limpia de la cadena JSON
    const jsonMatch = rawCandidateText.match(/\{[\s\S]*\}/);
    const cleanJsonString = jsonMatch ? jsonMatch[0] : "{}";

    let aiResult: any = {};
    try {
      aiResult = JSON.parse(cleanJsonString);
    } catch (parseErr) {
      console.error("Error al parsear el JSON de Azure OpenAI:", parseErr);
      aiResult = {};
    }

    return NextResponse.json({
      ok: true,
      cvUrl,
      extracted: { ...aiResult, raw: cleanText },
      translated: aiResult.translated || aiResult.description || "",
    });

  } catch (error: any) {
    console.error("ERROR EN /api/cv/analyze:", error);
    return NextResponse.json(
      { ok: false, error: error?.message || "Error interno en el servidor." },
      { status: 500 }
    );
  }
}