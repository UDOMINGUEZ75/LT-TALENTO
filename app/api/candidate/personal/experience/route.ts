import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const saved = await prisma.candidateExperience.create({
      data: {
        years: body.years,
        lastPosition: body.lastPosition,
        skills: body.skills,
      },
    });

    return NextResponse.json({ ok: true, saved });
  } catch (error) {
    console.error("Error API experience:", error);
    return NextResponse.json({ ok: false, error });
  }
}