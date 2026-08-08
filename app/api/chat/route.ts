/* STREAMING_CHUNK:Initializing Gemini chat backend route... */
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "El mensaje es requerido." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY || "";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

    const systemInstruction = `
      Act as an elite corporate sales and recruitment executive for "LT Talent Solutions" (lttalento.com). 
      Your mission is SALES CONVERSION: persuading business owners, executives, and HR directors to hire LT Talent Solutions' professional recruitment and talent acquisition services.
      Keep in mind:
      1. Candidate registration is 100% FREE.
      2. Corporate recruiting, headhunting, and talent assessment services are paid premium solutions designed to drive company growth ("construyendo el futuro").
      3. Be persuasive, strategic, professional, and empathetic.
      4. Always encourage the user to click the WhatsApp button for immediate pricing, custom enterprise proposals, or scheduling a strategy session.
      5. Keep responses concise, clear, and impactful (max 3 short paragraphs).
    `;

    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      systemInstruction: {
        parts: [{ text: systemInstruction }]
      },
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    const candidate = result.candidates?.[0];
    const textResponse = candidate?.content?.parts?.[0]?.text || 
      "Estamos listos para potenciar el talento de tu empresa. Conectemos vía WhatsApp para diseñar tu estrategia de reclutamiento ideal.";

    return NextResponse.json({ text: textResponse });
  } catch (error) {
    console.error("Error en API Gemini Chat:", error);
    return NextResponse.json(
      { text: "Nuestros consultores están listos para ayudarte. Hablemos directamente por WhatsApp para darte una atención personalizada." },
      { status: 500 }
    );
  }
}