import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET (pour récupérer une tâche)
export async function GET(req: Request, context: { params: { id: string } }) {
  const { id } = context.params; // Récupère l'ID depuis les params de l'URL
  try {
    const taskId = parseInt(id, 10); // Transforme l'ID en nombre
    if (isNaN(taskId)) {
      return NextResponse.json({ error: "ID invalide" }, { status: 400 });
    }

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
export function PUT(req: Request, context: { params: { id: string } }) {
  const taskId = parseInt(context.params.id, 10);
  if (isNaN(taskId)) {
    return NextResponse.json({ error: "ID invalide ou manquant." }, { status: 400 });
  }

  return req.json()
    .then((body) => {
      if (!body || Object.keys(body).length === 0) {
        return NextResponse.json({ error: "Aucune donnée fournie pour la mise à jour." }, { status: 400 });
      }

      return prisma.task.findUnique({
        where: { id: taskId },
      })
        .then((existingTask) => {
          if (!existingTask) {
            return NextResponse.json({ error: "Tâche non trouvée." }, { status: 404 });
          }

          return prisma.task.update({
            where: { id: taskId },
            data: body,
          });
        })
        .then((updatedTask) => {
          return NextResponse.json({
            message: "Tâche mise à jour avec succès.",
            data: updatedTask,
          }, { status: 200 });
        })
        .catch((error) => {
          return NextResponse.json({ message: "Erreur dans la modification de la tâche.", details: error.message }, { status: 500 });
        });
    });
}

// DELETE (pour supprimer une tâche)
export function DELETE(req: Request, context: { params: { id: string } }) {
  const taskId = parseInt(context.params.id, 10);
  if (isNaN(taskId)) {
    return NextResponse.json({ error: "ID invalide ou manquant." }, { status: 400 });
  }

  return prisma.task.findUnique({
    where: { id: taskId },
  })
    .then((existingTask) => {
      if (!existingTask) {
        return NextResponse.json({ error: "Tâche non trouvée." }, { status: 404 });
      }

      return prisma.task.delete({
        where: { id: taskId },
      });
    })
    .then((deletedData) => {
      return NextResponse.json({
        message: "Tâche supprimée avec succès.",
        data: deletedData,
      });
    })
    .catch((error) => {
      return NextResponse.json({ message: "Erreur dans la suppression de la tâche.", details: error.message }, { status: 500 });
    });
}
