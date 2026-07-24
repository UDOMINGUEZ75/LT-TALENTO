import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const candidateId = formData.get("candidateId");

    if (!file || !candidateId) {
      return NextResponse.json(
        { ok: false, message: "Faltan datos." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filePath = path.join(process.cwd(), "public", "uploads", file.name);
    await writeFile(filePath, buffer);

    const fileUrl = `/uploads/${file.name}`;

    // Guardar en Candidate
    await prisma.candidate.update({
      where: { id: Number(candidateId) },
      data: { cvUrl: fileUrl },
    });

    // Guardar en CandidateDocuments
    await prisma.candidateDocuments.upsert({
      where: { candidateId: Number(candidateId) },
      update: { cvUrl: fileUrl },
      create: {
        candidateId: Number(candidateId),
        cvUrl: fileUrl,
      },
    });

    // Guardar en Document
    await prisma.document.create({
      data: {
        candidateId: Number(candidateId),
        url: fileUrl,
        type: "CV",
      },
    });

    return NextResponse.json(
      { ok: true, message: "CV subido correctamente", url: fileUrl },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en /api/cv/upload:", error);
    return NextResponse.json(
      { ok: false, message: "Error interno al subir CV" },
      { status: 500 }
    );
  }
}
