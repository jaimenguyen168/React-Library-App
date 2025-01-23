"use server";

import { db } from "@/database/drizzle";
import { books } from "@/database/schema";

type BookParams = Omit<
  Book,
  "id" | "availableCopies" | "isLoanedBook" | "createdAt"
>;

export const createBook = async (params: BookParams) => {
  try {
    const newBook = await db
      .insert(books)
      .values({
        ...params,
        availableCopies: params.totalCopies,
        createdAt: new Date(),
      })
      .returning();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newBook[0])),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: "An error occurred while creating the book.",
    };
  }
};
