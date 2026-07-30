export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { prisma } = await import("@/lib/prisma");
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Cuerpo de la petición inválido" }, { status: 400 });
    }

    const { name, email, password, company, phone } = body;
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    const existing = await prisma.recruiter.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "El correo ya está registrado" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const recruiter = await prisma.recruiter.create({
      data: {
        name,
        email,
        password: hashedPassword,
        company,
        phone,
      },
    });

    return NextResponse.json({ ok: true, recruiterId: recruiter.id }, { status: 201 });
  } catch (error) {
    console.error("Error en registro de reclutador:", error);
    return NextResponse.json({ error: "Error interno del servidor", details: String(error) }, { status: 500 });
  }
}