export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Importación dinámica para evitar que Prisma se inicialice en Build Time
    const { prisma } = await import("@/lib/prisma");

    const resolvedParams = await params;
    const id = Number(resolvedParams?.id);

    if (!id || isNaN(id)) {
      return NextResponse.json(
        { error: "ID de candidato inválido" },
        { status: 400 }
      );
    }

    const body = await req.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        { error: "Cuerpo de la petición inválido o vacío" },
        { status: 400 }
      );
    }

    const toBoolean = (val: any) => {
      if (typeof val === "boolean") return val;
      if (typeof val === "string") return val === "true";
      return null;
    };

    // 1. Candidate Personal
    await prisma.candidatePersonal.upsert({
      where: { candidateId: id },
      update: {
        state: body.state ?? null,
        city: body.city ?? null,
        zone: body.zone ?? null,
        address: body.address ?? null,
        phone: body.phone ?? null,
      },
      create: {
        candidateId: id,
        state: body.state ?? null,
        city: body.city ?? null,
        zone: body.zone ?? null,
        address: body.address ?? null,
        phone: body.phone ?? null,
      },
    });

    // 2. Candidate Experience
    await prisma.candidateExperience.upsert({
      where: { candidateId: id },
      update: {
        company: body.company ?? null,
        position: body.position ?? null,
        years: body.years ? Number(body.years) : null,
        description: body.description ?? null,
      },
      create: {
        candidateId: id,
        company: body.company ?? null,
        position: body.position ?? null,
        years: body.years ? Number(body.years) : null,
        description: body.description ?? null,
      },
    });

    // 3. Candidate Education
    await prisma.candidateEducation.upsert({
      where: { candidateId: id },
      update: {
        school: body.school ?? null,
        degree: body.degree ?? null,
        graduationYear: body.graduationYear
          ? Number(body.graduationYear)
          : null,
      },
      create: {
        candidateId: id,
        school: body.school ?? null,
        degree: body.degree ?? null,
        graduationYear: body.graduationYear
          ? Number(body.graduationYear)
          : null,
      },
    });

    // 4. Candidate Availability
    await prisma.candidateAvailability.upsert({
      where: { candidateId: id },
      update: {
        schedule: body.schedule ?? null,
        travel: toBoolean(body.travel),
        relocate: toBoolean(body.relocate),
      },
      create: {
        candidateId: id,
        schedule: body.schedule ?? null,
        travel: toBoolean(body.travel),
        relocate: toBoolean(body.relocate),
      },
    });

    // 5. Candidate Preferences
    await prisma.candidatePreferences.upsert({
      where: { candidateId: id },
      update: {
        area: body.area ?? null,
        salary: body.salary ? Number(body.salary) : null,
        modality: body.modality ?? null,
      },
      create: {
        candidateId: id,
        area: body.area ?? null,
        salary: body.salary ? Number(body.salary) : null,
        modality: body.modality ?? null,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error actualizando candidato:", error);
    return NextResponse.json(
      {
        error: "Error en el servidor al actualizar el candidato",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}