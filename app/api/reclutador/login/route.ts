import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Faltan datos obligatorios" }, { status: 400 });
    }

    const recruiter = await prisma.recruiter.findUnique({ where: { email } });

    if (!recruiter || !recruiter.password) {
      return NextResponse.json({ error: "Correo o contraseña incorrectos" }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, recruiter.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Correo o contraseña incorrectos" }, { status: 401 });
    }

    return NextResponse.json({ success: true, recruiterId: recruiter.id }, { status: 200 });
  } catch (error) {
    console.error("Error en login de reclutador:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}