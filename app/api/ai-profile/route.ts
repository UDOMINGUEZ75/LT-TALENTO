import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      headline,
      summary,
      skills,
      experience,
      yearsExp,
      seniority,
    } = body;

    const prompt = `
Eres un experto en redacción profesional y reclutamiento.
Mejorarás y completarás el perfil de un candidato.

Datos del candidato:
- Headline: ${headline || "N/A"}
- Resumen: ${summary || "N/A"}
- Skills: ${skills || "N/A"}
- Experiencia: ${experience || "N/A"}
- Años de experiencia: ${yearsExp || "N/A"}
- Seniority: ${seniority || "N/A"}

Devuelve un JSON con:
{
  "headline": "...",
  "summary": "...",
  "skills": "...",
  "experience": "..."
}
`;

    // 🔥 Llamada real a OpenAI
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // o "gpt-4o" si quieres más calidad
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    const json = await openaiRes.json();

    const text = json.choices?.[0]?.message?.content || "";

    // Intentar parsear JSON
    let improved;
    try {
      improved = JSON.parse(text);
    } catch {
      improved = {
        headline,
        summary,
        skills,
        experience,
      };
    }

    return NextResponse.json(improved);
  } catch (error) {
    console.error("ERROR EN /api/ai-profile:", error);
    return NextResponse.json({ error: "Error IA" }, { status: 500 });
  }
}