export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const { prisma } = await import("@/lib/prisma");
    const rawParams = await Promise.resolve(context.params);
    const id = Number(rawParams?.id);

    if (!id || isNaN(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const recruiter = await prisma.recruiter.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, company: true, phone: true },
    });

    if (!recruiter) {
      return NextResponse.json({ error: "Reclutador no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ recruiter });
  } catch (error) {
    console.error("Error al obtener reclutador:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const { prisma } = await import("@/lib/prisma");
    const rawParams = await Promise.resolve(context.params);
    const id = Number(rawParams?.id);

    if (!id || isNaN(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Cuerpo inválido" }, { status: 400 });
    }

    const updated = await prisma.recruiter.update({
      where: { id },
      data: {
        name: body.name,
        company: body.company,
        phone: body.phone,
      },
    });

    return NextResponse.json({ ok: true, updated });
  } catch (error) {
    console.error("Error al actualizar reclutador:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}