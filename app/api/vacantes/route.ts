export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { prisma } = await import("@/lib/prisma");
    const { searchParams } = new URL(req.url);

    const recruiterIdParam = searchParams.get("recruiterId") || searchParams.get("id");
    const recruiterIdNum = recruiterIdParam ? Number(recruiterIdParam) : null;

    // Filtro para mostrar ÚNICAMENTE vacantes que NO estén cerradas
    const whereClause: any = {
      NOT: {
        status: "CERRADA",
      },
    };

    // Si viene un filtro por reclutador, lo agregamos
    if (recruiterIdNum && !isNaN(recruiterIdNum)) {
      whereClause.recruiterId = recruiterIdNum;
    }

    const vacancies = await prisma.job.findMany({
      where: whereClause,
      include: {
        recruiter: true,
      },
      orderBy: { id: "desc" },
    });

    return NextResponse.json({ ok: true, vacancies }, { status: 200 });
  } catch (error: any) {
    console.error("Error al obtener vacantes en /api/vacantes:", error);
    return NextResponse.json(
      {
        ok: false,
        error: "Error interno del servidor",
        details: error?.message || String(error),
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { prisma } = await import("@/lib/prisma");

    let title = "";
    let description = "";
    let salary = "";
    let location = "";
    let recruiterId = "";

    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const body = await req.json();
      title = body.title;
      description = body.description;
      salary = body.salary;
      location = body.location;
      recruiterId = body.recruiterId;
    } else {
      const formData = await req.formData().catch(() => null);
      if (formData) {
        title = formData.get("title") as string;
        description = formData.get("description") as string;
        salary = formData.get("salary") as string;
        location = formData.get("location") as string;
        recruiterId = formData.get("recruiterId") as string;
      }
    }

    if (!title || !description || !recruiterId) {
      return NextResponse.json(
        { ok: false, error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    const nuevaVacante = await prisma.job.create({
      data: {
        title,
        description,
        salary: salary ? String(salary) : "A convenir",
        location: location || "Remoto / No especificado",
        recruiterId: Number(recruiterId),
        status: "ACTIVA",
      },
    });

    return NextResponse.json(
      { ok: true, vacancy: nuevaVacante },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error al crear vacante:", error);
    return NextResponse.json(
      {
        ok: false,
        error: "Error interno del servidor",
        details: error?.message || String(error),
      },
      { status: 500 }
    );
  }
}