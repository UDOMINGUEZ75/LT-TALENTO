import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";   // ← ESTA ES LA IMPORTACIÓN CORRECTA

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

    // Obtener usuario
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!user) {
      return NextResponse.json(
        { ok: false, error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    // Obtener candidato
    const candidate = await prisma.candidate.findUnique({
      where: { userId: Number(userId) },
    });

    if (!candidate) {
      return NextResponse.json(
        { ok: false, error: "Candidato no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ok: true,
      user,
      candidate: {
        status: candidate.status || "Sin definir",
        experience: candidate.experience || "",
        education: candidate.education || "",
        skills: candidate.skills || "",
        languages: candidate.languages || "es",
        cvUrl: candidate.cvUrl || "",
      },
    });

  } catch (err) {
    console.error("❌ ERROR /get-candidate:", err);
    return NextResponse.json(
      { ok: false, error: "Error interno" },
      { status: 500 }
    );
  }
}
