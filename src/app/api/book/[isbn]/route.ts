import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export const GET = async (req: NextRequest, context: { params: { isbn: string } }) => {
    const isbn = (String(context.params.isbn) || '' )

    const book = await prisma.books.findFirst({
        where: {
            isbn: isbn
        }
    })
    
    return NextResponse.json({ book })
}