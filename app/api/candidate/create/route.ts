import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    // Crear usuario primero
    const user = await prisma.user.create({
      data: {
        email: `auto_${Date.now()}@lttalento.com`,
        name: "Auto User",
        role: "CANDIDATE",
      },
    });

    // Crear candidate con userId válido
    const candidate = await prisma.candidate.create({
      data: {
        userId: user.id,
        headline: "",
        summary: "",
      },
    });

    return NextResponse.json({ ok: true, candidate });
  } catch (error) {
    console.error("Error creando candidate:", error);
    return NextResponse.json(
      { ok: false, error: "Error creando candidate" },
      { status: 500 }
    );
  }
}