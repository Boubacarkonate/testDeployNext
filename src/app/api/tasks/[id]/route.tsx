import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET (pour récupérer une tâche)
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params; // Résoudre la promesse pour obtenir l'ID
    const taskId = parseInt(id, 10); // Convertir l'ID en nombre entier

    if (isNaN(taskId)) {
      return NextResponse.json({ error: "ID invalide" }, { status: 400 });
    }

    // Recherche de la tâche dans la base de données
    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      return NextResponse.json({ error: "Tâche non trouvée" }, { status: 404 });
    }

    return NextResponse.json(task, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: "Erreur lors de la récupération de la tâche", details: error.message }, { status: 500 });
  }
}
// PUT (pour mettre à jour une tâche)
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;  // Résolution de la promesse
    const taskId = parseInt(id, 10);

    if (isNaN(taskId)) {
      return NextResponse.json({ error: "ID invalide ou manquant." }, { status: 400 });
    }

    const body = await req.json();

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json({ error: "Aucune donnée fournie pour la mise à jour." }, { status: 400 });
    }

    const existingTask = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!existingTask) {
      return NextResponse.json({ error: "Tâche non trouvée." }, { status: 404 });
    }

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: body,
    });

    return NextResponse.json({
      message: "Tâche mise à jour avec succès.",
      data: updatedTask,
    }, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ message: "Erreur dans la modification de la tâche.", details: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;  // Résolution de la promesse
    const taskId = parseInt(id, 10);

    if (isNaN(taskId)) {
      return NextResponse.json({ error: "ID invalide ou manquant." }, { status: 400 });
    }

    const existingTask = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!existingTask) {
      return NextResponse.json({ error: "Tâche non trouvée." }, { status: 404 });
    }

    const deletedData = await prisma.task.delete({
      where: { id: taskId },
    });

    return NextResponse.json({
      message: "Tâche supprimée avec succès.",
      data: deletedData,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ message: "Erreur dans la suppression de la tâche.", details: error.message }, { status: 500 });
  }
}
