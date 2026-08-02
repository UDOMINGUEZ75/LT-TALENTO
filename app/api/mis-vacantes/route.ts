import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    // Capturamos tanto 'recruiterId' como 'id' para que funcione con cualquier formato de URL
    const recruiterIdStr = searchParams.get("recruiterId") || searchParams.get("id");

    if (!recruiterIdStr) {
      return NextResponse.json({ error: "ID de reclutador requerido" }, { status: 400 });
    }

    const recruiterIdNum = Number(recruiterIdStr);

    if (isNaN(recruiterIdNum)) {
      return NextResponse.json({ error: "ID de reclutador inválido" }, { status: 400 });
    }

    // Consultamos filtrando por el reclutador y excluyendo las vacantes CERRADAS
    const vacancies = await prisma.job.findMany({
      where: {
        recruiterId: recruiterIdNum,
        NOT: {
          status: "CERRADA",
        },
      },
      orderBy: {
        id: "desc",
      },
    });

    return NextResponse.json({ vacancies }, { status: 200 });
  } catch (err) {
    console.error("Error al obtener mis vacantes:", err);
    return NextResponse.json({ error: "Error interno del servidor", details: String(err) }, { status: 500 });
  }
}