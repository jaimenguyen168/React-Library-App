import React from "react";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import BookOverview from "@/components/BookOverview";
import { auth } from "@/auth";
import BookVideo from "@/components/BookVideo";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();
  const userId = session?.user?.id as string;

  const bookDetails = await db
    .select()
    .from(books)
    .where(eq(books.id, id))
    .limit(1);

  if (!bookDetails[0]) redirect("/404");

  return (
    <>
      <BookOverview {...bookDetails[0]} userId={userId} />

      <div className="book-details">
        <div className="flex-[1.5]">
          <section className="flex flex-col gap-7">
            <h3>Video</h3>

            <BookVideo videoUrl={bookDetails[0].videoUrl} />
          </section>

          <section className="flex flex-col gap-7 mt-10">
            <h3>Summary</h3>

            <div className="space-y-5 text-xl text-light-100">
              {bookDetails[0].summary.split("\n").map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </section>
        </div>

        {/*Similar*/}
      </div>
    </>
  );
};
export default Page;
