import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Fonction pour récupérer une tâche par ID
const getOneTask = async (id: string) => {
  const data = await prisma.task.findUnique({
    where: {
      id: parseInt(id), // Assurez-vous que l'ID est un nombre entier
    },
  });
  return data;
};

// Méthode GET (pour une tâche)
export async function GET(req: Request, context: { params: { id: string } }) {
  const { id } = context.params;

  if (!id) {
    return NextResponse.json({ error: "ID manquant" }, { status: 400 });
  }

  const data = await getOneTask(id);

  if (!data) {
    return NextResponse.json({ error: "Tâche non trouvée" }, { status: 404 });
  }

  return NextResponse.json({
    message: "Données récupérées avec succès depuis Next.js API",
    data,
  });
}

// Méthode PUT (pour la mise à jour d'une tâche)
export async function PUT(req: Request, context: { params: { id: string } }) {
  try {
    const taskId = parseInt(context.params.id, 10);
    if (isNaN(taskId)) {
      return NextResponse.json({ error: "ID invalide ou manquant." }, { status: 400 });
    }

    const body = await req.json();

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { error: "Aucune donnée fournie pour la mise à jour." },
        { status: 400 }
      );
    }

    // Vérifier si la tâche existe avant de mettre à jour
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
      return NextResponse.json(
          { message: "Erreur dans la modification de la tâche.", details: error.message },
          { status: 500 }
      );
  }
}

// Méthode DELETE (pour supprimer une tâche)
export async function DELETE(req: Request, context: { params: { id: string } }) {
  try {
    const taskId = parseInt(context.params.id, 10);
    if (isNaN(taskId)) {
      return NextResponse.json({ error: "ID invalide ou manquant." }, { status: 400 });
    }

    // Vérifier si la tâche existe avant de la supprimer
    const existingTask = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!existingTask) {
      return NextResponse.json({ error: "Tâche non trouvée." }, { status: 404 });
    }

    const deletedData = await prisma.task.delete({
      where: {
        id: taskId,
      },
    });

    return NextResponse.json({
      message: "Tâche supprimée avec succès.",
      data: deletedData,
    });
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
        { message: "Erreur dans la suppression de la tâche.", details: error.message },
        { status: 500 }
    );
}
}


