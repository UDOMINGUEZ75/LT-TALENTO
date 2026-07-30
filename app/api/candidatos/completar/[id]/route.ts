export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    // 1. Importación dinámica para evitar conexión en tiempo de Build
    const { prisma } = await import("@/lib/prisma");

    // 2. Extracción segura de params (Soporta Next 14 y 15)
    const rawParams = await Promise.resolve(context.params);
    const candidateId = Number(rawParams?.id);

    if (!candidateId || isNaN(candidateId)) {
      return NextResponse.json(
        { error: "ID de candidato inválido" },
        { status: 400 }
      );
    }

    // 3. Extracción segura del body dentro del try/catch
    const data = await req.json().catch(() => null);

    if (!data) {
      return NextResponse.json(
        { error: "Cuerpo de la petición inválido o vacío" },
        { status: 400 }
      );
    }

    await prisma.candidate.update({
      where: { id: candidateId },
      data: {
        personal: {
          upsert: {
            create: {
              state: data.state,
              city: data.city,
              zone: data.zone,
              address: data.address,
              phone: data.phone,
            },
            update: {
              state: data.state,
              city: data.city,
              zone: data.zone,
              address: data.address,
              phone: data.phone,
            },
          },
        },
        experience: {
          upsert: {
            create: {
              company: data.company,
              position: data.position,
              years: data.years ? Number(data.years) : null,
              description: data.description,
            },
            update: {
              company: data.company,
              position: data.position,
              years: data.years ? Number(data.years) : null,
              description: data.description,
            },
          },
        },
        education: {
          upsert: {
            create: {
              school: data.school,
              degree: data.degree,
              graduationYear: data.graduationYear
                ? Number(data.graduationYear)
                : null,
            },
            update: {
              school: data.school,
              degree: data.degree,
              graduationYear: data.graduationYear
                ? Number(data.graduationYear)
                : null,
            },
          },
        },
        availability: {
          upsert: {
            create: {
              schedule: data.schedule,
              travel: data.travel,
              relocate: data.relocate,
            },
            update: {
              schedule: data.schedule,
              travel: data.travel,
              relocate: data.relocate,
            },
          },
        },
        preferences: {
          upsert: {
            create: {
              area: data.area,
              salary: data.salary ? Number(data.salary) : null,
              modality: data.modality,
            },
            update: {
              area: data.area,
              salary: data.salary ? Number(data.salary) : null,
              modality: data.modality,
            },
          },
        },
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error en /api/candidatos/completar/[id]:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}