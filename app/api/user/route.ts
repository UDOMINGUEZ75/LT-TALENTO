import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const users = await prisma.user.findMany({
    include: {
      candidate: true,
      recruiter: true,
    },
  });

  return NextResponse.json(users);
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.email || !data.role) {
      return NextResponse.json(
        { error: "email y role son obligatorios" },
        { status: 400 }
      );
    }

    // Crear usuario
    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name ?? null,
        role: data.role,
      },
    });

    // Si es candidato → crear Candidate
    if (data.role === "CANDIDATE") {
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

    // Si es reclutador → crear Recruiter
    if (data.role === "RECRUITER") {
      await prisma.recruiter.create({
        data: {
          userId: user.id,
          position: data.position ?? null,
          phone: data.phone ?? null,
          companyId: data.companyId ?? null,
        },
      });
    }

    return NextResponse.json({ message: "Usuario creado", user });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error creando usuario" },
      { status: 500 }
    );
  }
}