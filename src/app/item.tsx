"use client";
import { Books } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  book: Books;
}

const Item = ({ book }: Props) => {
  const router = useRouter();

  const handleDelete = async (isbn: string) => {
    console.log(isbn);
    await fetch("/api/book?isbn=" + isbn, {
      method: "DELETE",
    });
    router.refresh();
  };
  return (
    <div className="border rounded-md p-4 flex flex-col">
      <h2 className="text-sm">ISBN: {book.isbn}</h2>
      <h1>{book.title}</h1>
      <p>{book.author}</p>
      <p>{book.price}</p>
      <div className="inline-flex mt-4 gap-4">
        <button
          className="text-xs hover:text-zinc-800 font-bold"
          onClick={() => router.push(`/update/${book.isbn}`)}
        >
          Update
        </button>
        <button
          className="text-xs text-red-500 hover:text-red-400 font-bold"
          onClick={() => handleDelete(book.isbn)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Item;
