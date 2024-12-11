import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient;

//Méthode GET (Toutes les tâches)
// export async function GET(request: Request){
//     try {
//         const post = await prisma.task.findMany();
//         return NextResponse.json(post, {status: 200});
//     } catch (error) {
//         return NextResponse.json({message : "erreur dans la récupérations des posts"}, {status:200} )
//     }
// }

export async function GET() {
    try {
        // Récupérer toutes les tâches de la base de données
        const tasks = await prisma.task.findMany();

        // Retourner les tâches en réponse avec un statut 200
        return NextResponse.json(tasks, { status: 200 });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        // En cas d'erreur, renvoyer un message d'erreur détaillé avec un statut 500
        console.error(error);  // Afficher l'erreur dans la console pour le débogage
        return NextResponse.json(
            { message: "Erreur dans la récupération des tâches.", details: error.message },
            { status: 500 }
        );
    }
}


//méthode POST
export async function POST(request: Request){
    try {
        const { name, createdAt } =  await request.json();

    //vérification que les champs sont existants
    if (!name || !createdAt)
        return NextResponse.json({ message: "Veuillez remplir tous les champs" }, { status: 400 });

    //créer un nouveau post avec Prisma
    const nouveauPost = await prisma.task.create({
        data: { name, createdAt }
    });

    return NextResponse.json(nouveauPost, { status: 201});
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return NextResponse.json(
            { message: "Erreur dans la création de la tâche.", details: error.message },
            { status: 500 }
        );
    }
}


///////////////////////////////////////////////


