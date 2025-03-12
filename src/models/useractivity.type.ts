// returned from user_likes_books

interface User {
  created_at: string;
  email: string;
  id: string;
  name: string;
  updated_at: string;
  user_name: string;
}

interface Creator {
  alias: string;
  bio: string | null;
  created_at: string;
  email: string;
  id: string;
  name: string;
  updated_at: string;
}

interface BookDetails {
  cover_image_url: string;
  created_at: string;
  description: string;
  id: string;
  title: string;
  updated_at: string;
}

interface BookLiked {
  book_id: string;
  created_at: string;
  user_id: string;
  users: User;
  books: BookDetails
}

interface BookReview {
  book_id: string;
  created_at: string;
  review: string;
  user_id: string;
  users: User;
  books: BookDetails
}

interface BookEntry {
  book_id: string;
  books: BookDetails;
  created_at: string;
  creator_id: string;
  creators: Creator;
  updated_at: string;
}

export {
  BookLiked,
  BookReview,
  BookEntry
}
