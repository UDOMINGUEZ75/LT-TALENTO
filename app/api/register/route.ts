import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { name, email } = await req.json();

  if (!name || !email) {
    return NextResponse.json({ ok: false, error: "Datos incompletos" });
  }

  let user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    user = await prisma.user.create({
      data: { name, email },
    });

    await prisma.candidate.create({
      data: { userId: user.id },
    });
  }

  return NextResponse.json({ ok: true, user });
}
