import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { ok: false, error: "userId requerido" },
        { status: 400 }
      );
    }

    // Buscar usuario
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!user) {
      return NextResponse.json(
        { ok: false, error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    // Buscar candidato asociado
    let candidate = await prisma.candidate.findFirst({
      where: { userId: Number(userId) },
    });

    // Si no existe candidato, crearlo
    if (!candidate) {
      candidate = await prisma.candidate.create({
        data: {
          userId: Number(userId),
          status: "Pendiente",
        },
      });
    }

    return NextResponse.json({
      ok: true,
      user: {
        id: user.id,
        name: user.name || "",
        email: user.email || "",
      },
      candidate: {
        id: candidate.id,
        status: candidate.status,
      },
    });
  } catch (error) {
    console.error("ERROR GET /api/candidate:", error);
    return NextResponse.json(
      { ok: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
