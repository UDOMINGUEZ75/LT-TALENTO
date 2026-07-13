import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import OpenAI from "openai";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.js";
import mammoth from "mammoth";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const userId = formData.get("userId") as string;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let text = "";

    // ⭐ PDF — compatible con Turbopack
    if (file.type === "application/pdf") {
      const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;

      let fullText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const strings = content.items.map((item: any) => item.str);
        fullText += strings.join(" ") + "\n";
      }

      text = fullText;
    }

    // ⭐ Word
    if (
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.type === "application/msword"
    ) {
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;
    }

    // ⭐ IA: extraer información
    const prompt = `
Extrae del siguiente currículum la información estructurada del candidato.
Devuélvela en JSON con este formato EXACTO:

{
  "headline": "",
  "summary": "",
  "experience": [
    {
      "puesto": "",
      "empresa": "",
      "años": ""
    }
  ],
  "education": [
    {
      "grado": "",
      "institucion": ""
    }
  ],
  "skills": ["", ""],
  "languages": ["", ""]
}

Currículum:
${text}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
    });

    const extracted = JSON.parse(completion.choices[0].message.content);

    // ⭐ Guardar en Prisma
    const updated = await prisma.candidate.update({
      where: { userId: Number(userId) },
      data: {
        headline: extracted.headline || "",
        summary: extracted.summary || "",
        experience: extracted.experience || [],
        education: extracted.education || [],
        skills: extracted.skills || [],
        languages: extracted.languages || [],
      },
    });

    return NextResponse.json({
      message: "CV procesado correctamente",
      candidate: updated,
    });
  } catch (error) {
    console.error("CV Upload Error:", error);
    return NextResponse.json(
      { error: "Error procesando el CV" },
      { status: 500 }
    );
  }
}