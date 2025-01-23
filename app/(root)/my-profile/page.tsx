import React from "react";
import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/auth";
import BookList from "@/components/BookList";
import { sampleBooks } from "@/constants";
import { fetchBorrowedBooks } from "@/lib/actions/book";

const Page = async () => {
  const session = await auth();
  const userId = session?.user?.id as string;

  const { data: books } = await fetchBorrowedBooks(userId);

  return (
    <>
      <BookList title="Borrowed Books" books={books} />
    </>
  );
};
export default Page;
