import Link from "next/link";
import React from "react";
import Item from "./item";

const getBooks = async () => {
  const res = await fetch(process.env.BASE_URL + "/api/book", {
    method: "GET",
    next: { revalidate: 0 },
  });
  const json = await res.json();
  return json;
};

const Page = async () => {
  const books = await getBooks();

  return (
    <div className="w-[1000px] mx-auto pt-20">
      <Link
        href={"/create"}
        className="px-3 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-md text-white"
      >
        Create
      </Link>
      <div className="flex flex-col mt-8 gap-4">
        {books?.books?.map((book: any, index: number) => (
          <Item key={index} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Page;
