export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"; // Cambiado a bcryptjs

export async function POST(req: Request) {
  try {
    const { prisma } = await import("@/lib/prisma");
    const body = await req.json().catch(() => null);

    if (!body) {
      return NextResponse.json({ error: "Cuerpo de la petición inválido" }, { status: 400 });
    }

    const { email, password } = body;

    const candidato = await prisma.candidate.findFirst({
      where: { email: email.trim() },
    });

    if (!candidato) {
      return NextResponse.json({ error: "Correo o contraseña incorrectos" }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, candidato.password);

    if (!passwordMatch) {
      return NextResponse.json({ error: "Correo o contraseña incorrectos" }, { status: 401 });
    }

    return NextResponse.json(
      {
        ok: true,
        candidateId: candidato.id,
        message: "Login exitoso",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en login de candidato:", error);
    return NextResponse.json(
      { error: "Error interno del servidor", details: String(error) },
      { status: 500 }
    );
  }
}