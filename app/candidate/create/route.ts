import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return Response.json(
        { error: "userId requerido" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!user) {
      return Response.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    const candidate = await prisma.candidate.findUnique({
      where: { userId: Number(userId) },
    });

    if (!candidate) {
      return Response.json(
        { error: "Candidato no encontrado" },
        { status: 404 }
      );
    }

    return Response.json({
      id: candidate.id,
      name: user.name,
      email: user.email,
      status: candidate.status || "Pendiente",
    });
  } catch (error) {
    console.error("Error en /api/candidate:", error);
    return Response.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}