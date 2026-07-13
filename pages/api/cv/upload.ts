import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import OpenAI from "openai";
import mammoth from "mammoth";

// IMPORTACIÓN CORRECTA DE PDF-PARSE (CommonJS)
const pdf = require("pdf-parse");

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
      // PDF PARSING (pdf-parse)
      // -----------------------------
      if (req.headers["content-type"]?.includes("pdf")) {
        try {
          const data = await pdf(buffer);
          text = data.text || "";
        } catch (err) {
          console.error("PDF parse error:", err);
          text = "";
        }
      }

      // -----------------------------
      // WORD PARSING (mammoth)
      // -----------------------------
      if (
        req.headers["content-type"]?.includes("word") ||
        req.headers["content-type"]?.includes("officedocument")
      ) {
        try {
          const result = await mammoth.extractRawText({ buffer });
          text = result.value || "";
        } catch (err) {
          console.error("Word parse error:", err);
          text = "";
        }
      }

      // -----------------------------
      // AI EXTRACTOR (VERSIÓN SEGURA)
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

      // -----------------------------
      // JSON PARSE SEGURO
      // -----------------------------
      const raw = completion.choices?.[0]?.message?.content;

      let extracted = {
        headline: "",
        summary: "",
        experience: [],
        education: [],
        skills: [],
        languages: [],
      };

      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          extracted = {
            headline: parsed.headline || "",
            summary: parsed.summary || "",
            experience: parsed.experience || [],
            education: parsed.education || [],
            skills: parsed.skills || [],
            languages: parsed.languages || [],
          };
        } catch (err) {
          console.error("JSON parse error:", err);
        }
      } else {
        console.warn("OpenAI devolvió content = null");
      }

      // -----------------------------
      // GUARDAR EN PRISMA
      // -----------------------------
      const updated = await prisma.candidate.update({
        where: { userId: Number(req.query.userId) },
        data: extracted,
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
