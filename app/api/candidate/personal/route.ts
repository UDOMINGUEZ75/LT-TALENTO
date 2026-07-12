import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ ok: false, error: "userId requerido" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id: Number(userId) },
  });

  if (!user) {
    return NextResponse.json({ ok: true, personal: null });
  }

  return NextResponse.json({
    ok: true,
    personal: {
      name: user.name || "",
      email: user.email || "",
      state: user.state || "",
      city: user.city || "",
      zone: user.zone || "",
      address: user.address || "",
      phone: user.phone || "",
    },
  });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { userId, name, email, state, city, zone, address, phone } = body;

  if (!userId || !name || !email) {
    return NextResponse.json(
      { ok: false, error: "Nombre, correo y userId son obligatorios" },
      { status: 400 }
    );
  }

  const updated = await prisma.user.update({
    where: { id: Number(userId) },
    data: { name, email, state, city, zone, address, phone },
  });

  return NextResponse.json({
    ok: true,
    personal: {
      name: updated.name,
      email: updated.email,
      state: updated.state,
      city: updated.city,
      zone: updated.zone,
      address: updated.address,
      phone: updated.phone,
    },
  });
}