import React from "react";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import BookList from "@/components/BookList";
import { sampleBooks } from "@/constants";
import { fetchBorrowedBooks } from "@/lib/actions/book";
import Link from "next/link";

const Page = async () => {
  const session = await auth();
  const userId = session?.user?.id as string;

  const { data: books } = await fetchBorrowedBooks(userId);

  if (!books)
    return (
      <>
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-4 text-light-100">
            You have not borrowed any books yet.
          </h1>
          <Link href="/">
            <Button className="book-overview_btn font-bebas-neue text-xl text-dark-100">
              Back to Home
            </Button>
          </Link>
        </div>
      </>
    );

  return (
    <>
      <BookList title="Borrowed Books" books={books} userId={userId} />
    </>
  );
};
export default Page;
