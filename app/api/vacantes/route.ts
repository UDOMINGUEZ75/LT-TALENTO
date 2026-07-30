export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prisma } = await import("@/lib/prisma");
    const body = await req.json().catch(() => null);

    if (!body) {
      return NextResponse.json({ error: "Cuerpo de la petición inválido" }, { status: 400 });
    }

    const { title, description, salary, location, recruiterId } = body;

    if (!title || !description || !recruiterId) {
      return NextResponse.json({ error: "Faltan campos obligatorios (título, descripción o reclutador)" }, { status: 400 });
    }

    // Creamos la vacante en la base de datos usando Prisma
    const nuevaVacante = await prisma.job.create({
      data: {
        title,
        description,
        salary: salary ? String(salary) : "A convenir",
        location: location || "Remoto / No especificado",
        recruiterId: Number(recruiterId),
      },
    });

    return NextResponse.json({ ok: true, vacancy: nuevaVacante }, { status: 201 });
  } catch (error) {
    console.error("Error al crear vacante:", error);
    return NextResponse.json({ error: "Error interno del servidor", details: String(error) }, { status: 500 });
  }
}