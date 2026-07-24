import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import * as pdfParse from "pdf-parse";
import mammoth from "mammoth";

// ---------- 1. Utilidades de extracción de texto ----------

async function extractTextFromFile(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const name = file.name.toLowerCase();

  // PDF
  if (name.endsWith(".pdf")) {
    const data = await pdfParse.default(buffer);
    return data.text || "";
  }

  // DOCX
  if (name.endsWith(".docx")) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value || "";
  }

  // Otros formatos: por ahora vacío
  return "";
}

// ---------- 2. Detección simple de idioma ----------

function detectLanguage(text: string): "es" | "en" {
  const sample = text.slice(0, 500).toLowerCase();

  const spanishHints = ["experiencia", "educación", "perfil", "responsabilidades", "logros"];
  const englishHints = ["experience", "education", "profile", "responsibilities", "achievements"];

  const esScore = spanishHints.filter((w) => sample.includes(w)).length;
  const enScore = englishHints.filter((w) => sample.includes(w)).length;

  if (enScore > esScore) return "en";
  return "es";
}

// ---------- 3. Traducción con Google Translate ----------

async function translateToSpanish(text: string): Promise<string> {
  const apiKey = process.env.GOOGLE_TRANSLATE_KEY;
  if (!apiKey) return text;

  const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

  const body = {
    q: text,
    source: "en",
    target: "es",
    format: "text",
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    console.error("Error en Google Translate:", await res.text());
    return text;
  }

  const json = await res.json();
  const translated = json?.data?.translations?.[0]?.translatedText;
  return translated || text;
}

// ---------- 4. DeepSeek: limpieza / preprocesado ----------

async function deepseekClean(text: string): Promise<string> {
  const url = process.env.DEEPSEEK_URL;
  const key = process.env.DEEPSEEK_KEY;

  if (!url || !key) return text;

  const body = {
    model: "deepseek-chat",
    messages: [
      {
        role: "user",
        content:
          "Limpia este texto de CV, elimina ruido, encabezados repetidos y deja solo contenido útil:\n\n" +
          text,
      },
    ],
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    console.error("Error en DeepSeek:", await res.text());
    return text;
  }

  const json = await res.json();
  const cleaned =
    json?.choices?.[0]?.message?.content?.[0]?.text ??
    json?.choices?.[0]?.message?.content ??
    text;

  return cleaned;
}

// ---------- 5. Claude: extracción estructurada ----------

type ClaudeProfile = {
  personal?: {
    nombre?: string;
    apellido?: string;
    ciudad?: string;
  };
  experience?: Array<{
    empresa?: string;
    puesto?: string;
    fecha_inicio?: string;
    fecha_fin?: string;
    descripcion?: string;
  }>;
  education?: Array<{
    institucion?: string;
    grado?: string;
    fecha_inicio?: string;
    fecha_fin?: string;
  }>;
  skills?: string[];
  languages?: string[];
  preferences?: {
    tipo_trabajo?: string;
    modalidad?: string;
    salario_deseado?: string;
  };
  availability?: {
    schedule?: string;
    travel?: string;
    relocate?: string;
  };
};

async function claudeExtract(text: string): Promise<ClaudeProfile | null> {
  const url = process.env.CLAUDE_URL;
  const key = process.env.CLAUDE_KEY;

  if (!url || !key) return null;

  const body = {
    model: "claude-3-haiku-20240307",
    max_tokens: 2000,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text:
              "Analiza este CV en español y devuelve un JSON con la siguiente estructura:\n\n" +
              JSON.stringify(
                {
                  personal: { nombre: "", apellido: "", ciudad: "" },
                  experience: [
                    {
                      empresa: "",
                      puesto: "",
                      fecha_inicio: "",
                      fecha_fin: "",
                      descripcion: "",
                    },
                  ],
                  education: [
                    {
                      institucion: "",
                      grado: "",
                      fecha_inicio: "",
                      fecha_fin: "",
                    },
                  ],
                  skills: [],
                  languages: [],
                  preferences: {
                    tipo_trabajo: "",
                    modalidad: "",
                    salario_deseado: "",
                  },
                  availability: {
                    schedule: "",
                    travel: "",
                    relocate: "",
                  },
                },
                null,
                2
              ) +
              "\n\nTexto del CV:\n\n" +
              text,
          },
        ],
      },
    ],
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    console.error("Error en Claude:", await res.text());
    return null;
  }

  const json = await res.json();
  const content = json?.content?.[0]?.text ?? json?.content?.[0]?.content ?? "";
  try {
    const parsed = JSON.parse(content);
    return parsed;
  } catch (e) {
    console.error("Error parseando JSON de Claude:", e, content);
    return null;
  }
}

// ---------- 6. Gemini: normalización (opcional) ----------

async function geminiNormalize(profile: ClaudeProfile): Promise<ClaudeProfile> {
  const url = process.env.GEMINI_URL;
  const key = process.env.GEMINI_KEY;

  if (!url || !key) return profile;

  const body = {
    contents: [
      {
        parts: [
          {
            text:
              "Recibe este JSON de perfil de candidato y normaliza campos (fechas, nombres, etc.) manteniendo la misma estructura:\n\n" +
              JSON.stringify(profile, null, 2),
          },
        ],
      },
    ],
  };

  const res = await fetch(`${url}?key=${key}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    console.error("Error en Gemini:", await res.text());
    return profile;
  }

  const json = await res.json();
  const text = json?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) return profile;

  try {
    const normalized = JSON.parse(text);
    return normalized;
  } catch (e) {
    console.error("Error parseando JSON de Gemini:", e, text);
    return profile;
  }
}

// ---------- 7. Handler principal ----------

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const candidateIdRaw = formData.get("candidateId");

    if (!file || !candidateIdRaw) {
      return NextResponse.json(
        { ok: false, message: "Faltan datos (file o candidateId)." },
        { status: 400 }
      );
    }

    const candidateId = Number(candidateIdRaw);
    if (Number.isNaN(candidateId)) {
      return NextResponse.json(
        { ok: false, message: "candidateId inválido." },
        { status: 400 }
      );
    }

    // 1. Extraer texto
    const rawText = await extractTextFromFile(file);
    if (!rawText || rawText.trim().length === 0) {
      return NextResponse.json(
        { ok: false, message: "No se pudo extraer texto del CV." },
        { status: 400 }
      );
    }

    // 2. Detectar idioma y traducir si está en inglés
    const lang = detectLanguage(rawText);
    const textEs = lang === "en" ? await translateToSpanish(rawText) : rawText;

    // 3. DeepSeek → limpieza
    const cleaned = await deepseekClean(textEs);

    // 4. Claude → perfil estructurado
    const claudeProfile = await claudeExtract(cleaned);
    if (!claudeProfile) {
      return NextResponse.json(
        { ok: false, message: "No se pudo estructurar el CV con Claude." },
        { status: 500 }
      );
    }

    // 5. Gemini → normalización
    const finalProfile = await geminiNormalize(claudeProfile);

    // 6. Guardar en Prisma (ajusta nombres según tu esquema real)

    // Candidate (campos agregados tipo JSON/texto)
    await prisma.candidate.update({
      where: { id: candidateId },
      data: {
        experience: finalProfile.experience ? JSON.stringify(finalProfile.experience) : null,
        education: finalProfile.education ? JSON.stringify(finalProfile.education) : null,
        availability: finalProfile.availability ? JSON.stringify(finalProfile.availability) : null,
        preferences: finalProfile.preferences ? JSON.stringify(finalProfile.preferences) : null,
        languages: finalProfile.languages ? JSON.stringify(finalProfile.languages) : null,
        skills: finalProfile.skills ? JSON.stringify(finalProfile.skills) : null,
        status: "Analizado",
      },
    });

    // CandidatePersonal
    if (finalProfile.personal) {
      await prisma.candidatePersonal.update({
        where: { candidateId },
        data: {
          nombre: finalProfile.personal.nombre ?? undefined,
          apellido: finalProfile.personal.apellido ?? undefined,
          ciudad: finalProfile.personal.ciudad ?? undefined,
        },
      });
    }

    // CandidateExperience
    if (finalProfile.experience && finalProfile.experience.length > 0) {
      // Limpia experiencias previas y vuelve a insertar
      await prisma.candidateExperience.deleteMany({ where: { candidateId } });

      await prisma.candidateExperience.createMany({
        data: finalProfile.experience.map((exp) => ({
          candidateId,
          empresa: exp.empresa ?? "",
          puesto: exp.puesto ?? "",
          fecha_inicio: exp.fecha_inicio ?? "",
          fecha_fin: exp.fecha_fin ?? "",
          descripcion: exp.descripcion ?? "",
        })),
      });
    }

    // CandidateEducation
    if (finalProfile.education && finalProfile.education.length > 0) {
      await prisma.candidateEducation.deleteMany({ where: { candidateId } });

      await prisma.candidateEducation.createMany({
        data: finalProfile.education.map((edu) => ({
          candidateId,
          institucion: edu.institucion ?? "",
          grado: edu.grado ?? "",
          fecha_inicio: edu.fecha_inicio ?? "",
          fecha_fin: edu.fecha_fin ?? "",
        })),
      });
    }

    // CandidateAvailability
    if (finalProfile.availability) {
      await prisma.candidateAvailability.update({
        where: { candidateId },
        data: {
          schedule: finalProfile.availability.schedule ?? undefined,
          travel: finalProfile.availability.travel ?? undefined,
          relocate: finalProfile.availability.relocate ?? undefined,
        },
      });
    }

    // CandidatePreferences
    if (finalProfile.preferences) {
      await prisma.candidatePreferences.update({
        where: { candidateId },
        data: {
          tipoTrabajo: finalProfile.preferences.tipo_trabajo ?? undefined,
          modalidad: finalProfile.preferences.modalidad ?? undefined,
          salarioDeseado: finalProfile.preferences.salario_deseado ?? undefined,
        },
      });
    }

    return NextResponse.json(
      {
        ok: true,
        message: "CV analizado y perfil guardado correctamente.",
        profile: finalProfile,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en /api/analyze:", error);
    return NextResponse.json(
      { ok: false, message: "Error interno en el análisis del CV." },
      { status: 500 }
    );
  }
}
