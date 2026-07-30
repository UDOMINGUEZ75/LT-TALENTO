import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    // 1. Importación dinámica para evitar que Prisma se inicialice en Build Time
    const { prisma } = await import("@/lib/prisma");

    // 2. Soporte dinámico para params (Next.js 14 o 15)
    const rawParams = await Promise.resolve(context.params);
    const candidateId = Number(rawParams?.id);

    // Validación para evitar que pase NaN durante el build o con IDs inválidos
    if (!candidateId || isNaN(candidateId)) {
      return NextResponse.json(
        { error: "ID inválido" },
        { status: 400 }
      );
    }

    const candidate = await prisma.candidate.findUnique({
      where: { id: candidateId },
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
    console.error("Error en /api/candidatos/[id]:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}