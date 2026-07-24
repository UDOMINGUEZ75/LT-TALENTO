import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { ok: false, message: "ID no proporcionado" },
        { status: 400 }
      );
    }

    const candidate = await prisma.candidate.findUnique({
      where: { id: Number(id) },
      include: { user: true },
    });

    if (!candidate) {
      return NextResponse.json(
        { ok: false, message: "Perfil no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        user: candidate.user,
        profile: candidate,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en /api/candidate:", error);
    return NextResponse.json(
      { ok: false, message: "Error interno" },
      { status: 500 }
    );
  }
}
