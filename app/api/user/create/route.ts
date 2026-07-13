import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: "Nombre y correo son requeridos" },
        { status: 400 }
      );
    }

    // Buscar si ya existe
    let user = await prisma.user.findUnique({
      where: { email },
    });

    // Si no existe, crearlo
    if (!user) {
      user = await prisma.user.create({
        data: {
          name,
          email,
          candidate: {
            create: {
              status: "Pendiente",
              headline: "",
              summary: "",
              experience: {},
              education: {},
            },
          },
        },
      });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error creando usuario:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
