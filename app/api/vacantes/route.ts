export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { prisma } = await import("@/lib/prisma");
    const { searchParams } = new URL(req.url);
    const recruiterId = searchParams.get("recruiterId");

    const whereClause = recruiterId && !isNaN(Number(recruiterId)) 
      ? { recruiterId: Number(recruiterId) } 
      : {};

    const vacancies = await prisma.job.findMany({
      where: whereClause,
      orderBy: { id: "desc" },
    });

    return NextResponse.json({ ok: true, vacancies }, { status: 200 });
  } catch (error: any) {
    console.error("Error al obtener vacantes en la API:", error);
    return NextResponse.json({ 
      ok: false, 
      error: "Error interno del servidor", 
      details: error?.message || String(error) 
    }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { prisma } = await import("@/lib/prisma");
    
    const formData = await req.formData().catch(() => null);

    if (!formData) {
      return NextResponse.json({ error: "Cuerpo de la petición inválido" }, { status: 400 });
    }

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const salary = formData.get("salary") as string;
    const location = formData.get("location") as string;
    const recruiterId = formData.get("recruiterId") as string;

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
  } catch (error: any) {
    console.error("Error al crear vacante:", error);
    return NextResponse.json({ 
      ok: false, 
      error: "Error interno del servidor", 
      details: error?.message || String(error) 
    }, { status: 500 });
  }
}