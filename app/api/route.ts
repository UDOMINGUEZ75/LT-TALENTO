import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        role: "CANDIDATE",
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error creando usuario" }, { status: 500 });
  }
}

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}