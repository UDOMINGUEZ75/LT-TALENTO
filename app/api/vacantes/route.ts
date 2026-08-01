export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { uploadCVToBlob } from "@/lib/azure-storage"; // O la función que uses para guardar imágenes/flyers en Blob

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
    
    // Leemos el FormData enviado desde el formulario frontend
    const formData = await req.formData().catch(() => null);

    if (!formData) {
      return NextResponse.json({ error: "Cuerpo de la petición inválido" }, { status: 400 });
    }

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const salary = formData.get("salary") as string;
    const location = formData.get("location") as string;
    const recruiterId = formData.get("recruiterId") as string;
    const flyerFile = formData.get("flyer") as File | null;

    if (!title || !description || !recruiterId) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    // Opcional: si tu base de datos guarda la URL del flyer, puedes procesarlo aquí
    let flyerUrl = "";
    if (flyerFile && flyerFile.size > 0) {
      try {
        const arrayBuffer = await flyerFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        flyerUrl = await uploadCVToBlob(buffer, flyerFile.name, flyerFile.type);
      } catch (storageErr) {
        console.warn("No se pudo subir el flyer a Blob Storage:", storageErr);
      }
    }

    const nuevaVacante = await prisma.job.create({
      data: {
        title,
        description,
        salary: salary ? String(salary) : "A convenir",
        location: location || "Remoto / No especificado",
        recruiterId: Number(recruiterId),
        // Si tu modelo de Prisma tiene un campo para la imagen/flyer, descomenta la siguiente línea:
        // flyerUrl: flyerUrl || null,
      },
    });

    return NextResponse.json({ ok: true, vacancy: nuevaVacante }, { status: 201 });
  } catch (error) {
    console.error("Error al crear vacante:", error);
    return NextResponse.json({ error: "Error interno del servidor", details: String(error) }, { status: 500 });
  }
}