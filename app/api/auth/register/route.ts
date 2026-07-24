import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "email es obligatorio" },
        { status: 400 }
      );
    }

    // Buscar usuario existente
    let user = await prisma.user.findUnique({
      where: { email },
    });

    // Si ya existe → devolverlo
    if (user) {
      return NextResponse.json({
        ok: true,
        exists: true,
        user,
      });
    }

    // Crear usuario nuevo
    user = await prisma.user.create({
      data: {
        name,
        email,
        role: "CANDIDATE",
      },
    });

    return NextResponse.json({
      ok: true,
      exists: false,
      user,
    });

  } catch (error) {
    console.error("❌ Error creando usuario:", error);
    return NextResponse.json(
      { error: "Error creando usuario" },
      { status: 500 }
    );
  }
}