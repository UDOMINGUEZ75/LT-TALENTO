import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET: Cargar datos personales
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { ok: false, error: "userId requerido" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    const personal = await prisma.candidatePersonal.findUnique({
      where: { userId: Number(userId) },
    });

    return NextResponse.json({
      ok: true,
      personal: {
        name: user?.name || "",
        email: user?.email || "",
        state: personal?.state || "",
        city: personal?.city || "",
        zone: personal?.zone || "",
        address: personal?.address || "",
        phone: personal?.phone || "",
      },
    });
  } catch (error) {
    console.error("🔥 ERROR GET /candidate/personal:", error);
    return NextResponse.json(
      { ok: false, error: "Error interno" },
      { status: 500 }
    );
  }
}

// POST: Guardar datos personales
export async function POST(req: Request) {
  try {
    const { userId, name, email, state, city, zone, address, phone } =
      await req.json();

    if (!userId) {
      return NextResponse.json(
        { ok: false, error: "userId requerido" },
        { status: 400 }
      );
    }

    // Actualiza datos del usuario
    await prisma.user.update({
      where: { id: Number(userId) },
      data: { name, email },
    });

    // Actualiza o crea datos personales
    await prisma.candidatePersonal.upsert({
      where: { userId: Number(userId) },
      update: { state, city, zone, address, phone },
      create: {
        userId: Number(userId),
        state,
        city,
        zone,
        address,
        phone,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("🔥 ERROR POST /candidate/personal:", error);
    return NextResponse.json(
      { ok: false, error: "Error interno" },
      { status: 500 }
    );
  }
}
