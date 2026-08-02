export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 1. GET: Para obtener la información de la vacante antes de editarla
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const jobId = Number(params.id);

    if (isNaN(jobId)) {
      return NextResponse.json(
        { ok: false, error: "ID de vacante inválido" },
        { status: 400 }
      );
    }

    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      return NextResponse.json(
        { ok: false, error: "Vacante no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true, job }, { status: 200 });
  } catch (err: any) {
    console.error(`Error al obtener la vacante en /api/vacantes/${params.id}:`, err);
    return NextResponse.json(
      {
        ok: false,
        error: "Error al obtener la vacante",
        details: err?.message || String(err),
      },
      { status: 500 }
    );
  }
}

// 2. PUT: Guarda los cambios editados (Título, Sueldo, Ubicación, Descripción)
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const jobId = Number(params.id);

    if (isNaN(jobId)) {
      return NextResponse.json(
        { ok: false, error: "ID de vacante inválido" },
        { status: 400 }
      );
    }

    const body = await req.json();

    const updatedJob = await prisma.job.update({
      where: { id: jobId },
      data: {
        title: body.title,
        description: body.description,
        salary: body.salary,
        location: body.location,
      },
    });

    return NextResponse.json({ ok: true, job: updatedJob }, { status: 200 });
  } catch (err: any) {
    console.error(`Error al actualizar la vacante en /api/vacantes/${params.id}:`, err);
    return NextResponse.json(
      {
        ok: false,
        error: "Error al actualizar la vacante",
        details: err?.message || String(err),
      },
      { status: 500 }
    );
  }
}

// 3. PATCH: Cambia el estatus de la vacante a "CERRADA"
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const jobId = Number(params.id);

    if (isNaN(jobId)) {
      return NextResponse.json(
        { ok: false, error: "ID de vacante inválido" },
        { status: 400 }
      );
    }

    const updatedJob = await prisma.job.update({
      where: { id: jobId },
      data: {
        status: "CERRADA",
      },
    });

    console.log(`[PATCH /api/vacantes/${jobId}] Vacante marcada como CERRADA`);

    return NextResponse.json({ ok: true, job: updatedJob }, { status: 200 });
  } catch (err: any) {
    console.error(`Error al cerrar la vacante en /api/vacantes/${params.id}:`, err);
    return NextResponse.json(
      {
        ok: false,
        error: "Error al cerrar la vacante",
        details: err?.message || String(err),
      },
      { status: 500 }
    );
  }
}

// 4. DELETE: Elimina físicamente la vacante de la base de datos
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const jobId = Number(params.id);

    if (isNaN(jobId)) {
      return NextResponse.json(
        { ok: false, error: "ID de vacante inválido" },
        { status: 400 }
      );
    }

    await prisma.job.delete({
      where: { id: jobId },
    });

    return NextResponse.json(
      { ok: true, message: "Vacante eliminada permanentemente" },
      { status: 200 }
    );
  } catch (err: any) {
    console.error(`Error al eliminar la vacante en /api/vacantes/${params.id}:`, err);
    return NextResponse.json(
      {
        ok: false,
        error: "Error al eliminar la vacante",
        details: err?.message || String(err),
      },
      { status: 500 }
    );
  }
}