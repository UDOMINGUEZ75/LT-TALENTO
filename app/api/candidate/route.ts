import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams?.get("userId");

    if (!userId) {
      return NextResponse.json(
        { ok: false, error: "userId es requerido" },
        { status: 400 }
      );
    }

    const candidate = await prisma.candidate.findUnique({
      where: { userId: Number(userId) },
      select: {
        id: true,
        status: true,
        preferences: true,
        skills: true,
        headline: true,
        summary: true,
        experience: true,
        education: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!candidate) {
      return NextResponse.json(
        { ok: false, error: "Candidato no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        candidate,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("🔥 ERROR API /candidate:", error);
    return NextResponse.json(
      { ok: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
