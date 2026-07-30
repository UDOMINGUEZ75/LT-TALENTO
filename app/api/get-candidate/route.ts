export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // 1. Importación dinámica para evitar la inicialización en Build Time
    const { prisma } = await import("@/lib/prisma");

    const { searchParams } = new URL(req.url);
    const idParam = searchParams.get("id");
    const id = Number(idParam);

    if (!idParam || isNaN(id)) {
      return NextResponse.json({ error: "ID requerido e inválido" }, { status: 400 });
    }

    const candidate = await prisma.candidate.findUnique({
      where: { id },
      include: {
        personal: true,
        experience: true,
        education: true,
        availability: true,
        preferences: true,
        documents: true,
      },
    });

    if (!candidate) {
      return NextResponse.json(
        { error: "Candidato no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ candidate });
  } catch (error) {
    console.error("Error en /api/get-candidate:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}