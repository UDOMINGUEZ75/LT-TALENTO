import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import OpenAI from "openai";
import { PDFDocument } from "pdf-lib";
import mammoth from "mammoth";

export const config = {
  api: {
    bodyParser: false,
  },
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const chunks: Buffer[] = [];

    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", async () => {
      const buffer = Buffer.concat(chunks);

      let text = "";

      // ⭐ PDF compatible con Vercel + Webpack
      if (req.headers["content-type"]?.includes("pdf")) {
        const pdfDoc = await PDFDocument.load(buffer);
        const pages = pdfDoc.getPages();

        let fullText = "";
        for (const page of pages) {
          fullText += page.getTextContent()?.items?.map((i: any) => i.str).join(" ") + "\n";
        }

        text = fullText;
      }

      // ⭐ Word compatible con Vercel
      if (
        req.headers["content-type"]?.includes("word") ||
        req.headers["content-type"]?.includes("officedocument")
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
        where: { userId: Number(req.query.userId) },
        data: {
          headline: extracted.headline || "",
          summary: extracted.summary || "",
          experience: extracted.experience || [],
          education: extracted.education || [],
          skills: extracted.skills || [],
          languages: extracted.languages || [],
        },
      });

      res.status(200).json({
        message: "CV procesado correctamente",
        candidate: updated,
      });
    });
  } catch (error) {
    console.error("CV Upload Error:", error);
    res.status(500).json({ error: "Error procesando el CV" });
  }
}
