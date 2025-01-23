interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number;
  availableCopies: number;
  description: string;
  coverColor: string;
  coverUrl: string;
  videoUrl: string;
  summary: string;
  createdAt: Date | null;
  // isLoanedBook?: boolean;
}

interface AuthCredentials {
  email: string;
  password: string;
  fullName: string;
  universityId: number;
  universityCard: string;
}

interface BorrowBookParams {
  bookId: string;
  userId: string;
}
