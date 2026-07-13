import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams?.get("userId");

    if (!userId) {
      return NextResponse.json(
        { ok: false, error: "userId requerido" },
        { status: 400 }
      );
    }

    const candidate = await prisma.candidate.findUnique({
      where: { userId: Number(userId) },
      include: { user: true },
    });

    if (!candidate) {
      return NextResponse.json(
        { ok: false, error: "Candidato no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true, candidate });
  } catch (error) {
    console.error("🔥 ERROR GET /candidate/personal:", error);
    return NextResponse.json(
      { ok: false, error: "Error interno" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { userId, name, email } = await req.json();

    if (!userId || !name || !email) {
      return NextResponse.json(
        { ok: false, error: "Datos incompletos" },
        { status: 400 }
      );
    }

    // Actualiza datos del usuario
    await prisma.user.update({
      where: { id: Number(userId) },
      data: { name, email },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("🔥 ERROR POST /candidate/personal:", error);
    return NextResponse.json(
      { ok: false, error: "Error interno" },
      { status: 500 }
    );
  }
}
