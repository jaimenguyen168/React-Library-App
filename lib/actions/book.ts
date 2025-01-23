"use server";

import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { eq } from "drizzle-orm";
import dayjs from "dayjs";

export const borrowBook = async (params: BorrowBookParams) => {
  const { userId, bookId } = params;

  try {
    const book = await db
      .select({ availableCopies: books.availableCopies })
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1);

    if (!book[0] || book[0].availableCopies <= 0)
      return { success: false, error: "Book not available for borrowing." };

    const dueDate = dayjs().add(7, "day").toDate().toDateString();

    const record = await db
      .insert(borrowRecords)
      .values({
        userId,
        bookId,
        dueDate,
        status: "BORROWED",
      })
      .returning();

    await db
      .update(books)
      .set({ availableCopies: book[0].availableCopies - 1 })
      .where(eq(books.id, bookId));

    return {
      success: true,
      data: JSON.parse(JSON.stringify(record[0])),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: "An error occurred while borrowing the book.",
    };
  }
};

export const fetchBorrowedBooks = async (userId: string) => {
  try {
    const records = await db
      .select()
      .from(borrowRecords)
      .where(eq(borrowRecords.userId, userId))
      .limit(10);

    if (!records[0]) {
      return {
        success: false,
        error: "No books borrowed.",
      };
    }

    const borrowedBooks = await Promise.all(
      records.map(async (record) => {
        const [book] = await db
          .select()
          .from(books)
          .where(eq(books.id, record.bookId));

        return book;
      }),
    );

    return {
      success: true,
      data: JSON.parse(JSON.stringify(borrowedBooks)),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: "An error occurred while fetching borrowed books.",
    };
  }
};
