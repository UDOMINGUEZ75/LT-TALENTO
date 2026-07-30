export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    // 1. Importación dinámica para evitar que Prisma se inicialice en tiempo de Build
    const { prisma } = await import("@/lib/prisma");

    // 2. Lectura segura del body
    const body = await req.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        { error: "Cuerpo de la petición inválido" },
        { status: 400 }
      );
    }

    const { email, password } = body;

    console.log("EMAIL:", email);
    console.log("PASSWORD:", password ? "*****" : "Vacío");

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email y contraseña requeridos" },
        { status: 400 }
      );
    }

    const candidate = await prisma.candidate.findUnique({
      where: { email },
    });

    console.log("CANDIDATE FOUND:", candidate ? candidate.id : "No encontrado");

    if (!candidate) {
      return NextResponse.json(
        { error: "Email no encontrado" },
        { status: 404 }
      );
    }

    // Validación por si la contraseña en BD es null/undefined
    if (!candidate.password) {
      return NextResponse.json(
        { error: "El usuario no tiene una contraseña configurada" },
        { status: 400 }
      );
    }

    const valid = await bcrypt.compare(password, candidate.password);

    if (!valid) {
      return NextResponse.json(
        { error: "Contraseña incorrecta" },
        { status: 401 }
      );
    }

    return NextResponse.json({ ok: true, id: candidate.id });
  } catch (error) {
    console.error("ERROR EN AUTH:", error);
    return NextResponse.json(
      { error: "Error interno en el servidor" },
      { status: 500 }
    );
  }
}