import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import OpenAI from "openai";
import mammoth from "mammoth";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.js";

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

      // -----------------------------
      // PDF PARSING (pdfjs-dist)
      // -----------------------------
      if (req.headers["content-type"]?.includes("pdf")) {
        const loadingTask = pdfjsLib.getDocument(buffer);
        const pdf = await loadingTask.promise;

        let fullText = "";

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item: any) => item.str).join(" ");
          fullText += pageText + "\n";
        }

        text = fullText;
      }

      // -----------------------------
      // WORD PARSING (mammoth)
      // -----------------------------
      if (
        req.headers["content-type"]?.includes("word") ||
        req.headers["content-type"]?.includes("officedocument")
      ) {
        const result = await mammoth.extractRawText({ buffer });
        text = result.value;
      }

      // -----------------------------
      // AI EXTRACTOR
      // -----------------------------
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
