export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { AzureOpenAI } from "openai";

export async function POST(req: NextRequest) {
  try {
    const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
    const apiKey = process.env.AZURE_OPENAI_API_KEY || process.env.AZURE_OPENAI_KEY;
    const deploymentName = process.env.AZURE_OPENAI_DEPLOYMENT_NAME || "gpt-5.4-mini";

    if (!endpoint || !apiKey) {
      console.error("CRITICAL ERROR: Variables de entorno de Azure OpenAI no configuradas para flyers.");
      return NextResponse.json(
        { ok: false, error: "Faltan credenciales de Azure OpenAI en variables de entorno." },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const flyer = (formData.get("flyer") || formData.get("file") || formData.get("image")) as File | null;

    if (!flyer) {
      return NextResponse.json(
        { ok: false, error: "No se proporcionó ninguna imagen de flyer." },
        { status: 400 }
      );
    }

    const arrayBuffer = await flyer.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = buffer.toString("base64");
    const mimeType = flyer.type || "image/jpeg";

    const openai = new AzureOpenAI({
      endpoint,
      apiKey,
      apiVersion: process.env.AZURE_OPENAI_API_VERSION || "2024-06-01",
      deployment: deploymentName,
    });

    const promptText = `
Eres un reclutador experto de LT Talento. Analiza la imagen del flyer de empleo adjunta y extrae la información de la vacante.

Devuelve ÚNICAMENTE un objeto JSON válido con este formato exacto (sin texto adicional, sin bloques de código markdown):
{
  "title": "El título exacto del puesto (ej. Auxiliar de Aduanas)",
  "salary": "El rango de sueldo mensual bruto o prestaciones si se mencionan, o vacio",
  "description": "El texto estructurado completo con viñetas que desglose: Edad, Sexo, Escolaridad, Requisitos Clave, Conocimientos Deseables, Competencias y Habilidades, Condiciones del Puesto y Contacto."
}
`;

    const response = await openai.chat.completions.create({
      model: deploymentName,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: promptText },
            {
              type: "image_url",
              image_url: {
                url: `data:${mimeType};base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.2,
      max_completion_tokens: 1500, // <-- Actualizado de max_tokens a max_completion_tokens
    });

    const rawContent = response.choices[0]?.message?.content || "{}";

    const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
    const cleanJsonString = jsonMatch ? jsonMatch[0] : "{}";

    let parsedData: any = {};
    try {
      parsedData = JSON.parse(cleanJsonString);
    } catch (parseErr) {
      console.error("Error al parsear el JSON del flyer en Azure:", parseErr);
      parsedData = {};
    }

    return NextResponse.json({
      success: true,
      data: {
        title: parsedData.title || "",
        salary: parsedData.salary || "",
        description: parsedData.description || "",
      },
    });

  } catch (error: any) {
    console.error("ERROR EN /api/analizar-flyer:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Error interno al procesar el flyer con IA." },
      { status: 500 }
    );
  }
}