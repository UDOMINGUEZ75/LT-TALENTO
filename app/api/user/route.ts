import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Regex para validar email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Regex para validar contraseña (cuando la agregues)
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const { email, name, role, password } = data;

    // Validación: email obligatorio
    if (!email) {
      return NextResponse.json(
        { error: "El correo es obligatorio." },
        { status: 400 }
      );
    }

    // Validación: formato de email
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "El formato del correo no es válido." },
        { status: 400 }
      );
    }

    // Normalizar email
    const normalizedEmail = email.toLowerCase();

    // Validación: duplicado
    const existing = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Este correo ya está registrado." },
        { status: 400 }
      );
    }

    // Validación de contraseña (cuando la actives)
    if (password && !passwordRegex.test(password)) {
      return NextResponse.json(
        {
          error:
            "La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula y un número.",
        },
        { status: 400 }
      );
    }

    // Crear usuario
    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        name: name ?? null,
        role: role ?? "CANDIDATE",
      },
    });

    // Crear Candidate
    if (role === "CANDIDATE") {
      await prisma.candidate.create({
        data: {
          userId: user.id,
          skills: data.skills ?? [],
          headline: data.headline ?? "",
          summary: data.summary ?? "",
          experience: data.experience ?? null,
          education: data.education ?? null,
        },
      });
    }

    // Crear Recruiter
    if (role === "RECRUITER") {
      await prisma.recruiter.create({
        data: {
          userId: user.id,
          position: data.position ?? null,
          phone: data.phone ?? null,
          companyId: data.companyId ?? null,
        },
      });
    }

    // Estructura lista para verificación por correo
    // Aquí después agregamos: enviar token, guardar token, etc.

    return NextResponse.json({
      message: "Usuario creado correctamente",
      user,
    });
  } catch (error) {
    console.error("Error creando usuario:", error);

    if (String(error).includes("Unique constraint")) {
      return NextResponse.json(
        { error: "Este correo ya está registrado." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Error creando usuario" },
      { status: 500 }
    );
  }
}
