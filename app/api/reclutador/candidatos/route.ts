export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { prisma } = await import("@/lib/prisma");

    const candidates = await prisma.candidate.findMany({
      include: {
        personal: true,
        experience: true,
        education: true,
        availability: true,
        preferences: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ ok: true, candidates });
  } catch (error) {
    console.error("Error al obtener candidatos para reclutador:", error);
    return NextResponse.json(
      { error: "Error interno del servidor", details: String(error) },
      { status: 500 }
    );
  }
}