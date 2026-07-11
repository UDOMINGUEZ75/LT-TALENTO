import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      userId,
      headline,
      summary,
      yearsExp,
      seniority,
      location,
      phone,
      skills,
      languages,
      experience,
      education,
      preferences,
    } = body;

    if (!userId) {
      return NextResponse.json({ error: "userId requerido" }, { status: 400 });
    }

    const parsedSkills: string[] = skills
      ? (skills.split(",").map((s: string) => s.trim()) as string[])
      : [];

    const data = {
      headline: headline || "Sin headline",
      summary: summary || "Sin resumen",
      yearsExp: yearsExp ? Number(yearsExp) : null,
      seniority: seniority || null,
      location: location || null,
      phone: phone || null,
      languages: languages || null,
      preferences: preferences || null,
      skills: parsedSkills,
      experience: experience
        ? ({ text: experience } as Prisma.InputJsonValue)
        : Prisma.JsonNull,
      education: education
        ? ({ text: education } as Prisma.InputJsonValue)
        : Prisma.JsonNull,
      userId: Number(userId),
    };

    const candidate = await prisma.candidate.upsert({
      where: { userId: Number(userId) },
      update: data,
      create: data,
    });

    return NextResponse.json(
      { message: "Perfil guardado correctamente", candidate },
      { status: 200 }
    );

  } catch (error) {
    console.error("ERROR EN /api/candidate:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
