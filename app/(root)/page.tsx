import BookOverview from "@/components/BookOverview";
import BookList from "@/components/BookList";
import { db } from "@/database/drizzle";
import { books, users } from "@/database/schema";
import { auth } from "@/auth";
import { desc } from "drizzle-orm";

const Home = async () => {
  const session = await auth();
  const userId = session?.user?.id as string;

  const latestBooks = (await db
    .select()
    .from(books)
    .limit(20)
    .orderBy(desc(books.createdAt))) as Book[];

  return (
    <>
      <BookOverview {...latestBooks[0]} userId={session?.user?.id as string} />

      {latestBooks.length > 1 && (
        <BookList
          title="Latest Books"
          books={latestBooks.slice(1)}
          containerClassname="mt-28"
          userId={userId}
        />
      )}
    </>
  );
};

export default Home;
