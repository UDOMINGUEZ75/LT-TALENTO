import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET: Obtener los datos del reclutador para rellenar el formulario
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const recruiterId = parseInt(id, 10);

    if (isNaN(recruiterId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const recruiter = await prisma.recruiter.findUnique({
      where: { id: recruiterId },
    });

    if (!recruiter) {
      return NextResponse.json({ error: "Reclutador no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ recruiter }, { status: 200 });
  } catch (error) {
    console.error("Error al obtener reclutador:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

// PUT: Guardar los cambios actualizados del reclutador
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const recruiterId = parseInt(id, 10);

    if (isNaN(recruiterId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const body = await request.json();
    const { name, company, phone } = body;

    const updatedRecruiter = await prisma.recruiter.update({
      where: { id: recruiterId },
      data: {
        name,
        company,
        phone,
      },
    });

    return NextResponse.json(
      { message: "Actualizado con éxito", recruiter: updatedRecruiter },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al actualizar reclutador:", error);
    return NextResponse.json({ error: "Error al actualizar los datos" }, { status: 500 });
  }
}