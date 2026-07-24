console.log("DEEPSEEK_URL:", process.env.DEEPSEEK_URL);
console.log("CLAUDE_KEY:", process.env.CLAUDE_KEY);
console.log("GEMINI_KEY:", process.env.GEMINI_KEY);
console.log("GOOGLE_TRANSLATE_KEY:", process.env.GOOGLE_TRANSLATE_KEY);

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import * as pdfParse from "pdf-parse";
import mammoth from "mammoth";

export const dynamic = "force-dynamic";

async function extractText(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const name = file.name.toLowerCase();

  if (name.endsWith(".pdf")) {
    const data = await pdfParse(buffer);
    return data.text || "";
  }

  if (name.endsWith(".docx")) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value || "";
  }

  throw new Error("Formato no soportado. Usa PDF o DOCX.");
}

export async function POST(req: NextRequest) {
  try {
    const candidateId = req.nextUrl.searchParams.get("candidateId");

    if (!candidateId) {
      return NextResponse.json(
        { ok: false, message: "candidateId es obligatorio" },
        { status: 400 }
      );
    }

    const candidate = await prisma.candidate.findUnique({
      where: { id: Number(candidateId) },
    });

    if (!candidate || !candidate.cvUrl) {
      return NextResponse.json(
        { ok: false, message: "El candidato no tiene CV subido." },
        { status: 400 }
      );
    }

    // 1. Cargar archivo desde /public/uploads
    const filePath = process.cwd() + "/public" + candidate.cvUrl;
    const fileBuffer = await import("fs/promises").then(fs => fs.readFile(filePath));

    const file = new File([fileBuffer], candidate.cvUrl);

    // 2. EXTRAER TEXTO
    const rawText = await extractText(file);

    if (!rawText || rawText.trim().length < 20) {
      return NextResponse.json(
        { ok: false, message: "No se pudo extraer texto del CV" },
        { status: 400 }
      );
    }

    // 3. DETECCIÓN DE IDIOMA
    const isEnglish = /[a-zA-Z]{3,}/.test(rawText) && !/[áéíóúñ]/.test(rawText);

    let textForAI = rawText;

    // 4. TRADUCCIÓN
    if (isEnglish) {
      const res = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_TRANSLATE_KEY}`,
        {
          method: "POST",
          body: JSON.stringify({ q: rawText, target: "es" }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await res.json();
      textForAI = data?.data?.translations?.[0]?.translatedText || rawText;
    }

    // 5. IA — DeepSeek → Claude → Gemini
    const deepseek = await fetch(process.env.DEEPSEEK_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DEEPSEEK_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: "Limpia y normaliza el texto del CV." },
          { role: "user", content: textForAI },
        ],
      }),
    }).then(r => r.json());

    const cleaned = deepseek?.choices?.[0]?.message?.content || textForAI;

    const claude = await fetch(process.env.CLAUDE_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.CLAUDE_KEY!,
      },
      body: JSON.stringify({
        model: "claude-3-haiku-20240307",
        max_tokens: 2048,
        messages: [
          { role: "system", content: "Extrae datos estructurados del CV." },
          { role: "user", content: cleaned },
        ],
      }),
    }).then(r => r.json());

    const structured = JSON.parse(claude?.content?.[0]?.text || "{}");

    const gemini = await fetch(process.env.GEMINI_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GEMINI_KEY}`,
      },
      body: JSON.stringify({
        model: "gemini-1.5-flash",
        messages: [
          { role: "system", content: "Normaliza los datos del CV para Neon." },
          { role: "user", content: JSON.stringify(structured) },
        ],
      }),
    }).then(r => r.json());

    const finalProfile = JSON.parse(gemini?.candidates?.[0]?.content || "{}");

    // 6. GUARDAR EN PRISMA
    await prisma.candidate.update({
      where: { id: Number(candidateId) },
      data: {
        experience: finalProfile.experience || null,
        education: finalProfile.education || null,
        skills: finalProfile.skills || null,
        languages: finalProfile.languages || null,
        preferences: finalProfile.preferences || null,
        availability: finalProfile.availability || null,
        status: "Analizado",
      },
    });

    return NextResponse.json(
      {
        ok: true,
        message: "CV analizado correctamente",
        candidateId,
        profile: finalProfile,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en /api/analyze:", error);
    return NextResponse.json(
      { ok: false, message: "Error interno en analyze" },
      { status: 500 }
    );
  }
}