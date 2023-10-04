import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
  const books = await prisma.books.findMany();
  return NextResponse.json({ books });
};

export const DELETE = async (req: NextRequest) => {
  const url = new URL(req.url).searchParams;
  const isbn = String(url.get("isbn")) || "";

  const post = await prisma.books.delete({
    where: {
      isbn: isbn,
    },
  });

  if (!post) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }

  return NextResponse.json({});
};

export const PUT = async (req: NextRequest) => {
  const { isbn, author, title, price, categoryId} = await req.json()

  const post = await prisma.books.update({
      where: {
          isbn: String(isbn)
      },
      data: {
          isbn, author, title, price, categoryId
      }
  })

  return NextResponse.json({ post })
};