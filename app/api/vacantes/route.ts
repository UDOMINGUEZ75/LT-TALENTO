export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { prisma } = await import("@/lib/prisma");
    const { searchParams } = new URL(req.url);
    const recruiterId = searchParams.get("recruiterId");

    const whereClause = recruiterId ? { recruiterId: Number(recruiterId) } : {};

    const vacancies = await prisma.job.findMany({
      where: whereClause,
      orderBy: { id: "desc" },
    });

    return NextResponse.json({ ok: true, vacancies }, { status: 200 });
  } catch (error) {
    console.error("Error al obtener vacantes:", error);
    return NextResponse.json({ error: "Error interno del servidor", details: String(error) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { prisma } = await import("@/lib/prisma");
    const body = await req.json().catch(() => null);

    if (!body) {
      return NextResponse.json({ error: "Cuerpo de la petición inválido" }, { status: 400 });
    }

    const { title, description, salary, location, recruiterId } = body;

    if (!title || !description || !recruiterId) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

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