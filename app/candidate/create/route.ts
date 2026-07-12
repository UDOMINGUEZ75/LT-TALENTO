import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const { userId } = data;

    if (!userId) {
      return NextResponse.json(
        { ok: false, error: "userId es requerido" },
        { status: 400 }
      );
    }

    // Crear candidato
    const candidate = await prisma.candidate.create({
      data: {
        userId: Number(userId),
        status: "Pendiente",
        preferences: "",
        skills: [],
        headline: "",
        summary: "",
        experience: null,
        education: null,
      },
      select: {
        id: true,
        status: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        ok: true,
        candidate,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("🔥 ERROR API /candidate/create:", error);
    return NextResponse.json(
      { ok: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
