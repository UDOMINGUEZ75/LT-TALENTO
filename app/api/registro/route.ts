import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { nombre, correo, password } = await req.json();

    if (!nombre || !correo || !password) {
      return NextResponse.json(
        { ok: false, message: "Faltan datos obligatorios" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: correo },
    });

    if (existingUser) {
      return NextResponse.json(
        { ok: false, message: "Este correo ya está registrado" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: nombre,
        email: correo,
        password: hashedPassword,
        role: "CANDIDATE",
      },
    });

    const candidate = await prisma.candidate.create({
      data: {
        userId: user.id,
        status: "Pendiente",
      },
    });

    return NextResponse.json(
      {
        ok: true,
        message: "Registro creado correctamente",
        candidateId: candidate.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en /api/registro:", error);
    return NextResponse.json(
      { ok: false, message: "Error interno en registro" },
      { status: 500 }
    );
  }
}
