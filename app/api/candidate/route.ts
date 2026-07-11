import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { error: "userId requerido" },
      { status: 400 }
    );
  }

  const candidate = await prisma.user.findUnique({
    where: { id: Number(userId) },
  });

  return NextResponse.json(candidate);
}
