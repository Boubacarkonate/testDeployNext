
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient;


type RouteParams = {
    params: {
      id: string;
    };
  };
  
  const getOneTask = async (id: string) => {
      const data = await prisma.task.findUnique({
          where: {
              id: parseInt(id), // Assurez-vous que l'ID est un nombre entier
            },
        });
        return data;
    };
    
  //Méthode GET (pour un tâche)
  export async function GET(req: Request, { params }: RouteParams) {
    const data = await getOneTask(params.id);
  
    return NextResponse.json({
      message: "Données récupérées avec succès depuis nextjs api",
      data,
    });
  }

export async function PUT(request: Request, { params }: RouteParams) {
    try {
   
      const taskId = parseInt(params.id, 10);
      if (isNaN(taskId)) {
        return NextResponse.json({ error: "ID invalide ou manquant." }, { status: 400 });
      }
  
    
      const body = await request.json();
  
     
      if (!body || Object.keys(body).length === 0) {
        return NextResponse.json(
          { error: "Aucune donnée fournie pour la mise à jour." },
          { status: 400 }
        );
      }
  
     
      const updatedTask = await prisma.task.update({
        where: { id: taskId },
        data: body,
      });
  
      return NextResponse.json({
        message: "Tâche mise à jour avec succès.",
        data: updatedTask,
      }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { error: "Erreur lors de la mise à jour de la tâche.", details: error.message },
        { status: 500 }
      );
    }
  }

//Méthode DELETE
 export async function DELETE(req: Request, { params }: RouteParams) {
    try {
      const deletedData = await prisma.task.delete({
        where: {
          id: parseInt(params.id), 
        },
      });
  
      return NextResponse.json({
        message: "Tâche supprimée avec succès.",
        data: deletedData,
      });
    } catch (error) {
      return NextResponse.json(
        { message: "Échec de la suppression de la tâche.", error: error.message },
        { status: 500 }
      );
    }
  }
  