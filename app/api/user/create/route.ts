import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();

    if (!name || !email) {
      return NextResponse.json(
        { ok: false, error: "Nombre y correo son requeridos" },
        { status: 400 }
      );
    }

    // Verificar si ya existe
    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        { ok: true, user: existing, created: false },
        { status: 200 }
      );
    }

    // Crear usuario
    const user = await prisma.user.create({
      data: {
        name,
        email,
        role: "CANDIDATE",
      },
    });

    // Crear candidato asociado
    const candidate = await prisma.candidate.create({
      data: {
        userId: user.id,
        status: "Pendiente",
      },
    });

    return NextResponse.json(
      { ok: true, user, candidate, created: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("🔥 ERROR /api/user/create:", error);
    return NextResponse.json(
      { ok: false, error: "Error interno" },
      { status: 500 }
    );
  }
}
