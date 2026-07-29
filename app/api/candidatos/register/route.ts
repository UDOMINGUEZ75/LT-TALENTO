export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    // 1. Importación dinámica para Vercel
    const { prisma } = await import("@/lib/prisma");

    // 2. Parsing seguro del body
    const body = await req.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        { error: "Cuerpo de la petición inválido" },
        { status: 400 }
      );
    }

    const { name, email, password } = body;

    if (!name || !password) {
      return NextResponse.json(
        { error: "Datos incompletos" },
        { status: 400 }
      );
    }

    const safeEmail = email || `${name.replace(/\s+/g, "_")}@interno`;

    const existing = await prisma.candidate.findUnique({
      where: { email: safeEmail },
    });

    if (existing) {
      return NextResponse.json(
        { error: "El email ya está registrado" },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);

    // Crear candidato
    const candidate = await prisma.candidate.create({
      data: {
        name,
        email: safeEmail,
        password: hashed,
      },
    });

    // Crear subtablas con tu mismo upsert pero ejecutadas en paralelo seguro
    await Promise.allSettled([
      prisma.candidatePersonal.upsert({
        where: { candidateId: candidate.id },
        update: {},
        create: { candidateId: candidate.id },
      }),
      prisma.candidateExperience.upsert({
        where: { candidateId: candidate.id },
        update: {},
        create: { candidateId: candidate.id },
      }),
      prisma.candidateEducation.upsert({
        where: { candidateId: candidate.id },
        update: {},
        create: { candidateId: candidate.id },
      }),
      prisma.candidateAvailability.upsert({
        where: { candidateId: candidate.id },
        update: {},
        create: { candidateId: candidate.id },
      }),
      prisma.candidatePreferences.upsert({
        where: { candidateId: candidate.id },
        update: {},
        create: { candidateId: candidate.id },
      }),
    ]);

    // RESPUESTA FINAL CORRECTA
    return NextResponse.json({ ok: true, candidate });

  } catch (error) {
    console.error("API ERROR:", error);
    return NextResponse.json(
      { error: "Error interno del servidor", details: String(error) },
      { status: 500 }
    );
  }
}