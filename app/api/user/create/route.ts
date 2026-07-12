import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    const user = await prisma.user.create({
      data: {
        email: `auto_${Date.now()}@lttalento.com`,
        name: "Auto User",
        role: "CANDIDATE",
      },
    });

    return NextResponse.json({ ok: true, user });
  } catch (error) {
    console.error("Error creando usuario:", error);
    return NextResponse.json(
      { ok: false, error: "Error creando usuario" },
      { status: 500 }
    );
  }
}