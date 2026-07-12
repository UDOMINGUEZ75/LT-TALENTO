import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.email || !body.name || !body.role) {
      return Response.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      );
    }

    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        role: body.role,
      },
    });

    return Response.json({ user }, { status: 200 });
  } catch (error: any) {
    if (error.code === "P2002") {
      return Response.json(
        { error: "El email ya está registrado" },
        { status: 409 }
      );
    }

    console.error("🔥 ERROR PRISMA:", JSON.stringify(error, null, 2));

    return Response.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}