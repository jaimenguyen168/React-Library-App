import React from "react";
import BookCard from "@/components/BookCard";
import { users } from "@/database/schema";

interface Props {
  title: string;
  books: Book[];
  containerClassname?: string;
  userId: string;
}

const BookList = ({ title, books, containerClassname, userId }: Props) => {
  return (
    <section className={containerClassname}>
      <h2 className="font-bebas-neue text-4xl text-light-100">{title}</h2>

      <ul className="book-list">
        {books.map((book) => (
          <BookCard key={book.title} {...book} userId={userId} />
        ))}
      </ul>
    </section>
  );
};
export default BookList;
