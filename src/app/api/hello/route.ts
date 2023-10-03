import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
  return NextResponse.json({ hello: "world" });
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
