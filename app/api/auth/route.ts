import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "email es obligatorio" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        candidate: true,   // recruiter eliminado
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Autenticación exitosa",
      user,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error en autenticación" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Auth funcionando" });
}
