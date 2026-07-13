import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId, estado, ciudad, telefono } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: "userId es requerido" },
        { status: 400 }
      );
    }

    // Actualizar datos personales dentro del JSON personalData
    const updated = await prisma.candidate.update({
      where: { userId: Number(userId) },
      data: {
        personalData: {
          estado,
          ciudad,
          telefono,
        },
      },
    });

    return NextResponse.json({ ok: true, updated });
  } catch (error) {
    console.error("Error guardando datos personales:", error);
    return NextResponse.json(
      { error: "Error interno al guardar datos personales" },
      { status: 500 }
    );
  }
}
