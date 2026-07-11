import { NextResponse } from "next/server";
import { PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const email = String(body.email || "").trim();
    const name = String(body.name || "").trim();
    const role = String(body.role || "").trim() as UserRole;

    if (!email || !role) {
      return NextResponse.json(
        { error: "Email y rol son obligatorios" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Correo inválido" },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        { error: "El usuario ya existe" },
        { status: 400 }
      );
    }

    const user = await prisma.user.create({
      data: {
        email,
        name: name || null,
        role,
      },
    });

    if (role === UserRole.CANDIDATE) {
      await prisma.candidate.create({
        data: {
          userId: Number(user.id),
          headline: "",
          summary: "",
          skills: [],
          languages: "",
        },
      });
    }

    if (role === UserRole.RECRUITER) {
      await prisma.recruiter.create({
        data: {
          userId: Number(user.id),
          position: "",
          phone: "",
        },
      });
    }

    return NextResponse.json(
      { message: "Usuario creado", user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creando usuario:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
