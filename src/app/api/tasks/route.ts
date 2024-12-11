import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient;

//Méthode GET (Toutes les tâches)
export async function GET(request: Request){
    try {
        const post = await prisma.task.findMany();
        return NextResponse.json(post, {status: 200});
    } catch (error) {
        return NextResponse.json({error : "erreur dans la récupérations des posts"}, {status:200} )
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
    } catch (error) {
        return NextResponse.json({error : "erreur dans la création du post"}, {status:500} )
    }
}