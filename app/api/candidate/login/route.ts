import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    // Carga Prisma solo cuando la API recibe una petición, no durante la compilación
    const { prisma } = await import("@/lib/prisma");

    const body = await req.json().catch(() => null);

    if (!body || !body.email) {
      return NextResponse.json(
        { error: "El email es requerido" },
        { status: 400 }
      );
    }

    const { email } = body;

    const candidate = await prisma.candidate.findUnique({
      where: { email },
    });

    if (!candidate) {
      return NextResponse.json(
        { error: "Candidato no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ id: candidate.id });
  } catch (error) {
    console.error("Error en login:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}